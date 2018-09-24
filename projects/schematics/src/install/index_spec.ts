import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { PackageJson } from '../utils/package-json';
import { PackageInfo } from '../utils/package-info';
import { createTestApp } from '../utils/test-utils';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Install schematic', () => {
  const projectName = 'myProject';
  const defaultOptions = {
    projectName,
  };
  let runner: SchematicTestRunner;
  let tree: UnitTestTree;

  beforeEach(() => {
    const appTree = createTestApp({ name: projectName });
    runner = new SchematicTestRunner('schematics', collectionPath);
    tree = runner.runSchematic('ng-add', defaultOptions, appTree);
  });

  it('adds dependency to the library in package.json', () => {
    const packageJsonPath = '/package.json';
    expect(tree.files).toContain(packageJsonPath);

    const packageJson: PackageJson = JSON.parse(tree.readContent(packageJsonPath));
    expect(packageJson.dependencies[PackageInfo.name]).toEqual(PackageInfo.version);
  });

  it('adds import of CatchyNameModule to the root app module', () => {
    const rootModulePath = `/projects/${projectName}/src/app/app.module.ts`;
    expect(tree.files).toContain(rootModulePath);

    const rootModule = tree.readContent(rootModulePath);
    const jsModuleImport = `import { CatchyNameModule } from 'catchy-name';`;
    expect(rootModule).toContain(jsModuleImport);
  });
});
