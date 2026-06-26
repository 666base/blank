import { PackageList, type PackageName } from './yarn';

export const PackageToDistribution = new Map<
  PackageName,
  BUILD_CONFIG_TYPE['distribution']
>([
  ['@blank/web', 'web'],
  ['@blank/mobile', 'mobile'],
  ['@blank/media-capture-playground', 'web'],
]);

export const AliasToPackage = new Map<string, PackageName>([
  ['web', '@blank/web'],
  ['mobile', '@blank/mobile'],
  ['gql', '@blank/graphql'],
  ...PackageList.map(
    pkg => [pkg.name.split('/').pop()!, pkg.name] as [string, PackageName]
  ),
]);
