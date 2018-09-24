import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { PackageJson } from '../utils/package-json';
import { PackageInfo } from '../utils/package-info';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Install schematic', () => {
  it('adds dependency to the library in package.json', () => {
    const runner =
      new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('ng-add', {}, Tree.empty());

    const packageJsonPath = '/package.json';
    expect(tree.files).toContain(packageJsonPath);

    const packageJson: PackageJson = JSON.parse(tree.readContent(packageJsonPath));
    expect(packageJson.dependencies[PackageInfo.name]).toEqual(PackageInfo.version);
  });
});
