{
  description = "Tools for PiGreco zola website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";

    sagome.url = "github:pigreco-luogoideale/sagome";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    sagome,
  }:
    flake-utils.lib.eachDefaultSystem
    (system: let
      packageName = "pigreco-luogoideale-website";
      pkgs = nixpkgs.legacyPackages.${system};

      # Questo fa la build dei volantini e li mette direttamente in static
      volantini =
        pkgs.writers.writePython3 "build_volantini" {
          libraries = [
            pkgs.python3Packages.weasyprint
            pkgs.python3Packages.toml
          ];
          flakeIgnore = ["E501"]; # allowing long lines since we embed nix paths
        } ''
          import toml
          import subprocess

          from pathlib import Path
          from weasyprint import HTML

          repo_dir = Path.cwd()
          with Path("config.toml").open() as conf:
              site_conf = toml.load(conf)
              pdf_targets = site_conf.get("extra", {}).get("weasyprint", {})
              if pdf_targets:
                  child = subprocess.Popen(
                      ["${pkgs.lib.getExe pkgs.zola}", "serve"],
                      stdout=subprocess.PIPE,
                      stderr=subprocess.STDOUT,
                  )
                  for line in child.stdout:
                      if b"127.0.0.1:1111" in line:
                          print("zola server up and running")
                          break
                  try:
                      for name, info in pdf_targets.items():
                          url = info.get("url")
                          out = info.get("out")
                          if not url or not out:
                              print(f"PDF target {name} is missing url or out in config")
                              exit(1)
                          pdf_path = f"{repo_dir}/{out}"
                          print(f"Creating PDF '{name}' for {url} at {pdf_path}")
                          HTML(url).write_pdf(pdf_path)
                          if not Path(pdf_path).is_file():
                              print(f"Unable to print {pdf_path} from PDF target {name}")
                              exit(2)
                          print("PDFs created successfully!")
                  except Exception as ex:
                      print(f"Exception occurred while printing PDF\n{ex}")
                      exit(3)
                  finally:
                      child.terminate()
                      child.wait()
        '';
    in {
      packages.default = pkgs.zola;
      packages.rclone = pkgs.rclone;
      packages.sito = pkgs.stdenv.mkDerivation {
        pname = packageName;
        version = "1.0.0";
        src = ./.;
        buildPhase = ''
          runHook preBuild

          ${volantini}
          ${pkgs.lib.getExe pkgs.zola} build

          runHook postBuild
        '';

        installPhase = ''
          runHook preInstall

          mv public $out
          cp -r ${sagome.packages.${system}.game}/* $out/sagome

          runHook postInstall
        '';
      };

      devShells.default = pkgs.mkShell {
        buildInputs = [
          pkgs.zola
          pkgs.python39Packages.weasyprint
        ];
      };
    });
}
