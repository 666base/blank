declare interface BUILD_CONFIG_TYPE {
  debug: boolean;
  distribution: 'web' | 'desktop' | 'mobile' | 'ios' | 'android';
  /**
   * 'web' | 'desktop'
   */
  isDesktopEdition: boolean;
  /**
   * 'mobile'
   */
  isMobileEdition: boolean;

  isElectron: boolean;
  isWeb: boolean;
  /**
   * 'desktop' | 'ios' | 'android'
   */
  isNative: boolean;
  isMobileWeb: boolean;
  isIOS: boolean;
  isAndroid: boolean;

  appVersion: string;
  editorVersion: string;
  appBuildType: 'stable' | 'beta' | 'internal' | 'canary';

  githubUrl: string;
  changelogUrl: string;
  pricingUrl: string;
  downloadUrl: string;
  discordUrl: string;
  requestLicenseUrl: string;
  // see: tools/workers
  imageProxyUrl: string;
  linkPreviewUrl: string;

  CAPTCHA_SITE_KEY: string;
  SENTRY_DSN: string;
}

declare var BUILD_CONFIG: BUILD_CONFIG_TYPE;
