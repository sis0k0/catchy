export interface PackageJson {
    dependencies: DependencyMap;
    devDependencies: DependencyMap;
}
export interface DependencyMap {
    [dependencyName: string]: string;
}
