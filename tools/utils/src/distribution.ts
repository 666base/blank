import { PackageList, type PackageName } from './yarn';

export const PackageToDistribution = new Map<
  PackageName,
  BUILD_CONFIG_TYPE['distribution']
>([
  ['@affine/web', 'web'],
  ['@affine/mobile', 'mobile'],
  ['@affine/media-capture-playground', 'web'],
]);

export const AliasToPackage = new Map<string, PackageName>([
  ['web', '@affine/web'],
  ['mobile', '@affine/mobile'],
  ['gql', '@affine/graphql'],
  ...PackageList.map(
    pkg => [pkg.name.split('/').pop()!, pkg.name] as [string, PackageName]
  ),
]);
