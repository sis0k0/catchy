import { Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getProjectTargets } from '@schematics/angular/utility/project-targets';
import { normalize } from '@angular-devkit/core';

export function findRootModule(tree: Tree, projectName: string) {
  const workspace = getWorkspace(tree);
  const project = workspace.projects[projectName];
  const clientTargets = getProjectTargets(project);
  const mainPath = normalize('/' + clientTargets.build.options.main);
  const rootModule = getAppModulePath(tree, mainPath);

  return rootModule;
}
