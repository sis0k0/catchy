"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@schematics/angular/utility/config");
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
const project_targets_1 = require("@schematics/angular/utility/project-targets");
const core_1 = require("@angular-devkit/core");
function findRootModule(tree, projectName) {
    const workspace = config_1.getWorkspace(tree);
    const project = workspace.projects[projectName];
    const clientTargets = project_targets_1.getProjectTargets(project);
    const mainPath = core_1.normalize('/' + clientTargets.build.options.main);
    const rootModule = ng_ast_utils_1.getAppModulePath(tree, mainPath);
    return rootModule;
}
exports.findRootModule = findRootModule;
//# sourceMappingURL=project-utils.js.map