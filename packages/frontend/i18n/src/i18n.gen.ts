// @ts-nocheck
/* eslint-disable */
import { createElement, useMemo, type ComponentType, type JSX } from "react";
import { useTranslation, Trans, type TransProps } from "react-i18next";
type TypedTransProps<Value, Components, Context extends string | undefined = undefined> = Omit<TransProps<string, never, never, Context>, "values" | "ns" | "i18nKey"> & ({} extends Value ? {} : {
    values: Value;
}) & {
    components: Components;
};
function createProxy(initValue: (key: string) => any) {
    function define(key: string) {
        const value = initValue(key);
        Object.defineProperty(container, key, { value, configurable: true });
        return value;
    }
    const container = {
        __proto__: new Proxy({ __proto__: null }, {
            get(_, key) {
                if (typeof key === "symbol")
                    return undefined;
                return define(key);
            },
        }),
    };
    return new Proxy(container, {
        getPrototypeOf: () => null,
        setPrototypeOf: (_, v) => v === null,
        getOwnPropertyDescriptor: (_, key) => {
            if (typeof key === "symbol")
                return undefined;
            if (!(key in container))
                define(key);
            return Object.getOwnPropertyDescriptor(container, key);
        },
    });
}
export function useBlankI18N(): {
    /**
      * `Back to my Content`
      */
    ["404.back"](): string;
    /**
      * `Sorry, you do not have access or this content does not exist...`
      */
    ["404.hint"](): string;
    /**
      * `Sign in to another account`
      */
    ["404.signOut"](): string;
    /**
      * `Blank Cloud`
      */
    ["Blank Cloud"](): string;
    /**
      * `All docs`
      */
    ["All pages"](): string;
    /**
      * `App version`
      */
    ["App Version"](): string;
    /**
      * `Available offline`
      */
    ["Available Offline"](): string;
    /**
      * `Bold`
      */
    Bold(): string;
    /**
      * `Cancel`
      */
    Cancel(): string;
    /**
      * `Click to replace photo`
      */
    ["Click to replace photo"](): string;
    /**
      * `Collections`
      */
    Collections(): string;
    /**
      * `Complete`
      */
    Complete(): string;
    /**
      * `Confirm`
      */
    Confirm(): string;
    /**
      * `Continue`
      */
    Continue(): string;
    /**
      * `Convert to `
      */
    ["Convert to "](): string;
    /**
      * `Copied link to clipboard`
      */
    ["Copied link to clipboard"](): string;
    /**
      * `Copied to clipboard`
      */
    ["Copied to clipboard"](): string;
    /**
      * `Copy`
      */
    Copy(): string;
    /**
      * `Create`
      */
    Create(): string;
    /**
      * `Created`
      */
    Created(): string;
    /**
      * `Customise`
      */
    Customize(): string;
    /**
      * `Colors`
      */
    Colors(): string;
    /**
      * `Database file already loaded`
      */
    DB_FILE_ALREADY_LOADED(): string;
    /**
      * `Invalid database file`
      */
    DB_FILE_INVALID(): string;
    /**
      * `Database file migration failed`
      */
    DB_FILE_MIGRATION_FAILED(): string;
    /**
      * `Database file path invalid`
      */
    DB_FILE_PATH_INVALID(): string;
    /**
      * `Date`
      */
    Date(): string;
    /**
      * `Delete`
      */
    Delete(): string;
    /**
      * `Deleted`
      */
    Deleted(): string;
    /**
      * `Disable`
      */
    Disable(): string;
    /**
      * `Disable public sharing`
      */
    ["Disable Public Sharing"](): string;
    /**
      * `Disable snapshot`
      */
    ["Disable Snapshot"](): string;
    /**
      * `Divider`
      */
    Divider(): string;
    /**
      * `Edgeless`
      */
    Edgeless(): string;
    /**
      * `Edit`
      */
    Edit(): string;
    /**
      * `Editor version`
      */
    ["Editor Version"](): string;
    /**
      * `Enable`
      */
    Enable(): string;
    /**
      * `Enable Blank Cloud`
      */
    ["Enable Blank Cloud"](): string;
    /**
      * `If enabled, the data in this workspace will be backed up and synchronised via Blank Cloud.`
      */
    ["Enable Blank Cloud Description"](): string;
    /**
      * `The following functions rely on Blank Cloud. All data is stored on the current device. You can enable Blank Cloud for this workspace to keep data in sync with the cloud.`
      */
    ["Enable cloud hint"](): string;
    /**
      * `Full Backup`
      */
    ["Full Backup"](): string;
    /**
      * `Export a complete workspace backup`
      */
    ["Full Backup Description"](): string;
    /**
      * `Sync all cloud data and export a complete workspace backup`
      */
    ["Full Backup Hint"](): string;
    /**
      * `Quick Export`
      */
    ["Quick Export"](): string;
    /**
      * `Skip cloud synchronization and quickly export current data(some attachments or docs may be missing)`
      */
    ["Quick Export Description"](): string;
    /**
      * `Export failed`
      */
    ["Export failed"](): string;
    /**
      * `Export success`
      */
    ["Export success"](): string;
    /**
      * `Export to HTML`
      */
    ["Export to HTML"](): string;
    /**
      * `Export to Markdown`
      */
    ["Export to Markdown"](): string;
    /**
      * `Export to PNG`
      */
    ["Export to PNG"](): string;
    /**
      * `File already exists`
      */
    FILE_ALREADY_EXISTS(): string;
    /**
      * `Favourite`
      */
    Favorite(): string;
    /**
      * `Favourited`
      */
    Favorited(): string;
    /**
      * `Favourites`
      */
    Favorites(): string;
    /**
      * `Feedback`
      */
    Feedback(): string;
    /**
      * `Found 0 results`
      */
    ["Find 0 result"](): string;
    /**
      * `Go back`
      */
    ["Go Back"](): string;
    /**
      * `Go forward`
      */
    ["Go Forward"](): string;
    /**
      * `Got it`
      */
    ["Got it"](): string;
    /**
      * `Heading {{number}}`
      */
    Heading(options: {
        readonly number: string;
    }): string;
    /**
      * `Image`
      */
    Image(): string;
    /**
      * `Import`
      */
    Import(): string;
    /**
      * `Info`
      */
    Info(): string;
    /**
      * `Invitation sent`
      */
    ["Invitation sent"](): string;
    /**
      * `Invited members have been notified with email to join this Workspace.`
      */
    ["Invitation sent hint"](): string;
    /**
      * `Invite`
      */
    Invite(): string;
    /**
      * `Invite members`
      */
    ["Invite Members"](): string;
    /**
      * `Invited members will collaborate with you in current workspace`
      */
    ["Invite Members Message"](): string;
    /**
      * `Insufficient team seat`
      */
    ["insufficient-team-seat"](): string;
    /**
      * `Joined workspace`
      */
    ["Joined Workspace"](): string;
    /**
      * `Leave`
      */
    Leave(): string;
    /**
      * `Hyperlink (with selected text)`
      */
    Link(): string;
    /**
      * `Loading...`
      */
    Loading(): string;
    /**
      * `Local`
      */
    Local(): string;
    /**
      * `Member`
      */
    Member(): string;
    /**
      * `Members`
      */
    Members(): string;
    /**
      * `Manage members here, invite new member by email.`
      */
    ["Members hint"](): string;
    /**
      * `New doc`
      */
    ["New Page"](): string;
    /**
      * `Owner`
      */
    Owner(): string;
    /**
      * `Page`
      */
    Page(): string;
    /**
      * `Pen`
      */
    Pen(): string;
    /**
      * `Pending`
      */
    Pending(): string;
    /**
      * `Collaborator`
      */
    Collaborator(): string;
    /**
      * `Under Review`
      */
    ["Under-Review"](): string;
    /**
      * `Need More Seats`
      */
    ["Need-More-Seats"](): string;
    /**
      * `Allocating Seat`
      */
    ["Allocating Seat"](): string;
    /**
      * `Admin`
      */
    Admin(): string;
    /**
      * `Publish`
      */
    Publish(): string;
    /**
      * `Published to web`
      */
    ["Published to Web"](): string;
    /**
      * `Quick search`
      */
    ["Quick Search"](): string;
    /**
      * `Search`
      */
    ["Quick search"](): string;
    /**
      * `Recent`
      */
    Recent(): string;
    /**
      * `Remove from workspace`
      */
    ["Remove from workspace"](): string;
    /**
      * `Remove photo`
      */
    ["Remove photo"](): string;
    /**
      * `Remove special filter`
      */
    ["Remove special filter"](): string;
    /**
      * `Removed successfully`
      */
    ["Removed successfully"](): string;
    /**
      * `Rename`
      */
    Rename(): string;
    /**
      * `Retry`
      */
    Retry(): string;
    /**
      * `Save`
      */
    Save(): string;
    /**
      * `Select`
      */
    Select(): string;
    /**
      * `Sign in`
      */
    ["Sign in"](): string;
    /**
      * `Sign in and enable`
      */
    ["Sign in and Enable"](): string;
    /**
      * `Sign out`
      */
    ["Sign out"](): string;
    /**
      * `Snapshot`
      */
    Snapshot(): string;
    /**
      * `Storage`
      */
    Storage(): string;
    /**
      * `Storage and export`
      */
    ["Storage and Export"](): string;
    /**
      * `Successfully deleted`
      */
    ["Successfully deleted"](): string;
    /**
      * `Successfully joined!`
      */
    ["Successfully joined!"](): string;
    /**
      * `Switch`
      */
    Switch(): string;
    /**
      * `Switch view`
      */
    switchView(): string;
    /**
      * `Sync`
      */
    Sync(): string;
    /**
      * `Synced with Blank Cloud`
      */
    ["Synced with Blank Cloud"](): string;
    /**
      * `Tags`
      */
    Tags(): string;
    /**
      * `Text`
      */
    Text(): string;
    /**
      * `Theme`
      */
    Theme(): string;
    /**
      * `Title`
      */
    Title(): string;
    /**
      * `Trash`
      */
    Trash(): string;
    /**
      * `Unknown error`
      */
    UNKNOWN_ERROR(): string;
    /**
      * `Undo`
      */
    Undo(): string;
    /**
      * `Unpin`
      */
    Unpin(): string;
    /**
      * `Untitled`
      */
    Untitled(): string;
    /**
      * `Update workspace name success`
      */
    ["Update workspace name success"](): string;
    /**
      * `Updated`
      */
    Updated(): string;
    /**
      * `Upload`
      */
    Upload(): string;
    /**
      * `Users`
      */
    Users(): string;
    /**
      * `Version`
      */
    Version(): string;
    /**
      * `Visit workspace`
      */
    ["Visit Workspace"](): string;
    /**
      * `Workspace name`
      */
    ["Workspace Name"](): string;
    /**
      * `Workspace Owner`
      */
    ["Workspace Owner"](): string;
    /**
      * `Workspace profile`
      */
    ["Workspace Profile"](): string;
    /**
      * `Workspace settings`
      */
    ["Workspace Settings"](): string;
    /**
      * `{{name}}'s settings`
      */
    ["Workspace Settings with name"](options: {
        readonly name: string;
    }): string;
    /**
      * `{{name}} is saved locally`
      */
    ["Workspace saved locally"](options: {
        readonly name: string;
    }): string;
    /**
      * `Zoom in`
      */
    ["Zoom in"](): string;
    /**
      * `Zoom out`
      */
    ["Zoom out"](): string;
    /**
      * `Unknown User`
      */
    ["Unknown User"](): string;
    /**
      * `Deleted User`
      */
    ["Deleted User"](): string;
    /**
      * `all`
      */
    all(): string;
    /**
      * `current`
      */
    current(): string;
    /**
      * `created at {{time}}`
      */
    ["created at"](options: {
        readonly time: string;
    }): string;
    /**
      * `last updated at {{time}}`
      */
    ["updated at"](options: {
        readonly time: string;
    }): string;
    /**
      * `Use local only`
      */
    ["com.blank.sync.clear"](): string;
    /**
      * `Save and restart`
      */
    ["com.blank.sync.save"](): string;
    /**
      * `This build is configured for a fixed sync server.`
      */
    ["com.blank.sync.server.locked"](): string;
    /**
      * `Sync server`
      */
    ["com.blank.sync.server.title"](): string;
    /**
      * `Server URL`
      */
    ["com.blank.sync.server.url"](): string;
    /**
      * `HTTPS URL of your Blank sync server (Docker). Desktop and phone must use the same URL and account.`
      */
    ["com.blank.sync.server.url.desc"](): string;
    /**
      * `Mode`
      */
    ["com.blank.sync.status"](): string;
    /**
      * `Local only — notes stay on this device.`
      */
    ["com.blank.sync.status.off"](): string;
    /**
      * `Sync enabled — sign in and use a cloud workspace.`
      */
    ["com.blank.sync.status.on"](): string;
    /**
      * `Sync notes in real time between desktop and mobile.`
      */
    ["com.blank.sync.subtitle"](): string;
    /**
      * `Sync`
      */
    ["com.blank.sync.title"](): string;
    /**
      * `Enter a valid URL starting with http:// or https://`
      */
    ["com.blank.sync.url.invalid"](): string;
    /**
      * `Account & sync`
      */
    ["com.blank.auth.title"](): string;
    /**
      * `Sign in to sync notes between desktop and phone via Supabase.`
      */
    ["com.blank.auth.subtitle"](): string;
    /**
      * `Blank account`
      */
    ["com.blank.auth.account"](): string;
    /**
      * `Email`
      */
    ["com.blank.auth.email"](): string;
    /**
      * `Password`
      */
    ["com.blank.auth.password"](): string;
    /**
      * `Sign in`
      */
    ["com.blank.auth.signIn"](): string;
    /**
      * `Sign out`
      */
    ["com.blank.auth.signOut"](): string;
    /**
      * `Loading…`
      */
    ["com.blank.auth.loading"](): string;
    /**
      * `Status`
      */
    ["com.blank.auth.status"](): string;
    /**
      * `Signed in — notes sync when you open the sync workspace.`
      */
    ["com.blank.auth.status.signedIn"](): string;
    /**
      * `Open sync workspace`
      */
    ["com.blank.auth.openSyncWorkspace"](): string;
    /**
      * `Blank Sync`
      */
    ["com.blank.sync.workspaceListTitle"](): string;
    /**
      * `Supabase not connected`
      */
    ["com.blank.auth.notConfigured"](): string;
    /**
      * `Supabase keys from services/blank-server/.env are not in the app bundle. For APK/EXE: run android:build or desktop:build after filling .env. For PC dev: run blank:server:up or blank:dev.`
      */
    ["com.blank.auth.notConfigured.desc"](): string;
    /**
      * `Enter email and password.`
      */
    ["com.blank.auth.error.missing"](): string;
    /**
      * `Automatically check for new updates periodically.`
      */
    ["com.blank.aboutBlank.autoCheckUpdate.description"](): string;
    /**
      * `Check for updates automatically`
      */
    ["com.blank.aboutBlank.autoCheckUpdate.title"](): string;
    /**
      * `Automatically download updates (to this device).`
      */
    ["com.blank.aboutBlank.autoDownloadUpdate.description"](): string;
    /**
      * `Download updates automatically`
      */
    ["com.blank.aboutBlank.autoDownloadUpdate.title"](): string;
    /**
      * `View the Blank Changelog.`
      */
    ["com.blank.aboutBlank.changelog.description"](): string;
    /**
      * `Discover what's new`
      */
    ["com.blank.aboutBlank.changelog.title"](): string;
    /**
      * `Check for update`
      */
    ["com.blank.aboutBlank.checkUpdate.button.check"](): string;
    /**
      * `Download update`
      */
    ["com.blank.aboutBlank.checkUpdate.button.download"](): string;
    /**
      * `Restart to update`
      */
    ["com.blank.aboutBlank.checkUpdate.button.restart"](): string;
    /**
      * `Retry`
      */
    ["com.blank.aboutBlank.checkUpdate.button.retry"](): string;
    /**
      * `New version is ready`
      */
    ["com.blank.aboutBlank.checkUpdate.description"](): string;
    /**
      * `Manually check for updates.`
      */
    ["com.blank.aboutBlank.checkUpdate.subtitle.check"](): string;
    /**
      * `Checking for updates...`
      */
    ["com.blank.aboutBlank.checkUpdate.subtitle.checking"](): string;
    /**
      * `Downloading the latest version...`
      */
    ["com.blank.aboutBlank.checkUpdate.subtitle.downloading"](): string;
    /**
      * `Unable to connect to the update server.`
      */
    ["com.blank.aboutBlank.checkUpdate.subtitle.error"](): string;
    /**
      * `You've got the latest version of Blank.`
      */
    ["com.blank.aboutBlank.checkUpdate.subtitle.latest"](): string;
    /**
      * `Restart to apply update.`
      */
    ["com.blank.aboutBlank.checkUpdate.subtitle.restart"](): string;
    /**
      * `New update available ({{version}})`
      */
    ["com.blank.aboutBlank.checkUpdate.subtitle.update-available"](options: {
        readonly version: string;
    }): string;
    /**
      * `Check for updates`
      */
    ["com.blank.aboutBlank.checkUpdate.title"](): string;
    /**
      * `Communities`
      */
    ["com.blank.aboutBlank.community.title"](): string;
    /**
      * `Blank community`
      */
    ["com.blank.aboutBlank.contact.community"](): string;
    /**
      * `Contact us`
      */
    ["com.blank.aboutBlank.contact.title"](): string;
    /**
      * `GitHub`
      */
    ["com.blank.aboutBlank.contact.website"](): string;
    /**
      * `Privacy`
      */
    ["com.blank.aboutBlank.legal.privacy"](): string;
    /**
      * `Legal Info`
      */
    ["com.blank.aboutBlank.legal.title"](): string;
    /**
      * `Terms of use`
      */
    ["com.blank.aboutBlank.legal.tos"](): string;
    /**
      * `Information about Blank`
      */
    ["com.blank.aboutBlank.subtitle"](): string;
    /**
      * `About Blank`
      */
    ["com.blank.aboutBlank.title"](): string;
    /**
      * `App version`
      */
    ["com.blank.aboutBlank.version.app"](): string;
    /**
      * `Editor version`
      */
    ["com.blank.aboutBlank.version.editor.title"](): string;
    /**
      * `Version`
      */
    ["com.blank.aboutBlank.version.title"](): string;
    /**
      * `Get started`
      */
    ["com.blank.ai-onboarding.edgeless.get-started"](): string;
    /**
      * `Lets you think bigger, create faster, work smarter and save time for every project.`
      */
    ["com.blank.ai-onboarding.edgeless.message"](): string;
    /**
      * `Upgrade to unlimited usage`
      */
    ["com.blank.ai-onboarding.edgeless.purchase"](): string;
    /**
      * `Right-clicking to select content AI`
      */
    ["com.blank.ai-onboarding.edgeless.title"](): string;
    /**
      * `Lets you think bigger, create faster, work smarter and save time for every project.`
      */
    ["com.blank.ai-onboarding.general.1.description"](): string;
    /**
      * `Meet Blank AI`
      */
    ["com.blank.ai-onboarding.general.1.title"](): string;
    /**
      * `Answer questions, draft docs, visualize ideas - Blank AI can save you time at every possible step. Powered by GPT's most powerful model.`
      */
    ["com.blank.ai-onboarding.general.2.description"](): string;
    /**
      * `Chat with Blank AI`
      */
    ["com.blank.ai-onboarding.general.2.title"](): string;
    /**
      * `Get insightful answer to any question, instantly.`
      */
    ["com.blank.ai-onboarding.general.3.description"](): string;
    /**
      * `Edit inline with Blank AI`
      */
    ["com.blank.ai-onboarding.general.3.title"](): string;
    /**
      * `Expand thinking. Untangle complexity. Breakdown and visualise your content with crafted mindmap and presentable slides with one click.`
      */
    ["com.blank.ai-onboarding.general.4.description"](): string;
    /**
      * `Make mind-map and presents with AI`
      */
    ["com.blank.ai-onboarding.general.4.title"](): string;
    /**
      * `Blank AI is ready`
      */
    ["com.blank.ai-onboarding.general.5.title"](): string;
    /**
      * `Get started`
      */
    ["com.blank.ai-onboarding.general.get-started"](): string;
    /**
      * `Next`
      */
    ["com.blank.ai-onboarding.general.next"](): string;
    /**
      * `Back`
      */
    ["com.blank.ai-onboarding.general.prev"](): string;
    /**
      * `Get unlimited usage`
      */
    ["com.blank.ai-onboarding.general.purchase"](): string;
    /**
      * `Remind me later`
      */
    ["com.blank.ai-onboarding.general.skip"](): string;
    /**
      * `Try for free`
      */
    ["com.blank.ai-onboarding.general.try-for-free"](): string;
    /**
      * `Dismiss`
      */
    ["com.blank.ai-onboarding.local.action-dismiss"](): string;
    /**
      * `Get started`
      */
    ["com.blank.ai-onboarding.local.action-get-started"](): string;
    /**
      * `Learn more`
      */
    ["com.blank.ai-onboarding.local.action-learn-more"](): string;
    /**
      * `Lets you think bigger, create faster, work smarter and save time for every project.`
      */
    ["com.blank.ai-onboarding.local.message"](): string;
    /**
      * `Meet Blank AI`
      */
    ["com.blank.ai-onboarding.local.title"](): string;
    /**
      * `New`
      */
    ["com.blank.ai-scroll-tip.tag"](): string;
    /**
      * `Meet Blank AI`
      */
    ["com.blank.ai-scroll-tip.title"](): string;
    /**
      * `View`
      */
    ["com.blank.ai-scroll-tip.view"](): string;
    /**
      * `Please switch to edgeless mode`
      */
    ["com.blank.ai.action.edgeless-only.dialog-title"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.ai.login-required.dialog-cancel"](): string;
    /**
      * `Sign in`
      */
    ["com.blank.ai.login-required.dialog-confirm"](): string;
    /**
      * `To use Blank AI, please sign in to your Blank Cloud account.`
      */
    ["com.blank.ai.login-required.dialog-content"](): string;
    /**
      * `Sign in to continue`
      */
    ["com.blank.ai.login-required.dialog-title"](): string;
    /**
      * `Failed to insert template, please try again.`
      */
    ["com.blank.ai.template-insert.failed"](): string;
    /**
      * `Blank AI`
      */
    ["com.blank.ai.chat-panel.title"](): string;
    /**
      * `Blank AI is loading history...`
      */
    ["com.blank.ai.chat-panel.loading-history"](): string;
    /**
      * `Embedding {{done}}/{{total}}`
      */
    ["com.blank.ai.chat-panel.embedding-progress"](options: Readonly<{
        done: string;
        total: string;
    }>): string;
    /**
      * `Delete this history?`
      */
    ["com.blank.ai.chat-panel.session.delete.confirm.title"](): string;
    /**
      * `Do you want to delete this AI conversation history? Once deleted, it cannot be recovered.`
      */
    ["com.blank.ai.chat-panel.session.delete.confirm.message"](): string;
    /**
      * `History deleted`
      */
    ["com.blank.ai.chat-panel.session.delete.toast.success"](): string;
    /**
      * `Failed to delete history`
      */
    ["com.blank.ai.chat-panel.session.delete.toast.failed"](): string;
    /**
      * `All docs`
      */
    ["com.blank.all-pages.header"](): string;
    /**
      * `Learn more`
      */
    ["com.blank.app-sidebar.learn-more"](): string;
    /**
      * `Star us`
      */
    ["com.blank.app-sidebar.star-us"](): string;
    /**
      * `Download update`
      */
    ["com.blank.appUpdater.downloadUpdate"](): string;
    /**
      * `Downloading`
      */
    ["com.blank.appUpdater.downloading"](): string;
    /**
      * `Restart to install update`
      */
    ["com.blank.appUpdater.installUpdate"](): string;
    /**
      * `Open download page`
      */
    ["com.blank.appUpdater.openDownloadPage"](): string;
    /**
      * `Update available`
      */
    ["com.blank.appUpdater.updateAvailable"](): string;
    /**
      * `Discover what's new!`
      */
    ["com.blank.appUpdater.whatsNew"](): string;
    /**
      * `Customise the appearance of the client.`
      */
    ["com.blank.appearanceSettings.clientBorder.description"](): string;
    /**
      * `Client border style`
      */
    ["com.blank.appearanceSettings.clientBorder.title"](): string;
    /**
      * `Dark, light, gray, or paper`
      */
    ["com.blank.appearanceSettings.color.description"](): string;
    /**
      * `Colour mode`
      */
    ["com.blank.appearanceSettings.color.title"](): string;
    /**
      * `Visual style`
      */
    ["com.blank.appearanceSettings.visualTheme.title"](): string;
    /**
      * `Codex is Blank's refined dark UI. Classic uses the original AFFiNE look.`
      */
    ["com.blank.appearanceSettings.visualTheme.description"](): string;
    /**
      * `Classic`
      */
    ["com.blank.appearanceSettings.visualTheme.default"](): string;
    /**
      * `Codex`
      */
    ["com.blank.appearanceSettings.visualTheme.codex"](): string;
    /**
      * `Edit all Blank theme variables here`
      */
    ["com.blank.appearanceSettings.customize-theme.description"](): string;
    /**
      * `Customize Theme`
      */
    ["com.blank.appearanceSettings.customize-theme.title"](): string;
    /**
      * `Images`
      */
    ["com.blank.appearanceSettings.images.title"](): string;
    /**
      * `Smooth image rendering`
      */
    ["com.blank.appearanceSettings.images.antialiasing.title"](): string;
    /**
      * `When disabled, images are rendered using nearest-neighbor scaling for crisp pixels.`
      */
    ["com.blank.appearanceSettings.images.antialiasing.description"](): string;
    /**
      * `Reset all`
      */
    ["com.blank.appearanceSettings.customize-theme.reset"](): string;
    /**
      * `Open Theme Editor`
      */
    ["com.blank.appearanceSettings.customize-theme.open"](): string;
    /**
      * `Choose your font style`
      */
    ["com.blank.appearanceSettings.font.description"](): string;
    /**
      * `Font style`
      */
    ["com.blank.appearanceSettings.font.title"](): string;
    /**
      * `Mono`
      */
    ["com.blank.appearanceSettings.fontStyle.mono"](): string;
    /**
      * `Sans`
      */
    ["com.blank.appearanceSettings.fontStyle.sans"](): string;
    /**
      * `Serif`
      */
    ["com.blank.appearanceSettings.fontStyle.serif"](): string;
    /**
      * `Select the language for the interface.`
      */
    ["com.blank.appearanceSettings.language.description"](): string;
    /**
      * `Display language`
      */
    ["com.blank.appearanceSettings.language.title"](): string;
    /**
      * `Use background noise effect on the sidebar.`
      */
    ["com.blank.appearanceSettings.noisyBackground.description"](): string;
    /**
      * `Noise background on the sidebar`
      */
    ["com.blank.appearanceSettings.noisyBackground.title"](): string;
    /**
      * `Sidebar`
      */
    ["com.blank.appearanceSettings.sidebar.title"](): string;
    /**
      * `Sidebar sections`
      */
    ["com.blank.settings.sidebar.sections.title"](): string;
    /**
      * `Show this section in the navigation sidebar`
      */
    ["com.blank.settings.sidebar.sections.item.description"](): string;
    /**
      * `Favorites`
      */
    ["com.blank.settings.sidebar.sections.favorites"](): string;
    /**
      * `Organize`
      */
    ["com.blank.settings.sidebar.sections.organize"](): string;
    /**
      * `Tags`
      */
    ["com.blank.settings.sidebar.sections.tags"](): string;
    /**
      * `Collections`
      */
    ["com.blank.settings.sidebar.sections.collections"](): string;
    /**
      * `Others`
      */
    ["com.blank.settings.sidebar.sections.others"](): string;
    /**
      * `Customize your Blank appearance`
      */
    ["com.blank.appearanceSettings.subtitle"](): string;
    /**
      * `Menubar`
      */
    ["com.blank.appearanceSettings.menubar.title"](): string;
    /**
      * `Enable menubar app`
      */
    ["com.blank.appearanceSettings.menubar.toggle"](): string;
    /**
      * `Display the menubar app in the tray for quick access to Blank or meeting recordings.`
      */
    ["com.blank.appearanceSettings.menubar.description"](): string;
    /**
      * `Window behavior`
      */
    ["com.blank.appearanceSettings.menubar.windowBehavior.title"](): string;
    /**
      * `Quick open from tray icon`
      */
    ["com.blank.appearanceSettings.menubar.windowBehavior.openOnLeftClick.toggle"](): string;
    /**
      * `Open Blank when left‑clicking the tray icon.`
      */
    ["com.blank.appearanceSettings.menubar.windowBehavior.openOnLeftClick.description"](): string;
    /**
      * `Minimize to tray`
      */
    ["com.blank.appearanceSettings.menubar.windowBehavior.minimizeToTray.toggle"](): string;
    /**
      * `Minimize Blank to the system tray.`
      */
    ["com.blank.appearanceSettings.menubar.windowBehavior.minimizeToTray.description"](): string;
    /**
      * `Close to tray`
      */
    ["com.blank.appearanceSettings.menubar.windowBehavior.closeToTray.toggle"](): string;
    /**
      * `Close Blank to the system tray.`
      */
    ["com.blank.appearanceSettings.menubar.windowBehavior.closeToTray.description"](): string;
    /**
      * `Start minimized`
      */
    ["com.blank.appearanceSettings.menubar.windowBehavior.startMinimized.toggle"](): string;
    /**
      * `Start Blank minimized to the system tray.`
      */
    ["com.blank.appearanceSettings.menubar.windowBehavior.startMinimized.description"](): string;
    /**
      * `Theme`
      */
    ["com.blank.appearanceSettings.theme.title"](): string;
    /**
      * `Appearance settings`
      */
    ["com.blank.appearanceSettings.title"](): string;
    /**
      * `Use transparency effect on the sidebar.`
      */
    ["com.blank.appearanceSettings.translucentUI.description"](): string;
    /**
      * `Translucent UI on the sidebar`
      */
    ["com.blank.appearanceSettings.translucentUI.title"](): string;
    /**
      * `Show linked doc in sidebar`
      */
    ["com.blank.appearanceSettings.showLinkedDocInSidebar.title"](): string;
    /**
      * `Control whether to show the structure of linked docs in the sidebar.`
      */
    ["com.blank.appearanceSettings.showLinkedDocInSidebar.description"](): string;
    /**
      * `Your current email is {{email}}. We'll send a confirmation link there first so you can securely switch to a new email address.`
      */
    ["com.blank.auth.change.email.message"](options: {
        readonly email: string;
    }): string;
    /**
      * `Please enter your new email address below. We will send a verification link to this email address to complete the process.`
      */
    ["com.blank.auth.change.email.page.subtitle"](): string;
    /**
      * `Congratulations! You have successfully updated the email address associated with your Blank Cloud account.`
      */
    ["com.blank.auth.change.email.page.success.subtitle"](): string;
    /**
      * `Email address updated!`
      */
    ["com.blank.auth.change.email.page.success.title"](): string;
    /**
      * `Change email address`
      */
    ["com.blank.auth.change.email.page.title"](): string;
    /**
      * `Forgot password`
      */
    ["com.blank.auth.forget"](): string;
    /**
      * `Later`
      */
    ["com.blank.auth.later"](): string;
    /**
      * `Open Blank`
      */
    ["com.blank.auth.open.blank"](): string;
    /**
      * `Download app`
      */
    ["com.blank.auth.open.blank.download-app"](): string;
    /**
      * `Try again`
      */
    ["com.blank.auth.open.blank.try-again"](): string;
    /**
      * `Still have problems?`
      */
    ["com.blank.auth.open.blank.still-have-problems"](): string;
    /**
      * `Continue with Browser`
      */
    ["com.blank.auth.open.blank.continue-with-browser"](): string;
    /**
      * `Download Latest Client`
      */
    ["com.blank.auth.open.blank.download-latest-client"](): string;
    /**
      * `Open here instead`
      */
    ["com.blank.auth.open.blank.doc.open-here"](): string;
    /**
      * `Edit settings`
      */
    ["com.blank.auth.open.blank.doc.edit-settings"](): string;
    /**
      * `Requires Blank desktop app version 0.18 or later.`
      */
    ["com.blank.auth.open.blank.doc.footer-text"](): string;
    /**
      * `Please set a password of {{min}}-{{max}} characters with both letters and numbers to continue signing up with `
      */
    ["com.blank.auth.page.sent.email.subtitle"](options: Readonly<{
        min: string;
        max: string;
    }>): string;
    /**
      * `Welcome to Blank Cloud, you are almost there!`
      */
    ["com.blank.auth.page.sent.email.title"](): string;
    /**
      * `Invalid password`
      */
    ["com.blank.auth.password.error"](): string;
    /**
      * `Set password failed`
      */
    ["com.blank.auth.password.set-failed"](): string;
    /**
      * `Reset password`
      */
    ["com.blank.auth.reset.password"](): string;
    /**
      * `You will receive an email with a link to reset your password. Please check your inbox.`
      */
    ["com.blank.auth.reset.password.message"](): string;
    /**
      * `Password reset successful`
      */
    ["com.blank.auth.reset.password.page.success"](): string;
    /**
      * `Reset your Blank Cloud password`
      */
    ["com.blank.auth.reset.password.page.title"](): string;
    /**
      * `Send reset link`
      */
    ["com.blank.auth.send.reset.password.link"](): string;
    /**
      * `Send set link`
      */
    ["com.blank.auth.send.set.password.link"](): string;
    /**
      * `Send verification link`
      */
    ["com.blank.auth.send.verify.email.hint"](): string;
    /**
      * `Verification code`
      */
    ["com.blank.auth.sign.auth.code"](): string;
    /**
      * `Invalid verification code`
      */
    ["com.blank.auth.sign.auth.code.invalid"](): string;
    /**
      * `Continue with code`
      */
    ["com.blank.auth.sign.auth.code.continue"](): string;
    /**
      * `Resend code`
      */
    ["com.blank.auth.sign.auth.code.resend"](): string;
    /**
      * `Resend in {{second}}s`
      */
    ["com.blank.auth.sign.auth.code.resend.hint"](options: {
        readonly second: string;
    }): string;
    /**
      * `Sent`
      */
    ["com.blank.auth.sent"](): string;
    /**
      * `The verification link failed to be sent, please try again later.`
      */
    ["com.blank.auth.sent.change.email.fail"](): string;
    /**
      * `Verification link has been sent.`
      */
    ["com.blank.auth.sent.change.email.hint"](): string;
    /**
      * `Reset password link has been sent.`
      */
    ["com.blank.auth.sent.change.password.hint"](): string;
    /**
      * `Your password has been updated! You can sign in Blank Cloud with new password!`
      */
    ["com.blank.auth.sent.reset.password.success.message"](): string;
    /**
      * `Set password link has been sent.`
      */
    ["com.blank.auth.sent.set.password.hint"](): string;
    /**
      * `Your password has saved! You can sign in Blank Cloud with email and password!`
      */
    ["com.blank.auth.sent.set.password.success.message"](): string;
    /**
      * `Verification link has been sent.`
      */
    ["com.blank.auth.sent.verify.email.hint"](): string;
    /**
      * `Save Email`
      */
    ["com.blank.auth.set.email.save"](): string;
    /**
      * `Set password`
      */
    ["com.blank.auth.set.password"](): string;
    /**
      * `Please set a password of {{min}}-{{max}} characters with both letters and numbers to continue signing up with `
      */
    ["com.blank.auth.set.password.message"](options: Readonly<{
        min: string;
        max: string;
    }>): string;
    /**
      * `Maximum {{max}} characters`
      */
    ["com.blank.auth.set.password.message.maxlength"](options: {
        readonly max: string;
    }): string;
    /**
      * `Minimum {{min}} characters`
      */
    ["com.blank.auth.set.password.message.minlength"](options: {
        readonly min: string;
    }): string;
    /**
      * `Password set successful`
      */
    ["com.blank.auth.set.password.page.success"](): string;
    /**
      * `Set your Blank Cloud password`
      */
    ["com.blank.auth.set.password.page.title"](): string;
    /**
      * `Set a password at least {{min}} letters long`
      */
    ["com.blank.auth.set.password.placeholder"](options: {
        readonly min: string;
    }): string;
    /**
      * `Confirm password`
      */
    ["com.blank.auth.set.password.placeholder.confirm"](): string;
    /**
      * `Save password`
      */
    ["com.blank.auth.set.password.save"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.auth.sign-out.confirm-modal.cancel"](): string;
    /**
      * `Sign Out`
      */
    ["com.blank.auth.sign-out.confirm-modal.confirm"](): string;
    /**
      * `After signing out, the Cloud Workspaces associated with this account will be removed from the current device, and signing in again will add them back.`
      */
    ["com.blank.auth.sign-out.confirm-modal.description"](): string;
    /**
      * `Sign out?`
      */
    ["com.blank.auth.sign-out.confirm-modal.title"](): string;
    /**
      * `If you haven't received the email, please check your spam folder.`
      */
    ["com.blank.auth.sign.auth.code.message"](): string;
    /**
      * `Sign in with magic link`
      */
    ["com.blank.auth.sign.auth.code.send-email.sign-in"](): string;
    /**
      * `Terms of conditions`
      */
    ["com.blank.auth.sign.condition"](): string;
    /**
      * `Continue with email`
      */
    ["com.blank.auth.sign.email.continue"](): string;
    /**
      * `Invalid email`
      */
    ["com.blank.auth.sign.email.error"](): string;
    /**
      * `Enter your email address`
      */
    ["com.blank.auth.sign.email.placeholder"](): string;
    /**
      * `Sign in`
      */
    ["com.blank.auth.sign.in"](): string;
    /**
      * `Confirm your email`
      */
    ["com.blank.auth.sign.in.sent.email.subtitle"](): string;
    /**
      * `Self-Hosted`
      */
    ["com.blank.auth.sign.add-selfhosted.title"](): string;
    /**
      * `Connect to a Self-Hosted Instance`
      */
    ["com.blank.auth.sign.add-selfhosted"](): string;
    /**
      * `Server URL`
      */
    ["com.blank.auth.sign.add-selfhosted.baseurl"](): string;
    /**
      * `Connect`
      */
    ["com.blank.auth.sign.add-selfhosted.connect-button"](): string;
    /**
      * `Unable to connect to the server.`
      */
    ["com.blank.auth.sign.add-selfhosted.error"](): string;
    /**
      * `Privacy policy`
      */
    ["com.blank.auth.sign.policy"](): string;
    /**
      * `Sign up`
      */
    ["com.blank.auth.sign.up"](): string;
    /**
      * `Create your account`
      */
    ["com.blank.auth.sign.up.sent.email.subtitle"](): string;
    /**
      * `The app will automatically open or redirect to the web version. If you encounter any issues, you can also click the button below to manually open the Blank app.`
      */
    ["com.blank.auth.sign.up.success.subtitle"](): string;
    /**
      * `Your account has been created and you're now signed in!`
      */
    ["com.blank.auth.sign.up.success.title"](): string;
    /**
      * `You have successfully signed in. The app will automatically open or redirect to the web version. if you encounter any issues, you can also click the button below to  manually open the Blank app.`
      */
    ["com.blank.auth.signed.success.subtitle"](): string;
    /**
      * `You're almost there!`
      */
    ["com.blank.auth.signed.success.title"](): string;
    /**
      * `Server error, please try again later.`
      */
    ["com.blank.auth.toast.message.failed"](): string;
    /**
      * `You have been signed in, start to sync your data with Blank Cloud!`
      */
    ["com.blank.auth.toast.message.signed-in"](): string;
    /**
      * `Unable to sign in`
      */
    ["com.blank.auth.toast.title.failed"](): string;
    /**
      * `Signed in`
      */
    ["com.blank.auth.toast.title.signed-in"](): string;
    /**
      * `Your current email is {{email}}. We'll send a verification link to this email so you can confirm it belongs to you.`
      */
    ["com.blank.auth.verify.email.message"](options: {
        readonly email: string;
    }): string;
    /**
      * `Back`
      */
    ["com.blank.backButton"](): string;
    /**
      * `Your local data is stored in the browser and may be lost. Don't risk it - enable cloud now!`
      */
    ["com.blank.banner.local-warning"](): string;
    /**
      * `Blank Cloud`
      */
    ["com.blank.brand.blankCloud"](): string;
    /**
      * `Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec`
      */
    ["com.blank.calendar-date-picker.month-names"](): string;
    /**
      * `Today`
      */
    ["com.blank.calendar-date-picker.today"](): string;
    /**
      * `Su,Mo,Tu,We,Th,Fr,Sa`
      */
    ["com.blank.calendar-date-picker.week-days"](): string;
    /**
      * `Host by Blank.Pro, Save, sync, and backup all your data.`
      */
    ["com.blank.cloud-scroll-tip.caption"](): string;
    /**
      * `Blank Cloud`
      */
    ["com.blank.cloud-scroll-tip.title"](): string;
    /**
      * `Collections`
      */
    ["com.blank.cmdk.blank.category.blank.collections"](): string;
    /**
      * `Create`
      */
    ["com.blank.cmdk.blank.category.blank.creation"](): string;
    /**
      * `Edgeless`
      */
    ["com.blank.cmdk.blank.category.blank.edgeless"](): string;
    /**
      * `General`
      */
    ["com.blank.cmdk.blank.category.blank.general"](): string;
    /**
      * `Help`
      */
    ["com.blank.cmdk.blank.category.blank.help"](): string;
    /**
      * `Layout controls`
      */
    ["com.blank.cmdk.blank.category.blank.layout"](): string;
    /**
      * `Navigation`
      */
    ["com.blank.cmdk.blank.category.blank.navigation"](): string;
    /**
      * `Docs`
      */
    ["com.blank.cmdk.blank.category.blank.pages"](): string;
    /**
      * `Recent`
      */
    ["com.blank.cmdk.blank.category.blank.recent"](): string;
    /**
      * `Settings`
      */
    ["com.blank.cmdk.blank.category.blank.settings"](): string;
    /**
      * `Tags`
      */
    ["com.blank.cmdk.blank.category.blank.tags"](): string;
    /**
      * `Updates`
      */
    ["com.blank.cmdk.blank.category.blank.updates"](): string;
    /**
      * `Edgeless commands`
      */
    ["com.blank.cmdk.blank.category.editor.edgeless"](): string;
    /**
      * `Insert object`
      */
    ["com.blank.cmdk.blank.category.editor.insert-object"](): string;
    /**
      * `Doc Commands`
      */
    ["com.blank.cmdk.blank.category.editor.page"](): string;
    /**
      * `Results`
      */
    ["com.blank.cmdk.blank.category.results"](): string;
    /**
      * `Change client border style to`
      */
    ["com.blank.cmdk.blank.client-border-style.to"](): string;
    /**
      * `Change colour mode to`
      */
    ["com.blank.cmdk.blank.color-mode.to"](): string;
    /**
      * `Contact us`
      */
    ["com.blank.cmdk.blank.contact-us"](): string;
    /**
      * `Create "{{keyWord}}" doc and insert`
      */
    ["com.blank.cmdk.blank.create-new-doc-and-insert"](options: {
        readonly keyWord: string;
    }): string;
    /**
      * `New "{{keyWord}}" edgeless`
      */
    ["com.blank.cmdk.blank.create-new-edgeless-as"](options: {
        readonly keyWord: string;
    }): string;
    /**
      * `New "{{keyWord}}" page`
      */
    ["com.blank.cmdk.blank.create-new-page-as"](options: {
        readonly keyWord: string;
    }): string;
    /**
      * `Change display language to`
      */
    ["com.blank.cmdk.blank.display-language.to"](): string;
    /**
      * `Add to favourites`
      */
    ["com.blank.cmdk.blank.editor.add-to-favourites"](): string;
    /**
      * `Start presentation`
      */
    ["com.blank.cmdk.blank.editor.edgeless.presentation-start"](): string;
    /**
      * `Remove from favourites`
      */
    ["com.blank.cmdk.blank.editor.remove-from-favourites"](): string;
    /**
      * `Restore from trash`
      */
    ["com.blank.cmdk.blank.editor.restore-from-trash"](): string;
    /**
      * `Reveal doc history modal`
      */
    ["com.blank.cmdk.blank.editor.reveal-page-history-modal"](): string;
    /**
      * `This doc has been moved to the trash, you can either restore or permanently delete it.`
      */
    ["com.blank.cmdk.blank.editor.trash-footer-hint"](): string;
    /**
      * `Change font style to`
      */
    ["com.blank.cmdk.blank.font-style.to"](): string;
    /**
      * `Change full width layout to`
      */
    ["com.blank.cmdk.blank.full-width-layout.to"](): string;
    /**
      * `Change default width for new pages in to standard`
      */
    ["com.blank.cmdk.blank.default-page-width-layout.standard"](): string;
    /**
      * `Change default width for new pages in to full width`
      */
    ["com.blank.cmdk.blank.default-page-width-layout.full-width"](): string;
    /**
      * `Change current page width to standard`
      */
    ["com.blank.cmdk.blank.current-page-width-layout.standard"](): string;
    /**
      * `Change current page width to full width`
      */
    ["com.blank.cmdk.blank.current-page-width-layout.full-width"](): string;
    /**
      * `Getting started`
      */
    ["com.blank.cmdk.blank.getting-started"](): string;
    /**
      * `Import workspace`
      */
    ["com.blank.cmdk.blank.import-workspace"](): string;
    /**
      * `Insert this link to the current doc`
      */
    ["com.blank.cmdk.blank.insert-link"](): string;
    /**
      * `Collapse left sidebar`
      */
    ["com.blank.cmdk.blank.left-sidebar.collapse"](): string;
    /**
      * `Expand left sidebar`
      */
    ["com.blank.cmdk.blank.left-sidebar.expand"](): string;
    /**
      * `Go to all docs`
      */
    ["com.blank.cmdk.blank.navigation.goto-all-pages"](): string;
    /**
      * `Go to edgeless list`
      */
    ["com.blank.cmdk.blank.navigation.goto-edgeless-list"](): string;
    /**
      * `Go to page list`
      */
    ["com.blank.cmdk.blank.navigation.goto-page-list"](): string;
    /**
      * `Go to trash`
      */
    ["com.blank.cmdk.blank.navigation.goto-trash"](): string;
    /**
      * `Go to workspace`
      */
    ["com.blank.cmdk.blank.navigation.goto-workspace"](): string;
    /**
      * `Go to account settings`
      */
    ["com.blank.cmdk.blank.navigation.open-account-settings"](): string;
    /**
      * `Go to Settings`
      */
    ["com.blank.cmdk.blank.navigation.open-settings"](): string;
    /**
      * `New edgeless`
      */
    ["com.blank.cmdk.blank.new-edgeless-page"](): string;
    /**
      * `New page`
      */
    ["com.blank.cmdk.blank.new-page"](): string;
    /**
      * `New workspace`
      */
    ["com.blank.cmdk.blank.new-workspace"](): string;
    /**
      * `Change noise background on the sidebar to`
      */
    ["com.blank.cmdk.blank.noise-background-on-the-sidebar.to"](): string;
    /**
      * `Restart to upgrade`
      */
    ["com.blank.cmdk.blank.restart-to-upgrade"](): string;
    /**
      * `OFF`
      */
    ["com.blank.cmdk.blank.switch-state.off"](): string;
    /**
      * `ON`
      */
    ["com.blank.cmdk.blank.switch-state.on"](): string;
    /**
      * `Change translucent UI on the sidebar to`
      */
    ["com.blank.cmdk.blank.translucent-ui-on-the-sidebar.to"](): string;
    /**
      * `What's new`
      */
    ["com.blank.cmdk.blank.whats-new"](): string;
    /**
      * `Search docs or paste link...`
      */
    ["com.blank.cmdk.docs.placeholder"](): string;
    /**
      * `Insert links`
      */
    ["com.blank.cmdk.insert-links"](): string;
    /**
      * `No results found`
      */
    ["com.blank.cmdk.no-results"](): string;
    /**
      * `No results found for`
      */
    ["com.blank.cmdk.no-results-for"](): string;
    /**
      * `Type a command or search anything...`
      */
    ["com.blank.cmdk.placeholder"](): string;
    /**
      * `Switch to $t(com.blank.edgelessMode)`
      */
    ["com.blank.cmdk.switch-to-edgeless"](): string;
    /**
      * `Switch to $t(com.blank.pageMode)`
      */
    ["com.blank.cmdk.switch-to-page"](): string;
    /**
      * `Delete`
      */
    ["com.blank.collection-bar.action.tooltip.delete"](): string;
    /**
      * `Edit`
      */
    ["com.blank.collection-bar.action.tooltip.edit"](): string;
    /**
      * `Pin to sidebar`
      */
    ["com.blank.collection-bar.action.tooltip.pin"](): string;
    /**
      * `Unpin`
      */
    ["com.blank.collection-bar.action.tooltip.unpin"](): string;
    /**
      * `Do you want to add a document to the current collection? If it is filtered based on rules, this will add a set of included rules.`
      */
    ["com.blank.collection.add-doc.confirm.description"](): string;
    /**
      * `Add new doc to this collection`
      */
    ["com.blank.collection.add-doc.confirm.title"](): string;
    /**
      * `Doc already exists`
      */
    ["com.blank.collection.addPage.alreadyExists"](): string;
    /**
      * `Added successfully`
      */
    ["com.blank.collection.addPage.success"](): string;
    /**
      * `Add docs`
      */
    ["com.blank.collection.addPages"](): string;
    /**
      * `Add rules`
      */
    ["com.blank.collection.addRules"](): string;
    /**
      * `All collections`
      */
    ["com.blank.collection.allCollections"](): string;
    /**
      * `Empty collection`
      */
    ["com.blank.collection.emptyCollection"](): string;
    /**
      * `Collection is a smart folder where you can manually add docs or automatically add docs through rules.`
      */
    ["com.blank.collection.emptyCollectionDescription"](): string;
    /**
      * `HELP INFO`
      */
    ["com.blank.collection.helpInfo"](): string;
    /**
      * `Edit collection`
      */
    ["com.blank.collection.menu.edit"](): string;
    /**
      * `Rename`
      */
    ["com.blank.collection.menu.rename"](): string;
    /**
      * `Removed successfully`
      */
    ["com.blank.collection.removePage.success"](): string;
    /**
      * `No collections`
      */
    ["com.blank.collections.empty.message"](): string;
    /**
      * `New collection`
      */
    ["com.blank.collections.empty.new-collection-button"](): string;
    /**
      * `Collections`
      */
    ["com.blank.collections.header"](): string;
    /**
      * `Couldn't copy image`
      */
    ["com.blank.copy.asImage.notAvailable.title"](): string;
    /**
      * `The 'Copy as image' feature is only available on our desktop app. Please download and install the client to access this feature.`
      */
    ["com.blank.copy.asImage.notAvailable.message"](): string;
    /**
      * `Download Client`
      */
    ["com.blank.copy.asImage.notAvailable.action"](): string;
    /**
      * `Image copied`
      */
    ["com.blank.copy.asImage.success"](): string;
    /**
      * `Image copy failed`
      */
    ["com.blank.copy.asImage.failed"](): string;
    /**
      * `Copy as Markdown`
      */
    ["com.blank.export.copy-markdown"](): string;
    /**
      * `Copied as Markdown`
      */
    ["com.blank.export.copied-as-markdown"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.confirmModal.button.cancel"](): string;
    /**
      * `Ok`
      */
    ["com.blank.confirmModal.button.ok"](): string;
    /**
      * `Current year`
      */
    ["com.blank.currentYear"](): string;
    /**
      * `Deleting {{count}} tags cannot be undone, please proceed with caution.`
      */
    ["com.blank.delete-tags.confirm.multi-tag-description"](options: {
        readonly count: string;
    }): string;
    /**
      * `Delete tag?`
      */
    ["com.blank.delete-tags.confirm.title"](): string;
    /**
      * `{{count}} tag deleted`
    
      * - com.blank.delete-tags.count_one: `{{count}} tag deleted`
    
      * - com.blank.delete-tags.count_other: `{{count}} tags deleted`
      */
    ["com.blank.delete-tags.count"](options: {
        readonly count: string | number | bigint;
    }): string;
    /**
      * `{{count}} tag deleted`
      */
    ["com.blank.delete-tags.count_one"](options: {
        readonly count: string | number | bigint;
    }): string;
    /**
      * `{{count}} tags deleted`
      */
    ["com.blank.delete-tags.count_other"](options: {
        readonly count: string | number | bigint;
    }): string;
    /**
      * `Delete workspace from this device and optionally delete all data.`
      */
    ["com.blank.deleteLeaveWorkspace.description"](): string;
    /**
      * `Leave workspace`
      */
    ["com.blank.deleteLeaveWorkspace.leave"](): string;
    /**
      * `After you leave, you will not be able to access content within this workspace.`
      */
    ["com.blank.deleteLeaveWorkspace.leaveDescription"](): string;
    /**
      * `Docs`
      */
    ["com.blank.docs.header"](): string;
    /**
      * `Draw with a blank whiteboard`
      */
    ["com.blank.draw_with_a_blank_whiteboard"](): string;
    /**
      * `Earlier`
      */
    ["com.blank.earlier"](): string;
    /**
      * `Edgeless mode`
      */
    ["com.blank.edgelessMode"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.editCollection.button.cancel"](): string;
    /**
      * `Create`
      */
    ["com.blank.editCollection.button.create"](): string;
    /**
      * `Create collection`
      */
    ["com.blank.editCollection.createCollection"](): string;
    /**
      * `Filters`
      */
    ["com.blank.editCollection.filters"](): string;
    /**
      * `Docs`
      */
    ["com.blank.editCollection.pages"](): string;
    /**
      * `Clear selected`
      */
    ["com.blank.editCollection.pages.clear"](): string;
    /**
      * `Rename collection`
      */
    ["com.blank.editCollection.renameCollection"](): string;
    /**
      * `Rules`
      */
    ["com.blank.editCollection.rules"](): string;
    /**
      * `No results`
      */
    ["com.blank.editCollection.rules.empty.noResults"](): string;
    /**
      * `No docs meet the filtering rules`
      */
    ["com.blank.editCollection.rules.empty.noResults.tips"](): string;
    /**
      * `No rules`
      */
    ["com.blank.editCollection.rules.empty.noRules"](): string;
    /**
      * `Add selected doc`
      */
    ["com.blank.editCollection.rules.include.add"](): string;
    /**
      * `is`
      */
    ["com.blank.editCollection.rules.include.is"](): string;
    /**
      * `is-not`
      */
    ["com.blank.editCollection.rules.include.is-not"](): string;
    /**
      * `Doc`
      */
    ["com.blank.editCollection.rules.include.page"](): string;
    /**
      * `“Selected docs” refers to manually adding docs rather than automatically adding them through rule matching. You can manually add docs through the “Add selected docs” option or by dragging and dropping.`
      */
    ["com.blank.editCollection.rules.include.tips"](): string;
    /**
      * `What is "Selected docs"？`
      */
    ["com.blank.editCollection.rules.include.tipsTitle"](): string;
    /**
      * `Selected docs`
      */
    ["com.blank.editCollection.rules.include.title"](): string;
    /**
      * `Preview`
      */
    ["com.blank.editCollection.rules.preview"](): string;
    /**
      * `Reset`
      */
    ["com.blank.editCollection.rules.reset"](): string;
    /**
      * `automatically`
      */
    ["com.blank.editCollection.rules.tips.highlight"](): string;
    /**
      * `Save`
      */
    ["com.blank.editCollection.save"](): string;
    /**
      * `Save as new collection`
      */
    ["com.blank.editCollection.saveCollection"](): string;
    /**
      * `Search doc...`
      */
    ["com.blank.editCollection.search.placeholder"](): string;
    /**
      * `Untitled collection`
      */
    ["com.blank.editCollection.untitledCollection"](): string;
    /**
      * `Update collection`
      */
    ["com.blank.editCollection.updateCollection"](): string;
    /**
      * `Collection is a smart folder where you can manually add docs or automatically add docs through rules.`
      */
    ["com.blank.editCollectionName.createTips"](): string;
    /**
      * `Name`
      */
    ["com.blank.editCollectionName.name"](): string;
    /**
      * `Collection name`
      */
    ["com.blank.editCollectionName.name.placeholder"](): string;
    /**
      * `Default to Edgeless mode`
      */
    ["com.blank.editorDefaultMode.edgeless"](): string;
    /**
      * `Default to Page mode`
      */
    ["com.blank.editorDefaultMode.page"](): string;
    /**
      * `Add docs`
      */
    ["com.blank.empty.collection-detail.action.add-doc"](): string;
    /**
      * `Add rules`
      */
    ["com.blank.empty.collection-detail.action.add-rule"](): string;
    /**
      * `Collection is a smart folder where you can manually add docs or automatically add docs through rules.`
      */
    ["com.blank.empty.collection-detail.description"](): string;
    /**
      * `Empty collection`
      */
    ["com.blank.empty.collection-detail.title"](): string;
    /**
      * `Add collection`
      */
    ["com.blank.empty.collections.action.new-collection"](): string;
    /**
      * `Create your first collection here.`
      */
    ["com.blank.empty.collections.description"](): string;
    /**
      * `Collection management`
      */
    ["com.blank.empty.collections.title"](): string;
    /**
      * `New doc`
      */
    ["com.blank.empty.docs.action.new-doc"](): string;
    /**
      * `Create your first doc here.`
      */
    ["com.blank.empty.docs.all-description"](): string;
    /**
      * `Docs management`
      */
    ["com.blank.empty.docs.title"](): string;
    /**
      * `Deleted docs will appear here.`
      */
    ["com.blank.empty.docs.trash-description"](): string;
    /**
      * `Create a new tag for your documents.`
      */
    ["com.blank.empty.tags.description"](): string;
    /**
      * `Tag management`
      */
    ["com.blank.empty.tags.title"](): string;
    /**
      * `There's no doc here yet`
      */
    ["com.blank.emptyDesc"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.enableBlankCloudModal.button.cancel"](): string;
    /**
      * `Enable Cloud for {{workspaceName}}`
      */
    ["com.blank.enableBlankCloudModal.custom-server.title"](options: {
        readonly workspaceName: string;
    }): string;
    /**
      * `Choose an instance.`
      */
    ["com.blank.enableBlankCloudModal.custom-server.description"](): string;
    /**
      * `Enable Cloud`
      */
    ["com.blank.enableBlankCloudModal.custom-server.enable"](): string;
    /**
      * `Hide error`
      */
    ["com.blank.error.hide-error"](): string;
    /**
      * `Doc content is missing`
      */
    ["com.blank.error.no-page-root.title"](): string;
    /**
      * `It takes longer to load the doc content.`
      */
    ["com.blank.error.loading-timeout-error"](): string;
    /**
      * `Refetch`
      */
    ["com.blank.error.refetch"](): string;
    /**
      * `Reload Blank`
      */
    ["com.blank.error.reload"](): string;
    /**
      * `Refresh`
      */
    ["com.blank.error.retry"](): string;
    /**
      * `Something is wrong...`
      */
    ["com.blank.error.unexpected-error.title"](): string;
    /**
      * `Please request a new reset password link.`
      */
    ["com.blank.expired.page.subtitle"](): string;
    /**
      * `Please request a new link.`
      */
    ["com.blank.expired.page.new-subtitle"](): string;
    /**
      * `This link has expired...`
      */
    ["com.blank.expired.page.title"](): string;
    /**
      * `Please try it again later.`
      */
    ["com.blank.export.error.message"](): string;
    /**
      * `Export failed due to an unexpected error`
      */
    ["com.blank.export.error.title"](): string;
    /**
      * `Print`
      */
    ["com.blank.export.print"](): string;
    /**
      * `Please open the download folder to check.`
      */
    ["com.blank.export.success.message"](): string;
    /**
      * `Exported successfully`
      */
    ["com.blank.export.success.title"](): string;
    /**
      * `Add to favourites`
      */
    ["com.blank.favoritePageOperation.add"](): string;
    /**
      * `Remove from favourites`
      */
    ["com.blank.favoritePageOperation.remove"](): string;
    /**
      * `Filter`
      */
    ["com.blank.filter"](): string;
    /**
      * `Add Filter Rule`
      */
    ["com.blank.filter.add-filter"](): string;
    /**
      * `after`
      */
    ["com.blank.filter.after"](): string;
    /**
      * `before`
      */
    ["com.blank.filter.before"](): string;
    /**
      * `contains all`
      */
    ["com.blank.filter.contains all"](): string;
    /**
      * `contains one of`
      */
    ["com.blank.filter.contains one of"](): string;
    /**
      * `does not contains all`
      */
    ["com.blank.filter.does not contains all"](): string;
    /**
      * `does not contains one of`
      */
    ["com.blank.filter.does not contains one of"](): string;
    /**
      * `Empty`
      */
    ["com.blank.filter.empty-tag"](): string;
    /**
      * `Empty`
      */
    ["com.blank.filter.empty"](): string;
    /**
      * `false`
      */
    ["com.blank.filter.false"](): string;
    /**
      * `is`
      */
    ["com.blank.filter.is"](): string;
    /**
      * `is empty`
      */
    ["com.blank.filter.is empty"](): string;
    /**
      * `is not empty`
      */
    ["com.blank.filter.is not empty"](): string;
    /**
      * `Favourited`
      */
    ["com.blank.filter.is-favourited"](): string;
    /**
      * `Shared`
      */
    ["com.blank.filter.is-public"](): string;
    /**
      * `between`
      */
    ["com.blank.filter.between"](): string;
    /**
      * `last 3 days`
      */
    ["com.blank.filter.last 3 days"](): string;
    /**
      * `last 7 days`
      */
    ["com.blank.filter.last 7 days"](): string;
    /**
      * `last 15 days`
      */
    ["com.blank.filter.last 15 days"](): string;
    /**
      * `last 30 days`
      */
    ["com.blank.filter.last 30 days"](): string;
    /**
      * `this week`
      */
    ["com.blank.filter.this week"](): string;
    /**
      * `this month`
      */
    ["com.blank.filter.this month"](): string;
    /**
      * `this quarter`
      */
    ["com.blank.filter.this quarter"](): string;
    /**
      * `this year`
      */
    ["com.blank.filter.this year"](): string;
    /**
      * `last`
      */
    ["com.blank.filter.last"](): string;
    /**
      * `Save view`
      */
    ["com.blank.filter.save-view"](): string;
    /**
      * `true`
      */
    ["com.blank.filter.true"](): string;
    /**
      * `Add filter`
      */
    ["com.blank.filterList.button.add"](): string;
    /**
      * `Display`
      */
    ["com.blank.explorer.display-menu.button"](): string;
    /**
      * `Grouping`
      */
    ["com.blank.explorer.display-menu.grouping"](): string;
    /**
      * `Remove group`
      */
    ["com.blank.explorer.display-menu.grouping.remove"](): string;
    /**
      * `Ordering`
      */
    ["com.blank.explorer.display-menu.ordering"](): string;
    /**
      * `View in Page mode`
      */
    ["com.blank.header.mode-switch.page"](): string;
    /**
      * `View in Edgeless Canvas`
      */
    ["com.blank.header.mode-switch.edgeless"](): string;
    /**
      * `Add tag`
      */
    ["com.blank.header.option.add-tag"](): string;
    /**
      * `Duplicate`
      */
    ["com.blank.header.option.duplicate"](): string;
    /**
      * `Open in desktop app`
      */
    ["com.blank.header.option.open-in-desktop"](): string;
    /**
      * `View all frames`
      */
    ["com.blank.header.option.view-frame"](): string;
    /**
      * `View table of contents`
      */
    ["com.blank.header.option.view-toc"](): string;
    /**
      * `Table of contents`
      */
    ["com.blank.header.menu.toc"](): string;
    /**
      * `Contact us`
      */
    ["com.blank.helpIsland.contactUs"](): string;
    /**
      * `Getting started`
      */
    ["com.blank.helpIsland.gettingStarted"](): string;
    /**
      * `Help and feedback`
      */
    ["com.blank.helpIsland.helpAndFeedback"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.history-vision.tips-modal.cancel"](): string;
    /**
      * `Enable Blank Cloud`
      */
    ["com.blank.history-vision.tips-modal.confirm"](): string;
    /**
      * `The current workspace is a local workspace, and we do not support version history for it at the moment. You can enable Blank Cloud. This will sync the workspace with the Cloud, allowing you to use this feature.`
      */
    ["com.blank.history-vision.tips-modal.description"](): string;
    /**
      * `History vision needs Blank Cloud`
      */
    ["com.blank.history-vision.tips-modal.title"](): string;
    /**
      * `Back to doc`
      */
    ["com.blank.history.back-to-page"](): string;
    /**
      * `You are about to restore the current version of the doc to the latest version available. This action will overwrite any changes made prior to the latest version.`
      */
    ["com.blank.history.confirm-restore-modal.hint"](): string;
    /**
      * `Load more`
      */
    ["com.blank.history.confirm-restore-modal.load-more"](): string;
    /**
      * `LIMITED DOC HISTORY`
      */
    ["com.blank.history.confirm-restore-modal.plan-prompt.limited-title"](): string;
    /**
      * `HELP INFO`
      */
    ["com.blank.history.confirm-restore-modal.plan-prompt.title"](): string;
    /**
      * `Upgrade`
      */
    ["com.blank.history.confirm-restore-modal.pro-plan-prompt.upgrade"](): string;
    /**
      * `Restore`
      */
    ["com.blank.history.confirm-restore-modal.restore"](): string;
    /**
      * `This document is such a spring chicken, it hasn't sprouted a single historical sprig yet!`
      */
    ["com.blank.history.empty-prompt.description"](): string;
    /**
      * `Empty`
      */
    ["com.blank.history.empty-prompt.title"](): string;
    /**
      * `Restore current version`
      */
    ["com.blank.history.restore-current-version"](): string;
    /**
      * `Version history`
      */
    ["com.blank.history.version-history"](): string;
    /**
      * `View history version`
      */
    ["com.blank.history.view-history-version"](): string;
    /**
      * `Create into a New Workspace`
      */
    ["com.blank.import-template.dialog.createDocToNewWorkspace"](): string;
    /**
      * `Create doc to "{{workspace}}"`
      */
    ["com.blank.import-template.dialog.createDocToWorkspace"](options: {
        readonly workspace: string;
    }): string;
    /**
      * `Create doc with "{{templateName}}" template`
      */
    ["com.blank.import-template.dialog.createDocWithTemplate"](options: {
        readonly templateName: string;
    }): string;
    /**
      * `Failed to import template, please try again.`
      */
    ["com.blank.import-template.dialog.errorImport"](): string;
    /**
      * `Failed to load template, please try again.`
      */
    ["com.blank.import-template.dialog.errorLoad"](): string;
    /**
      * `Create into a New Workspace`
      */
    ["com.blank.import-clipper.dialog.createDocToNewWorkspace"](): string;
    /**
      * `Create doc to "{{workspace}}"`
      */
    ["com.blank.import-clipper.dialog.createDocToWorkspace"](options: {
        readonly workspace: string;
    }): string;
    /**
      * `Create doc from Web Clipper`
      */
    ["com.blank.import-clipper.dialog.createDocFromClipper"](): string;
    /**
      * `Failed to import content, please try again.`
      */
    ["com.blank.import-clipper.dialog.errorImport"](): string;
    /**
      * `Failed to load content, please try again.`
      */
    ["com.blank.import-clipper.dialog.errorLoad"](): string;
    /**
      * `Support Markdown/Notion`
      */
    ["com.blank.import_file"](): string;
    /**
      * `Blank workspace data`
      */
    ["com.blank.import.blank-workspace-data"](): string;
    /**
      * `Bear (.bear2bk) (Experimental)`
      */
    ["com.blank.import.bear"](): string;
    /**
      * `Import your Bear note backup. Tags will be converted to Blank tags and folders.`
      */
    ["com.blank.import.bear.tooltip"](): string;
    /**
      * `Docx`
      */
    ["com.blank.import.docx"](): string;
    /**
      * `Import your .docx file.`
      */
    ["com.blank.import.docx.tooltip"](): string;
    /**
      * `HTML`
      */
    ["com.blank.import.html-files"](): string;
    /**
      * `This is an experimental feature that is not perfect and may cause your data to be missing after import.`
      */
    ["com.blank.import.html-files.tooltip"](): string;
    /**
      * `Markdown files (.md)`
      */
    ["com.blank.import.markdown-files"](): string;
    /**
      * `Markdown with media files (.zip)`
      */
    ["com.blank.import.markdown-with-media-files"](): string;
    /**
      * `Please upload a markdown zip file with attachments, experimental function, there may be data loss.`
      */
    ["com.blank.import.markdown-with-media-files.tooltip"](): string;
    /**
      * `If you'd like to request support for additional file types, feel free to let us know on`
      */
    ["com.blank.import.modal.tip"](): string;
    /**
      * `Notion (Experimental)`
      */
    ["com.blank.import.notion"](): string;
    /**
      * `Import your Notion data. Supported import formats: HTML with subpages.`
      */
    ["com.blank.import.notion.tooltip"](): string;
    /**
      * `Obsidian Vault (Experimental)`
      */
    ["com.blank.import.obsidian"](): string;
    /**
      * `Import an Obsidian vault. Select a folder to import all notes, images, and assets with wikilinks resolved.`
      */
    ["com.blank.import.obsidian.tooltip"](): string;
    /**
      * `Snapshot`
      */
    ["com.blank.import.snapshot"](): string;
    /**
      * `Import your Blank workspace and page snapshot file.`
      */
    ["com.blank.import.snapshot.tooltip"](): string;
    /**
      * `.blank file`
      */
    ["com.blank.import.dotblankfile"](): string;
    /**
      * `Import your Blank db file (.blank)`
      */
    ["com.blank.import.dotblankfile.tooltip"](): string;
    /**
      * `Import failed, please try again.`
      */
    ["com.blank.import.status.failed.message"](): string;
    /**
      * `No file selected`
      */
    ["com.blank.import.status.failed.message.no-file-selected"](): string;
    /**
      * `Import failure`
      */
    ["com.blank.import.status.failed.title"](): string;
    /**
      * `Importing your workspace data, please wait patiently.`
      */
    ["com.blank.import.status.importing.message"](): string;
    /**
      * `Importing...`
      */
    ["com.blank.import.status.importing.title"](): string;
    /**
      * `Your document has been imported successfully, thank you for choosing Blank. Any questions please feel free to feedback to us`
      */
    ["com.blank.import.status.success.message"](): string;
    /**
      * `Import completed`
      */
    ["com.blank.import.status.success.title"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.inviteModal.button.cancel"](): string;
    /**
      * `Maybe later`
      */
    ["com.blank.issue-feedback.cancel"](): string;
    /**
      * `Create issue on GitHub`
      */
    ["com.blank.issue-feedback.confirm"](): string;
    /**
      * `Got feedback? We're all ears! Create an issue on GitHub to let us know your thoughts and suggestions`
      */
    ["com.blank.issue-feedback.description"](): string;
    /**
      * `Share your feedback on GitHub`
      */
    ["com.blank.issue-feedback.title"](): string;
    /**
      * `Journals`
      */
    ["com.blank.journal.app-sidebar-title"](): string;
    /**
      * `{{count}} more articles`
      */
    ["com.blank.journal.conflict-show-more"](options: {
        readonly count: string;
    }): string;
    /**
      * `Created`
      */
    ["com.blank.journal.created-today"](): string;
    /**
      * `You haven't created anything yet`
      */
    ["com.blank.journal.daily-count-created-empty-tips"](): string;
    /**
      * `You haven't updated anything yet`
      */
    ["com.blank.journal.daily-count-updated-empty-tips"](): string;
    /**
      * `Updated`
      */
    ["com.blank.journal.updated-today"](): string;
    /**
      * `No Journal`
      */
    ["com.blank.journal.placeholder.title"](): string;
    /**
      * `Create Daily Journal`
      */
    ["com.blank.journal.placeholder.create"](): string;
    /**
      * `Just now`
      */
    ["com.blank.just-now"](): string;
    /**
      * `Align center`
      */
    ["com.blank.keyboardShortcuts.alignCenter"](): string;
    /**
      * `Align left`
      */
    ["com.blank.keyboardShortcuts.alignLeft"](): string;
    /**
      * `Align right`
      */
    ["com.blank.keyboardShortcuts.alignRight"](): string;
    /**
      * `Append to daily note`
      */
    ["com.blank.keyboardShortcuts.appendDailyNote"](): string;
    /**
      * `Body text`
      */
    ["com.blank.keyboardShortcuts.bodyText"](): string;
    /**
      * `Bold`
      */
    ["com.blank.keyboardShortcuts.bold"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.keyboardShortcuts.cancel"](): string;
    /**
      * `Code block`
      */
    ["com.blank.keyboardShortcuts.codeBlock"](): string;
    /**
      * `Copy private link`
      */
    ["com.blank.keyboardShortcuts.copy-private-link"](): string;
    /**
      * `Connector`
      */
    ["com.blank.keyboardShortcuts.connector"](): string;
    /**
      * `Divider`
      */
    ["com.blank.keyboardShortcuts.divider"](): string;
    /**
      * `Expand/collapse sidebar`
      */
    ["com.blank.keyboardShortcuts.expandOrCollapseSidebar"](): string;
    /**
      * `Go back`
      */
    ["com.blank.keyboardShortcuts.goBack"](): string;
    /**
      * `Go forward`
      */
    ["com.blank.keyboardShortcuts.goForward"](): string;
    /**
      * `Group`
      */
    ["com.blank.keyboardShortcuts.group"](): string;
    /**
      * `Group as database`
      */
    ["com.blank.keyboardShortcuts.groupDatabase"](): string;
    /**
      * `Hand`
      */
    ["com.blank.keyboardShortcuts.hand"](): string;
    /**
      * `Heading {{number}}`
      */
    ["com.blank.keyboardShortcuts.heading"](options: {
        readonly number: string;
    }): string;
    /**
      * `Image`
      */
    ["com.blank.keyboardShortcuts.image"](): string;
    /**
      * `Increase indent`
      */
    ["com.blank.keyboardShortcuts.increaseIndent"](): string;
    /**
      * `Inline code`
      */
    ["com.blank.keyboardShortcuts.inlineCode"](): string;
    /**
      * `Italic`
      */
    ["com.blank.keyboardShortcuts.italic"](): string;
    /**
      * `Hyperlink (with selected text)`
      */
    ["com.blank.keyboardShortcuts.link"](): string;
    /**
      * `Move down`
      */
    ["com.blank.keyboardShortcuts.moveDown"](): string;
    /**
      * `Move up`
      */
    ["com.blank.keyboardShortcuts.moveUp"](): string;
    /**
      * `New doc`
      */
    ["com.blank.keyboardShortcuts.newPage"](): string;
    /**
      * `Note`
      */
    ["com.blank.keyboardShortcuts.note"](): string;
    /**
      * `Pen`
      */
    ["com.blank.keyboardShortcuts.pen"](): string;
    /**
      * `Quick search`
      */
    ["com.blank.keyboardShortcuts.quickSearch"](): string;
    /**
      * `Redo`
      */
    ["com.blank.keyboardShortcuts.redo"](): string;
    /**
      * `Reduce indent`
      */
    ["com.blank.keyboardShortcuts.reduceIndent"](): string;
    /**
      * `Select`
      */
    ["com.blank.keyboardShortcuts.select"](): string;
    /**
      * `Select all`
      */
    ["com.blank.keyboardShortcuts.selectAll"](): string;
    /**
      * `Shape`
      */
    ["com.blank.keyboardShortcuts.shape"](): string;
    /**
      * `Strikethrough`
      */
    ["com.blank.keyboardShortcuts.strikethrough"](): string;
    /**
      * `Check keyboard shortcuts quickly`
      */
    ["com.blank.keyboardShortcuts.subtitle"](): string;
    /**
      * `Switch view`
      */
    ["com.blank.keyboardShortcuts.switch"](): string;
    /**
      * `Text`
      */
    ["com.blank.keyboardShortcuts.text"](): string;
    /**
      * `Keyboard shortcuts`
      */
    ["com.blank.keyboardShortcuts.title"](): string;
    /**
      * `Ungroup`
      */
    ["com.blank.keyboardShortcuts.unGroup"](): string;
    /**
      * `Underline`
      */
    ["com.blank.keyboardShortcuts.underline"](): string;
    /**
      * `Undo`
      */
    ["com.blank.keyboardShortcuts.undo"](): string;
    /**
      * `Zoom in`
      */
    ["com.blank.keyboardShortcuts.zoomIn"](): string;
    /**
      * `Zoom out`
      */
    ["com.blank.keyboardShortcuts.zoomOut"](): string;
    /**
      * `Zoom to 100%`
      */
    ["com.blank.keyboardShortcuts.zoomTo100"](): string;
    /**
      * `Zoom to fit`
      */
    ["com.blank.keyboardShortcuts.zoomToFit"](): string;
    /**
      * `Zoom to selection`
      */
    ["com.blank.keyboardShortcuts.zoomToSelection"](): string;
    /**
      * `Last 30 days`
      */
    ["com.blank.last30Days"](): string;
    /**
      * `Last 7 days`
      */
    ["com.blank.last7Days"](): string;
    /**
      * `Last month`
      */
    ["com.blank.lastMonth"](): string;
    /**
      * `Last week`
      */
    ["com.blank.lastWeek"](): string;
    /**
      * `Last year`
      */
    ["com.blank.lastYear"](): string;
    /**
      * `Loading`
      */
    ["com.blank.loading"](): string;
    /**
      * `Loading document content, please wait a moment.`
      */
    ["com.blank.loading.description"](): string;
    /**
      * `Rename`
      */
    ["com.blank.menu.rename"](): string;
    /**
      * `No results found`
      */
    ["com.blank.mobile.search.empty"](): string;
    /**
      * `App version`
      */
    ["com.blank.mobile.setting.about.appVersion"](): string;
    /**
      * `Editor version`
      */
    ["com.blank.mobile.setting.about.editorVersion"](): string;
    /**
      * `About`
      */
    ["com.blank.mobile.setting.about.title"](): string;
    /**
      * `Font style`
      */
    ["com.blank.mobile.setting.appearance.font"](): string;
    /**
      * `Display language`
      */
    ["com.blank.mobile.setting.appearance.language"](): string;
    /**
      * `Color mode`
      */
    ["com.blank.mobile.setting.appearance.theme"](): string;
    /**
      * `Appearance`
      */
    ["com.blank.mobile.setting.appearance.title"](): string;
    /**
      * `Settings`
      */
    ["com.blank.mobile.setting.header-title"](): string;
    /**
      * `Star us on GitHub`
      */
    ["com.blank.mobile.setting.others.github"](): string;
    /**
      * `Discord Group`
      */
    ["com.blank.mobile.setting.others.discord"](): string;
    /**
      * `Privacy`
      */
    ["com.blank.mobile.setting.others.privacy"](): string;
    /**
      * `Terms of use`
      */
    ["com.blank.mobile.setting.others.terms"](): string;
    /**
      * `Privacy & others`
      */
    ["com.blank.mobile.setting.others.title"](): string;
    /**
      * `GitHub`
      */
    ["com.blank.mobile.setting.others.website"](): string;
    /**
      * `Delete my account`
      */
    ["com.blank.mobile.setting.others.delete-account"](): string;
    /**
      * `Want to keep data local?`
      */
    ["com.blank.mobile.sign-in.skip.hint"](): string;
    /**
      * `Start Blank without an account`
      */
    ["com.blank.mobile.sign-in.skip.link"](): string;
    /**
      * `Older than a month`
      */
    ["com.blank.moreThan30Days"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.moveToTrash.confirmModal.cancel"](): string;
    /**
      * `Delete`
      */
    ["com.blank.moveToTrash.confirmModal.confirm"](): string;
    /**
      * `{{title}} will be moved to trash`
      */
    ["com.blank.moveToTrash.confirmModal.description"](options: {
        readonly title: string;
    }): string;
    /**
      * `{{ number }} docs will be moved to Trash`
      */
    ["com.blank.moveToTrash.confirmModal.description.multiple"](options: {
        readonly number: string;
    }): string;
    /**
      * `Delete doc?`
      */
    ["com.blank.moveToTrash.confirmModal.title"](): string;
    /**
      * `Delete {{ number }} docs?`
      */
    ["com.blank.moveToTrash.confirmModal.title.multiple"](options: {
        readonly number: string;
    }): string;
    /**
      * `Move to trash`
      */
    ["com.blank.moveToTrash.title"](): string;
    /**
      * `New tab`
      */
    ["com.blank.multi-tab.new-tab"](): string;
    /**
      * `Enabling Blank Cloud allows you to synchronise and backup data, as well as support multi-user collaboration and content publishing.`
      */
    ["com.blank.nameWorkspace.blank-cloud.description"](): string;
    /**
      * `Sync across devices with Blank Cloud`
      */
    ["com.blank.nameWorkspace.blank-cloud.title"](): string;
    /**
      * `If you want the workspace to be stored locally, you can download the desktop client.`
      */
    ["com.blank.nameWorkspace.blank-cloud.web-tips"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.nameWorkspace.button.cancel"](): string;
    /**
      * `Create`
      */
    ["com.blank.nameWorkspace.button.create"](): string;
    /**
      * `A workspace is your virtual space to capture, create and plan as just one person or together as a team.`
      */
    ["com.blank.nameWorkspace.description"](): string;
    /**
      * `Set a workspace name`
      */
    ["com.blank.nameWorkspace.placeholder"](): string;
    /**
      * `Workspace name`
      */
    ["com.blank.nameWorkspace.subtitle.workspace-name"](): string;
    /**
      * `Workspace type`
      */
    ["com.blank.nameWorkspace.subtitle.workspace-type"](): string;
    /**
      * `Name your workspace`
      */
    ["com.blank.nameWorkspace.title"](): string;
    /**
      * `New page`
      */
    ["com.blank.new.page-mode"](): string;
    /**
      * `New edgeless`
      */
    ["com.blank.new_edgeless"](): string;
    /**
      * `Import`
      */
    ["com.blank.new_import"](): string;
    /**
      * `Next week`
      */
    ["com.blank.nextWeek"](): string;
    /**
      * `Back home`
      */
    ["com.blank.notFoundPage.backButton"](): string;
    /**
      * `Page not found`
      */
    ["com.blank.notFoundPage.title"](): string;
    /**
      * `Blank Community`
      */
    ["com.blank.other-page.nav.blank-community"](): string;
    /**
      * `Blog`
      */
    ["com.blank.other-page.nav.blog"](): string;
    /**
      * `Contact us`
      */
    ["com.blank.other-page.nav.contact-us"](): string;
    /**
      * `Download app`
      */
    ["com.blank.other-page.nav.download-app"](): string;
    /**
      * `GitHub`
      */
    ["com.blank.other-page.nav.github"](): string;
    /**
      * `Releases`
      */
    ["com.blank.other-page.nav.releases"](): string;
    /**
      * `Issues`
      */
    ["com.blank.other-page.nav.issues"](): string;
    /**
      * `Official website`
      */
    ["com.blank.other-page.nav.official-website"](): string;
    /**
      * `Open Blank`
      */
    ["com.blank.other-page.nav.open-blank"](): string;
    /**
      * `Add linked doc`
      */
    ["com.blank.page-operation.add-linked-page"](): string;
    /**
      * `{{ count }} more properties`
      */
    ["com.blank.page-properties.more-property.more"](options: {
        readonly count: string;
    }): string;
    /**
      * `{{ count }} more property`
      */
    ["com.blank.page-properties.more-property.one"](options: {
        readonly count: string;
    }): string;
    /**
      * `hide {{ count }} property`
      */
    ["com.blank.page-properties.hide-property.one"](options: {
        readonly count: string;
    }): string;
    /**
      * `hide {{ count }} properties`
      */
    ["com.blank.page-properties.hide-property.more"](options: {
        readonly count: string;
    }): string;
    /**
      * `Add property`
      */
    ["com.blank.page-properties.add-property"](): string;
    /**
      * `Create property`
      */
    ["com.blank.page-properties.add-property.menu.create"](): string;
    /**
      * `Properties`
      */
    ["com.blank.page-properties.add-property.menu.header"](): string;
    /**
      * `Config properties`
      */
    ["com.blank.page-properties.config-properties"](): string;
    /**
      * `Backlinks`
      */
    ["com.blank.page-properties.backlinks"](): string;
    /**
      * `Type`
      */
    ["com.blank.page-properties.create-property.menu.header"](): string;
    /**
      * `Added`
      */
    ["com.blank.page-properties.create-property.added"](): string;
    /**
      * `Icons`
      */
    ["com.blank.page-properties.icons"](): string;
    /**
      * `Local user`
      */
    ["com.blank.page-properties.local-user"](): string;
    /**
      * `Outgoing links`
      */
    ["com.blank.page-properties.outgoing-links"](): string;
    /**
      * `Info`
      */
    ["com.blank.page-properties.page-info"](): string;
    /**
      * `View Info`
      */
    ["com.blank.page-properties.page-info.view"](): string;
    /**
      * `No Record`
      */
    ["com.blank.page-properties.property-user-avatar-no-record"](): string;
    /**
      * `Local User`
      */
    ["com.blank.page-properties.property-user-local"](): string;
    /**
      * `Empty`
      */
    ["com.blank.page-properties.property-value-placeholder"](): string;
    /**
      * `Always hide`
      */
    ["com.blank.page-properties.property.always-hide"](): string;
    /**
      * `Always show`
      */
    ["com.blank.page-properties.property.always-show"](): string;
    /**
      * `Checkbox`
      */
    ["com.blank.page-properties.property.checkbox"](): string;
    /**
      * `Created by`
      */
    ["com.blank.page-properties.property.createdBy"](): string;
    /**
      * `Date`
      */
    ["com.blank.page-properties.property.date"](): string;
    /**
      * `Hide in view`
      */
    ["com.blank.page-properties.property.hide-in-view"](): string;
    /**
      * `Hide in view when empty`
      */
    ["com.blank.page-properties.property.hide-in-view-when-empty"](): string;
    /**
      * `Hide when empty`
      */
    ["com.blank.page-properties.property.hide-when-empty"](): string;
    /**
      * `Number`
      */
    ["com.blank.page-properties.property.number"](): string;
    /**
      * `Progress`
      */
    ["com.blank.page-properties.property.progress"](): string;
    /**
      * `Remove property`
      */
    ["com.blank.page-properties.property.remove-property"](): string;
    /**
      * `Required`
      */
    ["com.blank.page-properties.property.required"](): string;
    /**
      * `Show in view`
      */
    ["com.blank.page-properties.property.show-in-view"](): string;
    /**
      * `Tags`
      */
    ["com.blank.page-properties.property.tags"](): string;
    /**
      * `Doc mode`
      */
    ["com.blank.page-properties.property.docPrimaryMode"](): string;
    /**
      * `Text`
      */
    ["com.blank.page-properties.property.text"](): string;
    /**
      * `Journal`
      */
    ["com.blank.page-properties.property.journal"](): string;
    /**
      * `Duplicated`
      */
    ["com.blank.page-properties.property.journal-duplicated"](): string;
    /**
      * `Remove journal mark`
      */
    ["com.blank.page-properties.property.journal-remove"](): string;
    /**
      * `Last edited by`
      */
    ["com.blank.page-properties.property.updatedBy"](): string;
    /**
      * `Created`
      */
    ["com.blank.page-properties.property.createdAt"](): string;
    /**
      * `Updated`
      */
    ["com.blank.page-properties.property.updatedAt"](): string;
    /**
      * `Edgeless theme`
      */
    ["com.blank.page-properties.property.edgelessTheme"](): string;
    /**
      * `Page width`
      */
    ["com.blank.page-properties.property.pageWidth"](): string;
    /**
      * `Template`
      */
    ["com.blank.page-properties.property.template"](): string;
    /**
      * `Add relevant identifiers or categories to the doc. Useful for organizing content, improving searchability, and grouping related docs together.`
      */
    ["com.blank.page-properties.property.tags.tooltips"](): string;
    /**
      * `Indicates that this doc is a journal entry or daily note. Facilitates easy capture of ideas, quick logging of thoughts, and ongoing personal reflection.`
      */
    ["com.blank.page-properties.property.journal.tooltips"](): string;
    /**
      * `Use a checkbox to indicate whether a condition is true or false. Useful for confirming options, toggling features, or tracking task states.`
      */
    ["com.blank.page-properties.property.checkbox.tooltips"](): string;
    /**
      * `Use a date field to select or display a specific date. Useful for scheduling, setting deadlines, or recording important events.`
      */
    ["com.blank.page-properties.property.date.tooltips"](): string;
    /**
      * `Upload images to display or manage them. Useful for showcasing visual content, adding illustrations, or organizing a gallery.`
      */
    ["com.blank.page-properties.property.image.tooltips"](): string;
    /**
      * `Select one or more options. Useful for categorizing items, filtering data, or managing tags.`
      */
    ["com.blank.page-properties.property.multiSelect.tooltips"](): string;
    /**
      * `Enter a numeric value. Useful for quantities, measurements, or ranking items.`
      */
    ["com.blank.page-properties.property.number.tooltips"](): string;
    /**
      * `Set a progress value between 0 and 100. Useful for tracking completion status, visualizing progress, or managing goals.`
      */
    ["com.blank.page-properties.property.progress.tooltips"](): string;
    /**
      * `Choose one option. Useful for selecting a single preference, categorizing items, or making decisions.`
      */
    ["com.blank.page-properties.property.select.tooltips"](): string;
    /**
      * `Enter a link to websites or Blank docs. Useful for connecting to external resources and referencing internal docs.`
      */
    ["com.blank.page-properties.property.link.tooltips"](): string;
    /**
      * `Enter text. Useful for descriptions, comments, notes, or any other free-form text input.`
      */
    ["com.blank.page-properties.property.text.tooltips"](): string;
    /**
      * `Displays the author of the current doc. Useful for tracking doc ownership, accountability, and collaboration.`
      */
    ["com.blank.page-properties.property.createdBy.tooltips"](): string;
    /**
      * `Displays the last editor of the current doc. Useful for tracking recent changes.`
      */
    ["com.blank.page-properties.property.updatedBy.tooltips"](): string;
    /**
      * `Record the last modification timestamp. Useful for tracking changes, identifying recent updates, or monitoring content freshness.`
      */
    ["com.blank.page-properties.property.updatedAt.tooltips"](): string;
    /**
      * `Track when a doc was first created. Useful for maintaining record history, sorting by creation date, or auditing content chronologically.`
      */
    ["com.blank.page-properties.property.createdAt.tooltips"](): string;
    /**
      * `Select the doc mode from Page Mode, Edgeless Mode, or Auto. Useful for choosing the best display for your content.`
      */
    ["com.blank.page-properties.property.docPrimaryMode.tooltips"](): string;
    /**
      * `Select the doc theme from Light, Dark, or System. Useful for precise control over content viewing style.`
      */
    ["com.blank.page-properties.property.edgelessTheme.tooltips"](): string;
    /**
      * `Control the width of this page to fit content display needs.`
      */
    ["com.blank.page-properties.property.pageWidth.tooltips"](): string;
    /**
      * `Mark this doc as a template, which can be used to create new docs.`
      */
    ["com.blank.page-properties.property.template.tooltips"](): string;
    /**
      * `Created by {{userName}}`
      */
    ["com.blank.page-properties.property.createdBy.tip"](options: {
        readonly userName: string;
    }): string;
    /**
      * `Last edited by {{userName}}`
      */
    ["com.blank.page-properties.property.updatedBy.tip"](options: {
        readonly userName: string;
    }): string;
    /**
      * `Properties`
      */
    ["com.blank.propertySidebar.property-list.section"](): string;
    /**
      * `Add more properties`
      */
    ["com.blank.propertySidebar.add-more.section"](): string;
    /**
      * `customize properties`
      */
    ["com.blank.page-properties.settings.title"](): string;
    /**
      * `Open tag page`
      */
    ["com.blank.page-properties.tags.open-tags-page"](): string;
    /**
      * `Select tag or create one`
      */
    ["com.blank.page-properties.tags.selector-header-title"](): string;
    /**
      * `Display`
      */
    ["com.blank.page.display"](): string;
    /**
      * `Display properties`
      */
    ["com.blank.page.display.display-properties"](): string;
    /**
      * `Body notes`
      */
    ["com.blank.page.display.display-properties.body-notes"](): string;
    /**
      * `Grouping`
      */
    ["com.blank.page.display.grouping"](): string;
    /**
      * `Favourites`
      */
    ["com.blank.page.display.grouping.group-by-favourites"](): string;
    /**
      * `Tag`
      */
    ["com.blank.page.display.grouping.group-by-tag"](): string;
    /**
      * `Untagged`
      */
    ["com.blank.page.display.grouping.group-by-tag.untagged"](): string;
    /**
      * `No grouping`
      */
    ["com.blank.page.display.grouping.no-grouping"](): string;
    /**
      * `List option`
      */
    ["com.blank.page.display.list-option"](): string;
    /**
      * `Clear selection`
      */
    ["com.blank.page.group-header.clear"](): string;
    /**
      * `Favourited`
      */
    ["com.blank.page.group-header.favourited"](): string;
    /**
      * `Not favourited`
      */
    ["com.blank.page.group-header.not-favourited"](): string;
    /**
      * `Select all`
      */
    ["com.blank.page.group-header.select-all"](): string;
    /**
      * `Created by {{name}}`
      */
    ["com.blank.page.toolbar.created_by"](options: {
        readonly name: string;
    }): string;
    /**
      * `Doc mode`
      */
    ["com.blank.pageMode"](): string;
    /**
      * `all`
      */
    ["com.blank.pageMode.all"](): string;
    /**
      * `Edgeless`
      */
    ["com.blank.pageMode.edgeless"](): string;
    /**
      * `Page`
      */
    ["com.blank.pageMode.page"](): string;
    /**
      * `Congratulations on your successful purchase of Blank AI! You're now empowered to refine your content, generate images, and craft comprehensive mindmaps directly within Blank AI, dramatically enhancing your productivity.`
      */
    ["com.blank.payment.ai-upgrade-success-page.text"](): string;
    /**
      * `Purchase successful!`
      */
    ["com.blank.payment.ai-upgrade-success-page.title"](): string;
    /**
      * `Cancel subscription`
      */
    ["com.blank.payment.ai.action.cancel.button-label"](): string;
    /**
      * `Keep Blank AI`
      */
    ["com.blank.payment.ai.action.cancel.confirm.cancel-text"](): string;
    /**
      * `Cancel subscription`
      */
    ["com.blank.payment.ai.action.cancel.confirm.confirm-text"](): string;
    /**
      * `If you end your subscription now, you can still use Blank AI until the end of this billing period.`
      */
    ["com.blank.payment.ai.action.cancel.confirm.description"](): string;
    /**
      * `Cancel subscription`
      */
    ["com.blank.payment.ai.action.cancel.confirm.title"](): string;
    /**
      * `Login`
      */
    ["com.blank.payment.ai.action.login.button-label"](): string;
    /**
      * `Resume`
      */
    ["com.blank.payment.ai.action.resume.button-label"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.payment.ai.action.resume.confirm.cancel-text"](): string;
    /**
      * `Confirm`
      */
    ["com.blank.payment.ai.action.resume.confirm.confirm-text"](): string;
    /**
      * `Are you sure you want to resume the subscription for Blank AI? This means your payment method will be charged automatically at the end of each billing cycle, starting from the next billing cycle.`
      */
    ["com.blank.payment.ai.action.resume.confirm.description"](): string;
    /**
      * `You will be charged in the next billing cycle.`
      */
    ["com.blank.payment.ai.action.resume.confirm.notify.msg"](): string;
    /**
      * `Subscription updated`
      */
    ["com.blank.payment.ai.action.resume.confirm.notify.title"](): string;
    /**
      * `Resume auto-renewal?`
      */
    ["com.blank.payment.ai.action.resume.confirm.title"](): string;
    /**
      * `Write with you`
      */
    ["com.blank.payment.ai.benefit.g1"](): string;
    /**
      * `Create quality content from sentences to articles on topics you need`
      */
    ["com.blank.payment.ai.benefit.g1-1"](): string;
    /**
      * `Rewrite like the professionals`
      */
    ["com.blank.payment.ai.benefit.g1-2"](): string;
    /**
      * `Change the tones / fix spelling & grammar`
      */
    ["com.blank.payment.ai.benefit.g1-3"](): string;
    /**
      * `Draw with you`
      */
    ["com.blank.payment.ai.benefit.g2"](): string;
    /**
      * `Visualize your mind, magically`
      */
    ["com.blank.payment.ai.benefit.g2-1"](): string;
    /**
      * `Turn your outline into beautiful, engaging presentations`
      */
    ["com.blank.payment.ai.benefit.g2-2"](): string;
    /**
      * `Summarize your content into structured mind-map`
      */
    ["com.blank.payment.ai.benefit.g2-3"](): string;
    /**
      * `Plan with you`
      */
    ["com.blank.payment.ai.benefit.g3"](): string;
    /**
      * `Memorize and tidy up your knowledge`
      */
    ["com.blank.payment.ai.benefit.g3-1"](): string;
    /**
      * `Auto-sorting and auto-tagging`
      */
    ["com.blank.payment.ai.benefit.g3-2"](): string;
    /**
      * `Open source & Privacy ensured`
      */
    ["com.blank.payment.ai.benefit.g3-3"](): string;
    /**
      * `You have purchased Blank AI. The expiration date is {{end}}.`
      */
    ["com.blank.payment.ai.billing-tip.end-at"](options: {
        readonly end: string;
    }): string;
    /**
      * `You have purchased Blank AI. The next payment date is {{due}}.`
      */
    ["com.blank.payment.ai.billing-tip.next-bill-at"](options: {
        readonly due: string;
    }): string;
    /**
      * `Your recent payment failed, the next payment date is {{due}}.`
      */
    ["com.blank.payment.billing-tip.past-due"](options: {
        readonly due: string;
    }): string;
    /**
      * `You are currently on the Free plan.`
      */
    ["com.blank.payment.ai.pricing-plan.caption-free"](): string;
    /**
      * `You have purchased Blank AI`
      */
    ["com.blank.payment.ai.pricing-plan.caption-purchased"](): string;
    /**
      * `Learn about Blank AI`
      */
    ["com.blank.payment.ai.pricing-plan.learn"](): string;
    /**
      * `Blank AI`
      */
    ["com.blank.payment.ai.pricing-plan.title"](): string;
    /**
      * `Turn all your ideas into reality`
      */
    ["com.blank.payment.ai.pricing-plan.title-caption-1"](): string;
    /**
      * `A true multimodal AI copilot.`
      */
    ["com.blank.payment.ai.pricing-plan.title-caption-2"](): string;
    /**
      * `Billed annually`
      */
    ["com.blank.payment.ai.subscribe.billed-annually"](): string;
    /**
      * `You have purchased Blank AI.`
      */
    ["com.blank.payment.ai.usage-description-purchased"](): string;
    /**
      * `Blank AI usage`
      */
    ["com.blank.payment.ai.usage-title"](): string;
    /**
      * `Change plan`
      */
    ["com.blank.payment.ai.usage.change-button-label"](): string;
    /**
      * `Purchase`
      */
    ["com.blank.payment.ai.usage.purchase-button-label"](): string;
    /**
      * `Times used`
      */
    ["com.blank.payment.ai.usage.used-caption"](): string;
    /**
      * `{{used}}/{{limit}} times`
      */
    ["com.blank.payment.ai.usage.used-detail"](options: Readonly<{
        used: string;
        limit: string;
    }>): string;
    /**
      * `Active`
      */
    ["com.blank.payment.subscription-status.active"](): string;
    /**
      * `Past-due bill`
      */
    ["com.blank.payment.subscription-status.past-due"](): string;
    /**
      * `Trialing`
      */
    ["com.blank.payment.subscription-status.trialing"](): string;
    /**
      * `Unlimited local workspaces`
      */
    ["com.blank.payment.benefit-1"](): string;
    /**
      * `Unlimited login devices`
      */
    ["com.blank.payment.benefit-2"](): string;
    /**
      * `Unlimited blocks`
      */
    ["com.blank.payment.benefit-3"](): string;
    /**
      * `{{capacity}} of cloud storage`
      */
    ["com.blank.payment.benefit-4"](options: {
        readonly capacity: string;
    }): string;
    /**
      * `{{capacity}} of maximum file size`
      */
    ["com.blank.payment.benefit-5"](options: {
        readonly capacity: string;
    }): string;
    /**
      * `Number of members per workspace ≤ {{capacity}}`
      */
    ["com.blank.payment.benefit-6"](options: {
        readonly capacity: string;
    }): string;
    /**
      * `{{capacity}}-days version history`
      */
    ["com.blank.payment.benefit-7"](options: {
        readonly capacity: string;
    }): string;
    /**
      * `Blank AI`
      */
    ["com.blank.payment.billing-setting.ai-plan"](): string;
    /**
      * `Purchase`
      */
    ["com.blank.payment.billing-setting.ai.purchase"](): string;
    /**
      * `Start free trial`
      */
    ["com.blank.payment.billing-setting.ai.start-free-trial"](): string;
    /**
      * `One-time payment`
      */
    ["com.blank.payment.billing-setting.believer.price-caption"](): string;
    /**
      * `Blank Cloud`
      */
    ["com.blank.payment.billing-setting.believer.title"](): string;
    /**
      * `Cancel subscription`
      */
    ["com.blank.payment.billing-setting.cancel-subscription"](): string;
    /**
      * `Once you canceled subscription you will no longer enjoy the plan benefits.`
      */
    ["com.blank.payment.billing-setting.cancel-subscription.description"](): string;
    /**
      * `Change plan`
      */
    ["com.blank.payment.billing-setting.change-plan"](): string;
    /**
      * `Blank Cloud`
      */
    ["com.blank.payment.billing-setting.current-plan"](): string;
    /**
      * `Expiration date`
      */
    ["com.blank.payment.billing-setting.expiration-date"](): string;
    /**
      * `Your subscription is valid until {{expirationDate}}`
      */
    ["com.blank.payment.billing-setting.expiration-date.description"](options: {
        readonly expirationDate: string;
    }): string;
    /**
      * `Billing history`
      */
    ["com.blank.payment.billing-setting.history"](): string;
    /**
      * `Information`
      */
    ["com.blank.payment.billing-setting.information"](): string;
    /**
      * `month`
      */
    ["com.blank.payment.billing-setting.month"](): string;
    /**
      * `There are no invoices to display.`
      */
    ["com.blank.payment.billing-setting.no-invoice"](): string;
    /**
      * `Paid`
      */
    ["com.blank.payment.billing-setting.paid"](): string;
    /**
      * `Manage payment details`
      */
    ["com.blank.payment.billing-setting.payment-method"](): string;
    /**
      * `View future and past invoices, update billing information, and change payment methods. Provided by Stripe.`
      */
    ["com.blank.payment.billing-setting.payment-method.description"](): string;
    /**
      * `Go`
      */
    ["com.blank.payment.billing-setting.payment-method.go"](): string;
    /**
      * `Renew date`
      */
    ["com.blank.payment.billing-setting.renew-date"](): string;
    /**
      * `Next billing date: {{renewDate}}`
      */
    ["com.blank.payment.billing-setting.renew-date.description"](options: {
        readonly renewDate: string;
    }): string;
    /**
      * `Due date`
      */
    ["com.blank.payment.billing-setting.due-date"](): string;
    /**
      * `Your subscription will end on {{dueDate}}`
      */
    ["com.blank.payment.billing-setting.due-date.description"](options: {
        readonly dueDate: string;
    }): string;
    /**
      * `Resume`
      */
    ["com.blank.payment.billing-setting.resume-subscription"](): string;
    /**
      * `Manage your billing information and invoices`
      */
    ["com.blank.payment.billing-setting.subtitle"](): string;
    /**
      * `Billing`
      */
    ["com.blank.payment.billing-setting.title"](): string;
    /**
      * `Update`
      */
    ["com.blank.payment.billing-setting.update"](): string;
    /**
      * `Upgrade`
      */
    ["com.blank.payment.billing-setting.upgrade"](): string;
    /**
      * `View invoice`
      */
    ["com.blank.payment.billing-setting.view-invoice"](): string;
    /**
      * `year`
      */
    ["com.blank.payment.billing-setting.year"](): string;
    /**
      * `Please tell us more about your use case, to make Blank better.`
      */
    ["com.blank.payment.billing-type-form.description"](): string;
    /**
      * `Go`
      */
    ["com.blank.payment.billing-type-form.go"](): string;
    /**
      * `Tell us your use case`
      */
    ["com.blank.payment.billing-type-form.title"](): string;
    /**
      * `You have reached the limit`
      */
    ["com.blank.payment.blob-limit.title"](): string;
    /**
      * `Book a demo`
      */
    ["com.blank.payment.book-a-demo"](): string;
    /**
      * `Buy Pro`
      */
    ["com.blank.payment.buy-pro"](): string;
    /**
      * `Change to {{to}} Billing`
      */
    ["com.blank.payment.change-to"](options: {
        readonly to: string;
    }): string;
    /**
      * `Include in FOSS`
      */
    ["com.blank.payment.cloud.free.benefit.g1"](): string;
    /**
      * `Unlimited local workspaces`
      */
    ["com.blank.payment.cloud.free.benefit.g1-1"](): string;
    /**
      * `Unlimited use and customization`
      */
    ["com.blank.payment.cloud.free.benefit.g1-2"](): string;
    /**
      * `Unlimited doc and edgeless editing`
      */
    ["com.blank.payment.cloud.free.benefit.g1-3"](): string;
    /**
      * `Include in Basic`
      */
    ["com.blank.payment.cloud.free.benefit.g2"](): string;
    /**
      * `10 GB of cloud storage.`
      */
    ["com.blank.payment.cloud.free.benefit.g2-1"](): string;
    /**
      * `10 MB of maximum file size.`
      */
    ["com.blank.payment.cloud.free.benefit.g2-2"](): string;
    /**
      * `Up to 3 members per workspace.`
      */
    ["com.blank.payment.cloud.free.benefit.g2-3"](): string;
    /**
      * `7-days cloud time machine file version history.`
      */
    ["com.blank.payment.cloud.free.benefit.g2-4"](): string;
    /**
      * `Up to 3 login devices.`
      */
    ["com.blank.payment.cloud.free.benefit.g2-5"](): string;
    /**
      * `Local Editor under MIT license.`
      */
    ["com.blank.payment.cloud.free.description"](): string;
    /**
      * `Local FOSS + Cloud Basic`
      */
    ["com.blank.payment.cloud.free.name"](): string;
    /**
      * `Free forever`
      */
    ["com.blank.payment.cloud.free.title"](): string;
    /**
      * `Included in Pro plan`
      */
    ["com.blank.payment.cloud.onetime.included"](): string;
    /**
      * `Included in Believer plan`
      */
    ["com.blank.payment.cloud.lifetime.included"](): string;
    /**
      * `We host, no technical setup required.`
      */
    ["com.blank.payment.cloud.pricing-plan.select.caption"](): string;
    /**
      * `Hosted by Blank.Pro`
      */
    ["com.blank.payment.cloud.pricing-plan.select.title"](): string;
    /**
      * `Billed annually`
      */
    ["com.blank.payment.cloud.pricing-plan.toggle-billed-yearly"](): string;
    /**
      * `Saving {{discount}}%`
      */
    ["com.blank.payment.cloud.pricing-plan.toggle-discount"](options: {
        readonly discount: string;
    }): string;
    /**
      * `Annually`
      */
    ["com.blank.payment.cloud.pricing-plan.toggle-yearly"](): string;
    /**
      * `Include in Pro`
      */
    ["com.blank.payment.cloud.pro.benefit.g1"](): string;
    /**
      * `Everything in Blank FOSS & Basic.`
      */
    ["com.blank.payment.cloud.pro.benefit.g1-1"](): string;
    /**
      * `100 GB of cloud storage.`
      */
    ["com.blank.payment.cloud.pro.benefit.g1-2"](): string;
    /**
      * `100 MB of maximum file size.`
      */
    ["com.blank.payment.cloud.pro.benefit.g1-3"](): string;
    /**
      * `Up to 10 members per workspace.`
      */
    ["com.blank.payment.cloud.pro.benefit.g1-4"](): string;
    /**
      * `30-days cloud time machine file version history.`
      */
    ["com.blank.payment.cloud.pro.benefit.g1-5"](): string;
    /**
      * `Add comments on Doc and Edgeless.`
      */
    ["com.blank.payment.cloud.pro.benefit.g1-6"](): string;
    /**
      * `Community support.`
      */
    ["com.blank.payment.cloud.pro.benefit.g1-7"](): string;
    /**
      * `Real-time syncing & collaboration for more people.`
      */
    ["com.blank.payment.cloud.pro.benefit.g1-8"](): string;
    /**
      * `Granular edit access to docs.`
      */
    ["com.blank.payment.cloud.pro.benefit.g1-9"](): string;
    /**
      * `For family and small teams.`
      */
    ["com.blank.payment.cloud.pro.description"](): string;
    /**
      * `Pro`
      */
    ["com.blank.payment.cloud.pro.name"](): string;
    /**
      * `annually`
      */
    ["com.blank.payment.cloud.pro.title.billed-yearly"](): string;
    /**
      * `{{price}} per month`
      */
    ["com.blank.payment.cloud.pro.title.price-monthly"](options: {
        readonly price: string;
    }): string;
    /**
      * `Include in Team Workspace`
      */
    ["com.blank.payment.cloud.team-workspace.benefit.g1"](): string;
    /**
      * `Everything in Blank Pro.`
      */
    ["com.blank.payment.cloud.team-workspace.benefit.g1-1"](): string;
    /**
      * `100 GB initial storage + 20 GB per seat.`
      */
    ["com.blank.payment.cloud.team-workspace.benefit.g1-2"](): string;
    /**
      * `500 MB of maximum file size.`
      */
    ["com.blank.payment.cloud.team-workspace.benefit.g1-3"](): string;
    /**
      * `Unlimited team members (10+ seats).`
      */
    ["com.blank.payment.cloud.team-workspace.benefit.g1-4"](): string;
    /**
      * `Multiple admin roles.`
      */
    ["com.blank.payment.cloud.team-workspace.benefit.g1-5"](): string;
    /**
      * `Priority customer support.`
      */
    ["com.blank.payment.cloud.team-workspace.benefit.g1-6"](): string;
    /**
      * `Best for scalable teams.`
      */
    ["com.blank.payment.cloud.team-workspace.description"](): string;
    /**
      * `Team`
      */
    ["com.blank.payment.cloud.team-workspace.name"](): string;
    /**
      * `annually`
      */
    ["com.blank.payment.cloud.team-workspace.title.billed-yearly"](): string;
    /**
      * `{{price}} per seat/month`
      */
    ["com.blank.payment.cloud.team-workspace.title.price-monthly"](options: {
        readonly price: string;
    }): string;
    /**
      * `Contact sales`
      */
    ["com.blank.payment.contact-sales"](): string;
    /**
      * `Current plan`
      */
    ["com.blank.payment.current-plan"](): string;
    /**
      * `Start 14-day free trial`
      */
    ["com.blank.payment.start-free-trial"](): string;
    /**
      * `{{amount}}% off`
      */
    ["com.blank.payment.discount-amount"](options: {
        readonly amount: string;
    }): string;
    /**
      * `Downgrade`
      */
    ["com.blank.payment.downgrade"](): string;
    /**
      * `We'd like to hear more about where we fall short, so that we can make Blank better.`
      */
    ["com.blank.payment.downgraded-notify.content"](): string;
    /**
      * `Later`
      */
    ["com.blank.payment.downgraded-notify.later"](): string;
    /**
      * `Sure, Open in browser`
      */
    ["com.blank.payment.downgraded-notify.ok-client"](): string;
    /**
      * `Sure, Open in new tab`
      */
    ["com.blank.payment.downgraded-notify.ok-web"](): string;
    /**
      * `Sorry to see you go`
      */
    ["com.blank.payment.downgraded-notify.title"](): string;
    /**
      * `You have successfully downgraded. After the current billing period ends, your account will automatically switch to the Free plan.`
      */
    ["com.blank.payment.downgraded-tooltip"](): string;
    /**
      * `Best team workspace for collaboration and knowledge distilling.`
      */
    ["com.blank.payment.dynamic-benefit-1"](): string;
    /**
      * `Focusing on what really matters with team project management and automation.`
      */
    ["com.blank.payment.dynamic-benefit-2"](): string;
    /**
      * `Pay for seats, fits all team size.`
      */
    ["com.blank.payment.dynamic-benefit-3"](): string;
    /**
      * `Solutions & best practices for dedicated needs.`
      */
    ["com.blank.payment.dynamic-benefit-4"](): string;
    /**
      * `Embedable & interrogations with IT support.`
      */
    ["com.blank.payment.dynamic-benefit-5"](): string;
    /**
      * `Everything in Blank Pro`
      */
    ["com.blank.payment.lifetime.benefit-1"](): string;
    /**
      * `Life-time personal usage`
      */
    ["com.blank.payment.lifetime.benefit-2"](): string;
    /**
      * `{{capacity}} Cloud Storage`
      */
    ["com.blank.payment.lifetime.benefit-3"](options: {
        readonly capacity: string;
    }): string;
    /**
      * `Dedicated Discord support with Blank makers`
      */
    ["com.blank.payment.lifetime.benefit-4"](): string;
    /**
      * `Become a Life-time supporter?`
      */
    ["com.blank.payment.lifetime.caption-1"](): string;
    /**
      * `Purchase`
      */
    ["com.blank.payment.lifetime.purchase"](): string;
    /**
      * `Purchased`
      */
    ["com.blank.payment.lifetime.purchased"](): string;
    /**
      * `Believer Plan`
      */
    ["com.blank.payment.lifetime.title"](): string;
    /**
      * `Upgrade`
      */
    ["com.blank.payment.member-limit.free.confirm"](): string;
    /**
      * `Workspaces created by {{planName}} users are limited to {{quota}} members. To add more collaborators, you can:`
      */
    ["com.blank.payment.member-limit.description"](options: Readonly<{
        planName: string;
        quota: string;
    }>): string;
    /**
      * `Upgrade to Blank Pro for expanded member capacity`
      */
    ["com.blank.payment.member-limit.description.tips-for-free-plan"](): string;
    /**
      * `Convert to a Team Workspace for unlimited collaboration`
      */
    ["com.blank.payment.member-limit.description.tips-1"](): string;
    /**
      * `Or create a new workspace`
      */
    ["com.blank.payment.member-limit.description.tips-2"](): string;
    /**
      * `Got it`
      */
    ["com.blank.payment.member-limit.pro.confirm"](): string;
    /**
      * `You have reached the limit`
      */
    ["com.blank.payment.member-limit.title"](): string;
    /**
      * `Manage members here. {{planName}} users can invite up to {{memberLimit}}`
      */
    ["com.blank.payment.member.description"](options: Readonly<{
        planName: string;
        memberLimit: string;
    }>): string;
    /**
      * `Choose your plan`
      */
    ["com.blank.payment.member.description.choose-plan"](): string;
    /**
      * `go upgrade`
      */
    ["com.blank.payment.member.description.go-upgrade"](): string;
    /**
      * `Looking to collaborate with more people?`
      */
    ["com.blank.payment.member.description2"](): string;
    /**
      * `Work together with unlimited team members.`
      */
    ["com.blank.payment.member.team.description"](): string;
    /**
      * `Invite team members`
      */
    ["com.blank.payment.member.team.invite.title"](): string;
    /**
      * `Invite new members to join your workspace via email or share an invite link`
      */
    ["com.blank.payment.member.team.invite.description"](): string;
    /**
      * `Email Invite`
      */
    ["com.blank.payment.member.team.invite.email-invite"](): string;
    /**
      * `Invite Link`
      */
    ["com.blank.payment.member.team.invite.invite-link"](): string;
    /**
      * `Email addresses`
      */
    ["com.blank.payment.member.team.invite.email-addresses"](): string;
    /**
      * `Enter email addresses (separated by commas)`
      */
    ["com.blank.payment.member.team.invite.email-placeholder"](): string;
    /**
      * `Import CSV`
      */
    ["com.blank.payment.member.team.invite.import-csv"](): string;
    /**
      * `Send Invites`
      */
    ["com.blank.payment.member.team.invite.send-invites"](): string;
    /**
      * `Link expiration`
      */
    ["com.blank.payment.member.team.invite.link-expiration"](): string;
    /**
      * `{{number}} days`
      */
    ["com.blank.payment.member.team.invite.expiration-date"](options: {
        readonly number: string;
    }): string;
    /**
      * `To expire at: {{expireTime}}`
      */
    ["com.blank.payment.member.team.invite.expire-at"](options: {
        readonly expireTime: string;
    }): string;
    /**
      * `Invitation link`
      */
    ["com.blank.payment.member.team.invite.invitation-link"](): string;
    /**
      * `Generate a link to invite members to your workspace`
      */
    ["com.blank.payment.member.team.invite.invitation-link.description"](): string;
    /**
      * `Generate`
      */
    ["com.blank.payment.member.team.invite.generate"](): string;
    /**
      * `Copy`
      */
    ["com.blank.payment.member.team.invite.copy"](): string;
    /**
      * `Done`
      */
    ["com.blank.payment.member.team.invite.done"](): string;
    /**
      * `Invitations sent: {{count}}`
      */
    ["com.blank.payment.member.team.invite.notify.title"](options: {
        readonly count: string;
    }): string;
    /**
      * `These email addresses have already been invited:`
      */
    ["com.blank.payment.member.team.invite.notify.fail-message"](): string;
    /**
      * `Revoke invitation`
      */
    ["com.blank.payment.member.team.revoke"](): string;
    /**
      * `Approve`
      */
    ["com.blank.payment.member.team.approve"](): string;
    /**
      * `Decline`
      */
    ["com.blank.payment.member.team.decline"](): string;
    /**
      * `Remove member`
      */
    ["com.blank.payment.member.team.remove"](): string;
    /**
      * `Retry payment`
      */
    ["com.blank.payment.member.team.retry-payment"](): string;
    /**
      * `Change role to admin`
      */
    ["com.blank.payment.member.team.change.admin"](): string;
    /**
      * `Change role to collaborator`
      */
    ["com.blank.payment.member.team.change.collaborator"](): string;
    /**
      * `Assign as owner`
      */
    ["com.blank.payment.member.team.assign"](): string;
    /**
      * `Insufficient Team Seats`
      */
    ["com.blank.payment.member.team.retry-payment.title"](): string;
    /**
      * `The payment for adding new team members has failed. To add more seats, please update your payment method and process unpaid invoices.`
      */
    ["com.blank.payment.member.team.retry-payment.owner.description"](): string;
    /**
      * `The payment for adding new team members has failed. Please contact your workspace owner to update the payment method and process unpaid invoices.`
      */
    ["com.blank.payment.member.team.retry-payment.admin.description"](): string;
    /**
      * `Update Payment`
      */
    ["com.blank.payment.member.team.retry-payment.update-payment"](): string;
    /**
      * `Subscription has been disabled for your team workspace. To add more seats, you'll need to resume subscription first.`
      */
    ["com.blank.payment.member.team.disabled-subscription.owner.description"](): string;
    /**
      * `Your team workspace has subscription disabled, which prevents adding more seats. Please contact your workspace owner to enable subscription.`
      */
    ["com.blank.payment.member.team.disabled-subscription.admin.description"](): string;
    /**
      * `Resume Subscription`
      */
    ["com.blank.payment.member.team.disabled-subscription.resume-subscription"](): string;
    /**
      * `Invitation Revoked`
      */
    ["com.blank.payment.member.team.revoke.notify.title"](): string;
    /**
      * `You have canceled the invitation for {{name}}`
      */
    ["com.blank.payment.member.team.revoke.notify.message"](options: {
        readonly name: string;
    }): string;
    /**
      * `Request approved`
      */
    ["com.blank.payment.member.team.approve.notify.title"](): string;
    /**
      * `You have approved the {{name}}’s request to join this workspace`
      */
    ["com.blank.payment.member.team.approve.notify.message"](options: {
        readonly name: string;
    }): string;
    /**
      * `Request declined`
      */
    ["com.blank.payment.member.team.decline.notify.title"](): string;
    /**
      * `You have declined the {{name}}’s request to join this workspace`
      */
    ["com.blank.payment.member.team.decline.notify.message"](options: {
        readonly name: string;
    }): string;
    /**
      * `Member removed`
      */
    ["com.blank.payment.member.team.remove.notify.title"](): string;
    /**
      * `You have removed {{name}} from this workspace`
      */
    ["com.blank.payment.member.team.remove.notify.message"](options: {
        readonly name: string;
    }): string;
    /**
      * `Role Updated`
      */
    ["com.blank.payment.member.team.change.notify.title"](): string;
    /**
      * `You have successfully promoted {{name}} to Admin.`
      */
    ["com.blank.payment.member.team.change.admin.notify.message"](options: {
        readonly name: string;
    }): string;
    /**
      * `You have successfully changed {{name}} s role to collaborator.`
      */
    ["com.blank.payment.member.team.change.collaborator.notify.message"](options: {
        readonly name: string;
    }): string;
    /**
      * `Owner assigned`
      */
    ["com.blank.payment.member.team.assign.notify.title"](): string;
    /**
      * `You have successfully assigned {{name}} as the owner of this workspace.`
      */
    ["com.blank.payment.member.team.assign.notify.message"](options: {
        readonly name: string;
    }): string;
    /**
      * `Confirm new workspace owner`
      */
    ["com.blank.payment.member.team.assign.confirm.title"](): string;
    /**
      * `You are about to transfer workspace ownership to {{name}}. Please review the following changes carefully:`
      */
    ["com.blank.payment.member.team.assign.confirm.description"](options: {
        readonly name: string;
    }): string;
    /**
      * `This action cannot be undone`
      */
    ["com.blank.payment.member.team.assign.confirm.description-1"](): string;
    /**
      * `Your role will be changed to Admin`
      */
    ["com.blank.payment.member.team.assign.confirm.description-2"](): string;
    /**
      * `You will lose ownership rights to the entire workspace`
      */
    ["com.blank.payment.member.team.assign.confirm.description-3"](): string;
    /**
      * `To confirm this transfer, please type the workspace name`
      */
    ["com.blank.payment.member.team.assign.confirm.description-4"](): string;
    /**
      * `Type workspace name to confirm`
      */
    ["com.blank.payment.member.team.assign.confirm.placeholder"](): string;
    /**
      * `Transfer Ownership`
      */
    ["com.blank.payment.member.team.assign.confirm.button"](): string;
    /**
      * `Remove member from workspace?`
      */
    ["com.blank.payment.member.team.remove.confirm.title"](): string;
    /**
      * `This action will revoke their access to all workspace resources immediately.`
      */
    ["com.blank.payment.member.team.remove.confirm.description"](): string;
    /**
      * `Remove Member`
      */
    ["com.blank.payment.member.team.remove.confirm.confirm-button"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.payment.member.team.remove.confirm.cancel"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.payment.modal.change.cancel"](): string;
    /**
      * `Change`
      */
    ["com.blank.payment.modal.change.confirm"](): string;
    /**
      * `Change your subscription`
      */
    ["com.blank.payment.modal.change.title"](): string;
    /**
      * `Cancel subscription`
      */
    ["com.blank.payment.modal.downgrade.cancel"](): string;
    /**
      * `You can still use Blank Cloud Pro until the end of this billing period :)`
      */
    ["com.blank.payment.modal.downgrade.caption"](): string;
    /**
      * `Keep Blank Cloud Pro`
      */
    ["com.blank.payment.modal.downgrade.confirm"](): string;
    /**
      * `Keep Team plan`
      */
    ["com.blank.payment.modal.downgrade.team-confirm"](): string;
    /**
      * `We're sorry to see you go, but we're always working to improve, and your feedback is welcome. We hope to see you return in the future.`
      */
    ["com.blank.payment.modal.downgrade.content"](): string;
    /**
      * `Are you sure?`
      */
    ["com.blank.payment.modal.downgrade.title"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.payment.modal.resume.cancel"](): string;
    /**
      * `Confirm`
      */
    ["com.blank.payment.modal.resume.confirm"](): string;
    /**
      * `Are you sure you want to resume the subscription for your pro account? This means your payment method will be charged automatically at the end of each billing cycle, starting from the next billing cycle.`
      */
    ["com.blank.payment.modal.resume.content"](): string;
    /**
      * `Resume auto-renewal?`
      */
    ["com.blank.payment.modal.resume.title"](): string;
    /**
      * `Refresh`
      */
    ["com.blank.payment.plans-error-retry"](): string;
    /**
      * `Unable to load pricing plans, please check your network. `
      */
    ["com.blank.payment.plans-error-tip"](): string;
    /**
      * `monthly`
      */
    ["com.blank.payment.recurring-monthly"](): string;
    /**
      * `annually`
      */
    ["com.blank.payment.recurring-yearly"](): string;
    /**
      * `Resume`
      */
    ["com.blank.payment.resume"](): string;
    /**
      * `Subscription Resumed`
      */
    ["com.blank.payment.resume.success.title"](): string;
    /**
      * `Your team workspace subscription has been enabled successfully. Changes will take effect immediately.`
      */
    ["com.blank.payment.resume.success.team.message"](): string;
    /**
      * `Resume auto-renewal`
      */
    ["com.blank.payment.resume-renewal"](): string;
    /**
      * `See all plans`
      */
    ["com.blank.payment.see-all-plans"](): string;
    /**
      * `Sign up free`
      */
    ["com.blank.payment.sign-up-free"](): string;
    /**
      * `Cloud storage is insufficient. Please contact the owner of that workspace.`
      */
    ["com.blank.payment.storage-limit.description.member"](): string;
    /**
      * `Cloud storage is insufficient. You can upgrade your account to unlock more cloud storage.`
      */
    ["com.blank.payment.storage-limit.description.owner"](): string;
    /**
      * `Unable to sync due to insufficient storage space. You can remove excess content, upgrade your account, or increase your workspace storage to resolve this issue.`
      */
    ["com.blank.payment.storage-limit.new-description.owner"](): string;
    /**
      * `Sync failed due to storage space limit`
      */
    ["com.blank.payment.storage-limit.new-title"](): string;
    /**
      * `View`
      */
    ["com.blank.payment.storage-limit.view"](): string;
    /**
      * `You are currently on the {{plan}} plan. After the current billing period ends, your account will automatically switch to the Free plan.`
      */
    ["com.blank.payment.subtitle-canceled"](options: {
        readonly plan: string;
    }): string;
    /**
      * `This is the pricing plans of Blank Cloud. You can sign up or sign in to your account first.`
      */
    ["com.blank.payment.subtitle-not-signed-in"](): string;
    /**
      * `See all plans`
      */
    ["com.blank.payment.tag-tooltips"](): string;
    /**
      * `Tell us your use case`
      */
    ["com.blank.payment.tell-us-use-case"](): string;
    /**
      * `Pricing plans`
      */
    ["com.blank.payment.title"](): string;
    /**
      * `You have changed your plan to {{plan}} billing.`
      */
    ["com.blank.payment.updated-notify-msg"](options: {
        readonly plan: string;
    }): string;
    /**
      * `Subscription updated`
      */
    ["com.blank.payment.updated-notify-title"](): string;
    /**
      * `Upgrade`
      */
    ["com.blank.payment.upgrade"](): string;
    /**
      * `Redeem code`
      */
    ["com.blank.payment.redeem-code"](): string;
    /**
      * `We'd like to hear more about your use case, so that we can make Blank better.`
      */
    ["com.blank.payment.upgrade-success-notify.content"](): string;
    /**
      * `Later`
      */
    ["com.blank.payment.upgrade-success-notify.later"](): string;
    /**
      * `Sure, open in browser`
      */
    ["com.blank.payment.upgrade-success-notify.ok-client"](): string;
    /**
      * `Sure, open in new tab`
      */
    ["com.blank.payment.upgrade-success-notify.ok-web"](): string;
    /**
      * `Thanks for subscribing!`
      */
    ["com.blank.payment.upgrade-success-notify.title"](): string;
    /**
      * `Congratulations! Your Blank account has been successfully upgraded to a Pro account.`
      */
    ["com.blank.payment.upgrade-success-page.text"](): string;
    /**
      * `Upgrade successful!`
      */
    ["com.blank.payment.upgrade-success-page.title"](): string;
    /**
      * `Congratulations! Your workspace has been successfully upgraded to a Team Workspace. Now you can invite unlimited members to collaborate in this workspace.`
      */
    ["com.blank.payment.upgrade-success-page.team.text-1"](): string;
    /**
      * `Thank you for your purchase!`
      */
    ["com.blank.payment.license-success.title"](): string;
    /**
      * `Thank you for purchasing the Blank self-hosted license.`
      */
    ["com.blank.payment.license-success.text-1"](): string;
    /**
      * `You can use this key to upgrade in Settings > Workspace > License > Use purchased key`
      */
    ["com.blank.payment.license-success.hint"](): string;
    /**
      * `Open Blank`
      */
    ["com.blank.payment.license-success.open-blank"](): string;
    /**
      * `Copied key to clipboard`
      */
    ["com.blank.payment.license-success.copy"](): string;
    /**
      * `View analytics`
      */
    ["com.blank.doc.analytics.title"](): string;
    /**
      * `({{count}} total)`
      */
    ["com.blank.doc.analytics.summary.total"](options: {
        readonly count: string;
    }): string;
    /**
      * `Last {{days}} days`
      */
    ["com.blank.doc.analytics.window.last-days"](options: {
        readonly days: string;
    }): string;
    /**
      * `Total`
      */
    ["com.blank.doc.analytics.metric.total"](): string;
    /**
      * `Unique`
      */
    ["com.blank.doc.analytics.metric.unique"](): string;
    /**
      * `Guest`
      */
    ["com.blank.doc.analytics.metric.guest"](): string;
    /**
      * `Total views`
      */
    ["com.blank.doc.analytics.chart.total-views"](): string;
    /**
      * `Unique views`
      */
    ["com.blank.doc.analytics.chart.unique-views"](): string;
    /**
      * `Unable to load analytics.`
      */
    ["com.blank.doc.analytics.error.load-analytics"](): string;
    /**
      * `Unable to load viewers.`
      */
    ["com.blank.doc.analytics.error.load-viewers"](): string;
    /**
      * `No page views in this window.`
      */
    ["com.blank.doc.analytics.empty.no-page-views"](): string;
    /**
      * `No viewers in this window.`
      */
    ["com.blank.doc.analytics.empty.no-viewers"](): string;
    /**
      * `Viewers`
      */
    ["com.blank.doc.analytics.viewers.title"](): string;
    /**
      * `Show all viewers`
      */
    ["com.blank.doc.analytics.viewers.show-all"](): string;
    /**
      * `Open pricing plans`
      */
    ["com.blank.doc.analytics.paywall.open-pricing"](): string;
    /**
      * `Doc analytics over 7 days require an Blank Team subscription.`
      */
    ["com.blank.doc.analytics.paywall.toast"](): string;
    /**
      * `Close`
      */
    ["com.blank.peek-view-controls.close"](): string;
    /**
      * `Open this doc`
      */
    ["com.blank.peek-view-controls.open-doc"](): string;
    /**
      * `Open in edgeless`
      */
    ["com.blank.peek-view-controls.open-doc-in-edgeless"](): string;
    /**
      * `Open in new tab`
      */
    ["com.blank.peek-view-controls.open-doc-in-new-tab"](): string;
    /**
      * `Open in split view`
      */
    ["com.blank.peek-view-controls.open-doc-in-split-view"](): string;
    /**
      * `Open doc info`
      */
    ["com.blank.peek-view-controls.open-info"](): string;
    /**
      * `Open this attachment`
      */
    ["com.blank.peek-view-controls.open-attachment"](): string;
    /**
      * `Open in new tab`
      */
    ["com.blank.peek-view-controls.open-attachment-in-new-tab"](): string;
    /**
      * `Open in split view`
      */
    ["com.blank.peek-view-controls.open-attachment-in-split-view"](): string;
    /**
      * `Open in center peek`
      */
    ["com.blank.peek-view-controls.open-doc-in-center-peek"](): string;
    /**
      * `Copy link`
      */
    ["com.blank.peek-view-controls.copy-link"](): string;
    /**
      * `Click or drag`
      */
    ["com.blank.split-view-drag-handle.tooltip"](): string;
    /**
      * `Split view does not support folders.`
      */
    ["com.blank.split-view-folder-warning.description"](): string;
    /**
      * `Do not show this again`
      */
    ["do-not-show-this-again"](): string;
    /**
      * `New`
      */
    ["com.blank.quicksearch.group.creation"](): string;
    /**
      * `Search locally`
      */
    ["com.blank.quicksearch.search-locally"](): string;
    /**
      * `Search for "{{query}}"`
      */
    ["com.blank.quicksearch.group.searchfor"](options: {
        readonly query: string;
    }): string;
    /**
      * `Search for "{{query}}" (locally)`
      */
    ["com.blank.quicksearch.group.searchfor-locally"](options: {
        readonly query: string;
    }): string;
    /**
      * `Reset sync`
      */
    ["com.blank.resetSyncStatus.button"](): string;
    /**
      * `This operation may fix some synchronization issues.`
      */
    ["com.blank.resetSyncStatus.description"](): string;
    /**
      * `Collections`
      */
    ["com.blank.rootAppSidebar.collections"](): string;
    /**
      * `Notifications`
      */
    ["com.blank.rootAppSidebar.notifications"](): string;
    /**
      * `Only doc can be placed on here`
      */
    ["com.blank.rootAppSidebar.doc.link-doc-only"](): string;
    /**
      * `No linked docs`
      */
    ["com.blank.rootAppSidebar.docs.no-subdoc"](): string;
    /**
      * `Loading linked docs...`
      */
    ["com.blank.rootAppSidebar.docs.references-loading"](): string;
    /**
      * `New doc`
      */
    ["com.blank.rootAppSidebar.explorer.collection-add-tooltip"](): string;
    /**
      * `New collection`
      */
    ["com.blank.rootAppSidebar.explorer.collection-section-add-tooltip"](): string;
    /**
      * `New linked doc`
      */
    ["com.blank.rootAppSidebar.explorer.doc-add-tooltip"](): string;
    /**
      * `Copy`
      */
    ["com.blank.rootAppSidebar.explorer.drop-effect.copy"](): string;
    /**
      * `Link`
      */
    ["com.blank.rootAppSidebar.explorer.drop-effect.link"](): string;
    /**
      * `Move`
      */
    ["com.blank.rootAppSidebar.explorer.drop-effect.move"](): string;
    /**
      * `New doc`
      */
    ["com.blank.rootAppSidebar.explorer.fav-section-add-tooltip"](): string;
    /**
      * `New doc`
      */
    ["com.blank.rootAppSidebar.explorer.organize-add-tooltip"](): string;
    /**
      * `New folder`
      */
    ["com.blank.rootAppSidebar.explorer.organize-section-add-tooltip"](): string;
    /**
      * `New doc`
      */
    ["com.blank.rootAppSidebar.explorer.tag-add-tooltip"](): string;
    /**
      * `New tag`
      */
    ["com.blank.rootAppSidebar.explorer.tag-section-add-tooltip"](): string;
    /**
      * `Favorites`
      */
    ["com.blank.rootAppSidebar.favorites"](): string;
    /**
      * `Files`
      */
    ["com.blank.rootAppSidebar.files"](): string;
    /**
      * `No favorites`
      */
    ["com.blank.rootAppSidebar.favorites.empty"](): string;
    /**
      * `Migration data`
      */
    ["com.blank.rootAppSidebar.migration-data"](): string;
    /**
      * `Empty the old favorites`
      */
    ["com.blank.rootAppSidebar.migration-data.clean-all"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.rootAppSidebar.migration-data.clean-all.cancel"](): string;
    /**
      * `OK`
      */
    ["com.blank.rootAppSidebar.migration-data.clean-all.confirm"](): string;
    /**
      * `The old "Favorites" will be replaced`
      */
    ["com.blank.rootAppSidebar.migration-data.help"](): string;
    /**
      * `Empty the old favorites`
      */
    ["com.blank.rootAppSidebar.migration-data.help.clean-all"](): string;
    /**
      * `OK`
      */
    ["com.blank.rootAppSidebar.migration-data.help.confirm"](): string;
    /**
      * `Organize`
      */
    ["com.blank.rootAppSidebar.organize"](): string;
    /**
      * `Delete`
      */
    ["com.blank.rootAppSidebar.organize.delete"](): string;
    /**
      * `Remove from folder`
      */
    ["com.blank.rootAppSidebar.organize.delete-from-folder"](): string;
    /**
      * `Delete the folder will not delete any docs, tags, or collections.`
      */
    ["com.blank.rootAppSidebar.organize.delete.notify-message"](): string;
    /**
      * `Delete {{name}}`
      */
    ["com.blank.rootAppSidebar.organize.delete.notify-title"](options: {
        readonly name: string;
    }): string;
    /**
      * `No folders`
      */
    ["com.blank.rootAppSidebar.organize.empty"](): string;
    /**
      * `Empty folder`
      */
    ["com.blank.rootAppSidebar.organize.empty-folder"](): string;
    /**
      * `Add pages`
      */
    ["com.blank.rootAppSidebar.organize.empty-folder.add-pages"](): string;
    /**
      * `New folder`
      */
    ["com.blank.rootAppSidebar.organize.empty.new-folders-button"](): string;
    /**
      * `Add to favorites`
      */
    ["com.blank.rootAppSidebar.organize.folder-add-favorite"](): string;
    /**
      * `Remove from favorites`
      */
    ["com.blank.rootAppSidebar.organize.folder-rm-favorite"](): string;
    /**
      * `Add Collections`
      */
    ["com.blank.rootAppSidebar.organize.folder.add-collections"](): string;
    /**
      * `New doc`
      */
    ["com.blank.rootAppSidebar.organize.folder.new-doc"](): string;
    /**
      * `Add docs`
      */
    ["com.blank.rootAppSidebar.organize.folder.add-docs"](): string;
    /**
      * `Add others`
      */
    ["com.blank.rootAppSidebar.organize.folder.add-others"](): string;
    /**
      * `Add tags`
      */
    ["com.blank.rootAppSidebar.organize.folder.add-tags"](): string;
    /**
      * `Create a subfolder`
      */
    ["com.blank.rootAppSidebar.organize.folder.create-subfolder"](): string;
    /**
      * `New folder`
      */
    ["com.blank.rootAppSidebar.organize.new-folders"](): string;
    /**
      * `Only folder can be placed on here`
      */
    ["com.blank.rootAppSidebar.organize.root-folder-only"](): string;
    /**
      * `Add More`
      */
    ["com.blank.rootAppSidebar.organize.add-more"](): string;
    /**
      * `Add Folder`
      */
    ["com.blank.rootAppSidebar.organize.add-folder"](): string;
    /**
      * `New Collection`
      */
    ["com.blank.rootAppSidebar.collection.new"](): string;
    /**
      * `Others`
      */
    ["com.blank.rootAppSidebar.others"](): string;
    /**
      * `Only doc can be placed on here`
      */
    ["com.blank.rootAppSidebar.tag.doc-only"](): string;
    /**
      * `Tags`
      */
    ["com.blank.rootAppSidebar.tags"](): string;
    /**
      * `No tags`
      */
    ["com.blank.rootAppSidebar.tags.empty"](): string;
    /**
      * `New tag`
      */
    ["com.blank.rootAppSidebar.tags.empty.new-tag-button"](): string;
    /**
      * `New tag`
      */
    ["com.blank.rootAppSidebar.tags.new-tag"](): string;
    /**
      * `No docs`
      */
    ["com.blank.rootAppSidebar.tags.no-doc"](): string;
    /**
      * `Drag to resize`
      */
    ["com.blank.rootAppSidebar.resize-handle.tooltip.drag"](): string;
    /**
      * `Click to collapse`
      */
    ["com.blank.rootAppSidebar.resize-handle.tooltip.click"](): string;
    /**
      * `Type here ...`
      */
    ["com.blank.search-tags.placeholder"](): string;
    /**
      * `Empty`
      */
    ["com.blank.selectPage.empty"](): string;
    /**
      * `Selected`
      */
    ["com.blank.selectPage.selected"](): string;
    /**
      * `Add include doc`
      */
    ["com.blank.selectPage.title"](): string;
    /**
      * `Search collections...`
      */
    ["com.blank.selector-collection.search.placeholder"](): string;
    /**
      * `Search tags...`
      */
    ["com.blank.selector-tag.search.placeholder"](): string;
    /**
      * `Notifications`
      */
    ["com.blank.setting.notifications"](): string;
    /**
      * `Notifications`
      */
    ["com.blank.setting.notifications.header.title"](): string;
    /**
      * `Choose the types of updates you want to receive and where to get them.`
      */
    ["com.blank.setting.notifications.header.description"](): string;
    /**
      * `Email notifications`
      */
    ["com.blank.setting.notifications.email.title"](): string;
    /**
      * `Mention`
      */
    ["com.blank.setting.notifications.email.mention.title"](): string;
    /**
      * `You will be notified through email when other members of the workspace @ you.`
      */
    ["com.blank.setting.notifications.email.mention.subtitle"](): string;
    /**
      * `Invites`
      */
    ["com.blank.setting.notifications.email.invites.title"](): string;
    /**
      * `Invitation related messages will be sent through emails.`
      */
    ["com.blank.setting.notifications.email.invites.subtitle"](): string;
    /**
      * `Comments`
      */
    ["com.blank.setting.notifications.email.comments.title"](): string;
    /**
      * `You will be notified through email when other members of the workspace comment on your docs.`
      */
    ["com.blank.setting.notifications.email.comments.subtitle"](): string;
    /**
      * `Account settings`
      */
    ["com.blank.setting.account"](): string;
    /**
      * `Delete your account from {{server}}`
      */
    ["com.blank.setting.account.delete-from-server"](options: {
        readonly server: string;
    }): string;
    /**
      * `Once deleted, your account will no longer be accessible, and all data in your personal cloud space will be permanently deleted.`
      */
    ["com.blank.setting.account.delete.message"](): string;
    /**
      * `Cannot delete account`
      */
    ["com.blank.setting.account.delete.team-warning-title"](): string;
    /**
      * `You’re the owner of a team workspace. To delete your account, please delete the workspace or transfer ownership first.`
      */
    ["com.blank.setting.account.delete.team-warning-description"](): string;
    /**
      * `Delete your account?`
      */
    ["com.blank.setting.account.delete.confirm-title"](): string;
    /**
      * `Please type your email to confirm`
      */
    ["com.blank.setting.account.delete.input-placeholder"](): string;
    /**
      * `Delete`
      */
    ["com.blank.setting.account.delete.confirm-button"](): string;
    /**
      * `Account deleted`
      */
    ["com.blank.setting.account.delete.success-title"](): string;
    /**
      * `Your account and cloud data have been deleted.`
      */
    ["com.blank.setting.account.delete.success-description-1"](): string;
    /**
      * `Local data can be deleted by uninstalling app and clearing browser data.`
      */
    ["com.blank.setting.account.delete.success-description-2"](): string;
    /**
      * `Your personal information`
      */
    ["com.blank.setting.account.message"](): string;
    /**
      * `Sync with Blank Cloud`
      */
    ["com.blank.setting.sign.message"](): string;
    /**
      * `Securely sign out of your account.`
      */
    ["com.blank.setting.sign.out.message"](): string;
    /**
      * `General`
      */
    ["com.blank.settingSidebar.settings.general"](): string;
    /**
      * `Workspace`
      */
    ["com.blank.settingSidebar.settings.workspace"](): string;
    /**
      * `Settings`
      */
    ["com.blank.settingSidebar.title"](): string;
    /**
      * `Appearance`
      */
    ["com.blank.settings.appearance"](): string;
    /**
      * `Customise the appearance of the client.`
      */
    ["com.blank.settings.appearance.border-style-description"](): string;
    /**
      * `Customise your date style.`
      */
    ["com.blank.settings.appearance.date-format-description"](): string;
    /**
      * `Maximum display of content within a doc.`
      */
    ["com.blank.settings.appearance.full-width-description"](): string;
    /**
      * `Select the language for the interface.`
      */
    ["com.blank.settings.appearance.language-description"](): string;
    /**
      * `By default, the week starts on Sunday.`
      */
    ["com.blank.settings.appearance.start-week-description"](): string;
    /**
      * `Customise appearance of Windows Client.`
      */
    ["com.blank.settings.appearance.window-frame-description"](): string;
    /**
      * `Links`
      */
    ["com.blank.setting.appearance.links"](): string;
    /**
      * `Open Blank links`
      */
    ["com.blank.setting.appearance.open-in-app"](): string;
    /**
      * `You can choose to open the link in the desktop app or directly in the browser.`
      */
    ["com.blank.setting.appearance.open-in-app.hint"](): string;
    /**
      * `Ask me each time`
      */
    ["com.blank.setting.appearance.open-in-app.always-ask"](): string;
    /**
      * `Open links in desktop app`
      */
    ["com.blank.setting.appearance.open-in-app.open-in-desktop-app"](): string;
    /**
      * `Open links in browser`
      */
    ["com.blank.setting.appearance.open-in-app.open-in-web"](): string;
    /**
      * `Open Blank links`
      */
    ["com.blank.setting.appearance.open-in-app.title"](): string;
    /**
      * `Open this doc in Blank app`
      */
    ["com.blank.open-in-app.card.title"](): string;
    /**
      * `Open in app`
      */
    ["com.blank.open-in-app.card.button.open"](): string;
    /**
      * `Dismiss`
      */
    ["com.blank.open-in-app.card.button.dismiss"](): string;
    /**
      * `Remember choice`
      */
    ["com.blank.open-in-app.card.remember"](): string;
    /**
      * `Download desktop app`
      */
    ["com.blank.open-in-app.card.download"](): string;
    /**
      * `If enabled, it will automatically check for new versions at regular intervals.`
      */
    ["com.blank.settings.auto-check-description"](): string;
    /**
      * `If enabled, new versions will be automatically downloaded to the current device.`
      */
    ["com.blank.settings.auto-download-description"](): string;
    /**
      * `Editor`
      */
    ["com.blank.settings.editorSettings"](): string;
    /**
      * `Edgeless`
      */
    ["com.blank.settings.editorSettings.edgeless"](): string;
    /**
      * `Connector`
      */
    ["com.blank.settings.editorSettings.edgeless.connecter"](): string;
    /**
      * `Border style`
      */
    ["com.blank.settings.editorSettings.edgeless.connecter.border-style"](): string;
    /**
      * `Border thickness`
      */
    ["com.blank.settings.editorSettings.edgeless.connecter.border-thickness"](): string;
    /**
      * `Color`
      */
    ["com.blank.settings.editorSettings.edgeless.connecter.color"](): string;
    /**
      * `Connector shape`
      */
    ["com.blank.settings.editorSettings.edgeless.connecter.connector-shape"](): string;
    /**
      * `Curve`
      */
    ["com.blank.settings.editorSettings.edgeless.connecter.connector-shape.curve"](): string;
    /**
      * `Elbowed`
      */
    ["com.blank.settings.editorSettings.edgeless.connecter.connector-shape.elbowed"](): string;
    /**
      * `Straight`
      */
    ["com.blank.settings.editorSettings.edgeless.connecter.connector-shape.straight"](): string;
    /**
      * `End endpoint`
      */
    ["com.blank.settings.editorSettings.edgeless.connecter.end-endpoint"](): string;
    /**
      * `Start endpoint`
      */
    ["com.blank.settings.editorSettings.edgeless.connecter.start-endpoint"](): string;
    /**
      * `Custom`
      */
    ["com.blank.settings.editorSettings.edgeless.custom"](): string;
    /**
      * `Mind Map`
      */
    ["com.blank.settings.editorSettings.edgeless.mind-map"](): string;
    /**
      * `Layout`
      */
    ["com.blank.settings.editorSettings.edgeless.mind-map.layout"](): string;
    /**
      * `Left`
      */
    ["com.blank.settings.editorSettings.edgeless.mind-map.layout.left"](): string;
    /**
      * `Radial`
      */
    ["com.blank.settings.editorSettings.edgeless.mind-map.layout.radial"](): string;
    /**
      * `Right`
      */
    ["com.blank.settings.editorSettings.edgeless.mind-map.layout.right"](): string;
    /**
      * `Note`
      */
    ["com.blank.settings.editorSettings.edgeless.note"](): string;
    /**
      * `Background`
      */
    ["com.blank.settings.editorSettings.edgeless.note.background"](): string;
    /**
      * `Border style`
      */
    ["com.blank.settings.editorSettings.edgeless.note.border"](): string;
    /**
      * `Border thickness`
      */
    ["com.blank.settings.editorSettings.edgeless.note.border-thickness"](): string;
    /**
      * `Dash`
      */
    ["com.blank.settings.editorSettings.edgeless.note.border.dash"](): string;
    /**
      * `None`
      */
    ["com.blank.settings.editorSettings.edgeless.note.border.none"](): string;
    /**
      * `Solid`
      */
    ["com.blank.settings.editorSettings.edgeless.note.border.solid"](): string;
    /**
      * `Corners`
      */
    ["com.blank.settings.editorSettings.edgeless.note.corners"](): string;
    /**
      * `Shadow style`
      */
    ["com.blank.settings.editorSettings.edgeless.note.shadow"](): string;
    /**
      * `Pen`
      */
    ["com.blank.settings.editorSettings.edgeless.pen"](): string;
    /**
      * `Color`
      */
    ["com.blank.settings.editorSettings.edgeless.pen.color"](): string;
    /**
      * `Thickness`
      */
    ["com.blank.settings.editorSettings.edgeless.pen.thickness"](): string;
    /**
      * `Shape`
      */
    ["com.blank.settings.editorSettings.edgeless.shape"](): string;
    /**
      * `Border color`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.border-color"](): string;
    /**
      * `Border style`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.border-style"](): string;
    /**
      * `Border thickness`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.border-thickness"](): string;
    /**
      * `Diamond`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.diamond"](): string;
    /**
      * `Ellipse`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.ellipse"](): string;
    /**
      * `Fill color`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.fill-color"](): string;
    /**
      * `Flow`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.flow"](): string;
    /**
      * `Font`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.font"](): string;
    /**
      * `Font size`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.font-size"](): string;
    /**
      * `Font style`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.font-style"](): string;
    /**
      * `List`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.list"](): string;
    /**
      * `Rounded Rectangle`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.rounded-rectangle"](): string;
    /**
      * `Square`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.square"](): string;
    /**
      * `Text alignment`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.text-alignment"](): string;
    /**
      * `Text color`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.text-color"](): string;
    /**
      * `Triangle`
      */
    ["com.blank.settings.editorSettings.edgeless.shape.triangle"](): string;
    /**
      * `Frame`
      */
    ["com.blank.settings.editorSettings.edgeless.frame"](): string;
    /**
      * `Background`
      */
    ["com.blank.settings.editorSettings.edgeless.frame.background"](): string;
    /**
      * `Style`
      */
    ["com.blank.settings.editorSettings.edgeless.style"](): string;
    /**
      * `General`
      */
    ["com.blank.settings.editorSettings.edgeless.style.general"](): string;
    /**
      * `Scribbled`
      */
    ["com.blank.settings.editorSettings.edgeless.style.scribbled"](): string;
    /**
      * `Text`
      */
    ["com.blank.settings.editorSettings.edgeless.text"](): string;
    /**
      * `Alignment`
      */
    ["com.blank.settings.editorSettings.edgeless.text.alignment"](): string;
    /**
      * `Center`
      */
    ["com.blank.settings.editorSettings.edgeless.text.alignment.center"](): string;
    /**
      * `Left`
      */
    ["com.blank.settings.editorSettings.edgeless.text.alignment.left"](): string;
    /**
      * `Right`
      */
    ["com.blank.settings.editorSettings.edgeless.text.alignment.right"](): string;
    /**
      * `Text color`
      */
    ["com.blank.settings.editorSettings.edgeless.text.color"](): string;
    /**
      * `Font`
      */
    ["com.blank.settings.editorSettings.edgeless.text.font"](): string;
    /**
      * `Font family`
      */
    ["com.blank.settings.editorSettings.edgeless.text.font-family"](): string;
    /**
      * `Font size`
      */
    ["com.blank.settings.editorSettings.edgeless.text.font-size"](): string;
    /**
      * `Font style`
      */
    ["com.blank.settings.editorSettings.edgeless.text.font-style"](): string;
    /**
      * `Font weight`
      */
    ["com.blank.settings.editorSettings.edgeless.text.font-weight"](): string;
    /**
      * `General`
      */
    ["com.blank.settings.editorSettings.general"](): string;
    /**
      * `Enable the powerful AI assistant, Blank AI.`
      */
    ["com.blank.settings.editorSettings.general.ai.description"](): string;
    /**
      * `Disable AI and Reload`
      */
    ["com.blank.settings.editorSettings.general.ai.disable.confirm"](): string;
    /**
      * `Are you sure you want to disable AI? We value your productivity and our AI can enhance it. Please think again!`
      */
    ["com.blank.settings.editorSettings.general.ai.disable.description"](): string;
    /**
      * `Disable AI?`
      */
    ["com.blank.settings.editorSettings.general.ai.disable.title"](): string;
    /**
      * `Enable AI and Reload`
      */
    ["com.blank.settings.editorSettings.general.ai.enable.confirm"](): string;
    /**
      * `Do you want to enable AI? Our AI assistant is ready to enhance your productivity and provide smart assistance. Let's get started! We need reload page to make this change.`
      */
    ["com.blank.settings.editorSettings.general.ai.enable.description"](): string;
    /**
      * `Enable AI?`
      */
    ["com.blank.settings.editorSettings.general.ai.enable.title"](): string;
    /**
      * `Blank AI`
      */
    ["com.blank.settings.editorSettings.general.ai.title"](): string;
    /**
      * `Set a default programming language.`
      */
    ["com.blank.settings.editorSettings.general.default-code-block.language.description"](): string;
    /**
      * `Code blocks default language`
      */
    ["com.blank.settings.editorSettings.general.default-code-block.language.title"](): string;
    /**
      * `Encapsulate code snippets for better readability.`
      */
    ["com.blank.settings.editorSettings.general.default-code-block.wrap.description"](): string;
    /**
      * `Wrap code in code blocks`
      */
    ["com.blank.settings.editorSettings.general.default-code-block.wrap.title"](): string;
    /**
      * `Default mode for new doc.`
      */
    ["com.blank.settings.editorSettings.general.default-new-doc.description"](): string;
    /**
      * `New doc default mode`
      */
    ["com.blank.settings.editorSettings.general.default-new-doc.title"](): string;
    /**
      * `Auto-title new docs with current date`
      */
    ["com.blank.settings.editorSettings.general.auto-date-title.title"](): string;
    /**
      * `Automatically title blank new docs with today's date.`
      */
    ["com.blank.settings.editorSettings.general.auto-date-title.description"](): string;
    /**
      * `New doc date format`
      */
    ["com.blank.settings.editorSettings.general.auto-date-title.format.title"](): string;
    /**
      * `Choose the date format used for automatic new doc titles.`
      */
    ["com.blank.settings.editorSettings.general.auto-date-title.format.description"](): string;
    /**
      * `DD-MM-YYYY`
      */
    ["com.blank.settings.editorSettings.general.auto-date-title.format.dd-mm-yyyy"](): string;
    /**
      * `MM-DD-YYYY`
      */
    ["com.blank.settings.editorSettings.general.auto-date-title.format.mm-dd-yyyy"](): string;
    /**
      * `YYYY-MM-DD`
      */
    ["com.blank.settings.editorSettings.general.auto-date-title.format.yyyy-mm-dd"](): string;
    /**
      * `Journal style (localized)`
      */
    ["com.blank.settings.editorSettings.general.auto-date-title.format.journal"](): string;
    /**
      * `Display add icon option`
      */
    ["com.blank.settings.editorSettings.general.add-icon-option.title"](): string;
    /**
      * `Show or hide the add icon option for docs without an icon.`
      */
    ["com.blank.settings.editorSettings.general.add-icon-option.description"](): string;
    /**
      * `Customize your text experience.`
      */
    ["com.blank.settings.editorSettings.general.font-family.custom.description"](): string;
    /**
      * `Custom font family`
      */
    ["com.blank.settings.editorSettings.general.font-family.custom.title"](): string;
    /**
      * `Choose your editor's font family.`
      */
    ["com.blank.settings.editorSettings.general.font-family.description"](): string;
    /**
      * `Font family`
      */
    ["com.blank.settings.editorSettings.general.font-family.title"](): string;
    /**
      * `Adjust the base font size for better readability.`
      */
    ["com.blank.settings.editorSettings.general.font-size.description"](): string;
    /**
      * `Font size`
      */
    ["com.blank.settings.editorSettings.general.font-size.title"](): string;
    /**
      * `Automatically detect and correct spelling errors.`
      */
    ["com.blank.settings.editorSettings.general.spell-check.description"](): string;
    /**
      * `Spell check`
      */
    ["com.blank.settings.editorSettings.general.spell-check.title"](): string;
    /**
      * `Page`
      */
    ["com.blank.settings.editorSettings.page"](): string;
    /**
      * `Middle click paste`
      */
    ["com.blank.settings.editorSettings.general.middle-click-paste.title"](): string;
    /**
      * `Enable default middle click paste behavior on Linux.`
      */
    ["com.blank.settings.editorSettings.general.middle-click-paste.description"](): string;
    /**
      * `Display bi-directional links on the doc.`
      */
    ["com.blank.settings.editorSettings.page.display-bi-link.description"](): string;
    /**
      * `Display bi-directional links`
      */
    ["com.blank.settings.editorSettings.page.display-bi-link.title"](): string;
    /**
      * `Display document information on the doc.`
      */
    ["com.blank.settings.editorSettings.page.display-doc-info.description"](): string;
    /**
      * `Display doc info`
      */
    ["com.blank.settings.editorSettings.page.display-doc-info.title"](): string;
    /**
      * `Maximise display of content within a page.`
      */
    ["com.blank.settings.editorSettings.page.full-width.description"](): string;
    /**
      * `Full width layout`
      */
    ["com.blank.settings.editorSettings.page.full-width.title"](): string;
    /**
      * `Default page width`
      */
    ["com.blank.settings.editorSettings.page.default-page-width.title"](): string;
    /**
      * `Set default width for new pages, individual pages can override.`
      */
    ["com.blank.settings.editorSettings.page.default-page-width.description"](): string;
    /**
      * `Standard`
      */
    ["com.blank.settings.editorSettings.page.default-page-width.standard"](): string;
    /**
      * `Full width`
      */
    ["com.blank.settings.editorSettings.page.default-page-width.full-width"](): string;
    /**
      * `Set edgeless default color scheme.`
      */
    ["com.blank.settings.editorSettings.page.edgeless-default-theme.description"](): string;
    /**
      * `Edgeless default theme`
      */
    ["com.blank.settings.editorSettings.page.edgeless-default-theme.title"](): string;
    /**
      * `Specified by current color mode`
      */
    ["com.blank.settings.editorSettings.page.edgeless-default-theme.specified"](): string;
    /**
      * `Scroll wheel zoom`
      */
    ["com.blank.settings.editorSettings.page.edgeless-scroll-wheel-zoom.title"](): string;
    /**
      * `Use the scroll wheel to zoom in and out.`
      */
    ["com.blank.settings.editorSettings.page.edgeless-scroll-wheel-zoom.description"](): string;
    /**
      * `Preferences`
      */
    ["com.blank.settings.editorSettings.preferences"](): string;
    /**
      * `You can export the entire preferences data for backup, and the exported data can be re-imported.`
      */
    ["com.blank.settings.editorSettings.preferences.export.description"](): string;
    /**
      * `Export Settings`
      */
    ["com.blank.settings.editorSettings.preferences.export.title"](): string;
    /**
      * `You can import previously exported preferences data for restoration.`
      */
    ["com.blank.settings.editorSettings.preferences.import.description"](): string;
    /**
      * `Import Settings`
      */
    ["com.blank.settings.editorSettings.preferences.import.title"](): string;
    /**
      * `Configure your own editor`
      */
    ["com.blank.settings.editorSettings.subtitle"](): string;
    /**
      * `Editor settings`
      */
    ["com.blank.settings.editorSettings.title"](): string;
    /**
      * `Ask me every time`
      */
    ["com.blank.settings.editorSettings.ask-me-every-time"](): string;
    /**
      * `Email`
      */
    ["com.blank.settings.email"](): string;
    /**
      * `Change email`
      */
    ["com.blank.settings.email.action"](): string;
    /**
      * `Change email`
      */
    ["com.blank.settings.email.action.change"](): string;
    /**
      * `Verify email`
      */
    ["com.blank.settings.email.action.verify"](): string;
    /**
      * `Enable Blank Cloud to collaborate with others`
      */
    ["com.blank.settings.member-tooltip"](): string;
    /**
      * `Loading member list...`
      */
    ["com.blank.settings.member.loading"](): string;
    /**
      * `Noise background on the sidebar`
      */
    ["com.blank.settings.noise-style"](): string;
    /**
      * `Use background noise effect on the sidebar.`
      */
    ["com.blank.settings.noise-style-description"](): string;
    /**
      * `Password`
      */
    ["com.blank.settings.password"](): string;
    /**
      * `Change password`
      */
    ["com.blank.settings.password.action.change"](): string;
    /**
      * `Set password`
      */
    ["com.blank.settings.password.action.set"](): string;
    /**
      * `Set a password to sign in to your account`
      */
    ["com.blank.settings.password.message"](): string;
    /**
      * `My profile`
      */
    ["com.blank.settings.profile"](): string;
    /**
      * `Your account profile will be displayed to everyone.`
      */
    ["com.blank.settings.profile.message"](): string;
    /**
      * `Display name`
      */
    ["com.blank.settings.profile.name"](): string;
    /**
      * `Input account name`
      */
    ["com.blank.settings.profile.placeholder"](): string;
    /**
      * `Remove workspace`
      */
    ["com.blank.settings.remove-workspace"](): string;
    /**
      * `Remove workspace from this device and optionally delete all data.`
      */
    ["com.blank.settings.remove-workspace-description"](): string;
    /**
      * `Sign in / Sign up`
      */
    ["com.blank.settings.sign"](): string;
    /**
      * `Need more customization options? Tell us in the community.`
      */
    ["com.blank.settings.suggestion"](): string;
    /**
      * `Translucent UI on the sidebar`
      */
    ["com.blank.settings.translucent-style"](): string;
    /**
      * `Use transparency effect on the sidebar.`
      */
    ["com.blank.settings.translucent-style-description"](): string;
    /**
      * `Meetings`
      */
    ["com.blank.settings.meetings"](): string;
    /**
      * `Beyond Recording
    Your AI Meeting Assistant is Here`
      */
    ["com.blank.settings.meetings.setting.welcome"](): string;
    /**
      * `Native Audio Capture, No Bots Required - Direct from Your Mac to Meeting Intelligence.`
      */
    ["com.blank.settings.meetings.setting.prompt"](): string;
    /**
      * `Learn more`
      */
    ["com.blank.settings.meetings.setting.welcome.learn-more"](): string;
    /**
      * `Enable meeting notes`
      */
    ["com.blank.settings.meetings.enable.title"](): string;
    /**
      * `Meeting recording`
      */
    ["com.blank.settings.meetings.record.header"](): string;
    /**
      * `When meeting starts`
      */
    ["com.blank.settings.meetings.record.recording-mode"](): string;
    /**
      * `Choose the behavior when the meeting starts.`
      */
    ["com.blank.settings.meetings.record.recording-mode.description"](): string;
    /**
      * `Open saved recordings`
      */
    ["com.blank.settings.meetings.record.open-saved-file"](): string;
    /**
      * `Open the locally stored recording files.`
      */
    ["com.blank.settings.meetings.record.open-saved-file.description"](): string;
    /**
      * `Transcription with AI`
      */
    ["com.blank.settings.meetings.transcription.header"](): string;
    /**
      * `AI auto summary`
      */
    ["com.blank.settings.meetings.transcription.auto-summary"](): string;
    /**
      * `Automatically generate a summary of the meeting notes.`
      */
    ["com.blank.settings.meetings.transcription.auto-summary.description"](): string;
    /**
      * `AI auto todo list`
      */
    ["com.blank.settings.meetings.transcription.auto-todo"](): string;
    /**
      * `Automatically generate a todo list of the meeting notes.`
      */
    ["com.blank.settings.meetings.transcription.auto-todo.description"](): string;
    /**
      * `Privacy & Security`
      */
    ["com.blank.settings.meetings.privacy.header"](): string;
    /**
      * `Screen & System audio recording`
      */
    ["com.blank.settings.meetings.privacy.screen-system-audio-recording"](): string;
    /**
      * `The Meeting feature requires permission to be used.`
      */
    ["com.blank.settings.meetings.privacy.screen-system-audio-recording.description"](): string;
    /**
      * `Click to allow`
      */
    ["com.blank.settings.meetings.privacy.screen-system-audio-recording.permission-setting"](): string;
    /**
      * `Microphone`
      */
    ["com.blank.settings.meetings.privacy.microphone"](): string;
    /**
      * `The Meeting feature requires permission to be used.`
      */
    ["com.blank.settings.meetings.privacy.microphone.description"](): string;
    /**
      * `Click to allow`
      */
    ["com.blank.settings.meetings.privacy.microphone.permission-setting"](): string;
    /**
      * `Permission issues`
      */
    ["com.blank.settings.meetings.privacy.issues"](): string;
    /**
      * `Permissions are granted but the status isn't updated? Restart the app to refresh permissions.`
      */
    ["com.blank.settings.meetings.privacy.issues.description"](): string;
    /**
      * `Restart App`
      */
    ["com.blank.settings.meetings.privacy.issues.restart"](): string;
    /**
      * `Do nothing`
      */
    ["com.blank.settings.meetings.record.recording-mode.none"](): string;
    /**
      * `Auto start recording`
      */
    ["com.blank.settings.meetings.record.recording-mode.auto-start"](): string;
    /**
      * `Show a recording prompt`
      */
    ["com.blank.settings.meetings.record.recording-mode.prompt"](): string;
    /**
      * `Screen & System Audio Recording`
      */
    ["com.blank.settings.meetings.record.permission-modal.title"](): string;
    /**
      * `Blank will generate meeting notes by recording your meetings. Authorization to "Screen & System Audio Recording" is necessary.`
      */
    ["com.blank.settings.meetings.record.permission-modal.description"](): string;
    /**
      * `Save meeting's recording block to`
      */
    ["com.blank.settings.meetings.record.save-mode"](): string;
    /**
      * `Open System Settings`
      */
    ["com.blank.settings.meetings.record.permission-modal.open-setting"](): string;
    /**
      * `Workspace`
      */
    ["com.blank.settings.workspace"](): string;
    /**
      * `You can view current workspace's information here.`
      */
    ["com.blank.settings.workspace.description"](): string;
    /**
      * `AI BYOK (Beta)`
      */
    ["com.blank.settings.workspace.byok.title-beta"](): string;
    /**
      * `AI BYOK`
      */
    ["com.blank.settings.workspace.byok.title"](): string;
    /**
      * `Loading provider keys.`
      */
    ["com.blank.settings.workspace.byok.loading"](): string;
    /**
      * `Use your own provider keys for this workspace.`
      */
    ["com.blank.settings.workspace.byok.subtitle"](): string;
    /**
      * `Use workspace provider keys before Blank AI plan routes.`
      */
    ["com.blank.settings.workspace.byok.header"](): string;
    /**
      * `BYOK requires Pro, Team, or Believer`
      */
    ["com.blank.settings.workspace.byok.locked.title"](): string;
    /**
      * `Upgrade this workspace to add provider keys and route Blank AI through your own OpenAI, Anthropic, Gemini, or FAL account.`
      */
    ["com.blank.settings.workspace.byok.locked.description"](): string;
    /**
      * `AI plan stays available`
      */
    ["com.blank.settings.workspace.byok.notice.title"](): string;
    /**
      * `Local keys on this device are tried first. Workspace server keys follow, then Blank AI plan routes when quota is available.`
      */
    ["com.blank.settings.workspace.byok.notice.description"](): string;
    /**
      * `Provider keys`
      */
    ["com.blank.settings.workspace.byok.keys.title"](): string;
    /**
      * `List order controls fallback within each storage group.`
      */
    ["com.blank.settings.workspace.byok.keys.description"](): string;
    /**
      * `No provider keys`
      */
    ["com.blank.settings.workspace.byok.empty.title"](): string;
    /**
      * `Add a key to create the first route for this workspace. Provider rows are not shown until a key exists.`
      */
    ["com.blank.settings.workspace.byok.empty.description"](): string;
    /**
      * `Local`
      */
    ["com.blank.settings.workspace.byok.storage.local"](): string;
    /**
      * `Server`
      */
    ["com.blank.settings.workspace.byok.storage.server"](): string;
    /**
      * `Local (this device)`
      */
    ["com.blank.settings.workspace.byok.storage.local-this-device"](): string;
    /**
      * `Local (Desktop only)`
      */
    ["com.blank.settings.workspace.byok.storage.local-desktop-only"](): string;
    /**
      * `Disabled after failure`
      */
    ["com.blank.settings.workspace.byok.status.disabled-after-failure"](): string;
    /**
      * `Key verified`
      */
    ["com.blank.settings.workspace.byok.status.key-verified"](): string;
    /**
      * `Key test failed`
      */
    ["com.blank.settings.workspace.byok.status.key-test-failed"](): string;
    /**
      * `Text`
      */
    ["com.blank.settings.workspace.byok.capability.text"](): string;
    /**
      * `Image input`
      */
    ["com.blank.settings.workspace.byok.capability.image-input"](): string;
    /**
      * `Actions`
      */
    ["com.blank.settings.workspace.byok.capability.actions"](): string;
    /**
      * `Image generate`
      */
    ["com.blank.settings.workspace.byok.capability.image-generate"](): string;
    /**
      * `Transcript`
      */
    ["com.blank.settings.workspace.byok.capability.transcript"](): string;
    /**
      * `Indexing`
      */
    ["com.blank.settings.workspace.byok.capability.indexing"](): string;
    /**
      * `failed {{date}}`
      */
    ["com.blank.settings.workspace.byok.row.activity.failed"](options: {
        readonly date: string;
    }): string;
    /**
      * `used {{date}}`
      */
    ["com.blank.settings.workspace.byok.row.activity.used"](options: {
        readonly date: string;
    }): string;
    /**
      * `used today`
      */
    ["com.blank.settings.workspace.byok.row.activity.used-today"](): string;
    /**
      * `not used yet`
      */
    ["com.blank.settings.workspace.byok.row.activity.unused"](): string;
    /**
      * `Feature coverage`
      */
    ["com.blank.settings.workspace.byok.coverage.title"](): string;
    /**
      * `Writing and chat`
      */
    ["com.blank.settings.workspace.byok.feature.chat.title"](): string;
    /**
      * `Covered when an OpenAI, Anthropic, or Gemini BYOK key exists.`
      */
    ["com.blank.settings.workspace.byok.feature.chat.fallback"](): string;
    /**
      * `Actions and structured output`
      */
    ["com.blank.settings.workspace.byok.feature.action.title"](): string;
    /**
      * `Covered when an OpenAI or Gemini BYOK key exists.`
      */
    ["com.blank.settings.workspace.byok.feature.action.fallback"](): string;
    /**
      * `Image generation`
      */
    ["com.blank.settings.workspace.byok.feature.image.title"](): string;
    /**
      * `Covered when an OpenAI, Gemini, or FAL BYOK key exists.`
      */
    ["com.blank.settings.workspace.byok.feature.image.fallback"](): string;
    /**
      * `Transcript`
      */
    ["com.blank.settings.workspace.byok.feature.transcript.title"](): string;
    /**
      * `Covered when a server Gemini BYOK key exists.`
      */
    ["com.blank.settings.workspace.byok.feature.transcript.fallback"](): string;
    /**
      * `Workspace indexing`
      */
    ["com.blank.settings.workspace.byok.feature.workspace-indexing.title"](): string;
    /**
      * `Covered when a server Gemini BYOK key exists.`
      */
    ["com.blank.settings.workspace.byok.feature.workspace-indexing.fallback"](): string;
    /**
      * `Transcript and workspace indexing require a server Gemini BYOK key or Blank AI plan fallback.`
      */
    ["com.blank.settings.workspace.byok.warning.transcript"](): string;
    /**
      * `Workspace indexing requires a server Gemini BYOK key or Blank AI plan fallback.`
      */
    ["com.blank.settings.workspace.byok.warning.workspace-indexing"](): string;
    /**
      * `BYOK usage`
      */
    ["com.blank.settings.workspace.byok.usage.title"](): string;
    /**
      * `Last 30 days`
      */
    ["com.blank.settings.workspace.byok.usage.period"](): string;
    /**
      * `{{count}} tokens`
      */
    ["com.blank.settings.workspace.byok.usage.tokens"](options: {
        readonly count: string;
    }): string;
    /**
      * `Add provider key`
      */
    ["com.blank.settings.workspace.byok.modal.add-title"](): string;
    /**
      * `Edit provider key`
      */
    ["com.blank.settings.workspace.byok.modal.edit-title"](): string;
    /**
      * `Re-enter the API key and test it before saving changes.`
      */
    ["com.blank.settings.workspace.byok.modal.description"](): string;
    /**
      * `Provider`
      */
    ["com.blank.settings.workspace.byok.field.provider"](): string;
    /**
      * `Key name`
      */
    ["com.blank.settings.workspace.byok.field.key-name"](): string;
    /**
      * `Description`
      */
    ["com.blank.settings.workspace.byok.field.description"](): string;
    /**
      * `Key storage`
      */
    ["com.blank.settings.workspace.byok.field.storage"](): string;
    /**
      * `API key`
      */
    ["com.blank.settings.workspace.byok.field.api-key"](): string;
    /**
      * `Endpoint`
      */
    ["com.blank.settings.workspace.byok.field.endpoint"](): string;
    /**
      * `Primary`
      */
    ["com.blank.settings.workspace.byok.placeholder.key-name"](): string;
    /**
      * `Workspace fallback key`
      */
    ["com.blank.settings.workspace.byok.placeholder.description"](): string;
    /**
      * `Add key`
      */
    ["com.blank.settings.workspace.byok.action.add-key"](): string;
    /**
      * `Test key`
      */
    ["com.blank.settings.workspace.byok.action.test-key"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.settings.workspace.byok.action.cancel"](): string;
    /**
      * `Save key`
      */
    ["com.blank.settings.workspace.byok.action.save-key"](): string;
    /**
      * `Clear all BYOK keys`
      */
    ["com.blank.settings.workspace.byok.action.clear-all"](): string;
    /**
      * `Reorder`
      */
    ["com.blank.settings.workspace.byok.action.reorder"](): string;
    /**
      * `Edit`
      */
    ["com.blank.settings.workspace.byok.action.edit"](): string;
    /**
      * `Delete`
      */
    ["com.blank.settings.workspace.byok.action.delete"](): string;
    /**
      * `Key test failed`
      */
    ["com.blank.settings.workspace.byok.notify.test-failed.title"](): string;
    /**
      * `Local key not saved`
      */
    ["com.blank.settings.workspace.byok.notify.local-save-failed.title"](): string;
    /**
      * `Secure device storage is unavailable.`
      */
    ["com.blank.settings.workspace.byok.notify.local-save-failed.message"](): string;
    /**
      * `BYOK settings not loaded`
      */
    ["com.blank.settings.workspace.byok.notify.load-failed.title"](): string;
    /**
      * `BYOK key not saved`
      */
    ["com.blank.settings.workspace.byok.notify.save-failed.title"](): string;
    /**
      * `BYOK key not deleted`
      */
    ["com.blank.settings.workspace.byok.notify.delete-failed.title"](): string;
    /**
      * `BYOK keys not reordered`
      */
    ["com.blank.settings.workspace.byok.notify.reorder-failed.title"](): string;
    /**
      * `BYOK keys not cleared`
      */
    ["com.blank.settings.workspace.byok.notify.clear-failed.title"](): string;
    /**
      * `Please try again.`
      */
    ["com.blank.settings.workspace.byok.notify.operation-failed.message"](): string;
    /**
      * `Cannot reorder across storage`
      */
    ["com.blank.settings.workspace.byok.notify.cross-storage-reorder.title"](): string;
    /**
      * `Local keys and server keys keep separate fallback order.`
      */
    ["com.blank.settings.workspace.byok.notify.cross-storage-reorder.message"](): string;
    /**
      * `Experimental features`
      */
    ["com.blank.settings.workspace.experimental-features"](): string;
    /**
      * `Get started`
      */
    ["com.blank.settings.workspace.experimental-features.get-started"](): string;
    /**
      * `Experimental features`
      */
    ["com.blank.settings.workspace.experimental-features.header.plugins"](): string;
    /**
      * `Some features available for early access`
      */
    ["com.blank.settings.workspace.experimental-features.header.subtitle"](): string;
    /**
      * `I am aware of the risks, and I am willing to continue to use it.`
      */
    ["com.blank.settings.workspace.experimental-features.prompt-disclaimer"](): string;
    /**
      * `Do you want to use the plugin system that is in an experimental stage?`
      */
    ["com.blank.settings.workspace.experimental-features.prompt-header"](): string;
    /**
      * `You are about to enable an experimental feature. This feature is still in development and may contain errors or behave unpredictably. Please proceed with caution and at your own risk.`
      */
    ["com.blank.settings.workspace.experimental-features.prompt-warning"](): string;
    /**
      * `WARNING MESSAGE`
      */
    ["com.blank.settings.workspace.experimental-features.prompt-warning-title"](): string;
    /**
      * `Enable AI`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai.name"](): string;
    /**
      * `Enable or disable ALL AI features.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai.description"](): string;
    /**
      * `Enable AI Network Search`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-network-search.name"](): string;
    /**
      * `Enable or disable AI Network Search feature.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-network-search.description"](): string;
    /**
      * `Enable AI Model Switch`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-model-switch.name"](): string;
    /**
      * `Enable or disable AI model switch feature.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-model-switch.description"](): string;
    /**
      * `Enable AI Playground`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-playground.name"](): string;
    /**
      * `Enable or disable AI playground feature.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-playground.description"](): string;
    /**
      * `Database Full Width`
      */
    ["com.blank.settings.workspace.experimental-features.enable-database-full-width.name"](): string;
    /**
      * `The database will be displayed in full-width mode.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-database-full-width.description"](): string;
    /**
      * `Database Attachment Note`
      */
    ["com.blank.settings.workspace.experimental-features.enable-database-attachment-note.name"](): string;
    /**
      * `Allows adding notes to database attachments.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-database-attachment-note.description"](): string;
    /**
      * `Todo Block Query`
      */
    ["com.blank.settings.workspace.experimental-features.enable-block-query.name"](): string;
    /**
      * `Enables querying of todo blocks.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-block-query.description"](): string;
    /**
      * `Synced Doc Block`
      */
    ["com.blank.settings.workspace.experimental-features.enable-synced-doc-block.name"](): string;
    /**
      * `Enables syncing of doc blocks.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-synced-doc-block.description"](): string;
    /**
      * `Edgeless Text`
      */
    ["com.blank.settings.workspace.experimental-features.enable-edgeless-text.name"](): string;
    /**
      * `Enables edgeless text blocks.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-edgeless-text.description"](): string;
    /**
      * `Color Picker`
      */
    ["com.blank.settings.workspace.experimental-features.enable-color-picker.name"](): string;
    /**
      * `Enables color picker blocks.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-color-picker.description"](): string;
    /**
      * `AI Chat Block`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-chat-block.name"](): string;
    /**
      * `Enables AI chat blocks.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-chat-block.description"](): string;
    /**
      * `AI Onboarding`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-onboarding.name"](): string;
    /**
      * `Enables AI onboarding.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-onboarding.description"](): string;
    /**
      * `Mind Map Import`
      */
    ["com.blank.settings.workspace.experimental-features.enable-mind-map-import.name"](): string;
    /**
      * `Enables mind map import.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-mind-map-import.description"](): string;
    /**
      * `Block Meta`
      */
    ["com.blank.settings.workspace.experimental-features.enable-block-meta.name"](): string;
    /**
      * `Once enabled, all blocks will have created time, updated time, created by and updated by.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-block-meta.description"](): string;
    /**
      * `Callout`
      */
    ["com.blank.settings.workspace.experimental-features.enable-callout.name"](): string;
    /**
      * `Let your words stand out. This also include the callout in the transcription block.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-callout.description"](): string;
    /**
      * `Embed Iframe Block`
      */
    ["com.blank.settings.workspace.experimental-features.enable-embed-iframe-block.name"](): string;
    /**
      * `Enables Embed Iframe Block.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-embed-iframe-block.description"](): string;
    /**
      * `Emoji Folder Icon`
      */
    ["com.blank.settings.workspace.experimental-features.enable-emoji-folder-icon.name"](): string;
    /**
      * `Once enabled, you can use an emoji as the folder icon. When the first character of the folder name is an emoji, it will be extracted and used as its icon.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-emoji-folder-icon.description"](): string;
    /**
      * `Emoji Doc Icon`
      */
    ["com.blank.settings.workspace.experimental-features.enable-emoji-doc-icon.name"](): string;
    /**
      * `Once enabled, you can use an emoji as the doc icon. When the first character of the doc name is an emoji, it will be extracted and used as its icon.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-emoji-doc-icon.description"](): string;
    /**
      * `Editor Settings`
      */
    ["com.blank.settings.workspace.experimental-features.enable-editor-settings.name"](): string;
    /**
      * `Enables editor settings.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-editor-settings.description"](): string;
    /**
      * `Theme Editor`
      */
    ["com.blank.settings.workspace.experimental-features.enable-theme-editor.name"](): string;
    /**
      * `Enables theme editor.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-theme-editor.description"](): string;
    /**
      * `Allow create local workspace`
      */
    ["com.blank.settings.workspace.experimental-features.enable-local-workspace.name"](): string;
    /**
      * `Allow create local workspace`
      */
    ["com.blank.settings.workspace.experimental-features.enable-local-workspace.description"](): string;
    /**
      * `Advanced block visibility control`
      */
    ["com.blank.settings.workspace.experimental-features.enable-advanced-block-visibility.name"](): string;
    /**
      * `To provide detailed control over which edgeless blocks are visible in page mode.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-advanced-block-visibility.description"](): string;
    /**
      * `Mobile Keyboard Toolbar`
      */
    ["com.blank.settings.workspace.experimental-features.enable-mobile-keyboard-toolbar.name"](): string;
    /**
      * `Enables the mobile keyboard toolbar.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-mobile-keyboard-toolbar.description"](): string;
    /**
      * `Mobile Linked Doc Widget`
      */
    ["com.blank.settings.workspace.experimental-features.enable-mobile-linked-doc-menu.name"](): string;
    /**
      * `Enables the mobile linked doc menu.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-mobile-linked-doc-menu.description"](): string;
    /**
      * `Enable Snapshot Import Export`
      */
    ["com.blank.settings.workspace.experimental-features.enable-snapshot-import-export.name"](): string;
    /**
      * `Once enabled, users can import and export blocksuite snapshots.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-snapshot-import-export.description"](): string;
    /**
      * `Enable Edgeless Editing`
      */
    ["com.blank.settings.workspace.experimental-features.enable-mobile-edgeless-editing.name"](): string;
    /**
      * `Once enabled, users can edit edgeless canvas.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-mobile-edgeless-editing.description"](): string;
    /**
      * `PDF embed preview`
      */
    ["com.blank.settings.workspace.experimental-features.enable-pdf-embed-preview.name"](): string;
    /**
      * `Once enabled, you can preview PDF in embed view.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-pdf-embed-preview.description"](): string;
    /**
      * `Audio block`
      */
    ["com.blank.settings.workspace.experimental-features.enable-audio-block.name"](): string;
    /**
      * `Audio block allows you to play audio files globally and add notes to them.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-audio-block.description"](): string;
    /**
      * `Meetings`
      */
    ["com.blank.settings.workspace.experimental-features.enable-meetings.name"](): string;
    /**
      * `Meetings allows you to record and transcribe meetings. Don't forget to enable it in Blank settings.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-meetings.description"](): string;
    /**
      * `Editor RTL`
      */
    ["com.blank.settings.workspace.experimental-features.enable-editor-rtl.name"](): string;
    /**
      * `Once enabled, the editor will be displayed in RTL mode.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-editor-rtl.description"](): string;
    /**
      * `Edgeless scribbled style`
      */
    ["com.blank.settings.workspace.experimental-features.enable-edgeless-scribbled-style.name"](): string;
    /**
      * `Once enabled, you can use scribbled style in edgeless mode.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-edgeless-scribbled-style.description"](): string;
    /**
      * `Database block table view virtual scroll`
      */
    ["com.blank.settings.workspace.experimental-features.enable-table-virtual-scroll.name"](): string;
    /**
      * `Once enabled, switch table view to virtual scroll mode in Database Block.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-table-virtual-scroll.description"](): string;
    /**
      * `Code block HTML preview`
      */
    ["com.blank.settings.workspace.experimental-features.enable-code-block-html-preview.name"](): string;
    /**
      * `Once enabled, you can preview HTML in code block.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-code-block-html-preview.description"](): string;
    /**
      * `Adapter Panel`
      */
    ["com.blank.settings.workspace.experimental-features.enable-adapter-panel.name"](): string;
    /**
      * `Once enabled, you can preview adapter export content in the right side bar.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-adapter-panel.description"](): string;
    /**
      * `Send detailed object information to AI`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-send-detailed-object.name"](): string;
    /**
      * `When toggled off, every time you choose "Continue with AI", AI only got a screenshot.`
      */
    ["com.blank.settings.workspace.experimental-features.enable-ai-send-detailed-object.description"](): string;
    /**
      * `Only an owner can edit the workspace avatar and name. Changes will be shown for everyone.`
      */
    ["com.blank.settings.workspace.not-owner"](): string;
    /**
      * `Preference`
      */
    ["com.blank.settings.workspace.preferences"](): string;
    /**
      * `Team's Billing`
      */
    ["com.blank.settings.workspace.billing"](): string;
    /**
      * `Team Workspace`
      */
    ["com.blank.settings.workspace.billing.team-workspace"](): string;
    /**
      * `Your workspace is in a free trail period.`
      */
    ["com.blank.settings.workspace.billing.team-workspace.description.free-trail"](): string;
    /**
      * `Your workspace is billed annually.`
      */
    ["com.blank.settings.workspace.billing.team-workspace.description.billed.annually"](): string;
    /**
      * `Your workspace is billed monthly.`
      */
    ["com.blank.settings.workspace.billing.team-workspace.description.billed.monthly"](): string;
    /**
      * `Your subscription will end on {{date}}`
      */
    ["com.blank.settings.workspace.billing.team-workspace.not-renewed"](options: {
        readonly date: string;
    }): string;
    /**
      * `Next billing date: {{date}}`
      */
    ["com.blank.settings.workspace.billing.team-workspace.next-billing-date"](options: {
        readonly date: string;
    }): string;
    /**
      * `Cancel Plan`
      */
    ["com.blank.settings.workspace.billing.team-workspace.cancel-plan"](): string;
    /**
      * `License`
      */
    ["com.blank.settings.workspace.license"](): string;
    /**
      * `Manage license information and invoices for the self host team workspace.`
      */
    ["com.blank.settings.workspace.license.description"](): string;
    /**
      * `Get teams plan for your self hosted workspace.`
      */
    ["com.blank.settings.workspace.license.benefit.team.title"](): string;
    /**
      * `Need more seats? Best for scalable teams.`
      */
    ["com.blank.settings.workspace.license.benefit.team.subtitle"](): string;
    /**
      * `Everything in Self Hosted FOSS`
      */
    ["com.blank.settings.workspace.license.benefit.team.g1"](): string;
    /**
      * `{{initialQuota}} initial storage + {{quotaPerSeat}} per seat`
      */
    ["com.blank.settings.workspace.license.benefit.team.g2"](options: Readonly<{
        initialQuota: string;
        quotaPerSeat: string;
    }>): string;
    /**
      * `{{quota}} of maximum file size`
      */
    ["com.blank.settings.workspace.license.benefit.team.g3"](options: {
        readonly quota: string;
    }): string;
    /**
      * `Unlimited team members (10+ seats)`
      */
    ["com.blank.settings.workspace.license.benefit.team.g4"](): string;
    /**
      * `Multiple admin roles`
      */
    ["com.blank.settings.workspace.license.benefit.team.g5"](): string;
    /**
      * `Priority customer support`
      */
    ["com.blank.settings.workspace.license.benefit.team.g6"](): string;
    /**
      * `Lean more`
      */
    ["com.blank.settings.workspace.license.lean-more"](): string;
    /**
      * `Selfhosted workspace`
      */
    ["com.blank.settings.workspace.license.self-host"](): string;
    /**
      * `Self-host Team Workspace`
      */
    ["com.blank.settings.workspace.license.self-host-team"](): string;
    /**
      * `This license will expire on {{expirationDate}}, with {{leftDays}} days remaining.`
      */
    ["com.blank.settings.workspace.license.self-host-team.team.description"](options: Readonly<{
        expirationDate: string;
        leftDays: string;
    }>): string;
    /**
      * `Basic version: {{memberCount}} seats. For more, purchase or use activation key.`
      */
    ["com.blank.settings.workspace.license.self-host-team.free.description"](options: {
        readonly memberCount: string;
    }): string;
    /**
      * `Seats`
      */
    ["com.blank.settings.workspace.license.self-host-team.seats"](): string;
    /**
      * `Use purchased key`
      */
    ["com.blank.settings.workspace.license.self-host-team.use-purchased-key"](): string;
    /**
      * `Upload license file`
      */
    ["com.blank.settings.workspace.license.self-host-team.upload-license-file"](): string;
    /**
      * `Upload license file locally and verify the license information.`
      */
    ["com.blank.settings.workspace.license.self-host-team.upload-license-file.description"](): string;
    /**
      * `To purchase a license:`
      */
    ["com.blank.settings.workspace.license.self-host-team.upload-license-file.tips.title"](): string;
    /**
      * `Workspace id`
      */
    ["com.blank.settings.workspace.license.self-host-team.upload-license-file.tips.workspace-id"](): string;
    /**
      * `Click to upload`
      */
    ["com.blank.settings.workspace.license.self-host-team.upload-license-file.click-to-upload"](): string;
    /**
      * `Activation failed`
      */
    ["com.blank.settings.workspace.license.self-host-team.upload-license-file.failed"](): string;
    /**
      * `Activation Success`
      */
    ["com.blank.settings.workspace.license.self-host-team.upload-license-file.success.title"](): string;
    /**
      * `License has been successfully applied`
      */
    ["com.blank.settings.workspace.license.self-host-team.upload-license-file.success.description"](): string;
    /**
      * `If you encounter any issues, open a GitHub issue on the Blank repository.`
      */
    ["com.blank.settings.workspace.license.self-host-team.upload-license-file.help"](): string;
    /**
      * `Deactivate`
      */
    ["com.blank.settings.workspace.license.self-host-team.deactivate-license"](): string;
    /**
      * `Replace your license file`
      */
    ["com.blank.settings.workspace.license.self-host-team.replace-license.title"](): string;
    /**
      * `Replace the existing license file with a new, updated version.`
      */
    ["com.blank.settings.workspace.license.self-host-team.replace-license.description"](): string;
    /**
      * `Upload license file`
      */
    ["com.blank.settings.workspace.license.self-host-team.replace-license.upload"](): string;
    /**
      * `Buy more seat`
      */
    ["com.blank.settings.workspace.license.buy-more-seat"](): string;
    /**
      * `Activate License`
      */
    ["com.blank.settings.workspace.license.activate-modal.title"](): string;
    /**
      * `Enter license key to activate this self host workspace.`
      */
    ["com.blank.settings.workspace.license.activate-modal.description"](): string;
    /**
      * `License activated successfully.`
      */
    ["com.blank.settings.workspace.license.activate-success"](): string;
    /**
      * `Confirm deactivation?`
      */
    ["com.blank.settings.workspace.license.deactivate-modal.title"](): string;
    /**
      * `After deactivation, you will need to upload a new license to continue using team feature`
      */
    ["com.blank.settings.workspace.license.deactivate-modal.description-license"](): string;
    /**
      * `Manage Payment`
      */
    ["com.blank.settings.workspace.license.deactivate-modal.manage-payment"](): string;
    /**
      * `License deactivated successfully.`
      */
    ["com.blank.settings.workspace.license.deactivate-success"](): string;
    /**
      * `Local`
      */
    ["com.blank.settings.workspace.state.local"](): string;
    /**
      * `Sync with Blank Cloud`
      */
    ["com.blank.settings.workspace.state.sync-blank-cloud"](): string;
    /**
      * `Self-Hosted Server`
      */
    ["com.blank.settings.workspace.state.self-hosted"](): string;
    /**
      * `Joined Workspace`
      */
    ["com.blank.settings.workspace.state.joined"](): string;
    /**
      * `Available Offline`
      */
    ["com.blank.settings.workspace.state.available-offline"](): string;
    /**
      * `Published to Web`
      */
    ["com.blank.settings.workspace.state.published"](): string;
    /**
      * `Team Workspace`
      */
    ["com.blank.settings.workspace.state.team"](): string;
    /**
      * `Properties`
      */
    ["com.blank.settings.workspace.properties"](): string;
    /**
      * `Add property`
      */
    ["com.blank.settings.workspace.properties.add_property"](): string;
    /**
      * `All`
      */
    ["com.blank.settings.workspace.properties.all"](): string;
    /**
      * `Delete property`
      */
    ["com.blank.settings.workspace.properties.delete-property"](): string;
    /**
      * `Edit property`
      */
    ["com.blank.settings.workspace.properties.edit-property"](): string;
    /**
      * `General properties`
      */
    ["com.blank.settings.workspace.properties.general-properties"](): string;
    /**
      * `Properties`
      */
    ["com.blank.settings.workspace.properties.header.title"](): string;
    /**
      * `In use`
      */
    ["com.blank.settings.workspace.properties.in-use"](): string;
    /**
      * `Readonly properties`
      */
    ["com.blank.settings.workspace.properties.readonly-properties"](): string;
    /**
      * `Required properties`
      */
    ["com.blank.settings.workspace.properties.required-properties"](): string;
    /**
      * `Set as required property`
      */
    ["com.blank.settings.workspace.properties.set-as-required"](): string;
    /**
      * `Unused`
      */
    ["com.blank.settings.workspace.properties.unused"](): string;
    /**
      * `You can view current workspace's storage and files here.`
      */
    ["com.blank.settings.workspace.storage.subtitle"](): string;
    /**
      * `Enable Blank Cloud to publish this workspace`
      */
    ["com.blank.settings.workspace.publish-tooltip"](): string;
    /**
      * `Sharing`
      */
    ["com.blank.settings.workspace.sharing.title"](): string;
    /**
      * `Allow URL unfurling by Slack & other social apps, even if a doc is only accessible by workspace members.`
      */
    ["com.blank.settings.workspace.sharing.url-preview.description"](): string;
    /**
      * `Always enable url preview`
      */
    ["com.blank.settings.workspace.sharing.url-preview.title"](): string;
    /**
      * `Control whether pages in this workspace can be shared publicly. Turn off to block new shares and external access for existing shares.`
      */
    ["com.blank.settings.workspace.sharing.workspace-sharing.description"](): string;
    /**
      * `Allow workspace page sharing`
      */
    ["com.blank.settings.workspace.sharing.workspace-sharing.title"](): string;
    /**
      * `Blank AI`
      */
    ["com.blank.settings.workspace.blank-ai.title"](): string;
    /**
      * `Allow Blank AI Assistant`
      */
    ["com.blank.settings.workspace.blank-ai.label"](): string;
    /**
      * `Allow workspace members to use Blank AI features. This setting doesn't affect billing. Workspace members use Blank AI through their personal accounts.`
      */
    ["com.blank.settings.workspace.blank-ai.description"](): string;
    /**
      * `Archived workspaces`
      */
    ["com.blank.settings.workspace.backup"](): string;
    /**
      * `Manage archived local workspace files`
      */
    ["com.blank.settings.workspace.backup.subtitle"](): string;
    /**
      * `No archived workspace files found`
      */
    ["com.blank.settings.workspace.backup.empty"](): string;
    /**
      * `Delete archived workspace`
      */
    ["com.blank.settings.workspace.backup.delete"](): string;
    /**
      * `Are you sure you want to delete this workspace. This action cannot be undone. Make sure you no longer need them before proceeding.`
      */
    ["com.blank.settings.workspace.backup.delete.warning"](): string;
    /**
      * `Workspace backup deleted successfully`
      */
    ["com.blank.settings.workspace.backup.delete.success"](): string;
    /**
      * `Workspace enabled successfully`
      */
    ["com.blank.settings.workspace.backup.import.success"](): string;
    /**
      * `Enable local workspace`
      */
    ["com.blank.settings.workspace.backup.import"](): string;
    /**
      * `Open`
      */
    ["com.blank.settings.workspace.backup.import.success.action"](): string;
    /**
      * `Deleted on {{date}} at {{time}}`
      */
    ["com.blank.settings.workspace.backup.delete-at"](options: Readonly<{
        date: string;
        time: string;
    }>): string;
    /**
      * `Indexer & Embedding`
      */
    ["com.blank.settings.workspace.indexer-embedding.title"](): string;
    /**
      * `Manage Blank indexing and Blank AI Embedding for local content processing`
      */
    ["com.blank.settings.workspace.indexer-embedding.description"](): string;
    /**
      * `Embedding`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.title"](): string;
    /**
      * `Embedding allows AI to retrieve your content. If the indexer uses local settings, it may affect some of the results of the Embedding.`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.description"](): string;
    /**
      * `Only the workspace owner can enable Workspace Embedding.`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.disabled-tooltip"](): string;
    /**
      * `Select doc`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.select-doc"](): string;
    /**
      * `Upload file`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.upload-file"](): string;
    /**
      * `Workspace Embedding`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.switch.title"](): string;
    /**
      * `AI can call files embedded in the workspace.`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.switch.description"](): string;
    /**
      * `Failed to update workspace doc embedding enabled`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.switch.error"](): string;
    /**
      * `Failed to remove attachment from embedding`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.remove-attachment.error"](): string;
    /**
      * `Failed to update ignored docs`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.update-ignored-docs.error"](): string;
    /**
      * `Embedding progress`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.progress.title"](): string;
    /**
      * `Syncing`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.progress.syncing"](): string;
    /**
      * `Synced`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.progress.synced"](): string;
    /**
      * `Loading sync status...`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.progress.loading-sync-status"](): string;
    /**
      * `Ignore Docs`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.ignore-docs.title"](): string;
    /**
      * `The Ignored docs will not be embedded into the current workspace.`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.ignore-docs.description"](): string;
    /**
      * `Additional attachments`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.additional-attachments.title"](): string;
    /**
      * `The uploaded file will be embedded in the current workspace.`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.additional-attachments.description"](): string;
    /**
      * `Remove the attachment from embedding?`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.additional-attachments.remove-attachment.title"](): string;
    /**
      * `Attachment will be removed. AI will not continue to extract content from this attachment.`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.additional-attachments.remove-attachment.description"](): string;
    /**
      * `Delete File`
      */
    ["com.blank.settings.workspace.indexer-embedding.embedding.additional-attachments.remove-attachment.tooltip"](): string;
    /**
      * `Sharing doc requires Blank Cloud.`
      */
    ["com.blank.share-menu.EnableCloudDescription"](): string;
    /**
      * `Share mode`
      */
    ["com.blank.share-menu.ShareMode"](): string;
    /**
      * `Share doc`
      */
    ["com.blank.share-menu.SharePage"](): string;
    /**
      * `General access`
      */
    ["com.blank.share-menu.generalAccess"](): string;
    /**
      * `Share via export`
      */
    ["com.blank.share-menu.ShareViaExport"](): string;
    /**
      * `Download a static copy of your doc to share with others`
      */
    ["com.blank.share-menu.ShareViaExportDescription"](): string;
    /**
      * `Print a paper copy`
      */
    ["com.blank.share-menu.ShareViaPrintDescription"](): string;
    /**
      * `Share with link`
      */
    ["com.blank.share-menu.ShareWithLink"](): string;
    /**
      * `Create a link you can easily share with anyone. The visitors will open your doc in the form od a document`
      */
    ["com.blank.share-menu.ShareWithLinkDescription"](): string;
    /**
      * `Shared doc`
      */
    ["com.blank.share-menu.SharedPage"](): string;
    /**
      * `Copy Link`
      */
    ["com.blank.share-menu.copy"](): string;
    /**
      * `Copy private link`
      */
    ["com.blank.share-menu.copy-private-link"](): string;
    /**
      * `Copy Link to Selected Block`
      */
    ["com.blank.share-menu.copy.block"](): string;
    /**
      * `Copy Link to Edgeless Mode`
      */
    ["com.blank.share-menu.copy.edgeless"](): string;
    /**
      * `Copy Link to Selected Frame`
      */
    ["com.blank.share-menu.copy.frame"](): string;
    /**
      * `Copy Link to Page Mode`
      */
    ["com.blank.share-menu.copy.page"](): string;
    /**
      * `You can share this document with link.`
      */
    ["com.blank.share-menu.create-public-link.notification.success.message"](): string;
    /**
      * `Public link created`
      */
    ["com.blank.share-menu.create-public-link.notification.success.title"](): string;
    /**
      * `Please try again later.`
      */
    ["com.blank.share-menu.disable-publish-link.notification.fail.message"](): string;
    /**
      * `Failed to disable public link`
      */
    ["com.blank.share-menu.disable-publish-link.notification.fail.title"](): string;
    /**
      * `This doc is no longer shared publicly.`
      */
    ["com.blank.share-menu.disable-publish-link.notification.success.message"](): string;
    /**
      * `Public link disabled`
      */
    ["com.blank.share-menu.disable-publish-link.notification.success.title"](): string;
    /**
      * `Manage workspace members`
      */
    ["com.blank.share-menu.navigate.workspace"](): string;
    /**
      * `Anyone with the link`
      */
    ["com.blank.share-menu.option.link.label"](): string;
    /**
      * `No access`
      */
    ["com.blank.share-menu.option.link.no-access"](): string;
    /**
      * `Only workspace members can access this link`
      */
    ["com.blank.share-menu.option.link.no-access.description"](): string;
    /**
      * `Read only`
      */
    ["com.blank.share-menu.option.link.readonly"](): string;
    /**
      * `Anyone can access this link`
      */
    ["com.blank.share-menu.option.link.readonly.description"](): string;
    /**
      * `Sharing for this workspace is turned off. Please contact an admin to enable it.`
      */
    ["com.blank.share-menu.workspace-sharing.disabled.tooltip"](): string;
    /**
      * `Can manage`
      */
    ["com.blank.share-menu.option.permission.can-manage"](): string;
    /**
      * `Can edit`
      */
    ["com.blank.share-menu.option.permission.can-edit"](): string;
    /**
      * `Can read`
      */
    ["com.blank.share-menu.option.permission.can-read"](): string;
    /**
      * `No access`
      */
    ["com.blank.share-menu.option.permission.no-access"](): string;
    /**
      * `Members in workspace`
      */
    ["com.blank.share-menu.option.permission.label"](): string;
    /**
      * `Workspace admins and owner automatically have Can manage permissions.`
      */
    ["com.blank.share-menu.option.permission.tips"](): string;
    /**
      * `Publish to web`
      */
    ["com.blank.share-menu.publish-to-web"](): string;
    /**
      * `Share privately`
      */
    ["com.blank.share-menu.share-privately"](): string;
    /**
      * `Share`
      */
    ["com.blank.share-menu.shareButton"](): string;
    /**
      * `Shared`
      */
    ["com.blank.share-menu.sharedButton"](): string;
    /**
      * `{{member1}} and {{member2}} are in this doc`
      */
    ["com.blank.share-menu.member-management.member-count-2"](options: Readonly<{
        member1: string;
        member2: string;
    }>): string;
    /**
      * `{{member1}}, {{member2}} and {{member3}} are in this doc`
      */
    ["com.blank.share-menu.member-management.member-count-3"](options: Readonly<{
        member1: string;
        member2: string;
        member3: string;
    }>): string;
    /**
      * `{{member1}}, {{member2}} and {{memberCount}} others`
      */
    ["com.blank.share-menu.member-management.member-count-more"](options: Readonly<{
        member1: string;
        member2: string;
        memberCount: string;
    }>): string;
    /**
      * `Remove`
      */
    ["com.blank.share-menu.member-management.remove"](): string;
    /**
      * `Set as owner`
      */
    ["com.blank.share-menu.member-management.set-as-owner"](): string;
    /**
      * `Make this person the owner?`
      */
    ["com.blank.share-menu.member-management.set-as-owner.confirm.title"](): string;
    /**
      * `The new owner will be effective immediately, and you might lose access to this doc if other users remove you, please confirm.`
      */
    ["com.blank.share-menu.member-management.set-as-owner.confirm.description"](): string;
    /**
      * `Permission updated`
      */
    ["com.blank.share-menu.member-management.update-success"](): string;
    /**
      * `Failed to update permission`
      */
    ["com.blank.share-menu.member-management.update-fail"](): string;
    /**
      * `{{memberCount}} collaborators in the doc`
      */
    ["com.blank.share-menu.member-management.header"](options: {
        readonly memberCount: string;
    }): string;
    /**
      * `Add collaborators`
      */
    ["com.blank.share-menu.member-management.add-collaborators"](): string;
    /**
      * `Send invite`
      */
    ["com.blank.share-menu.invite-editor.header"](): string;
    /**
      * `Manage members`
      */
    ["com.blank.share-menu.invite-editor.manage-members"](): string;
    /**
      * `Invite`
      */
    ["com.blank.share-menu.invite-editor.invite"](): string;
    /**
      * `No results found`
      */
    ["com.blank.share-menu.invite-editor.no-found"](): string;
    /**
      * `Invite other members`
      */
    ["com.blank.share-menu.invite-editor.placeholder"](): string;
    /**
      * `Notify via Email`
      */
    ["com.blank.share-menu.invite-editor.sent-email"](): string;
    /**
      * `Permission not available in Free plan`
      */
    ["com.blank.share-menu.paywall.owner.title"](): string;
    /**
      * `Upgrade to Pro or higher to unlock permission settings for this doc.`
      */
    ["com.blank.share-menu.paywall.owner.description"](): string;
    /**
      * `Upgrade`
      */
    ["com.blank.share-menu.paywall.owner.confirm"](): string;
    /**
      * `Permission requires a workspace upgrade`
      */
    ["com.blank.share-menu.paywall.member.title"](): string;
    /**
      * `Ask your workspace owner to upgrade to Pro or higher to enable permissions.`
      */
    ["com.blank.share-menu.paywall.member.description"](): string;
    /**
      * `Got it`
      */
    ["com.blank.share-menu.paywall.member.confirm"](): string;
    /**
      * `Built with`
      */
    ["com.blank.share-page.footer.built-with"](): string;
    /**
      * `Create with`
      */
    ["com.blank.share-page.footer.create-with"](): string;
    /**
      * `Empower your sharing with Blank Cloud: One-click doc sharing`
      */
    ["com.blank.share-page.footer.description"](): string;
    /**
      * `Get started for free`
      */
    ["com.blank.share-page.footer.get-started"](): string;
    /**
      * `Use This Template`
      */
    ["com.blank.share-page.header.import-template"](): string;
    /**
      * `Login or Sign Up`
      */
    ["com.blank.share-page.header.login"](): string;
    /**
      * `Present`
      */
    ["com.blank.share-page.header.present"](): string;
    /**
      * `Edgeless`
      */
    ["com.blank.shortcutsTitle.edgeless"](): string;
    /**
      * `General`
      */
    ["com.blank.shortcutsTitle.general"](): string;
    /**
      * `Markdown syntax`
      */
    ["com.blank.shortcutsTitle.markdownSyntax"](): string;
    /**
      * `Page`
      */
    ["com.blank.shortcutsTitle.page"](): string;
    /**
      * `Collapse sidebar`
      */
    ["com.blank.sidebarSwitch.collapse"](): string;
    /**
      * `Expand sidebar`
      */
    ["com.blank.sidebarSwitch.expand"](): string;
    /**
      * `Snapshot Imp. & Exp.`
      */
    ["com.blank.snapshot.import-export.enable"](): string;
    /**
      * `Once enabled you can find the Snapshot Export Import option in the document's More menu.`
      */
    ["com.blank.snapshot.import-export.enable.desc"](): string;
    /**
      * `Maybe later`
      */
    ["com.blank.star-blank.cancel"](): string;
    /**
      * `Star on GitHub`
      */
    ["com.blank.star-blank.confirm"](): string;
    /**
      * `Are you finding our app useful and enjoyable? We'd love your support to keep improving! A great way to help us out is by giving us a star on GitHub. This simple action can make a big difference and helps us continue to deliver the best experience for you.`
      */
    ["com.blank.star-blank.description"](): string;
    /**
      * `Star us on GitHub`
      */
    ["com.blank.star-blank.title"](): string;
    /**
      * `Change plan`
      */
    ["com.blank.storage.change-plan"](): string;
    /**
      * `You have reached the maximum capacity limit for your current account`
      */
    ["com.blank.storage.maximum-tips"](): string;
    /**
      * `Pro users will have unlimited storage capacity during the alpha test period of the team version`
      */
    ["com.blank.storage.maximum-tips.pro"](): string;
    /**
      * `Plan`
      */
    ["com.blank.storage.plan"](): string;
    /**
      * `Blank Cloud storage`
      */
    ["com.blank.storage.title"](): string;
    /**
      * `Upgrade`
      */
    ["com.blank.storage.upgrade"](): string;
    /**
      * `Space used`
      */
    ["com.blank.storage.used.hint"](): string;
    /**
      * `Syncing`
      */
    ["com.blank.syncing"](): string;
    /**
      * `{{count}} doc`
    
      * - com.blank.tags.count_one: `{{count}} doc`
    
      * - com.blank.tags.count_other: `{{count}} docs`
    
      * - com.blank.tags.count_zero: `{{count}} doc`
      */
    ["com.blank.tags.count"](options: {
        readonly count: string | number | bigint;
    }): string;
    /**
      * `{{count}} doc`
      */
    ["com.blank.tags.count_one"](options: {
        readonly count: string | number | bigint;
    }): string;
    /**
      * `{{count}} docs`
      */
    ["com.blank.tags.count_other"](options: {
        readonly count: string | number | bigint;
    }): string;
    /**
      * `{{count}} doc`
      */
    ["com.blank.tags.count_zero"](options: {
        readonly count: string | number | bigint;
    }): string;
    /**
      * `Type tag name here...`
      */
    ["com.blank.tags.create-tag.placeholder"](): string;
    /**
      * `Tag already exists`
      */
    ["com.blank.tags.create-tag.toast.exist"](): string;
    /**
      * `Tag created`
      */
    ["com.blank.tags.create-tag.toast.success"](): string;
    /**
      * `Tag deleted`
      */
    ["com.blank.tags.delete-tags.toast"](): string;
    /**
      * `Tag updated`
      */
    ["com.blank.tags.edit-tag.toast.success"](): string;
    /**
      * `New tag`
      */
    ["com.blank.tags.empty.new-tag-button"](): string;
    /**
      * `Enable telemetry`
      */
    ["com.blank.telemetry.enable"](): string;
    /**
      * `Telemetry is a feature that allows us to collect data on how you use the app. This data helps us improve the app and provide better features.`
      */
    ["com.blank.telemetry.enable.desc"](): string;
    /**
      * `Dark`
      */
    ["com.blank.themeSettings.dark"](): string;
    /**
      * `Light`
      */
    ["com.blank.themeSettings.light"](): string;
    /**
      * `Gray`
      */
    ["com.blank.themeSettings.gray"](): string;
    /**
      * `Paper`
      */
    ["com.blank.themeSettings.paper"](): string;
    /**
      * `System`
      */
    ["com.blank.themeSettings.system"](): string;
    /**
      * `Auto`
      */
    ["com.blank.themeSettings.auto"](): string;
    /**
      * `now`
      */
    ["com.blank.time.now"](): string;
    /**
      * `this month`
      */
    ["com.blank.time.this-mouth"](): string;
    /**
      * `this week`
      */
    ["com.blank.time.this-week"](): string;
    /**
      * `this year`
      */
    ["com.blank.time.this-year"](): string;
    /**
      * `today`
      */
    ["com.blank.time.today"](): string;
    /**
      * `Successfully added linked doc`
      */
    ["com.blank.toastMessage.addLinkedPage"](): string;
    /**
      * `Added to favorites`
      */
    ["com.blank.toastMessage.addedFavorites"](): string;
    /**
      * `Edgeless mode`
      */
    ["com.blank.toastMessage.edgelessMode"](): string;
    /**
      * `Moved to trash`
      */
    ["com.blank.toastMessage.movedTrash"](): string;
    /**
      * `Page Mode`
      */
    ["com.blank.toastMessage.pageMode"](): string;
    /**
      * `Default mode has changed`
      */
    ["com.blank.toastMessage.defaultMode.page.title"](): string;
    /**
      * `The default mode for this document has been changed to Page mode`
      */
    ["com.blank.toastMessage.defaultMode.page.message"](): string;
    /**
      * `Default mode has changed`
      */
    ["com.blank.toastMessage.defaultMode.edgeless.title"](): string;
    /**
      * `The default mode for this document has been changed to Edgeless mode`
      */
    ["com.blank.toastMessage.defaultMode.edgeless.message"](): string;
    /**
      * `Permanently deleted`
      */
    ["com.blank.toastMessage.permanentlyDeleted"](): string;
    /**
      * `Removed from favourites`
      */
    ["com.blank.toastMessage.removedFavorites"](): string;
    /**
      * `Successfully renamed`
      */
    ["com.blank.toastMessage.rename"](): string;
    /**
      * `{{title}} restored`
      */
    ["com.blank.toastMessage.restored"](options: {
        readonly title: string;
    }): string;
    /**
      * `Successfully deleted`
      */
    ["com.blank.toastMessage.successfullyDeleted"](): string;
    /**
      * `Today`
      */
    ["com.blank.today"](): string;
    /**
      * `Tomorrow`
      */
    ["com.blank.tomorrow"](): string;
    /**
      * `Last {{weekday}}`
      */
    ["com.blank.last-week"](options: {
        readonly weekday: string;
    }): string;
    /**
      * `Next {{weekday}}`
      */
    ["com.blank.next-week"](options: {
        readonly weekday: string;
    }): string;
    /**
      * `Limited to view-only on mobile.`
      */
    ["com.blank.top-tip.mobile"](): string;
    /**
      * `Delete`
      */
    ["com.blank.trashOperation.delete"](): string;
    /**
      * `Once deleted, you can't undo this action. Do you confirm?`
      */
    ["com.blank.trashOperation.delete.description"](): string;
    /**
      * `Permanently delete`
      */
    ["com.blank.trashOperation.delete.title"](): string;
    /**
      * `Once deleted, you can't undo this action. Do you confirm?`
      */
    ["com.blank.trashOperation.deleteDescription"](): string;
    /**
      * `Delete permanently`
      */
    ["com.blank.trashOperation.deletePermanently"](): string;
    /**
      * `Restore it`
      */
    ["com.blank.trashOperation.restoreIt"](): string;
    /**
      * `Refresh current page`
      */
    ["com.blank.upgrade.button-text.done"](): string;
    /**
      * `Data upgrade error`
      */
    ["com.blank.upgrade.button-text.error"](): string;
    /**
      * `Upgrade workspace data`
      */
    ["com.blank.upgrade.button-text.pending"](): string;
    /**
      * `Upgrading`
      */
    ["com.blank.upgrade.button-text.upgrading"](): string;
    /**
      * `After upgrading the workspace data, please refresh the page to see the changes.`
      */
    ["com.blank.upgrade.tips.done"](): string;
    /**
      * `We encountered some errors while upgrading the workspace data.`
      */
    ["com.blank.upgrade.tips.error"](): string;
    /**
      * `To ensure compatibility with the updated Blank client, please upgrade your data by clicking the "Upgrade workspace data" button below.`
      */
    ["com.blank.upgrade.tips.normal"](): string;
    /**
      * `AI usage`
      */
    ["com.blank.user-info.usage.ai"](): string;
    /**
      * `Cloud storage`
      */
    ["com.blank.user-info.usage.cloud"](): string;
    /**
      * `Close`
      */
    ["com.blank.workbench.split-view-menu.close"](): string;
    /**
      * `Full screen`
      */
    ["com.blank.workbench.split-view-menu.full-screen"](): string;
    /**
      * `Solo view`
      */
    ["com.blank.workbench.split-view-menu.keep-this-one"](): string;
    /**
      * `Move left`
      */
    ["com.blank.workbench.split-view-menu.move-left"](): string;
    /**
      * `Move right`
      */
    ["com.blank.workbench.split-view-menu.move-right"](): string;
    /**
      * `Open in split view`
      */
    ["com.blank.workbench.split-view.page-menu-open"](): string;
    /**
      * `Open in new tab`
      */
    ["com.blank.workbench.tab.page-menu-open"](): string;
    /**
      * `You cannot delete the last workspace`
      */
    ["com.blank.workspace.cannot-delete"](): string;
    /**
      * `Cloud workspaces`
      */
    ["com.blank.workspace.cloud"](): string;
    /**
      * `Sign out`
      */
    ["com.blank.workspace.cloud.account.logout"](): string;
    /**
      * `Account settings`
      */
    ["com.blank.workspace.cloud.account.settings"](): string;
    /**
      * `Admin panel`
      */
    ["com.blank.workspace.cloud.account.admin"](): string;
    /**
      * `Team owner`
      */
    ["com.blank.workspace.cloud.account.team.owner"](): string;
    /**
      * `Team member`
      */
    ["com.blank.workspace.cloud.account.team.member"](): string;
    /**
      * `Multiple teams`
      */
    ["com.blank.workspace.cloud.account.team.multi"](): string;
    /**
      * `Click to open workspace`
      */
    ["com.blank.workspace.cloud.account.team.tips-1"](): string;
    /**
      * `Click to open workspace list`
      */
    ["com.blank.workspace.cloud.account.team.tips-2"](): string;
    /**
      * `Sign up/ Sign in`
      */
    ["com.blank.workspace.cloud.auth"](): string;
    /**
      * `Sync with Blank Cloud`
      */
    ["com.blank.workspace.cloud.description"](): string;
    /**
      * `Join workspace`
      */
    ["com.blank.workspace.cloud.join"](): string;
    /**
      * `Cloud sync`
      */
    ["com.blank.workspace.cloud.sync"](): string;
    /**
      * `Failed to enable Cloud, please try again.`
      */
    ["com.blank.workspace.enable-cloud.failed"](): string;
    /**
      * `Local workspaces`
      */
    ["com.blank.workspace.local"](): string;
    /**
      * `Import workspace`
      */
    ["com.blank.workspace.local.import"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.workspaceDelete.button.cancel"](): string;
    /**
      * `Delete`
      */
    ["com.blank.workspaceDelete.button.delete"](): string;
    /**
      * `Please type workspace name to confirm`
      */
    ["com.blank.workspaceDelete.placeholder"](): string;
    /**
      * `Delete workspace`
      */
    ["com.blank.workspaceDelete.title"](): string;
    /**
      * `Create workspace`
      */
    ["com.blank.workspaceList.addWorkspace.create"](): string;
    /**
      * `Create cloud workspace`
      */
    ["com.blank.workspaceList.addWorkspace.create-cloud"](): string;
    /**
      * `Cloud sync`
      */
    ["com.blank.workspaceList.workspaceListType.cloud"](): string;
    /**
      * `Local storage`
      */
    ["com.blank.workspaceList.workspaceListType.local"](): string;
    /**
      * `Add Server`
      */
    ["com.blank.workspaceList.addServer"](): string;
    /**
      * `All docs`
      */
    ["com.blank.workspaceSubPath.all"](): string;
    /**
      * `Intelligence`
      */
    ["com.blank.workspaceSubPath.chat"](): string;
    /**
      * `Trash`
      */
    ["com.blank.workspaceSubPath.trash"](): string;
    /**
      * `Deleted docs will appear here.`
      */
    ["com.blank.workspaceSubPath.trash.empty-description"](): string;
    /**
      * `Write with a blank page`
      */
    ["com.blank.write_with_a_blank_page"](): string;
    /**
      * `Yesterday`
      */
    ["com.blank.yesterday"](): string;
    /**
      * `Inactive`
      */
    ["com.blank.inactive"](): string;
    /**
      * `Inactive member`
      */
    ["com.blank.inactive-member"](): string;
    /**
      * `Inactive workspace`
      */
    ["com.blank.inactive-workspace"](): string;
    /**
      * `Display Properties`
      */
    ["com.blank.all-docs.display.properties"](): string;
    /**
      * `List view options`
      */
    ["com.blank.all-docs.display.list-view"](): string;
    /**
      * `Icon`
      */
    ["com.blank.all-docs.display.list-view.icon"](): string;
    /**
      * `Body`
      */
    ["com.blank.all-docs.display.list-view.body"](): string;
    /**
      * `Quick actions`
      */
    ["com.blank.all-docs.quick-actions"](): string;
    /**
      * `Favorite`
      */
    ["com.blank.all-docs.quick-action.favorite"](): string;
    /**
      * `Move to trash`
      */
    ["com.blank.all-docs.quick-action.trash"](): string;
    /**
      * `Open in split view`
      */
    ["com.blank.all-docs.quick-action.split"](): string;
    /**
      * `Open in new tab`
      */
    ["com.blank.all-docs.quick-action.tab"](): string;
    /**
      * `Select checkbox`
      */
    ["com.blank.all-docs.quick-action.select"](): string;
    /**
      * `Delete permanently`
      */
    ["com.blank.all-docs.quick-action.delete-permanently"](): string;
    /**
      * `Restore`
      */
    ["com.blank.all-docs.quick-action.restore"](): string;
    /**
      * `All`
      */
    ["com.blank.all-docs.pinned-collection.all"](): string;
    /**
      * `Edit collection rules`
      */
    ["com.blank.all-docs.pinned-collection.edit"](): string;
    /**
      * `Template`
      */
    ["com.blank.all-docs.group.is-template"](): string;
    /**
      * `Not Template`
      */
    ["com.blank.all-docs.group.is-not-template"](): string;
    /**
      * `Journal`
      */
    ["com.blank.all-docs.group.is-journal"](): string;
    /**
      * `Not Journal`
      */
    ["com.blank.all-docs.group.is-not-journal"](): string;
    /**
      * `Checked`
      */
    ["com.blank.all-docs.group.is-checked"](): string;
    /**
      * `Unchecked`
      */
    ["com.blank.all-docs.group.is-not-checked"](): string;
    /**
      * `Never updated`
      */
    ["com.blank.all-docs.group.updated-at.never-updated"](): string;
    /**
      * `core`
      */
    core(): string;
    /**
      * `Dark`
      */
    dark(): string;
    /**
      * `invited you to join`
      */
    ["invited you to join"](): string;
    /**
      * `Light`
      */
    light(): string;
    /**
      * `Others`
      */
    others(): string;
    /**
      * `System`
      */
    system(): string;
    /**
      * `unnamed`
      */
    unnamed(): string;
    /**
      * `Please upgrade to the latest version of Chrome for the best experience.`
      */
    upgradeBrowser(): string;
    /**
      * `Workspace properties`
      */
    ["com.blank.workspace.properties"](): string;
    /**
      * `Rename to "{{name}}"`
      */
    ["com.blank.m.rename-to"](options: {
        readonly name: string;
    }): string;
    /**
      * `Rename`
      */
    ["com.blank.m.explorer.folder.rename"](): string;
    /**
      * `Create Folder`
      */
    ["com.blank.m.explorer.folder.new-dialog-title"](): string;
    /**
      * `Organize`
      */
    ["com.blank.m.explorer.folder.root"](): string;
    /**
      * `Create a folder in the {{parent}}.`
      */
    ["com.blank.m.explorer.folder.new-tip-empty"](options: {
        readonly parent: string;
    }): string;
    /**
      * `Create "{{value}}" in the {{parent}}.`
      */
    ["com.blank.m.explorer.folder.new-tip-not-empty"](options: Readonly<{
        value: string;
        parent: string;
    }>): string;
    /**
      * `Done`
      */
    ["com.blank.m.explorer.folder.rename-confirm"](): string;
    /**
      * `Rename`
      */
    ["com.blank.m.explorer.tag.rename"](): string;
    /**
      * `Rename Tag`
      */
    ["com.blank.m.explorer.tag.rename-menu-title"](): string;
    /**
      * `Create Tag`
      */
    ["com.blank.m.explorer.tag.new-dialog-title"](): string;
    /**
      * `Done`
      */
    ["com.blank.m.explorer.tag.rename-confirm"](): string;
    /**
      * `Create a tag in this workspace.`
      */
    ["com.blank.m.explorer.tag.new-tip-empty"](): string;
    /**
      * `Create "{{value}}" tag in this workspace.`
      */
    ["com.blank.m.explorer.tag.new-tip-not-empty"](options: {
        readonly value: string;
    }): string;
    /**
      * `Manage Doc(s)`
      */
    ["com.blank.m.explorer.tag.manage-docs"](): string;
    /**
      * `Rename`
      */
    ["com.blank.m.explorer.collection.rename"](): string;
    /**
      * `Rename Collection`
      */
    ["com.blank.m.explorer.collection.rename-menu-title"](): string;
    /**
      * `Create Collection`
      */
    ["com.blank.m.explorer.collection.new-dialog-title"](): string;
    /**
      * `Rename`
      */
    ["com.blank.m.explorer.doc.rename"](): string;
    /**
      * `Doc`
      */
    ["com.blank.m.selector.type-doc"](): string;
    /**
      * `Tag`
      */
    ["com.blank.m.selector.type-tag"](): string;
    /**
      * `Collection`
      */
    ["com.blank.m.selector.type-collection"](): string;
    /**
      * `Folder`
      */
    ["com.blank.m.selector.where-folder"](): string;
    /**
      * `Tag`
      */
    ["com.blank.m.selector.where-tag"](): string;
    /**
      * `Collection`
      */
    ["com.blank.m.selector.where-collection"](): string;
    /**
      * `Apply`
      */
    ["com.blank.m.selector.confirm-default"](): string;
    /**
      * `Manage {{type}}(s)`
      */
    ["com.blank.m.selector.title"](options: {
        readonly type: string;
    }): string;
    /**
      * `{{total}} item(s)`
      */
    ["com.blank.m.selector.info-total"](options: {
        readonly total: string;
    }): string;
    /**
      * `Add {{count}} {{type}}(s)`
      */
    ["com.blank.m.selector.info-added"](options: Readonly<{
        count: string;
        type: string;
    }>): string;
    /**
      * `Remove {{count}} {{type}}(s)`
      */
    ["com.blank.m.selector.info-removed"](options: Readonly<{
        count: string;
        type: string;
    }>): string;
    /**
      * `Remove items`
      */
    ["com.blank.m.selector.remove-warning.title"](): string;
    /**
      * `You unchecked {{type}} that already exist in the current {{where}}, which means you will remove them from this {{where}}. The item will not be deleted.`
      */
    ["com.blank.m.selector.remove-warning.message"](options: Readonly<{
        type: string;
        where: string;
    }>): string;
    /**
      * `Do not ask again`
      */
    ["com.blank.m.selector.remove-warning.confirm"](): string;
    /**
      * `Cancel`
      */
    ["com.blank.m.selector.remove-warning.cancel"](): string;
    /**
      * `tag`
      */
    ["com.blank.m.selector.remove-warning.where-tag"](): string;
    /**
      * `folder`
      */
    ["com.blank.m.selector.remove-warning.where-folder"](): string;
    /**
      * `Today's activity`
      */
    ["com.blank.m.selector.journal-menu.today-activity"](): string;
    /**
      * `Duplicate Entries in Today's Journal`
      */
    ["com.blank.m.selector.journal-menu.conflicts"](): string;
    /**
      * `Unable to preview this file`
      */
    ["com.blank.attachment.preview.error.title"](): string;
    /**
      * `file type not supported.`
      */
    ["com.blank.attachment.preview.error.subtitle"](): string;
    /**
      * `Failed to render page.`
      */
    ["com.blank.pdf.page.render.error"](): string;
    /**
      * `Duplicate Entries in Today's Journal`
      */
    ["com.blank.editor.journal-conflict.title"](): string;
    /**
      * `Search for "{{query}}"`
      */
    ["com.blank.editor.at-menu.link-to-doc"](options: {
        readonly query: string;
    }): string;
    /**
      * `Recent`
      */
    ["com.blank.editor.at-menu.recent-docs"](): string;
    /**
      * `Tags`
      */
    ["com.blank.editor.at-menu.tags"](): string;
    /**
      * `Collections`
      */
    ["com.blank.editor.at-menu.collections"](): string;
    /**
      * `Loading...`
      */
    ["com.blank.editor.at-menu.loading"](): string;
    /**
      * `New`
      */
    ["com.blank.editor.at-menu.new-doc"](): string;
    /**
      * `New "{{name}}" page`
      */
    ["com.blank.editor.at-menu.create-page"](options: {
        readonly name: string;
    }): string;
    /**
      * `New "{{name}}" edgeless`
      */
    ["com.blank.editor.at-menu.create-edgeless"](options: {
        readonly name: string;
    }): string;
    /**
      * `Import`
      */
    ["com.blank.editor.at-menu.import"](): string;
    /**
      * `{{count}} more docs`
      */
    ["com.blank.editor.at-menu.more-docs-hint"](options: {
        readonly count: string;
    }): string;
    /**
      * `{{count}} more members`
      */
    ["com.blank.editor.at-menu.more-members-hint"](options: {
        readonly count: string;
    }): string;
    /**
      * `Journal`
      */
    ["com.blank.editor.at-menu.journal"](): string;
    /**
      * `Select a specific date`
      */
    ["com.blank.editor.at-menu.date-picker"](): string;
    /**
      * `Mention Members`
      */
    ["com.blank.editor.at-menu.mention-members"](): string;
    /**
      * `Member not notified`
      */
    ["com.blank.editor.at-menu.member-not-notified"](): string;
    /**
      * `This member does not have access to this doc, they are not notified.`
      */
    ["com.blank.editor.at-menu.member-not-notified-message"](): string;
    /**
      * `Invited and notified`
      */
    ["com.blank.editor.at-menu.invited-and-notified"](): string;
    /**
      * `Access needed`
      */
    ["com.blank.editor.at-menu.access-needed"](): string;
    /**
      * `{{username}} does not have access to this doc, do you want to invite and notify them?`
      */
    ["com.blank.editor.at-menu.access-needed-message"](options: {
        readonly username: string;
    }): string;
    /**
      * `Show`
      */
    ["com.blank.editor.bi-directional-link-panel.show"](): string;
    /**
      * `Hide`
      */
    ["com.blank.editor.bi-directional-link-panel.hide"](): string;
    /**
      * `Fold page block`
      */
    ["com.blank.editor.edgeless-note-header.fold-page-block"](): string;
    /**
      * `Open in Page`
      */
    ["com.blank.editor.edgeless-note-header.open-in-page"](): string;
    /**
      * `Fold`
      */
    ["com.blank.editor.edgeless-embed-synced-doc-header.fold"](): string;
    /**
      * `Unfold`
      */
    ["com.blank.editor.edgeless-embed-synced-doc-header.unfold"](): string;
    /**
      * `Open`
      */
    ["com.blank.editor.edgeless-embed-synced-doc-header.open"](): string;
    /**
      * `Empower Your Team with Seamless Collaboration`
      */
    ["com.blank.upgrade-to-team-page.title"](): string;
    /**
      * `Select an existing workspace or create a new one`
      */
    ["com.blank.upgrade-to-team-page.workspace-selector.placeholder"](): string;
    /**
      * `Create Workspace`
      */
    ["com.blank.upgrade-to-team-page.workspace-selector.create-workspace"](): string;
    /**
      * `Upgrade to Team Workspace`
      */
    ["com.blank.upgrade-to-team-page.upgrade-button"](): string;
    /**
      * `Team Workspace gives you everything you need for seamless team collaboration:`
      */
    ["com.blank.upgrade-to-team-page.benefit.title"](): string;
    /**
      * `Invite unlimited members to your workspace`
      */
    ["com.blank.upgrade-to-team-page.benefit.g1"](): string;
    /**
      * `Set custom roles and permissions for better control`
      */
    ["com.blank.upgrade-to-team-page.benefit.g2"](): string;
    /**
      * `Access advanced team management features`
      */
    ["com.blank.upgrade-to-team-page.benefit.g3"](): string;
    /**
      * `Get priority customer support`
      */
    ["com.blank.upgrade-to-team-page.benefit.g4"](): string;
    /**
      * `Perfect for growing teams and organizations that need professional collaboration tools.`
      */
    ["com.blank.upgrade-to-team-page.benefit.description"](): string;
    /**
      * `Upgrade to Team Workspace`
      */
    ["com.blank.upgrade-to-team-page.upgrade-confirm.title"](): string;
    /**
      * `Name Your Workspace`
      */
    ["com.blank.upgrade-to-team-page.create-and-upgrade-confirm.title"](): string;
    /**
      * `A workspace is your virtual space to capture, create and plan as just one person or together as a team.`
      */
    ["com.blank.upgrade-to-team-page.create-and-upgrade-confirm.description"](): string;
    /**
      * `Set a workspace name`
      */
    ["com.blank.upgrade-to-team-page.create-and-upgrade-confirm.placeholder"](): string;
    /**
      * `Continue to Pricing`
      */
    ["com.blank.upgrade-to-team-page.create-and-upgrade-confirm.confirm"](): string;
    /**
      * `No workspace available`
      */
    ["com.blank.upgrade-to-team-page.no-workspace-available"](): string;
    /**
      * `Workspace storage`
      */
    ["com.blank.workspace.storage"](): string;
    /**
      * `Journal`
      */
    ["com.blank.cmdk.blank.category.blank.journal"](): string;
    /**
      * `Select a specific date`
      */
    ["com.blank.cmdk.blank.category.blank.date-picker"](): string;
    /**
      * `Workspace sync paused`
      */
    ["com.blank.payment.sync-paused.title"](): string;
    /**
      * `Your workspace has exceeded both storage and member limits, causing synchronization to pause. To resume syncing, please either:`
      */
    ["com.blank.payment.sync-paused.owner.both.description"](): string;
    /**
      * `Reduce storage usage and remove some team members`
      */
    ["com.blank.payment.sync-paused.owner.both.tips-1"](): string;
    /**
      * `Upgrade your plan for increased capacity`
      */
    ["com.blank.payment.sync-paused.owner.both.tips-2"](): string;
    /**
      * `Your workspace has exceeded its storage limit and synchronization has been paused. To resume syncing, please either:`
      */
    ["com.blank.payment.sync-paused.owner.storage.description"](): string;
    /**
      * `Remove unnecessary files or content to reduce storage usage`
      */
    ["com.blank.payment.sync-paused.owner.storage.tips-1"](): string;
    /**
      * `Upgrade your plan for increased storage capacity`
      */
    ["com.blank.payment.sync-paused.owner.storage.tips-2"](): string;
    /**
      * `Your workspace has reached its maximum member capacity and synchronization has been paused. To resume syncing, you can either`
      */
    ["com.blank.payment.sync-paused.owner.member.description"](): string;
    /**
      * `Remove some team members from the workspace`
      */
    ["com.blank.payment.sync-paused.owner.member.tips-1"](): string;
    /**
      * `Upgrade your plan to accommodate more members`
      */
    ["com.blank.payment.sync-paused.owner.member.tips-2"](): string;
    /**
      * `This workspace has exceeded both storage and member limits, causing synchronization to pause. Please contact your workspace owner to address these limits and resume syncing.`
      */
    ["com.blank.payment.sync-paused.member.both.description"](): string;
    /**
      * `This workspace has exceeded its storage limit and synchronization has been paused. Please contact your workspace owner to either reduce storage usage or upgrade the plan to resume syncing.`
      */
    ["com.blank.payment.sync-paused.member.storage.description"](): string;
    /**
      * `This workspace has reached its maximum member capacity and synchronization has been paused. Please contact your workspace owner to either adjust team membership or upgrade the plan to resume syncing.`
      */
    ["com.blank.payment.sync-paused.member.member.description"](): string;
    /**
      * `Got It`
      */
    ["com.blank.payment.sync-paused.member.member.confirm"](): string;
    /**
      * `Delete Server`
      */
    ["com.blank.server.delete"](): string;
    /**
      * `Start`
      */
    ["com.blank.page-starter-bar.start"](): string;
    /**
      * `Template`
      */
    ["com.blank.page-starter-bar.template"](): string;
    /**
      * `With AI`
      */
    ["com.blank.page-starter-bar.ai"](): string;
    /**
      * `Edgeless`
      */
    ["com.blank.page-starter-bar.edgeless"](): string;
    /**
      * `Unsupported message`
      */
    ["com.blank.notification.unsupported"](): string;
    /**
      * `What are your thoughts?`
      */
    ["com.blank.notification.comment-prompt"](): string;
    /**
      * `No new notifications`
      */
    ["com.blank.notification.empty"](): string;
    /**
      * `Loading more...`
      */
    ["com.blank.notification.loading-more"](): string;
    /**
      * `You'll be notified here for @mentions and workspace invites.`
      */
    ["com.blank.notification.empty.description"](): string;
    /**
      * `Open workspace`
      */
    ["com.blank.notification.invitation-review-approved.open-workspace"](): string;
    /**
      * `Accept & Join`
      */
    ["com.blank.notification.invitation.accept"](): string;
    /**
      * `Delete all notifications`
      */
    ["com.blank.notification.delete-all"](): string;
    /**
      * `Tips`
      */
    tips(): string;
    /**
      * `Template`
      */
    Template(): string;
    /**
      * `Delete Template`
      */
    ["com.blank.template-list.delete"](): string;
    /**
      * `No template`
      */
    ["com.blank.template-list.empty"](): string;
    /**
      * `Create new template`
      */
    ["com.blank.template-list.create-new"](): string;
    /**
      * `Set a Template for the Journal`
      */
    ["com.blank.template-journal-onboarding.title"](): string;
    /**
      * `Select`
      */
    ["com.blank.template-journal-onboarding.select"](): string;
    /**
      * `My Templates`
      */
    ["com.blank.settings.workspace.template.title"](): string;
    /**
      * `Template for journal`
      */
    ["com.blank.settings.workspace.template.journal"](): string;
    /**
      * `Select a template for your journal`
      */
    ["com.blank.settings.workspace.template.journal-desc"](): string;
    /**
      * `Keep empty`
      */
    ["com.blank.settings.workspace.template.keep-empty"](): string;
    /**
      * `New doc with template`
      */
    ["com.blank.settings.workspace.template.page"](): string;
    /**
      * `New docs will use the specified template, ignoring default settings.`
      */
    ["com.blank.settings.workspace.template.page-desc"](): string;
    /**
      * `Template for new doc`
      */
    ["com.blank.settings.workspace.template.page-select"](): string;
    /**
      * `Remove template`
      */
    ["com.blank.settings.workspace.template.remove"](): string;
    /**
      * `You don't have permission to do this`
      */
    ["com.blank.no-permission"](): string;
    /**
      * `Unused blobs`
      */
    ["com.blank.settings.workspace.storage.unused-blobs"](): string;
    /**
      * `No unused blobs`
      */
    ["com.blank.settings.workspace.storage.unused-blobs.empty"](): string;
    /**
      * `Selected`
      */
    ["com.blank.settings.workspace.storage.unused-blobs.selected"](): string;
    /**
      * `Delete blob files`
      */
    ["com.blank.settings.workspace.storage.unused-blobs.delete.title"](): string;
    /**
      * `Are you sure you want to delete these blob files? This action cannot be undone. Make sure you no longer need them before proceeding.`
      */
    ["com.blank.settings.workspace.storage.unused-blobs.delete.warning"](): string;
    /**
      * `Join Failed`
      */
    ["com.blank.fail-to-join-workspace.title"](): string;
    /**
      * `Please contact your workspace owner to add more seats.`
      */
    ["com.blank.fail-to-join-workspace.description-2"](): string;
    /**
      * `Request to join`
      */
    ["com.blank.request-to-join-workspace.button"](): string;
    /**
      * `Request Sent successfully`
      */
    ["com.blank.sent-request-to-join-workspace.title"](): string;
    /**
      * `Request failed to send`
      */
    ["com.blank.failed-to-send-request.title"](): string;
    /**
      * `Readwise`
      */
    ["com.blank.integration.name.readwise"](): string;
    /**
      * `Integrations`
      */
    ["com.blank.integration.integrations"](): string;
    /**
      * `Web Clipper`
      */
    ["com.blank.integration.web-clipper.name"](): string;
    /**
      * `Import web pages to Blank`
      */
    ["com.blank.integration.web-clipper.desc"](): string;
    /**
      * `Elevate your Blank experience with diverse add-ons and seamless integrations.`
      */
    ["com.blank.integration.setting.description"](): string;
    /**
      * `Learn how to develop a integration for Blank`
      */
    ["com.blank.integration.setting.learn"](): string;
    /**
      * `Readwise`
      */
    ["com.blank.integration.readwise.name"](): string;
    /**
      * `Manually import your content to Blank from Readwise`
      */
    ["com.blank.integration.readwise.desc"](): string;
    /**
      * `Connect`
      */
    ["com.blank.integration.readwise.connect"](): string;
    /**
      * `Connect to Readwise`
      */
    ["com.blank.integration.readwise.connect.title"](): string;
    /**
      * `Paste your access token here`
      */
    ["com.blank.integration.readwise.connect.placeholder"](): string;
    /**
      * `Please enter a valid access token.`
      */
    ["com.blank.integration.readwise.connect.input-error"](): string;
    /**
      * `Access Token failed validation`
      */
    ["com.blank.integration.readwise.connect.error-notify-title"](): string;
    /**
      * `The token could not access Readwise. Please verify access and try again.`
      */
    ["com.blank.integration.readwise.connect.error-notify-desc"](): string;
    /**
      * `Import`
      */
    ["com.blank.integration.readwise.import"](): string;
    /**
      * `Disconnect`
      */
    ["com.blank.integration.readwise.disconnect"](): string;
    /**
      * `Disconnect Readwise?`
      */
    ["com.blank.integration.readwise.disconnect.title"](): string;
    /**
      * `Once disconnected, content will no longer be imported. Do you want to keep your existing highlights in Blank?`
      */
    ["com.blank.integration.readwise.disconnect.desc"](): string;
    /**
      * `Keep`
      */
    ["com.blank.integration.readwise.disconnect.keep"](): string;
    /**
      * `Delete`
      */
    ["com.blank.integration.readwise.disconnect.delete"](): string;
    /**
      * `Highlights to be imported this time`
      */
    ["com.blank.integration.readwise.import.title"](): string;
    /**
      * `Importing everything from the start`
      */
    ["com.blank.integration.readwise.import.desc-from-start"](): string;
    /**
      * `Content`
      */
    ["com.blank.integration.readwise.import.cell-h-content"](): string;
    /**
      * `Todo`
      */
    ["com.blank.integration.readwise.import.cell-h-todo"](): string;
    /**
      * `Last update on Readwise`
      */
    ["com.blank.integration.readwise.import.cell-h-time"](): string;
    /**
      * `New`
      */
    ["com.blank.integration.readwise.import.todo-new"](): string;
    /**
      * `Skip`
      */
    ["com.blank.integration.readwise.import.todo-skip"](): string;
    /**
      * `Updated`
      */
    ["com.blank.integration.readwise.import.todo-update"](): string;
    /**
      * `No highlights needs to be imported`
      */
    ["com.blank.integration.readwise.import.empty"](): string;
    /**
      * `Importing...`
      */
    ["com.blank.integration.readwise.import.importing"](): string;
    /**
      * `Please keep this app active until it's finished`
      */
    ["com.blank.integration.readwise.import.importing-desc"](): string;
    /**
      * `Stop Importing`
      */
    ["com.blank.integration.readwise.import.importing-stop"](): string;
    /**
      * `Importing aborted`
      */
    ["com.blank.integration.readwise.import.abort-notify-title"](): string;
    /**
      * `Import aborted, with {{finished}} highlights processed`
      */
    ["com.blank.integration.readwise.import.abort-notify-desc"](options: {
        readonly finished: string;
    }): string;
    /**
      * `Configuration`
      */
    ["com.blank.integration.readwise.setting.caption"](): string;
    /**
      * `New Readwise highlights will be imported to Blank `
      */
    ["com.blank.integration.readwise.setting.sync-new-name"](): string;
    /**
      * `New highlights in Readwise will be synced to Blank `
      */
    ["com.blank.integration.readwise.setting.sync-new-desc"](): string;
    /**
      * `Updates to Readwise highlights will be imported`
      */
    ["com.blank.integration.readwise.setting.update-name"](): string;
    /**
      * `Enable this, so that we will process updates of existing highlights from Readwise `
      */
    ["com.blank.integration.readwise.setting.update-desc"](): string;
    /**
      * `How do we handle updates`
      */
    ["com.blank.integration.readwise.setting.update-strategy"](): string;
    /**
      * `Append new version to the end`
      */
    ["com.blank.integration.readwise.setting.update-append-name"](): string;
    /**
      * `Cited or modified highlights will have future versions added to the end of them`
      */
    ["com.blank.integration.readwise.setting.update-append-desc"](): string;
    /**
      * `Overwrite with new version`
      */
    ["com.blank.integration.readwise.setting.update-override-name"](): string;
    /**
      * `Cited or modified highlights will be overwritten if there are future updates`
      */
    ["com.blank.integration.readwise.setting.update-override-desc"](): string;
    /**
      * `Start Importing`
      */
    ["com.blank.integration.readwise.setting.start-import-name"](): string;
    /**
      * `Using the settings above`
      */
    ["com.blank.integration.readwise.setting.start-import-desc"](): string;
    /**
      * `Import`
      */
    ["com.blank.integration.readwise.setting.start-import-button"](): string;
    /**
      * `Apply tags to highlight imports`
      */
    ["com.blank.integration.readwise.setting.tags-label"](): string;
    /**
      * `Click to add tags`
      */
    ["com.blank.integration.readwise.setting.tags-placeholder"](): string;
    /**
      * `Author`
      */
    ["com.blank.integration.readwise-prop.author"](): string;
    /**
      * `Source`
      */
    ["com.blank.integration.readwise-prop.source"](): string;
    /**
      * `Created`
      */
    ["com.blank.integration.readwise-prop.created"](): string;
    /**
      * `Updated`
      */
    ["com.blank.integration.readwise-prop.updated"](): string;
    /**
      * `Integration properties`
      */
    ["com.blank.integration.properties"](): string;
    /**
      * `Calendar`
      */
    ["com.blank.integration.calendar.name"](): string;
    /**
      * `New events will be scheduled in Blank’s journal`
      */
    ["com.blank.integration.calendar.desc"](): string;
    /**
      * `Subscribe`
      */
    ["com.blank.integration.calendar.new-subscription"](): string;
    /**
      * `Unsubscribe`
      */
    ["com.blank.integration.calendar.unsubscribe"](): string;
    /**
      * `Add a calendar by URL`
      */
    ["com.blank.integration.calendar.new-title"](): string;
    /**
      * `Calendar URL`
      */
    ["com.blank.integration.calendar.new-url-label"](): string;
    /**
      * `An error occurred while saving the calendar settings`
      */
    ["com.blank.integration.calendar.save-error"](): string;
    /**
      * `All day`
      */
    ["com.blank.integration.calendar.all-day"](): string;
    /**
      * `Failed to load calendar accounts`
      */
    ["com.blank.integration.calendar.account.load-error"](): string;
    /**
      * `Failed to load calendar providers`
      */
    ["com.blank.integration.calendar.provider.load-error"](): string;
    /**
      * `Failed to start calendar authorization`
      */
    ["com.blank.integration.calendar.auth.start-error"](): string;
    /**
      * `Failed to unlink calendar account`
      */
    ["com.blank.integration.calendar.account.unlink-error"](): string;
    /**
      * `Unlink`
      */
    ["com.blank.integration.calendar.account.unlink"](): string;
    /**
      * `Link`
      */
    ["com.blank.integration.calendar.account.link"](): string;
    /**
      * `No calendar accounts linked yet.`
      */
    ["com.blank.integration.calendar.account.linked-empty"](): string;
    /**
      * `Authorization failed: {{error}}`
      */
    ["com.blank.integration.calendar.account.status.failed"](options: {
        readonly error: string;
    }): string;
    /**
      * `Authorization failed. Please reconnect your account.`
      */
    ["com.blank.integration.calendar.account.status.failed-reconnect"](): string;
    /**
      * `{{count}} calendar`
      */
    ["com.blank.integration.calendar.account.count"](options: {
        readonly count: string;
    }): string;
    /**
      * `Link CalDAV account`
      */
    ["com.blank.integration.calendar.caldav.link.title"](): string;
    /**
      * `Failed to link CalDAV account`
      */
    ["com.blank.integration.calendar.caldav.link.failed"](): string;
    /**
      * `Provider`
      */
    ["com.blank.integration.calendar.caldav.field.provider"](): string;
    /**
      * `Select provider`
      */
    ["com.blank.integration.calendar.caldav.field.provider.placeholder"](): string;
    /**
      * `Please select a provider.`
      */
    ["com.blank.integration.calendar.caldav.field.provider.error"](): string;
    /**
      * `Username`
      */
    ["com.blank.integration.calendar.caldav.field.username"](): string;
    /**
      * `email@example.com`
      */
    ["com.blank.integration.calendar.caldav.field.username.placeholder"](): string;
    /**
      * `Username is required.`
      */
    ["com.blank.integration.calendar.caldav.field.username.error"](): string;
    /**
      * `Password`
      */
    ["com.blank.integration.calendar.caldav.field.password"](): string;
    /**
      * `Password or app-specific password`
      */
    ["com.blank.integration.calendar.caldav.field.password.placeholder"](): string;
    /**
      * `Password is required.`
      */
    ["com.blank.integration.calendar.caldav.field.password.error"](): string;
    /**
      * `Display name (optional)`
      */
    ["com.blank.integration.calendar.caldav.field.displayName"](): string;
    /**
      * `My CalDAV`
      */
    ["com.blank.integration.calendar.caldav.field.displayName.placeholder"](): string;
    /**
      * `App-specific password required.`
      */
    ["com.blank.integration.calendar.caldav.hint.app-password"](): string;
    /**
      * `Learn more`
      */
    ["com.blank.integration.calendar.caldav.hint.learn-more"](): string;
    /**
      * `Provider setup guide`
      */
    ["com.blank.integration.calendar.caldav.hint.guide"](): string;
    /**
      * `New doc`
      */
    ["com.blank.integration.calendar.new-doc"](): string;
    /**
      * `Show calendar events`
      */
    ["com.blank.integration.calendar.show-events"](): string;
    /**
      * `Enabling this setting allows you to connect your calendar events to your Journal in Blank`
      */
    ["com.blank.integration.calendar.show-events-desc"](): string;
    /**
      * `Show all day event`
      */
    ["com.blank.integration.calendar.show-all-day-events"](): string;
    /**
      * `Are you sure you want to unsubscribe "{{name}}"? Unsubscribing this account will remove its data from Journal.`
      */
    ["com.blank.integration.calendar.unsubscribe-content"](options: {
        readonly name: string;
    }): string;
    /**
      * `No journal page found for {{date}}. Please create a journal page first.`
      */
    ["com.blank.integration.calendar.no-journal"](options: {
        readonly date: string;
    }): string;
    /**
      * `No subscribed calendars yet.`
      */
    ["com.blank.integration.calendar.no-calendar"](): string;
    /**
      * `MCP Server`
      */
    ["com.blank.integration.mcp-server.name"](): string;
    /**
      * `Enable other MCP Client to search and read the doc of Blank.`
      */
    ["com.blank.integration.mcp-server.desc"](): string;
    /**
      * `The MCP token is shown only once. Delete and recreate it to copy the JSON configuration.`
      */
    ["com.blank.integration.mcp-server.copy-json.disabled-hint"](): string;
    /**
      * `Notes`
      */
    ["com.blank.audio.notes"](): string;
    /**
      * `Transcribing`
      */
    ["com.blank.audio.transcribing"](): string;
    /**
      * `Unable to retrieve AI results for others`
      */
    ["com.blank.audio.transcribe.non-owner.confirm.title"](): string;
    /**
      * `Audio activity`
      */
    ["com.blank.recording.new"](): string;
    /**
      * `Importing...`
      */
    ["com.blank.recording.importing.prompt"](): string;
    /**
      * `Finished`
      */
    ["com.blank.recording.success.prompt"](): string;
    /**
      * `Open app`
      */
    ["com.blank.recording.success.button"](): string;
    /**
      * `Failed to save`
      */
    ["com.blank.recording.failed.prompt"](): string;
    /**
      * `Open file`
      */
    ["com.blank.recording.failed.button"](): string;
    /**
      * `{{appName}}'s audio`
      */
    ["com.blank.recording.recording"](options: {
        readonly appName: string;
    }): string;
    /**
      * `Audio recording`
      */
    ["com.blank.recording.recording.unnamed"](): string;
    /**
      * `Start`
      */
    ["com.blank.recording.start"](): string;
    /**
      * `Dismiss`
      */
    ["com.blank.recording.dismiss"](): string;
    /**
      * `Stop`
      */
    ["com.blank.recording.stop"](): string;
    /**
      * `Migrate Data to Enhance User Experience`
      */
    ["com.blank.migration-all-docs-notification.header"](): string;
    /**
      * `We are updating the local data to facilitate the recording and filtering of created by and Last edited by information. Please click the “Migrate Data” button and ensure a stable network connection during the process.`
      */
    ["com.blank.migration-all-docs-notification.desc"](): string;
    /**
      * `Migration failed: {{errorMessage}}`
      */
    ["com.blank.migration-all-docs-notification.error"](options: {
        readonly errorMessage: string;
    }): string;
    /**
      * `Migrate data`
      */
    ["com.blank.migration-all-docs-notification.button"](): string;
    /**
      * `Comments`
      */
    ["com.blank.comment.comments"](): string;
    /**
      * `No comments yet, select content to add comment to`
      */
    ["com.blank.comment.no-comments"](): string;
    /**
      * `Delete the thread?`
      */
    ["com.blank.comment.delete.confirm.title"](): string;
    /**
      * `All comments will also be deleted, and this action cannot be undone.`
      */
    ["com.blank.comment.delete.confirm.description"](): string;
    /**
      * `Delete this reply?`
      */
    ["com.blank.comment.reply.delete.confirm.title"](): string;
    /**
      * `Delete this reply? This action cannot be undone.`
      */
    ["com.blank.comment.reply.delete.confirm.description"](): string;
    /**
      * `Show {{count}} more replies`
      */
    ["com.blank.comment.reply.show-more"](options: {
        readonly count: string;
    }): string;
    /**
      * `Show resolved comments`
      */
    ["com.blank.comment.filter.show-resolved"](): string;
    /**
      * `Only my replies and mentions`
      */
    ["com.blank.comment.filter.only-my-replies"](): string;
    /**
      * `Only current mode`
      */
    ["com.blank.comment.filter.only-current-mode"](): string;
    /**
      * `Unlock more features`
      */
    ["com.blank.payment.subscription.title"](): string;
    /**
      * `The universal editor that lets you work, play, present or create just about anything.`
      */
    ["com.blank.payment.subscription.description"](): string;
    /**
      * `Upgrade`
      */
    ["com.blank.payment.subscription.button"](): string;
    /**
      * `Reply`
      */
    ["com.blank.comment.reply"](): string;
    /**
      * `Copy link`
      */
    ["com.blank.comment.copy-link"](): string;
    /**
      * `Copy`
      */
    ["com.blank.context-menu.copy"](): string;
    /**
      * `Paste`
      */
    ["com.blank.context-menu.paste"](): string;
    /**
      * `Cut`
      */
    ["com.blank.context-menu.cut"](): string;
    /**
      * `Add icon`
      */
    ["com.blank.docIconPicker.placeholder"](): string;
    /**
      * `An internal error occurred.`
      */
    ["error.INTERNAL_SERVER_ERROR"](): string;
    /**
      * `Network error.`
      */
    ["error.NETWORK_ERROR"](): string;
    /**
      * `Too many requests.`
      */
    ["error.TOO_MANY_REQUEST"](): string;
    /**
      * `Resource not found.`
      */
    ["error.NOT_FOUND"](): string;
    /**
      * `Bad request.`
      */
    ["error.BAD_REQUEST"](): string;
    /**
      * `GraphQL bad request, code: {{code}}, {{message}}`
      */
    ["error.GRAPHQL_BAD_REQUEST"](options: Readonly<{
        code: string;
        message: string;
    }>): string;
    /**
      * `HTTP request error, message: {{message}}`
      */
    ["error.HTTP_REQUEST_ERROR"](options: {
        readonly message: string;
    }): string;
    /**
      * `Invalid URL`
      */
    ["error.SSRF_BLOCKED_ERROR"](): string;
    /**
      * `Response too large ({{receivedBytes}} bytes), limit is {{limitBytes}} bytes`
      */
    ["error.RESPONSE_TOO_LARGE_ERROR"](options: Readonly<{
        receivedBytes: string;
        limitBytes: string;
    }>): string;
    /**
      * `Email service is not configured.`
      */
    ["error.EMAIL_SERVICE_NOT_CONFIGURED"](): string;
    /**
      * `Image format not supported: {{format}}`
      */
    ["error.IMAGE_FORMAT_NOT_SUPPORTED"](options: {
        readonly format: string;
    }): string;
    /**
      * `Query is too long, max length is {{max}}.`
      */
    ["error.QUERY_TOO_LONG"](options: {
        readonly max: string;
    }): string;
    /**
      * `Validation error, errors: {{errors}}`
      */
    ["error.VALIDATION_ERROR"](options: {
        readonly errors: string;
    }): string;
    /**
      * `User not found.`
      */
    ["error.USER_NOT_FOUND"](): string;
    /**
      * `User avatar not found.`
      */
    ["error.USER_AVATAR_NOT_FOUND"](): string;
    /**
      * `This email has already been registered.`
      */
    ["error.EMAIL_ALREADY_USED"](): string;
    /**
      * `You are trying to update your account email to the same as the old one.`
      */
    ["error.SAME_EMAIL_PROVIDED"](): string;
    /**
      * `Wrong user email or password: {{email}}`
      */
    ["error.WRONG_SIGN_IN_CREDENTIALS"](options: {
        readonly email: string;
    }): string;
    /**
      * `Unknown authentication provider {{name}}.`
      */
    ["error.UNKNOWN_OAUTH_PROVIDER"](options: {
        readonly name: string;
    }): string;
    /**
      * `OAuth state expired, please try again.`
      */
    ["error.OAUTH_STATE_EXPIRED"](): string;
    /**
      * `Invalid callback state parameter.`
      */
    ["error.INVALID_OAUTH_CALLBACK_STATE"](): string;
    /**
      * `Invalid callback code parameter, provider response status: {{status}} and body: {{body}}.`
      */
    ["error.INVALID_OAUTH_CALLBACK_CODE"](options: Readonly<{
        status: string;
        body: string;
    }>): string;
    /**
      * `Invalid auth state. You might start the auth progress from another device.`
      */
    ["error.INVALID_AUTH_STATE"](): string;
    /**
      * `Missing query parameter `{{name}}`.`
      */
    ["error.MISSING_OAUTH_QUERY_PARAMETER"](options: {
        readonly name: string;
    }): string;
    /**
      * `The third-party account has already been connected to another user.`
      */
    ["error.OAUTH_ACCOUNT_ALREADY_CONNECTED"](): string;
    /**
      * `Invalid OAuth response: {{reason}}.`
      */
    ["error.INVALID_OAUTH_RESPONSE"](options: {
        readonly reason: string;
    }): string;
    /**
      * `An invalid email provided: {{email}}`
      */
    ["error.INVALID_EMAIL"](options: {
        readonly email: string;
    }): string;
    /**
      * `Password must be between {{min}} and {{max}} characters`
      */
    ["error.INVALID_PASSWORD_LENGTH"](options: Readonly<{
        min: string;
        max: string;
    }>): string;
    /**
      * `Password is required.`
      */
    ["error.PASSWORD_REQUIRED"](): string;
    /**
      * `You are trying to sign in by a different method than you signed up with.`
      */
    ["error.WRONG_SIGN_IN_METHOD"](): string;
    /**
      * `You are not allowed to sign up.`
      */
    ["error.SIGN_UP_FORBIDDEN"](): string;
    /**
      * `The email token provided is not found.`
      */
    ["error.EMAIL_TOKEN_NOT_FOUND"](): string;
    /**
      * `An invalid email token provided.`
      */
    ["error.INVALID_EMAIL_TOKEN"](): string;
    /**
      * `The link has expired.`
      */
    ["error.LINK_EXPIRED"](): string;
    /**
      * `You must sign in first to access this resource.`
      */
    ["error.AUTHENTICATION_REQUIRED"](): string;
    /**
      * `You are not allowed to perform this action.`
      */
    ["error.ACTION_FORBIDDEN"](): string;
    /**
      * `You do not have permission to access this resource.`
      */
    ["error.ACCESS_DENIED"](): string;
    /**
      * `You must verify your email before accessing this resource.`
      */
    ["error.EMAIL_VERIFICATION_REQUIRED"](): string;
    /**
      * `Space {{spaceId}} permission not found.`
      */
    ["error.WORKSPACE_PERMISSION_NOT_FOUND"](options: {
        readonly spaceId: string;
    }): string;
    /**
      * `Space {{spaceId}} not found.`
      */
    ["error.SPACE_NOT_FOUND"](options: {
        readonly spaceId: string;
    }): string;
    /**
      * `Member not found in Space {{spaceId}}.`
      */
    ["error.MEMBER_NOT_FOUND_IN_SPACE"](options: {
        readonly spaceId: string;
    }): string;
    /**
      * `You should join in Space {{spaceId}} before broadcasting messages.`
      */
    ["error.NOT_IN_SPACE"](options: {
        readonly spaceId: string;
    }): string;
    /**
      * `You have already joined in Space {{spaceId}}.`
      */
    ["error.ALREADY_IN_SPACE"](options: {
        readonly spaceId: string;
    }): string;
    /**
      * `You do not have permission to access Space {{spaceId}}.`
      */
    ["error.SPACE_ACCESS_DENIED"](options: {
        readonly spaceId: string;
    }): string;
    /**
      * `Owner of Space {{spaceId}} not found.`
      */
    ["error.SPACE_OWNER_NOT_FOUND"](options: {
        readonly spaceId: string;
    }): string;
    /**
      * `Space should have only one owner.`
      */
    ["error.SPACE_SHOULD_HAVE_ONLY_ONE_OWNER"](): string;
    /**
      * `Owner can not leave the workspace.`
      */
    ["error.OWNER_CAN_NOT_LEAVE_WORKSPACE"](): string;
    /**
      * `You can not revoke your own permission.`
      */
    ["error.CAN_NOT_REVOKE_YOURSELF"](): string;
    /**
      * `Doc {{docId}} under Space {{spaceId}} not found.`
      */
    ["error.DOC_NOT_FOUND"](options: Readonly<{
        docId: string;
        spaceId: string;
    }>): string;
    /**
      * `You do not have permission to perform {{action}} action on doc {{docId}}.`
      */
    ["error.DOC_ACTION_DENIED"](options: Readonly<{
        action: string;
        docId: string;
    }>): string;
    /**
      * `Doc {{docId}} under Space {{spaceId}} is blocked from updating.`
      */
    ["error.DOC_UPDATE_BLOCKED"](options: Readonly<{
        docId: string;
        spaceId: string;
    }>): string;
    /**
      * `Your client with version {{version}} is rejected by remote sync server. Please upgrade to {{serverVersion}}.`
      */
    ["error.VERSION_REJECTED"](options: Readonly<{
        version: string;
        serverVersion: string;
    }>): string;
    /**
      * `Invalid doc history timestamp provided.`
      */
    ["error.INVALID_HISTORY_TIMESTAMP"](): string;
    /**
      * `History of {{docId}} at {{timestamp}} under Space {{spaceId}}.`
      */
    ["error.DOC_HISTORY_NOT_FOUND"](options: Readonly<{
        docId: string;
        timestamp: string;
        spaceId: string;
    }>): string;
    /**
      * `Blob {{blobId}} not found in Space {{spaceId}}.`
      */
    ["error.BLOB_NOT_FOUND"](options: Readonly<{
        blobId: string;
        spaceId: string;
    }>): string;
    /**
      * `Blob is invalid.`
      */
    ["error.BLOB_INVALID"](): string;
    /**
      * `Expected to publish a doc, not a Space.`
      */
    ["error.EXPECT_TO_PUBLISH_DOC"](): string;
    /**
      * `Expected to revoke a public doc, not a Space.`
      */
    ["error.EXPECT_TO_REVOKE_PUBLIC_DOC"](): string;
    /**
      * `Expect grant roles on doc {{docId}} under Space {{spaceId}}, not a Space.`
      */
    ["error.EXPECT_TO_GRANT_DOC_USER_ROLES"](options: Readonly<{
        docId: string;
        spaceId: string;
    }>): string;
    /**
      * `Expect revoke roles on doc {{docId}} under Space {{spaceId}}, not a Space.`
      */
    ["error.EXPECT_TO_REVOKE_DOC_USER_ROLES"](options: Readonly<{
        docId: string;
        spaceId: string;
    }>): string;
    /**
      * `Expect update roles on doc {{docId}} under Space {{spaceId}}, not a Space.`
      */
    ["error.EXPECT_TO_UPDATE_DOC_USER_ROLE"](options: Readonly<{
        docId: string;
        spaceId: string;
    }>): string;
    /**
      * `Doc is not public.`
      */
    ["error.DOC_IS_NOT_PUBLIC"](): string;
    /**
      * `Failed to store doc updates.`
      */
    ["error.FAILED_TO_SAVE_UPDATES"](): string;
    /**
      * `Failed to store doc snapshot.`
      */
    ["error.FAILED_TO_UPSERT_SNAPSHOT"](): string;
    /**
      * `A Team workspace is required to perform this action.`
      */
    ["error.ACTION_FORBIDDEN_ON_NON_TEAM_WORKSPACE"](): string;
    /**
      * `Doc default role can not be owner.`
      */
    ["error.DOC_DEFAULT_ROLE_CAN_NOT_BE_OWNER"](): string;
    /**
      * `Can not batch grant doc owner permissions.`
      */
    ["error.CAN_NOT_BATCH_GRANT_DOC_OWNER_PERMISSIONS"](): string;
    /**
      * `Can not set a non-active member as owner.`
      */
    ["error.NEW_OWNER_IS_NOT_ACTIVE_MEMBER"](): string;
    /**
      * `Invalid invitation provided.`
      */
    ["error.INVALID_INVITATION"](): string;
    /**
      * `No more seat available in the Space {{spaceId}}.`
      */
    ["error.NO_MORE_SEAT"](options: {
        readonly spaceId: string;
    }): string;
    /**
      * `Unsupported subscription plan: {{plan}}.`
      */
    ["error.UNSUPPORTED_SUBSCRIPTION_PLAN"](options: {
        readonly plan: string;
    }): string;
    /**
      * `Failed to create checkout session.`
      */
    ["error.FAILED_TO_CHECKOUT"](): string;
    /**
      * `Invalid checkout parameters provided.`
      */
    ["error.INVALID_CHECKOUT_PARAMETERS"](): string;
    /**
      * `You have already subscribed to the {{plan}} plan.`
      */
    ["error.SUBSCRIPTION_ALREADY_EXISTS"](options: {
        readonly plan: string;
    }): string;
    /**
      * `Invalid subscription parameters provided.`
      */
    ["error.INVALID_SUBSCRIPTION_PARAMETERS"](): string;
    /**
      * `You didn't subscribe to the {{plan}} plan.`
      */
    ["error.SUBSCRIPTION_NOT_EXISTS"](options: {
        readonly plan: string;
    }): string;
    /**
      * `Your subscription has already been canceled.`
      */
    ["error.SUBSCRIPTION_HAS_BEEN_CANCELED"](): string;
    /**
      * `Your subscription has not been canceled.`
      */
    ["error.SUBSCRIPTION_HAS_NOT_BEEN_CANCELED"](): string;
    /**
      * `Your subscription has expired.`
      */
    ["error.SUBSCRIPTION_EXPIRED"](): string;
    /**
      * `Your subscription has already been in {{recurring}} recurring state.`
      */
    ["error.SAME_SUBSCRIPTION_RECURRING"](options: {
        readonly recurring: string;
    }): string;
    /**
      * `Failed to create customer portal session.`
      */
    ["error.CUSTOMER_PORTAL_CREATE_FAILED"](): string;
    /**
      * `You are trying to access a unknown subscription plan.`
      */
    ["error.SUBSCRIPTION_PLAN_NOT_FOUND"](): string;
    /**
      * `You cannot update an onetime payment subscription.`
      */
    ["error.CANT_UPDATE_ONETIME_PAYMENT_SUBSCRIPTION"](): string;
    /**
      * `A workspace is required to checkout for team subscription.`
      */
    ["error.WORKSPACE_ID_REQUIRED_FOR_TEAM_SUBSCRIPTION"](): string;
    /**
      * `Workspace id is required to update team subscription.`
      */
    ["error.WORKSPACE_ID_REQUIRED_TO_UPDATE_TEAM_SUBSCRIPTION"](): string;
    /**
      * `This subscription is managed by App Store or Google Play. Please manage it in the corresponding store.`
      */
    ["error.MANAGED_BY_APP_STORE_OR_PLAY"](): string;
    /**
      * `Calendar provider request error, status: {{status}}, message: {{message}}`
      */
    ["error.CALENDAR_PROVIDER_REQUEST_ERROR"](options: Readonly<{
        status: string;
        message: string;
    }>): string;
    /**
      * `Copilot session not found.`
      */
    ["error.COPILOT_SESSION_NOT_FOUND"](): string;
    /**
      * `Copilot session input is invalid.`
      */
    ["error.COPILOT_SESSION_INVALID_INPUT"](): string;
    /**
      * `Copilot session has been deleted.`
      */
    ["error.COPILOT_SESSION_DELETED"](): string;
    /**
      * `No copilot provider available: {{modelId}}`
      */
    ["error.NO_COPILOT_PROVIDER_AVAILABLE"](options: {
        readonly modelId: string;
    }): string;
    /**
      * `Failed to generate text.`
      */
    ["error.COPILOT_FAILED_TO_GENERATE_TEXT"](): string;
    /**
      * `Failed to generate embedding with {{provider}}: {{message}}`
      */
    ["error.COPILOT_FAILED_TO_GENERATE_EMBEDDING"](options: Readonly<{
        provider: string;
        message: string;
    }>): string;
    /**
      * `Failed to create chat message.`
      */
    ["error.COPILOT_FAILED_TO_CREATE_MESSAGE"](): string;
    /**
      * `Unsplash is not configured.`
      */
    ["error.UNSPLASH_IS_NOT_CONFIGURED"](): string;
    /**
      * `Action has been taken, no more messages allowed.`
      */
    ["error.COPILOT_ACTION_TAKEN"](): string;
    /**
      * `Doc {{docId}} not found.`
      */
    ["error.COPILOT_DOC_NOT_FOUND"](options: {
        readonly docId: string;
    }): string;
    /**
      * `Some docs not found.`
      */
    ["error.COPILOT_DOCS_NOT_FOUND"](): string;
    /**
      * `Copilot message {{messageId}} not found.`
      */
    ["error.COPILOT_MESSAGE_NOT_FOUND"](options: {
        readonly messageId: string;
    }): string;
    /**
      * `Copilot prompt {{name}} not found.`
      */
    ["error.COPILOT_PROMPT_NOT_FOUND"](options: {
        readonly name: string;
    }): string;
    /**
      * `Copilot prompt is invalid.`
      */
    ["error.COPILOT_PROMPT_INVALID"](): string;
    /**
      * `Copilot provider {{provider}} does not support output type {{kind}}`
      */
    ["error.COPILOT_PROVIDER_NOT_SUPPORTED"](options: Readonly<{
        provider: string;
        kind: string;
    }>): string;
    /**
      * `Provider {{provider}} failed with {{kind}} error: {{message}}`
      */
    ["error.COPILOT_PROVIDER_SIDE_ERROR"](options: Readonly<{
        provider: string;
        kind: string;
        message: string;
    }>): string;
    /**
      * `Invalid copilot context {{contextId}}.`
      */
    ["error.COPILOT_INVALID_CONTEXT"](options: {
        readonly contextId: string;
    }): string;
    /**
      * `File {{fileName}} is not supported to use as context: {{message}}`
      */
    ["error.COPILOT_CONTEXT_FILE_NOT_SUPPORTED"](options: Readonly<{
        fileName: string;
        message: string;
    }>): string;
    /**
      * `Failed to modify context {{contextId}}: {{message}}`
      */
    ["error.COPILOT_FAILED_TO_MODIFY_CONTEXT"](options: Readonly<{
        contextId: string;
        message: string;
    }>): string;
    /**
      * `Failed to match context {{contextId}} with "%7B%7Bcontent%7D%7D": {{message}}`
      */
    ["error.COPILOT_FAILED_TO_MATCH_CONTEXT"](options: Readonly<{
        contextId: string;
        message: string;
    }>): string;
    /**
      * `Failed to match context in workspace {{workspaceId}} with "%7B%7Bcontent%7D%7D": {{message}}`
      */
    ["error.COPILOT_FAILED_TO_MATCH_GLOBAL_CONTEXT"](options: Readonly<{
        workspaceId: string;
        message: string;
    }>): string;
    /**
      * `Embedding feature is disabled, please contact the administrator to enable it in the workspace settings.`
      */
    ["error.COPILOT_EMBEDDING_DISABLED"](): string;
    /**
      * `Embedding feature not available, you may need to install pgvector extension to your database`
      */
    ["error.COPILOT_EMBEDDING_UNAVAILABLE"](): string;
    /**
      * `Transcription job already exists`
      */
    ["error.COPILOT_TRANSCRIPTION_JOB_EXISTS"](): string;
    /**
      * `Transcription job not found.`
      */
    ["error.COPILOT_TRANSCRIPTION_JOB_NOT_FOUND"](): string;
    /**
      * `Audio not provided.`
      */
    ["error.COPILOT_TRANSCRIPTION_AUDIO_NOT_PROVIDED"](): string;
    /**
      * `Failed to add workspace file embedding: {{message}}`
      */
    ["error.COPILOT_FAILED_TO_ADD_WORKSPACE_FILE_EMBEDDING"](options: {
        readonly message: string;
    }): string;
    /**
      * `You have exceeded your blob size quota.`
      */
    ["error.BLOB_QUOTA_EXCEEDED"](): string;
    /**
      * `You have exceeded your storage quota.`
      */
    ["error.STORAGE_QUOTA_EXCEEDED"](): string;
    /**
      * `You have exceeded your workspace member quota.`
      */
    ["error.MEMBER_QUOTA_EXCEEDED"](): string;
    /**
      * `You have reached the limit of actions in this workspace, please upgrade your plan.`
      */
    ["error.COPILOT_QUOTA_EXCEEDED"](): string;
    /**
      * `Runtime config {{key}} not found.`
      */
    ["error.RUNTIME_CONFIG_NOT_FOUND"](options: {
        readonly key: string;
    }): string;
    /**
      * `Invalid runtime config type  for '{{key}}', want '{{want}}', but get {{get}}.`
      */
    ["error.INVALID_RUNTIME_CONFIG_TYPE"](options: Readonly<{
        key: string;
        want: string;
        get: string;
    }>): string;
    /**
      * `Mailer service is not configured.`
      */
    ["error.MAILER_SERVICE_IS_NOT_CONFIGURED"](): string;
    /**
      * `Cannot delete all admin accounts.`
      */
    ["error.CANNOT_DELETE_ALL_ADMIN_ACCOUNT"](): string;
    /**
      * `Cannot delete own account.`
      */
    ["error.CANNOT_DELETE_OWN_ACCOUNT"](): string;
    /**
      * `Cannot delete account. You are the owner of one or more team workspaces. Please transfer ownership or delete them first.`
      */
    ["error.CANNOT_DELETE_ACCOUNT_WITH_OWNED_TEAM_WORKSPACE"](): string;
    /**
      * `Captcha verification failed.`
      */
    ["error.CAPTCHA_VERIFICATION_FAILED"](): string;
    /**
      * `Invalid session id to generate license key.`
      */
    ["error.INVALID_LICENSE_SESSION_ID"](): string;
    /**
      * `License key has been revealed. Please check your mail box of the one provided during checkout.`
      */
    ["error.LICENSE_REVEALED"](): string;
    /**
      * `Workspace already has a license applied.`
      */
    ["error.WORKSPACE_LICENSE_ALREADY_EXISTS"](): string;
    /**
      * `License not found.`
      */
    ["error.LICENSE_NOT_FOUND"](): string;
    /**
      * `Invalid license to activate. {{reason}}`
      */
    ["error.INVALID_LICENSE_TO_ACTIVATE"](options: {
        readonly reason: string;
    }): string;
    /**
      * `Invalid license update params. {{reason}}`
      */
    ["error.INVALID_LICENSE_UPDATE_PARAMS"](options: {
        readonly reason: string;
    }): string;
    /**
      * `License has expired.`
      */
    ["error.LICENSE_EXPIRED"](): string;
    /**
      * `Unsupported client with version [{{clientVersion}}], required version is [{{requiredVersion}}].`
      */
    ["error.UNSUPPORTED_CLIENT_VERSION"](options: Readonly<{
        clientVersion: string;
        requiredVersion: string;
    }>): string;
    /**
      * `Notification not found.`
      */
    ["error.NOTIFICATION_NOT_FOUND"](): string;
    /**
      * `Mentioned user can not access doc {{docId}}.`
      */
    ["error.MENTION_USER_DOC_ACCESS_DENIED"](options: {
        readonly docId: string;
    }): string;
    /**
      * `You can not mention yourself.`
      */
    ["error.MENTION_USER_ONESELF_DENIED"](): string;
    /**
      * `Invalid app config for module `{{module}}` with key `{{key}}`. {{hint}}.`
      */
    ["error.INVALID_APP_CONFIG"](options: Readonly<{
        module: string;
        key: string;
        hint: string;
    }>): string;
    /**
      * `Invalid app config input: {{message}}`
      */
    ["error.INVALID_APP_CONFIG_INPUT"](options: {
        readonly message: string;
    }): string;
    /**
      * `Search provider not found.`
      */
    ["error.SEARCH_PROVIDER_NOT_FOUND"](): string;
    /**
      * `Invalid request argument to search provider: {{reason}}`
      */
    ["error.INVALID_SEARCH_PROVIDER_REQUEST"](options: {
        readonly reason: string;
    }): string;
    /**
      * `Invalid indexer input: {{reason}}`
      */
    ["error.INVALID_INDEXER_INPUT"](options: {
        readonly reason: string;
    }): string;
    /**
      * `Comment not found.`
      */
    ["error.COMMENT_NOT_FOUND"](): string;
    /**
      * `Reply not found.`
      */
    ["error.REPLY_NOT_FOUND"](): string;
    /**
      * `Comment attachment not found.`
      */
    ["error.COMMENT_ATTACHMENT_NOT_FOUND"](): string;
    /**
      * `You have exceeded the comment attachment size quota.`
      */
    ["error.COMMENT_ATTACHMENT_QUOTA_EXCEEDED"](): string;
} { const { t } = useTranslation(); return useMemo(() => createProxy((key) => t.bind(null, key)), [t]); }
function createComponent(i18nKey: string) {
    return (props) => createElement(Trans, { i18nKey, shouldUnescape: true, ...props });
}
export const TypedTrans: {
    /**
      * `Go to <a>{{link}}</a> for learn more details about Blank AI.`
      */
    ["com.blank.ai-onboarding.general.5.description"]: ComponentType<TypedTransProps<{
        readonly link: string;
    }, {
        a: JSX.Element;
    }>>;
    /**
      * `By continuing, you are agreeing to our <a>AI Terms</a>.`
      */
    ["com.blank.ai-onboarding.general.privacy"]: ComponentType<TypedTransProps<Readonly<{}>, {
        a: JSX.Element;
    }>>;
    /**
      * `Opening <1>Blank</1> app now`
      */
    ["com.blank.auth.open.blank.prompt"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `This doc is now opened in <1>Blank</1> app`
      */
    ["com.blank.auth.open.blank.open-doc-prompt"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `To continue signing in, please enter the code that was sent to <a>{{email}}</a>.`
      */
    ["com.blank.auth.sign.auth.code.hint"]: ComponentType<TypedTransProps<{
        readonly email: string;
    }, {
        a: JSX.Element;
    }>>;
    /**
      * `Or <1>sign in with password</1> instead.`
      */
    ["com.blank.auth.sign.auth.code.message.password"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `The Self-Hosted instance is not hosted or deployed by Blank. Your data will be stored on these instances.  <1>Learn more about Self-Host details.</1>`
      */
    ["com.blank.auth.sign.add-selfhosted.description"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `By clicking “Continue with Google/Email” above, you acknowledge that you agree to Blank's <1>Terms of Conditions</1> and <3>Privacy Policy</3>.`
      */
    ["com.blank.auth.sign.message"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
        ["3"]: JSX.Element;
    }>>;
    /**
      * `This demo is limited. <1>Download the Blank Client</1> for the latest features and Performance.`
      */
    ["com.blank.banner.content"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> selected`
    
      * - com.blank.collection.toolbar.selected_one: `<0>{{count}}</0> collection selected`
    
      * - com.blank.collection.toolbar.selected_other: `<0>{{count}}</0> collection(s) selected`
      */
    ["com.blank.collection.toolbar.selected"]: ComponentType<TypedTransProps<{
        readonly count: string | number | bigint;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> collection selected`
      */
    ["com.blank.collection.toolbar.selected_one"]: ComponentType<TypedTransProps<{
        readonly count: string | number | bigint;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> collection(s) selected`
      */
    ["com.blank.collection.toolbar.selected_other"]: ComponentType<TypedTransProps<{
        readonly count: string | number | bigint;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> collection(s) selected`
      */
    ["com.blank.collection.toolbar.selected_others"]: ComponentType<TypedTransProps<{
        readonly count: string;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `Deleting <1>{{tag}}</1> cannot be undone, please proceed with caution.`
      */
    ["com.blank.delete-tags.confirm.description"]: ComponentType<TypedTransProps<{
        readonly tag: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Selected <1>{{selectedCount}}</1>, filtered <3>{{filteredCount}}</3>`
      */
    ["com.blank.editCollection.rules.countTips"]: ComponentType<TypedTransProps<Readonly<{
        selectedCount: string;
        filteredCount: string;
    }>, {
        ["1"]: JSX.Element;
        ["3"]: JSX.Element;
    }>>;
    /**
      * `Showing <1>{{count}}</1> docs.`
      */
    ["com.blank.editCollection.rules.countTips.more"]: ComponentType<TypedTransProps<{
        readonly count: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Showing <1>{{count}}</1> doc.`
      */
    ["com.blank.editCollection.rules.countTips.one"]: ComponentType<TypedTransProps<{
        readonly count: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Showing <1>{{count}}</1> docs.`
      */
    ["com.blank.editCollection.rules.countTips.zero"]: ComponentType<TypedTransProps<{
        readonly count: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Please <1>add rules</1> to save this collection or switch to <3>Docs</3>, use manual selection mode`
      */
    ["com.blank.editCollection.rules.empty.noRules.tips"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
        ["3"]: JSX.Element;
    }>>;
    /**
      * `Docs that meet the rules will be added to the current collection <2>{{highlight}}</2>`
      */
    ["com.blank.editCollection.rules.tips"]: ComponentType<TypedTransProps<{
        readonly highlight: string;
    }, {
        ["2"]: JSX.Element;
    }>>;
    /**
      * `If you are still experiencing this issue, please <1>contact us through the community</1>.`
      */
    ["com.blank.error.contact-us"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `With the workspace creator's free account, every member can access up to <1>7 days<1> of version history.`
      */
    ["com.blank.history.confirm-restore-modal.free-plan-prompt.description"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `With the workspace creator's Pro account, every member enjoys the privilege of accessing up to <1>30 days<1> of version history.`
      */
    ["com.blank.history.confirm-restore-modal.pro-plan-prompt.description"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> selected`
    
      * - com.blank.page.toolbar.selected_one: `<0>{{count}}</0> doc selected`
    
      * - com.blank.page.toolbar.selected_other: `<0>{{count}}</0> doc(s) selected`
      */
    ["com.blank.page.toolbar.selected"]: ComponentType<TypedTransProps<{
        readonly count: string | number | bigint;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> doc selected`
      */
    ["com.blank.page.toolbar.selected_one"]: ComponentType<TypedTransProps<{
        readonly count: string | number | bigint;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> doc(s) selected`
      */
    ["com.blank.page.toolbar.selected_other"]: ComponentType<TypedTransProps<{
        readonly count: string | number | bigint;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> doc(s) selected`
      */
    ["com.blank.page.toolbar.selected_others"]: ComponentType<TypedTransProps<{
        readonly count: string;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `You are currently on the <a>free plan</a>.`
      */
    ["com.blank.payment.billing-setting.ai.free-desc"]: ComponentType<TypedTransProps<Readonly<{}>, {
        a: JSX.Element;
    }>>;
    /**
      * `You have purchased <a>Believer plan</a>. Enjoy with your benefits!`
      */
    ["com.blank.payment.billing-setting.believer.description"]: ComponentType<TypedTransProps<Readonly<{}>, {
        a: JSX.Element;
    }>>;
    /**
      * `You are currently on the <1>{{planName}} plan</1>.`
      */
    ["com.blank.payment.billing-setting.current-plan.description"]: ComponentType<TypedTransProps<{
        readonly planName: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `You are currently on the believer <1>{{planName}} plan</1>.`
      */
    ["com.blank.payment.billing-setting.current-plan.description.lifetime"]: ComponentType<TypedTransProps<{
        readonly planName: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `You are currently on the monthly <1>{{planName}} plan</1>.`
      */
    ["com.blank.payment.billing-setting.current-plan.description.monthly"]: ComponentType<TypedTransProps<{
        readonly planName: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `You are currently on the annually <1>{{planName}} plan</1>.`
      */
    ["com.blank.payment.billing-setting.current-plan.description.yearly"]: ComponentType<TypedTransProps<{
        readonly planName: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `One-time Purchase. Personal use rights for up to 150 years. <a>Fair Usage Policies</a> may apply.`
      */
    ["com.blank.payment.lifetime.caption-2"]: ComponentType<TypedTransProps<Readonly<{}>, {
        a: JSX.Element;
    }>>;
    /**
      * `You are currently on the {{currentPlan}} plan. If you have any questions, please contact our <3>customer support</3>.`
      */
    ["com.blank.payment.subtitle-active"]: ComponentType<TypedTransProps<{
        readonly currentPlan: string;
    }, {
        ["3"]: JSX.Element;
    }>>;
    /**
      * `If you have any questions, please contact our <1> customer support</1>.`
      */
    ["com.blank.payment.upgrade-success-page.support"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `If you have any questions, please contact our <1>customer support</1>.`
      */
    ["com.blank.payment.upgrade-success-page.team.text-2"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `If you have any questions, please contact our <1>customer support</1>.`
      */
    ["com.blank.payment.license-success.text-2"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `This action deletes the old Favorites section. <b>Your documents are safe</b>, ensure you've moved your frequently accessed documents to the new personal Favorites section.`
      */
    ["com.blank.rootAppSidebar.migration-data.clean-all.description"]: ComponentType<TypedTransProps<Readonly<{}>, {
        b: JSX.Element;
    }>>;
    /**
      * `<b>Your documents are safe</b>, but you'll need to re-pin your most-used ones. "Favorites" are now personal. Move items from the old shared section to your new personal section or remove the old one by clicking "Empty the old favorites" now.`
      */
    ["com.blank.rootAppSidebar.migration-data.help.description"]: ComponentType<TypedTransProps<Readonly<{}>, {
        b: JSX.Element;
    }>>;
    /**
      * `No doc titles contain <1>{{search}}</1>`
      */
    ["com.blank.selectPage.empty.tips"]: ComponentType<TypedTransProps<{
        readonly search: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Are you sure you want to delete your account from <1>{{server}}</1>?`
      */
    ["com.blank.setting.account.delete.confirm-delete-description-1"]: ComponentType<TypedTransProps<{
        readonly server: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Your account will be inaccessible, and your personal cloud space will be permanently deleted. You can remove local data by uninstalling the app or clearing your browser storage. <1>This action is irreversible.</1>`
      */
    ["com.blank.setting.account.delete.confirm-delete-description-2"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Don't have the app? <1>Click to download</1>.`
      */
    ["com.blank.open-in-app.card.subtitle"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Settings changed; please restart the app. <1>Restart</1>`
      */
    ["com.blank.settings.editorSettings.general.spell-check.restart-hint"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Love our app? <1>Star us on GitHub</1> and <2>create issues</2> for your valuable feedback!`
      */
    ["com.blank.settings.suggestion-2"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
    }>>;
    /**
      * `Meeting Features Available <strong>Free</strong> in Beta Phase`
      */
    ["com.blank.settings.meetings.setting.prompt.2"]: ComponentType<TypedTransProps<Readonly<{}>, {
        strong: JSX.Element;
    }>>;
    /**
      * `<strong>Where AI meets your meetings - blank your collaboration.</strong>
    <ul><li>Extract Action Items & Key Insights Instantly</li><li>Smart Auto-Capture Starts With Your Meeting</li><li>Seamless Integration Across All Meeting Platforms</li><li>One Unified Space for All Your Meeting's Context</li><li>Your AI Assistant with Every Meeting Context Preserved</li></ul>`
      */
    ["com.blank.settings.meetings.setting.welcome.hints"]: ComponentType<TypedTransProps<Readonly<{}>, {
        strong: JSX.Element;
        ul: JSX.Element;
        li: JSX.Element;
    }>>;
    /**
      * `Utilize the meeting notes and AI summarization features provided by Blank. <1>Discuss more in the community</1>.`
      */
    ["com.blank.settings.meetings.enable.description"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Activate using the local key from <1>Toeverything.Inc</1>`
      */
    ["com.blank.settings.workspace.license.self-host-team.team.license"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Copy your workspace id and <1>reach out to us</1>.`
      */
    ["com.blank.settings.workspace.license.self-host-team.upload-license-file.tips.content"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `If you encounter any issues, open a GitHub issue on the Blank repository. No license yet? <1>Click to purchase</1>.`
      */
    ["com.blank.settings.workspace.license.activate-modal.tips"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `This will make the workspace read-only. Your key remains usable elsewhere. Deactivation doesn't cancel your Team plan. To cancel, go to <1>Manage Payment</1>.`
      */
    ["com.blank.settings.workspace.license.deactivate-modal.description"]: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `The "<1>{{ name }}</1>" property will be removed. This action cannot be undone.`
      */
    ["com.blank.settings.workspace.properties.delete-property-desc"]: ComponentType<TypedTransProps<{
        readonly name: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> doc`
      */
    ["com.blank.settings.workspace.properties.doc"]: ComponentType<TypedTransProps<{
        readonly count: string;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> docs`
      */
    ["com.blank.settings.workspace.properties.doc_others"]: ComponentType<TypedTransProps<{
        readonly count: string;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `Manage workspace <1>{{name}}</1> properties`
      */
    ["com.blank.settings.workspace.properties.header.subtitle"]: ComponentType<TypedTransProps<{
        readonly name: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> selected`
    
      * - com.blank.tag.toolbar.selected_one: `<0>{{count}}</0> tag selected`
    
      * - com.blank.tag.toolbar.selected_other: `<0>{{count}}</0> tag(s) selected`
      */
    ["com.blank.tag.toolbar.selected"]: ComponentType<TypedTransProps<{
        readonly count: string | number | bigint;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> tag selected`
      */
    ["com.blank.tag.toolbar.selected_one"]: ComponentType<TypedTransProps<{
        readonly count: string | number | bigint;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> tag(s) selected`
      */
    ["com.blank.tag.toolbar.selected_other"]: ComponentType<TypedTransProps<{
        readonly count: string | number | bigint;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `<0>{{count}}</0> tag(s) selected`
      */
    ["com.blank.tag.toolbar.selected_others"]: ComponentType<TypedTransProps<{
        readonly count: string;
    }, {
        ["0"]: JSX.Element;
    }>>;
    /**
      * `Deleting <1>{{workspace}}</1> cannot be undone, please proceed with caution. All contents will be lost.`
      */
    ["com.blank.workspaceDelete.description"]: ComponentType<TypedTransProps<{
        readonly workspace: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Deleting <1>{{workspace}}</1> will delete both local and cloud data, this operation cannot be undone, please proceed with caution.`
      */
    ["com.blank.workspaceDelete.description2"]: ComponentType<TypedTransProps<{
        readonly workspace: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * ` We recommend the <1>Chrome</1> browser for optimal experience.`
      */
    recommendBrowser: ComponentType<TypedTransProps<Readonly<{}>, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `Are you sure you want to upgrade <1>{{workspaceName}}</1> to a Team Workspace? This will allow unlimited members to collaborate in this workspace.`
      */
    ["com.blank.upgrade-to-team-page.upgrade-confirm.description"]: ComponentType<TypedTransProps<{
        readonly workspaceName: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `<1>{{username}}</1> mentioned you in <2>{{docTitle}}</2>`
      */
    ["com.blank.notification.mention"]: ComponentType<TypedTransProps<Readonly<{
        username: string;
        docTitle: string;
    }>, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
    }>>;
    /**
      * `<1>{{username}}</1> commented in <2>{{docTitle}}</2>`
      */
    ["com.blank.notification.comment"]: ComponentType<TypedTransProps<Readonly<{
        username: string;
        docTitle: string;
    }>, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
    }>>;
    /**
      * `<1>{{username}}</1> mentioned you in a comment in <2>{{docTitle}}</2>`
      */
    ["com.blank.notification.comment-mention"]: ComponentType<TypedTransProps<Readonly<{
        username: string;
        docTitle: string;
    }>, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
    }>>;
    /**
      * `<1>{{username}}</1> has accepted your invitation`
      */
    ["com.blank.notification.invitation-accepted"]: ComponentType<TypedTransProps<{
        readonly username: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `<1>{{username}}</1> has requested to join <2>{{workspaceName}}</2>`
      */
    ["com.blank.notification.invitation-review-request"]: ComponentType<TypedTransProps<Readonly<{
        username: string;
        workspaceName: string;
    }>, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
    }>>;
    /**
      * `<1>{{username}}</1> has declined your request to join <2>{{workspaceName}}</2>`
      */
    ["com.blank.notification.invitation-review-declined"]: ComponentType<TypedTransProps<Readonly<{
        username: string;
        workspaceName: string;
    }>, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
    }>>;
    /**
      * `<1>{{username}}</1> has approved your request to join <2>{{workspaceName}}</2>`
      */
    ["com.blank.notification.invitation-review-approved"]: ComponentType<TypedTransProps<Readonly<{
        username: string;
        workspaceName: string;
    }>, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
    }>>;
    /**
      * `There is an issue regarding your invitation to <1>{{workspaceName}}</1> `
      */
    ["com.blank.notification.invitation-blocked"]: ComponentType<TypedTransProps<{
        readonly workspaceName: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
    /**
      * `<1>{{username}}</1> invited you to join <2>{{workspaceName}}</2>`
      */
    ["com.blank.notification.invitation"]: ComponentType<TypedTransProps<Readonly<{
        username: string;
        workspaceName: string;
    }>, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
    }>>;
    /**
      * `Unable to join <1/> <2>{{workspaceName}}</2> due to insufficient seats available.`
      */
    ["com.blank.fail-to-join-workspace.description-1"]: ComponentType<TypedTransProps<{
        readonly workspaceName: string;
    }, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
    }>>;
    /**
      * `You requested to join <1/> <2>{{workspaceName}}</2> with <3>{{userEmail}}</3>, the workspace owner and team admins will review your request.`
      */
    ["com.blank.sent-request-to-join-workspace.description"]: ComponentType<TypedTransProps<Readonly<{
        workspaceName: string;
        userEmail: string;
    }>, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
        ["3"]: JSX.Element;
    }>>;
    /**
      * `Unable to process your request to join <1/> <2>{{workspaceName}}</2> with <3>{{userEmail}}</3>, the workspace has reached its member limit. Please contact the workspace owner for available seats.`
      */
    ["com.blank.failed-to-send-request.description"]: ComponentType<TypedTransProps<Readonly<{
        workspaceName: string;
        userEmail: string;
    }>, {
        ["1"]: JSX.Element;
        ["2"]: JSX.Element;
        ["3"]: JSX.Element;
    }>>;
    /**
      * `Import your Readwise highlights to Blank. Please visit Readwise, <br />click <a>"Get Access Token"</a>, and paste the token below.`
      */
    ["com.blank.integration.readwise.connect.desc"]: ComponentType<TypedTransProps<Readonly<{}>, {
        br: JSX.Element;
        a: JSX.Element;
    }>>;
    /**
      * `Updates to be imported since last successful import on {{lastImportedAt}} <a>Import everything instead</a>`
      */
    ["com.blank.integration.readwise.import.desc-from-last"]: ComponentType<TypedTransProps<{
        readonly lastImportedAt: string;
    }, {
        a: JSX.Element;
    }>>;
    /**
      * `Please contact <1>{{user}}</1> to upgrade AI rights or resend the attachment.`
      */
    ["com.blank.audio.transcribe.non-owner.confirm.message"]: ComponentType<TypedTransProps<{
        readonly user: string;
    }, {
        ["1"]: JSX.Element;
    }>>;
} = /*#__PURE__*/ createProxy(createComponent);
