"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const testing_1 = require("@angular-devkit/schematics/testing");
const collectionPath = path_1.join(__dirname, '../collection.json');
function createTestApp(appOptions) {
    const baseRunner = new testing_1.SchematicTestRunner('schematics', collectionPath);
    const workspaceTree = baseRunner.runExternalSchematic('@schematics/angular', 'workspace', {
        name: 'workspace',
        version: '6.0.0',
        newProjectRoot: 'projects',
    });
    return baseRunner.runExternalSchematic('@schematics/angular', 'application', Object.assign({}, appOptions, { name: appOptions.name }), workspaceTree);
}
exports.createTestApp = createTestApp;
//# sourceMappingURL=test-utils.js.map