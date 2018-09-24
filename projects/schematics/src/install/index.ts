import { Rule, Tree, SchematicsException, chain } from '@angular-devkit/schematics';

import { PackageInfo } from '../utils/package-info';
import { PackageJson } from '../utils/package-json';
import { findRootModule } from '../utils/project-utils';
import { addModuleImportToModule } from '../utils/ast-utils';

interface Options {
  projectName: string;
}

export function install(options: Options): Rule {
  return chain([
    addDependency(PackageInfo.name, PackageInfo.version),
    importInMainModule(options),
  ]);
}

function importInMainModule(options: Options): Rule {
  return (tree: Tree) => {
    const mainModule = findRootModule(tree, options.projectName);
    addModuleImportToModule(tree, mainModule, 'CatchyNameModule', 'catchy-name');

    return tree;
  };
}

function addDependency(name: string, version: string): Rule {
  return (tree: Tree) => {
    const packageJsonPath = '/package.json';
    const packageJson: PackageJson =
      readJson<PackageJson>(tree, packageJsonPath);

    const newDependencies = packageJson.dependencies || {};
    if (newDependencies[name]) {
      return tree;
    }

    newDependencies[name] = version;
    const newPackageJson = {
      ...packageJson,
      dependencies: newDependencies,
    };

    tree.overwrite(packageJsonPath,
      JSON.stringify(newPackageJson, null, 2)
    );

    return tree;
  };
}

function readJson<T>(tree: Tree, path: string): T {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new SchematicsException(`Cannot read file ${path}!`);
  }

  const content = buffer.toString();
  try {
    const json = JSON.parse(content);
    return json;
  } catch (e) {
    throw new SchematicsException(
      `Cannot parse file ${path}! Original error:\n${e}`
    );
  }
}
