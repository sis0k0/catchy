import { UnitTestTree } from '@angular-devkit/schematics/testing';
export interface AppOptions {
    name: string;
}
export declare function createTestApp(appOptions: AppOptions): UnitTestTree;
