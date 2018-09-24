import * as ts from 'typescript';
import { Tree } from '@angular-devkit/schematics';
export declare function addModuleImportToModule(host: Tree, moduleToImportIn: string, importedModuleName: string, importedModulePath: string): void;
export declare function getTypeScriptSourceFile(host: Tree, path: string): ts.SourceFile;
