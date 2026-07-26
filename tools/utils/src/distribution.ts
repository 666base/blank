import { PackageList, type PackageName } from './yarn';

export const PackageToDistribution = new Map<
  PackageName,
  BUILD_CONFIG_TYPE['distribution']
>([
  ['@affine/admin', 'admin'],
  ['@affine/web', 'web'],
  ['@affine/electron-renderer', 'desktop'],
  ['@affine/electron', 'desktop'],
  ['@affine/mobile', 'mobile'],
  ['@affine/ios', 'ios'],
  ['@affine/android', 'android'],
  ['@affine/tauri', 'desktop'],
]);

export const AliasToPackage = new Map<string, PackageName>([
  ['admin', '@affine/admin'],
  ['web', '@affine/web'],
  ['electron', '@affine/electron'],
  // Blank product: "desktop" means Tauri, not Electron
  ['desktop', '@affine/tauri'],
  ['blank', '@affine/tauri'],
  ['phone', '@affine/tauri'],
  ['renderer', '@affine/electron-renderer'],
  ['mobile', '@affine/mobile'],
  ['ios', '@affine/ios'],
  ['android', '@affine/android'],
  ['tauri', '@affine/tauri'],
  ['server', '@affine/server'],
  ['gql', '@affine/graphql'],
  ...PackageList.map(
    pkg => [pkg.name.split('/').pop()!, pkg.name] as [string, PackageName]
  ),
]);
