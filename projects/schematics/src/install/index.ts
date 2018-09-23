import { Rule, Tree } from '@angular-devkit/schematics';

export function install(_options: any): Rule {
  return (tree: Tree) => {
    return tree;
  };
}
