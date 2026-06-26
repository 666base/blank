import '@blank/env/constant';
import '@blocksuite/blank/global/types'

declare module '@blocksuite/blank/store' {
  interface DocMeta {
    /**
     * @deprecated
     */
    favorite?: boolean;
    trash?: boolean;
    trashDate?: number;
    updatedDate?: number;
    mode?: 'page' | 'edgeless';
    // todo: support `number` in the future
    isPublic?: boolean;
  }
}


declare global {

declare type Environment = {
  // Variant
  isSelfHosted: boolean;

  // Device
  isLinux: boolean;
  isMacOs: boolean;
  isIOS: boolean;
  isSafari: boolean;
  isWindows: boolean;
  isFireFox: boolean;
  isMobile: boolean;
  isChrome: boolean;
  isPwa: boolean;
  chromeVersion?: number;

  // runtime configs
  publicPath: string;
  subPath: string;
};

  var process: {
    env: Record<string, string>;
  };
  var environment: Environment;
  var $BLANK_SETUP: boolean | undefined;
  /**
   * Inject by https://www.npmjs.com/package/@sentry/webpack-plugin
   */
  var SENTRY_RELEASE: { id: string } | undefined;
}
