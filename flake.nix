{
  description = "Tools for PiGreco zola website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          packageName = "pigreco-luogoideale-website";
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          packages.default = pkgs.zola;
          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.zola
              pkgs.python39Packages.weasyprint
            ];
          };
        });
}
