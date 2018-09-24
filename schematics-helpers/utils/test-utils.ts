import { join } from 'path';

import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

const collectionPath = join(__dirname, '../collection.json');

export interface AppOptions {
    name: string;
}

export function createTestApp(appOptions: AppOptions): UnitTestTree {
  const baseRunner = new SchematicTestRunner('schematics', collectionPath);

  const workspaceTree = baseRunner.runExternalSchematic(
    '@schematics/angular',
    'workspace',
    {
      name: 'workspace',
      version: '6.0.0',
      newProjectRoot: 'projects',
    },
  );

  return baseRunner.runExternalSchematic(
    '@schematics/angular',
    'application',
    {
      ...appOptions,
      name: appOptions.name,
    },
    workspaceTree,
  );
}
