import * as ts from 'typescript';

import { Tree, SchematicsException } from '@angular-devkit/schematics';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';

export function addModuleImportToModule(
  host: Tree,
  moduleToImportIn: string,
  importedModuleName: string,
  importedModulePath: string,
) {
  const moduleSource = getTypeScriptSourceFile(host, moduleToImportIn);

  if (!moduleSource) {
    throw new SchematicsException(`Module not found: ${moduleToImportIn}`);
  }

  const changes = addImportToModule(moduleSource, moduleToImportIn, importedModuleName, importedModulePath);
  const recorder = host.beginUpdate(moduleToImportIn);

  changes
    .filter((change: Change) => change instanceof InsertChange)
    .forEach((change: InsertChange) => recorder.insertLeft(change.pos, change.toAdd));

  host.commitUpdate(recorder);
}

export function getTypeScriptSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find ${path}!`);
  }

  const content = buffer.toString();
  const sourceFile = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);

  return sourceFile;
}
