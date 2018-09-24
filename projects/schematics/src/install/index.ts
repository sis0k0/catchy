import { Rule, Tree, SchematicsException } from '@angular-devkit/schematics';
import { PackageInfo } from '../utils/package-info';
import { PackageJson } from '../utils/package-json';

export function install(_options: any): Rule {
  return addDependency(PackageInfo.name, PackageInfo.version);
}

function addDependency(name: string, value: string): Rule {
  return (tree: Tree) => {
    const packageJsonPath = '/package.json';
    const packageJson: PackageJson =
      readJson<PackageJson>(tree, packageJsonPath);

    const newDependencies = packageJson.dependencies || {};
    if (newDependencies[PackageInfo.name]) {
      return tree;
    }

    newDependencies[PackageInfo.name] = PackageInfo.version;
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
