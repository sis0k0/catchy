"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
function addModuleImportToModule(host, moduleToImportIn, importedModuleName, importedModulePath) {
    const moduleSource = getTypeScriptSourceFile(host, moduleToImportIn);
    if (!moduleSource) {
        throw new schematics_1.SchematicsException(`Module not found: ${moduleToImportIn}`);
    }
    const changes = ast_utils_1.addImportToModule(moduleSource, moduleToImportIn, importedModuleName, importedModulePath);
    const recorder = host.beginUpdate(moduleToImportIn);
    changes
        .filter((change) => change instanceof change_1.InsertChange)
        .forEach((change) => recorder.insertLeft(change.pos, change.toAdd));
    host.commitUpdate(recorder);
}
exports.addModuleImportToModule = addModuleImportToModule;
function getTypeScriptSourceFile(host, path) {
    const buffer = host.read(path);
    if (!buffer) {
        throw new schematics_1.SchematicsException(`Could not find ${path}!`);
    }
    const content = buffer.toString();
    const sourceFile = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
    return sourceFile;
}
exports.getTypeScriptSourceFile = getTypeScriptSourceFile;
//# sourceMappingURL=ast-utils.js.map