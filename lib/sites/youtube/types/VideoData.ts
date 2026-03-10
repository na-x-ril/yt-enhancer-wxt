export interface InitialData {
  responseContext: InitialDataResponseContext;
  contents: Contents;
  header?: InitialDataHeader;
  trackingParams: string;
  topbar: Topbar;
  onResponseReceivedActions?: OnResponseReceivedAction[];
  currentVideoEndpoint?: CurrentVideoEndpoint;
  playerOverlays?: PlayerOverlays;
  onResponseReceivedEndpoints?: OnResponseReceivedEndpoint[];
  engagementPanels?: EngagementPanel[];
  pageVisualEffects?: PageVisualEffect[];
  microformat?: InitialDataMicroformat;
  frameworkUpdates?: FrameworkUpdates;
}

export interface Contents {
  twoColumnBrowseResultsRenderer?: TwoColumnBrowseResultsRenderer;
  twoColumnWatchNextResults?: TwoColumnWatchNextResults;
}

export interface TwoColumnBrowseResultsRenderer {
  tabs: Tab[];
}

export interface Tab {
  tabRenderer: TabRenderer;
}

export interface TabRenderer {
  selected: boolean;
  content: TabRendererContent;
  tabIdentifier: string;
  trackingParams: string;
}

export interface TabRendererContent {
  richGridRenderer: RichGridRenderer;
}

export interface RichGridRenderer {
  contents: RichGridRendererContent[];
  trackingParams: string;
  header: RichGridRendererHeader;
  targetId: TargetID;
  reflowOptions: ReflowOptions;
  layoutSizing: string;
  minItemWidth: number;
}

export interface RichGridRendererContent {
  richItemRenderer?: PurpleRichItemRenderer;
  richSectionRenderer?: RichSectionRenderer;
  continuationItemRenderer?: PurpleContinuationItemRenderer;
}

export interface PurpleContinuationItemRenderer {
  trigger: string;
  continuationEndpoint: PurpleContinuationEndpoint;
  ghostCards: GhostCards;
}

export interface PurpleContinuationEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  continuationCommand: ContinuationEndpointContinuationCommand;
}

export interface ContinuationEndpointCommandMetadata {
  webCommandMetadata: PurpleWebCommandMetadata;
}

export interface PurpleWebCommandMetadata {
  sendPost: boolean;
  apiUrl?: APIURL;
}

export enum APIURL {
  YoutubeiV1AccountAccountMenu = "/youtubei/v1/account/account_menu",
  YoutubeiV1AccountSetSetting = "/youtubei/v1/account/set_setting",
  YoutubeiV1BackstageCreatePost = "/youtubei/v1/backstage/create_post",
  YoutubeiV1Browse = "/youtubei/v1/browse",
  YoutubeiV1BrowseEditPlaylist = "/youtubei/v1/browse/edit_playlist",
  YoutubeiV1CommentPerformCommentAction = "/youtubei/v1/comment/perform_comment_action",
  YoutubeiV1Feedback = "/youtubei/v1/feedback",
  YoutubeiV1FlagGetForm = "/youtubei/v1/flag/get_form",
  YoutubeiV1GetSurvey = "/youtubei/v1/get_survey",
  YoutubeiV1GetTranscript = "/youtubei/v1/get_transcript",
  YoutubeiV1LikeDislike = "/youtubei/v1/like/dislike",
  YoutubeiV1LikeLike = "/youtubei/v1/like/like",
  YoutubeiV1LikeRemovelike = "/youtubei/v1/like/removelike",
  YoutubeiV1Next = "/youtubei/v1/next",
  YoutubeiV1NotificationAddUpcomingEventReminder = "/youtubei/v1/notification/add_upcoming_event_reminder",
  YoutubeiV1NotificationGetUnseenCount = "/youtubei/v1/notification/get_unseen_count",
  YoutubeiV1NotificationModifyChannelPreference = "/youtubei/v1/notification/modify_channel_preference",
  YoutubeiV1NotificationRemoveUpcomingEventReminder = "/youtubei/v1/notification/remove_upcoming_event_reminder",
  YoutubeiV1PlaylistCreate = "/youtubei/v1/playlist/create",
  YoutubeiV1ShareGetSharePanel = "/youtubei/v1/share/get_share_panel",
  YoutubeiV1ShareGetWebPlayerSharePanel = "/youtubei/v1/share/get_web_player_share_panel",
  YoutubeiV1SubscriptionSubscribe = "/youtubei/v1/subscription/subscribe",
  YoutubeiV1SubscriptionUnsubscribe = "/youtubei/v1/subscription/unsubscribe",
  YoutubeiV1UpdatedMetadata = "/youtubei/v1/updated_metadata",
  YoutubeiV1YpcGetOffers = "/youtubei/v1/ypc/get_offers",
}

export interface ContinuationEndpointContinuationCommand {
  token: string;
  request: Request;
}

export enum Request {
  ContinuationRequestTypeBrowse = "CONTINUATION_REQUEST_TYPE_BROWSE",
  ContinuationRequestTypeWatchNext = "CONTINUATION_REQUEST_TYPE_WATCH_NEXT",
}

export interface GhostCards {
  ghostGridRenderer: GhostGridRenderer;
}

export interface GhostGridRenderer {
  rows: number;
}

export interface PurpleRichItemRenderer {
  content: PurpleContent;
  trackingParams: string;
  onFocusEffect: OnFocusEffect;
  rowIndex: number;
  colIndex: number;
}

export interface PurpleContent {
  adSlotRenderer?: AdSlotRenderer;
  lockupViewModel?: PurpleLockupViewModel;
}

export interface AdSlotRenderer {
  adSlotMetadata: AdSlotMetadata;
  fulfillmentContent: FulfillmentContent;
  enablePacfLoggingWeb: boolean;
  trackingParams: string;
}

export interface AdSlotMetadata {
  slotId: string;
  slotType: string;
  slotPhysicalPosition: number;
  adSlotLoggingData: AdSlotLoggingData;
}

export interface AdSlotLoggingData {
  serializedSlotAdServingDataEntry: string;
}

export interface FulfillmentContent {
  fulfilledLayout: FulfilledLayout;
}

export interface FulfilledLayout {
  inFeedAdLayoutRenderer: InFeedAdLayoutRenderer;
}

export interface InFeedAdLayoutRenderer {
  adLayoutMetadata: AdLayoutMetadat;
  renderingContent: RenderingContent;
}

export interface AdLayoutMetadat {
  layoutId: string;
  layoutType: string;
  adLayoutLoggingData: AdLayoutLoggingData;
}

export interface AdLayoutLoggingData {
  serializedAdServingDataEntry: string;
}

export interface RenderingContent {
  topLandscapeImageLayoutViewModel?: TopLandscapeImageLayoutViewModel;
  videoDisplayButtonGroupLayoutViewModel?: VideoDisplayButtonGroupLayoutViewModel;
}

export interface TopLandscapeImageLayoutViewModel {
  interaction: TopLandscapeImageLayoutViewModelInteraction;
  adLayoutData: AdLayoutData;
  thumbnailImage: ThumbnailImage;
  feedAdMetadata: FeedAdMetadataClass;
  adButtonHoverOverlay: AdButtonHoverOverlay;
  loggingDirectives: ButtonViewModelLoggingDirectives;
}

export interface AdButtonHoverOverlay {
  adButtonHoverOverlayViewModel: AdButtonHoverOverlayViewModel;
}

export interface AdButtonHoverOverlayViewModel {
  interaction: CommandContextClass;
  button: PrimaryAdButtonClass;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface PrimaryAdButtonClass {
  adButtonViewModel: ButtonAdButtonViewModel;
}

export interface ButtonAdButtonViewModel {
  interaction: PurpleInteraction;
  style: string;
  size: string;
  label: BodyText;
  trackingParams: string;
  iconImage?: LeadingImage;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface LeadingImage {
  sources: LeadingImageSource[];
}

export interface LeadingImageSource {
  clientResource: ClientResource;
}

export interface ClientResource {
  imageName: IconName;
}

export enum IconName {
  AddToQueueTail = "ADD_TO_QUEUE_TAIL",
  ArrowDiagonalUpRightFilled = "ARROW_DIAGONAL_UP_RIGHT_FILLED",
  AudioBadge = "AUDIO_BADGE",
  BookmarkBorder = "BOOKMARK_BORDER",
  CheckCircleFilled = "CHECK_CIRCLE_FILLED",
  Feedback = "FEEDBACK",
  Flag = "FLAG",
  LibraryAdd = "LIBRARY_ADD",
  Live = "LIVE",
  Mix = "MIX",
  Music = "MUSIC",
  NotInterested = "NOT_INTERESTED",
  PlayAll = "PLAY_ALL",
  PlayDisabled = "PLAY_DISABLED",
  Playlists = "PLAYLISTS",
  Remove = "REMOVE",
  Share = "SHARE",
  SlashCircleLeft = "SLASH_CIRCLE_LEFT",
  WatchLater = "WATCH_LATER",
}

export interface PurpleInteraction {
  accessibility: Accessibility;
  onTap: InteractionOnTap;
}

export interface Accessibility {
  label: string;
}

export interface InteractionOnTap {
  innertubeCommand: OnSelectInnertubeCommand;
}

export interface OnSelectInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  urlEndpoint: CommandURLEndpoint;
}

export interface AutoplayVideoCommandMetadata {
  webCommandMetadata: FluffyWebCommandMetadata;
}

export interface FluffyWebCommandMetadata {
  url?: string;
  webPageType?: WebPageType;
  rootVe?: number;
  apiUrl?: APIURL;
  sendPost?: boolean;
}

export enum WebPageType {
  WebPageTypeBrowse = "WEB_PAGE_TYPE_BROWSE",
  WebPageTypeChannel = "WEB_PAGE_TYPE_CHANNEL",
  WebPageTypePlaylist = "WEB_PAGE_TYPE_PLAYLIST",
  WebPageTypeSearch = "WEB_PAGE_TYPE_SEARCH",
  WebPageTypeShorts = "WEB_PAGE_TYPE_SHORTS",
  WebPageTypeUnknown = "WEB_PAGE_TYPE_UNKNOWN",
  WebPageTypeWatch = "WEB_PAGE_TYPE_WATCH",
}

export interface CommandURLEndpoint {
  url: string;
  target: TargetEnum;
}

export enum TargetEnum {
  TargetNewWindow = "TARGET_NEW_WINDOW",
}

export interface BodyText {
  content: string;
}

export interface AdButtonViewModelLoggingDirectives {
  trackingParams: string;
  visibility: VisibilityClass;
}

export interface VisibilityClass {
  types: string;
}

export interface CommandContextClass {
  onTap: InteractionOnTap;
}

export interface AdLayoutData {
  activeViewData: ActiveViewData;
}

export interface ActiveViewData {
  viewableCommand: EndOfSessionCommandClass;
  endOfSessionCommand: EndOfSessionCommandClass;
  regexUriMacroValidator: RegexURIMacroValidator;
  identifier: string;
}

export interface EndOfSessionCommandClass {
  innertubeCommand: EndOfSessionCommandInnertubeCommand;
}

export interface EndOfSessionCommandInnertubeCommand {
  clickTrackingParams: string;
  loggingUrls: URL[];
  pingingEndpoint: AdsEngagementPanelContentRenderer;
}

export interface URL {
  baseUrl: string;
}

export interface AdsEngagementPanelContentRenderer {
  hack: boolean;
}

export interface RegexURIMacroValidator {
  emptyMap: boolean;
}

export interface FeedAdMetadataClass {
  feedAdMetadataViewModel: FeedAdMetadataViewModel;
}

export interface FeedAdMetadataViewModel {
  interaction: CommandContextClass;
  style: string;
  headline: Description;
  description?: Description;
  adBadge: AdBadge;
  adDetailsLine: AdDetailsLine;
  menu: FeedAdMetadataViewModelMenu;
  adRenderingContextType: string;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
  adAvatar?: AdAvatar;
}

export interface AdAvatar {
  adAvatarViewModel: AdAvatarViewModel;
}

export interface AdAvatarViewModel {
  interaction: CommandContextClass;
  style: string;
  image: LogoDarkClass;
  size: string;
  trackingParams: string;
  rendererContext: AdAvatarViewModelRendererContext;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface LogoDarkClass {
  sources: ThumbnailElement[];
}

export interface ThumbnailElement {
  url: string;
  width: number;
  height: number;
}

export interface AdAvatarViewModelRendererContext {
  accessibilityContext: Accessibility;
}

export interface AdBadge {
  adBadgeViewModel: AdEViewModel;
}

export interface AdEViewModel {
  interaction: CommandContextClass;
  style: string;
  label?: BodyText;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
  attributes?: Paragraph[];
}

export interface Paragraph {
  text: BodyText;
}

export interface AdDetailsLine {
  adDetailsLineViewModel: AdEViewModel;
}

export interface Description {
  content: string;
  commandRuns: DescriptionCommandRun[];
}

export interface DescriptionCommandRun {
  loggingDirectives?: InfoCardIconRenderer;
  onTap?: InteractionOnTap;
}

export interface InfoCardIconRenderer {
  trackingParams: string;
}

export interface FeedAdMetadataViewModelMenu {
  buttonViewModel: MenuButtonViewModel;
}

export interface MenuButtonViewModel {
  iconName: PurpleIconName;
  onTap: PurpleOnTap;
  accessibilityText: string;
  style: string;
  trackingParams: string;
  buttonSize: PrimaryButtonButtonSize;
  state: StateEnum;
  tooltip: string;
  loggingDirectives: ButtonViewModelLoggingDirectives;
}

export enum PrimaryButtonButtonSize {
  ButtonViewModelSizeCompact = "BUTTON_VIEW_MODEL_SIZE_COMPACT",
  ButtonViewModelSizeDefault = "BUTTON_VIEW_MODEL_SIZE_DEFAULT",
  ButtonViewModelSizeXsmall = "BUTTON_VIEW_MODEL_SIZE_XSMALL",
}

export enum PurpleIconName {
  AddToQueueTail = "ADD_TO_QUEUE_TAIL",
  ChevronLeft = "CHEVRON_LEFT",
  ChevronRight = "CHEVRON_RIGHT",
  MoreVert = "MORE_VERT",
  WatchLater = "WATCH_LATER",
}

export interface ButtonViewModelLoggingDirectives {
  trackingParams: string;
  visibility: VisibilityClass;
  attentionLogging: string;
}

export interface PurpleOnTap {
  innertubeCommand: PurpleInnertubeCommand;
}

export interface PurpleInnertubeCommand {
  clickTrackingParams: string;
  openPopupAction: PurpleOpenPopupAction;
}

export interface PurpleOpenPopupAction {
  popup: PurplePopup;
  popupType: PurplePopupType;
  accessibilityData: DisabledAccessibilityData;
}

export interface DisabledAccessibilityData {
  accessibilityData: Accessibility;
}

export interface PurplePopup {
  aboutThisAdRenderer: AboutThisAdRenderer;
}

export interface AboutThisAdRenderer {
  url: FundingChoiceInstructionPageURLClass;
  trackingParams: string;
}

export interface FundingChoiceInstructionPageURLClass {
  privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string;
}

export enum PurplePopupType {
  Dialog = "DIALOG",
}

export enum StateEnum {
  ButtonViewModelStateActive = "BUTTON_VIEW_MODEL_STATE_ACTIVE",
}

export interface TopLandscapeImageLayoutViewModelInteraction {
  onTap: InteractionOnTap;
  onFirstVisible: OnFirstVisible;
}

export interface OnFirstVisible {
  performOnceCommand: OnFirstVisiblePerformOnceCommand;
}

export interface OnFirstVisiblePerformOnceCommand {
  identifier: string;
  command: PerformOnceCommandCommand;
}

export interface PerformOnceCommandCommand {
  innertubeCommand: FluffyInnertubeCommand;
}

export interface FluffyInnertubeCommand {
  loggingUrls: URL[];
  pingingEndpoint: AdsEngagementPanelContentRenderer;
}

export interface ThumbnailImage {
  adImageViewModel: AdImageViewModel;
}

export interface AdImageViewModel {
  interaction: CommandContextClass;
  imageSources: ThumbnailElement[];
  imageProperties: ImageProperties;
  background: Background;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface Background {
  backgroundImageSource: BackgroundImageSource;
}

export interface BackgroundImageSource {
  imageSources: ThumbnailElement[];
}

export interface ImageProperties {
  contentMode: string;
  renderingAspect: string;
}

export interface VideoDisplayButtonGroupLayoutViewModel {
  interaction: VideoDisplayButtonGroupLayoutViewModelInteraction;
  adLayoutData: AdLayoutData;
  videoLockup: VideoLockup;
  rendererContext: VideoDisplayButtonGroupLayoutViewModelRendererContext;
}

export interface VideoDisplayButtonGroupLayoutViewModelInteraction {
  onFirstVisible: OnFirstVisible;
}

export interface VideoDisplayButtonGroupLayoutViewModelRendererContext {
  loggingContext: PurpleLoggingContext;
}

export interface PurpleLoggingContext {
  loggingDirectives: PurpleLoggingDirectives;
}

export interface PurpleLoggingDirectives {
  trackingParams: string;
  attentionLogging: string;
}

export interface VideoLockup {
  lockupViewModel: VideoLockupLockupViewModel;
}

export interface VideoLockupLockupViewModel {
  contentImage: PurpleContentImage;
  metadata: FeedAdMetadataClass;
  contentId: string;
  itemPlayback: PurpleItemPlayback;
  attachmentSlot: AttachmentSlot;
  rendererContext: PurpleRendererContext;
}

export interface AttachmentSlot {
  lockupAttachmentsViewModel: LockupAttachmentsViewModel;
}

export interface LockupAttachmentsViewModel {
  attachments: Attachment[];
}

export interface Attachment {
  adButtonGroupViewModel: AdButtonGroupViewModel;
}

export interface AdButtonGroupViewModel {
  primaryAdButton: PrimaryAdButtonClass;
  secondaryAdButton: SecondaryAdButton;
}

export interface SecondaryAdButton {
  adButtonViewModel: SecondaryAdButtonAdButtonViewModel;
}

export interface SecondaryAdButtonAdButtonViewModel {
  interaction: FluffyInteraction;
  style: string;
  size: string;
  label: BodyText;
  trackingParams: string;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface FluffyInteraction {
  accessibility: Accessibility;
  onTap: InteractionOnTapClass;
}

export interface InteractionOnTapClass {
  innertubeCommand: TentacledInnertubeCommand;
}

export interface TentacledInnertubeCommand {
  clickTrackingParams: string;
  loggingUrls: URL[];
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: AutoplayVideoWatchEndpoint;
}

export interface AutoplayVideoWatchEndpoint {
  videoId: string;
  params?: string;
  playerParams?: string;
  watchEndpointSupportedOnesieConfig?: WatchEndpointSupportedOnesieConfig;
  watchEndpointSupportedPrefetchConfig?: WatchEndpointSupportedPrefetchConfig;
}

export interface WatchEndpointSupportedOnesieConfig {
  html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig;
}

export interface Html5PlaybackOnesieConfig {
  commonConfig: CommonConfig;
}

export interface CommonConfig {
  url: string;
}

export interface WatchEndpointSupportedPrefetchConfig {
  prefetchHintConfig: PrefetchHintConfig;
}

export interface PrefetchHintConfig {
  prefetchPriority: number;
  countdownUiRelativeSecondsPrefetchCondition: number;
}

export interface PurpleContentImage {
  thumbnailViewModel: PurpleThumbnailViewModel;
}

export interface PurpleThumbnailViewModel {
  image: LogoDarkClass;
  overlays: PurpleOverlay[];
  rendererContext: ThumbnailViewModelRendererContext;
}

export interface PurpleOverlay {
  thumbnailOverlayButtonViewModel?: ThumbnailOverlayButtonViewModel;
  thumbnailOverlayBadgeViewModel?: PurpleThumbnailOverlayBadgeViewModel;
}

export interface PurpleThumbnailOverlayBadgeViewModel {
  thumbnailBadges: PurpleThumbnailBadge[];
  position: string;
}

export interface PurpleThumbnailBadge {
  thumbnailBadgeViewModel: PurpleThumbnailBadgeViewModel;
}

export interface PurpleThumbnailBadgeViewModel {
  badgeStyle: ThumbnailBadgeViewModelBadgeStyle;
  animationActivationTargetId: string;
  animationActivationEntityKey: EntityKey;
  lottieData: LottieData;
  animatedText: AnimatedText;
  animationActivationEntitySelectorType: AnimationActivationEntitySelectorType;
}

export enum AnimatedText {
  SedangDiputar = "Sedang diputar",
}

export enum EntityKey {
  Eh8VeW91DHViZS9HcHAvd2F0Y2GvcGxheWVyX3N0YXRlIMMCKAE3D = "Eh8veW91dHViZS9hcHAvd2F0Y2gvcGxheWVyX3N0YXRlIMMCKAE%3D",
}

export enum AnimationActivationEntitySelectorType {
  ThumbnailBadgeAnimationEntitySelectorTypePlayerState = "THUMBNAIL_BADGE_ANIMATION_ENTITY_SELECTOR_TYPE_PLAYER_STATE",
}

export enum ThumbnailBadgeViewModelBadgeStyle {
  ThumbnailOverlayBadgeStyleDefault = "THUMBNAIL_OVERLAY_BADGE_STYLE_DEFAULT",
  ThumbnailOverlayBadgeStyleLive = "THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE",
}

export interface LottieData {
  url: string;
  settings: Settings;
}

export interface Settings {
  loop: boolean;
  autoplay: boolean;
}

export interface ThumbnailOverlayButtonViewModel {
  overlayButton: OverlayButton;
}

export interface OverlayButton {
  buttonViewModel: OverlayButtonButtonViewModel;
}

export interface OverlayButtonButtonViewModel {
  iconName: IconName;
  style: PurpleStyle;
  trackingParams: string;
  type: TypeEnum;
  buttonSize: PrimaryButtonButtonSize;
}

export enum PurpleStyle {
  ButtonViewModelStyleMono = "BUTTON_VIEW_MODEL_STYLE_MONO",
  ButtonViewModelStyleOverlayDark = "BUTTON_VIEW_MODEL_STYLE_OVERLAY_DARK",
}

export enum TypeEnum {
  ButtonViewModelTypeText = "BUTTON_VIEW_MODEL_TYPE_TEXT",
  ButtonViewModelTypeTonal = "BUTTON_VIEW_MODEL_TYPE_TONAL",
}

export interface ThumbnailViewModelRendererContext {
  loggingContext: FluffyLoggingContext;
}

export interface FluffyLoggingContext {
  loggingDirectives: InfoCardIconRenderer;
}

export interface PurpleItemPlayback {
  inlinePlayerData: PurpleInlinePlayerData;
}

export interface PurpleInlinePlayerData {
  onSelect: InteractionOnTap;
  onVisible: PurpleOnVisible;
}

export interface PurpleOnVisible {
  innertubeCommand: NavigationEndpointElement;
}

export interface NavigationEndpointElement {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: AutoplayVideoWatchEndpoint;
}

export interface PurpleRendererContext {
  commandContext: CommandContextClass;
}

export interface PurpleLockupViewModel {
  contentImage: FluffyContentImage;
  metadata: PurpleMetadata;
  contentId: string;
  contentType: ContentType;
  itemPlayback?: FluffyItemPlayback;
  rendererContext: IndigoRendererContext;
}

export interface FluffyContentImage {
  thumbnailViewModel?: FluffyThumbnailViewModel;
  collectionThumbnailViewModel?: CollectionThumbnailViewModel;
}

export interface CollectionThumbnailViewModel {
  primaryThumbnail: PrimaryThumbnail;
  stackColor: Color;
}

export interface PrimaryThumbnail {
  thumbnailViewModel: PrimaryThumbnailThumbnailViewModel;
}

export interface PrimaryThumbnailThumbnailViewModel {
  image: LogoDarkClass;
  overlays: FluffyOverlay[];
  backgroundColor: Color;
}

export interface Color {
  lightTheme: number;
  darkTheme: number;
}

export interface FluffyOverlay {
  thumbnailOverlayBadgeViewModel?: FluffyThumbnailOverlayBadgeViewModel;
  thumbnailHoverOverlayViewModel?: ThumbnailHoverOverlayViewModel;
}

export interface ThumbnailHoverOverlayViewModel {
  icon: LeadingImage;
  text: ThumbnailHoverOverlayViewModelTitle;
  style: string;
}

export interface ThumbnailHoverOverlayViewModelTitle {
  content: string;
  styleRuns: TitleStyleRun[];
}

export interface TitleStyleRun {
  startIndex: number;
  length: number;
}

export interface FluffyThumbnailOverlayBadgeViewModel {
  thumbnailBadges: FluffyThumbnailBadge[];
  position: string;
}

export interface FluffyThumbnailBadge {
  thumbnailBadgeViewModel: FluffyThumbnailBadgeViewModel;
}

export interface FluffyThumbnailBadgeViewModel {
  icon: LeadingImage;
  text: string;
  badgeStyle: ThumbnailBadgeViewModelBadgeStyle;
  backgroundColor: Color;
}

export interface FluffyThumbnailViewModel {
  image: LogoDarkClass;
  overlays: TentacledOverlay[];
}

export interface TentacledOverlay {
  thumbnailBottomOverlayViewModel?: PurpleThumbnailBottomOverlayViewModel;
  thumbnailHoverOverlayToggleActionsViewModel?: ThumbnailHoverOverlayToggleActionsViewModel;
}

export interface PurpleThumbnailBottomOverlayViewModel {
  badges: ThumbnailBottomOverlayViewModelBadge[];
}

export interface ThumbnailBottomOverlayViewModelBadge {
  thumbnailBadgeViewModel: BadgeThumbnailBadgeViewModel;
}

export interface BadgeThumbnailBadgeViewModel {
  text?: string;
  badgeStyle: ThumbnailBadgeViewModelBadgeStyle;
  animationActivationTargetId?: string;
  animationActivationEntityKey?: EntityKey;
  lottieData?: LottieData;
  animatedText?: AnimatedText;
  animationActivationEntitySelectorType?: AnimationActivationEntitySelectorType;
  rendererContext?: AdAvatarViewModelRendererContext;
  icon?: LeadingImage;
  inlinePlaybackBadgeData?: InlinePlaybackBadgeData;
}

export interface InlinePlaybackBadgeData {
  replicateAsTimestamp: boolean;
}

export interface ThumbnailHoverOverlayToggleActionsViewModel {
  buttons: ThumbnailHoverOverlayToggleActionsViewModelButton[];
}

export interface ThumbnailHoverOverlayToggleActionsViewModelButton {
  toggleButtonViewModel: ButtonToggleButtonViewModel;
}

export interface ButtonToggleButtonViewModel {
  defaultButtonViewModel: MenuButton;
  toggledButtonViewModel: PurpleToggledButtonViewModel;
  isToggled: boolean;
  trackingParams: string;
}

export interface MenuButton {
  buttonViewModel: NextButtonButtonViewModel;
}

export interface NextButtonButtonViewModel {
  iconName: PurpleIconName;
  onTap?: FluffyOnTap;
  accessibilityText: Tooltip;
  style: PurpleStyle;
  trackingParams: string;
  type: TypeEnum;
  buttonSize: PrimaryButtonButtonSize;
  state: StateEnum;
}

export enum Tooltip {
  Berikutnya = "Berikutnya",
  Sebelumnya = "Sebelumnya",
  TambahkanKeAntrean = "Tambahkan ke antrean",
  TindakanLainnya = "Tindakan lainnya",
  TontonNanti = "Tonton nanti",
}

export interface FluffyOnTap {
  innertubeCommand: StickyInnertubeCommand;
}

export interface StickyInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  playlistEditEndpoint?: ServiceEndpointPlaylistEditEndpoint;
  signalServiceEndpoint?: FluffySignalServiceEndpoint;
  showSheetCommand?: PurpleShowSheetCommand;
}

export interface ServiceEndpointPlaylistEditEndpoint {
  playlistId: PlaylistID;
  actions: PurpleAction[];
}

export interface PurpleAction {
  addedVideoId: string;
  action: Action4;
}

export enum Action4 {
  ActionAddVideo = "ACTION_ADD_VIDEO",
}

export enum PlaylistID {
  Wl = "WL",
}

export interface PurpleShowSheetCommand {
  panelLoadingStrategy: PurplePanelLoadingStrategy;
}

export interface PurplePanelLoadingStrategy {
  inlineContent: PurpleInlineContent;
}

export interface PurpleInlineContent {
  sheetViewModel: PurpleSheetViewModel;
}

export interface PurpleSheetViewModel {
  content: FluffyContent;
}

export interface FluffyContent {
  listViewModel: PurpleListViewModel;
}

export interface PurpleListViewModel {
  listItems: PurpleListItem[];
}

export interface PurpleListItem {
  listItemViewModel?: PurpleListItemViewModel;
  downloadListItemViewModel?: DownloadListItemViewModel;
}

export interface DownloadListItemViewModel {
  rendererContext: DownloadListItemViewModelRendererContext;
}

export interface DownloadListItemViewModelRendererContext {
  loggingContext: TentacledLoggingContext;
  commandContext: PurpleCommandContext;
}

export interface PurpleCommandContext {
  onTap: TentacledOnTap;
}

export interface TentacledOnTap {
  innertubeCommand: OnTapServiceEndpoint;
}

export interface OnTapServiceEndpoint {
  clickTrackingParams: string;
  offlineVideoEndpoint: ServiceEndpointOfflineVideoEndpoint;
}

export interface ServiceEndpointOfflineVideoEndpoint {
  videoId: string;
  onAddCommand: OnAddCommand;
}

export interface OnAddCommand {
  clickTrackingParams: string;
  getDownloadActionCommand: GetDownloadActionCommand;
}

export interface GetDownloadActionCommand {
  videoId: string;
  params: GetDownloadActionCommandParams;
  isCrossDeviceDownload: boolean;
  offlineabilityEntityKey?: string;
}

export enum GetDownloadActionCommandParams {
  Caeqaa3D3D = "CAEQAA%3D%3D",
  Caiqaa3D3D = "CAIQAA%3D%3D",
}

export interface TentacledLoggingContext {
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface PurpleListItemViewModel {
  title: BodyText;
  leadingImage: LeadingImage;
  rendererContext: FluffyRendererContext;
}

export interface FluffyRendererContext {
  loggingContext?: TentacledLoggingContext;
  commandContext: FluffyCommandContext;
}

export interface FluffyCommandContext {
  onTap: StickyOnTap;
}

export interface StickyOnTap {
  innertubeCommand: IndigoInnertubeCommand;
}

export interface IndigoInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: PurpleCommandMetadata;
  signalServiceEndpoint?: FluffySignalServiceEndpoint;
  playlistEditEndpoint?: ServiceEndpointPlaylistEditEndpoint;
  showSheetCommand?: NavigationEndpointShowSheetCommand;
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint;
  feedbackEndpoint?: PurpleFeedbackEndpoint;
  getReportFormEndpoint?: YpcGetOffersEndpoint;
}

export interface PurpleCommandMetadata {
  webCommandMetadata?: PurpleWebCommandMetadata;
  interactionLoggingCommandMetadata?: InteractionLoggingCommandMetadata;
}

export interface InteractionLoggingCommandMetadata {
  screenVisualElement: ScreenVisualElement;
}

export interface ScreenVisualElement {
  uiType: number;
}

export interface PurpleFeedbackEndpoint {
  feedbackToken: string;
  uiActions: UIActions;
  actions: FluffyAction[];
  contentId: string;
}

export interface FluffyAction {
  clickTrackingParams: string;
  replaceEnclosingAction: PurpleReplaceEnclosingAction;
}

export interface PurpleReplaceEnclosingAction {
  item: PurpleItem;
}

export interface PurpleItem {
  notificationMultiActionRenderer?: PurpleNotificationMultiActionRenderer;
  notificationTextRenderer?: PurpleNotificationTextRenderer;
}

export interface PurpleNotificationMultiActionRenderer {
  responseText: ShortViewCountTextClass;
  buttons: PurpleButton[];
  trackingParams: string;
  dismissalViewStyle: DismissalViewStyle;
}

export interface PurpleButton {
  buttonRenderer: PurpleButtonRenderer;
}

export interface PurpleButtonRenderer {
  style: DownloadButtonRendererStyle;
  text: ViewsClass;
  serviceEndpoint?: PurpleServiceEndpoint;
  trackingParams: string;
  command?: OnSelectInnertubeCommand;
}

export interface PurpleServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  undoFeedbackEndpoint?: PurpleUndoFeedbackEndpoint;
  signalServiceEndpoint?: PurpleSignalServiceEndpoint;
}

export interface PurpleSignalServiceEndpoint {
  signal: SignalServiceEndpointSignal;
  actions: TentacledAction[];
}

export interface TentacledAction {
  clickTrackingParams: string;
  signalAction: SignalAction;
}

export interface SignalAction {
  signal: SignalActionSignal;
  targetId: string;
}

export enum SignalActionSignal {
  TellUsWhy = "TELL_US_WHY",
}

export enum SignalServiceEndpointSignal {
  ClientSignal = "CLIENT_SIGNAL",
}

export interface PurpleUndoFeedbackEndpoint {
  undoToken: string;
  actions: StickyAction[];
  contentId: string;
}

export interface StickyAction {
  clickTrackingParams: string;
  undoFeedbackAction: AdsEngagementPanelContentRenderer;
}

export enum DownloadButtonRendererStyle {
  StyleBlueText = "STYLE_BLUE_TEXT",
  StyleDefault = "STYLE_DEFAULT",
  StyleText = "STYLE_TEXT",
}

export interface ViewsClass {
  simpleText?: SimpleText;
  runs?: ViewsRun[];
}

export interface ViewsRun {
  text: string;
}

export enum SimpleText {
  Deskripsi = "Deskripsi",
  Dipersonalisasi = "Dipersonalisasi",
  PelajariLebihLanjut = "Pelajari lebih lanjut",
  Semua = "Semua",
  The307XDitonton = "307 x ditonton",
  The4676XDitonton = "4.676 x ditonton",
  TidakAda = "Tidak ada",
  Urungkan = "Urungkan",
}

export enum DismissalViewStyle {
  DismissalViewStyleCompactTall = "DISMISSAL_VIEW_STYLE_COMPACT_TALL",
}

export interface ShortViewCountTextClass {
  accessibility: DisabledAccessibilityData;
  simpleText?: string;
  runs?: ViewsRun[];
}

export interface PurpleNotificationTextRenderer {
  successResponseText: TitleElement;
  undoText: TitleElement;
  undoEndpoint: UndoEndpoint;
  trackingParams: string;
}

export interface TitleElement {
  runs: ViewsRun[];
}

export interface UndoEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  undoFeedbackEndpoint: UndoEndpointUndoFeedbackEndpoint;
}

export interface UndoEndpointUndoFeedbackEndpoint {
  undoToken: string;
  actions: StickyAction[];
}

export interface UIActions {
  hideEnclosingContainer: boolean;
}

export interface YpcGetOffersEndpoint {
  params: string;
}

export interface ShareEntityServiceEndpoint {
  serializedShareEntity: string;
  commands: ShareEntityServiceEndpointCommand[];
}

export interface ShareEntityServiceEndpointCommand {
  clickTrackingParams: string;
  openPopupAction: FluffyOpenPopupAction;
}

export interface FluffyOpenPopupAction {
  popup: FluffyPopup;
  popupType: PurplePopupType;
  beReused: boolean;
}

export interface FluffyPopup {
  unifiedSharePanelRenderer: UnifiedSharePanelRenderer;
}

export interface UnifiedSharePanelRenderer {
  trackingParams: string;
  showLoadingSpinner: boolean;
}

export interface NavigationEndpointShowSheetCommand {
  panelLoadingStrategy: FluffyPanelLoadingStrategy;
  contextualSheetPresentationConfig: ContextualSheetPresentationConfig;
}

export interface ContextualSheetPresentationConfig {
  expandToFullWidth: boolean;
}

export interface FluffyPanelLoadingStrategy {
  requestTemplate: RequestTemplate;
  screenVe: number;
}

export interface RequestTemplate {
  panelId: PanelID;
  params: string;
}

export enum PanelID {
  PAaddToPlaylist = "PAadd_to_playlist",
  PApremiumUpsell = "PApremium_upsell",
}

export interface FluffySignalServiceEndpoint {
  signal: SignalServiceEndpointSignal;
  actions: IndigoAction[];
}

export interface IndigoAction {
  clickTrackingParams: string;
  addToPlaylistCommand: AddToPlaylistCommand;
}

export interface AddToPlaylistCommand {
  openMiniplayer: boolean;
  videoId: string;
  listType: ListType;
  onCreateListCommand: OnCreateListCommand;
  videoIds: string[];
  videoCommand: NavigationEndpointElement;
  openListPanel?: boolean;
}

export enum ListType {
  PlaylistEditListTypeQueue = "PLAYLIST_EDIT_LIST_TYPE_QUEUE",
}

export interface OnCreateListCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
}

export interface CreatePlaylistServiceEndpoint {
  videoIds: string[];
  params: CreatePlaylistServiceEndpointParams;
}

export enum CreatePlaylistServiceEndpointParams {
  CAQ3D = "CAQ%3D",
}

export interface PurpleToggledButtonViewModel {
  buttonViewModel: PurpleButtonViewModel;
}

export interface PurpleButtonViewModel {
  iconName: FluffyIconName;
  onTap?: IndigoOnTap;
  accessibilityText: AccessibilityText;
  style: PurpleStyle;
  trackingParams: string;
  type: TypeEnum;
  buttonSize: PrimaryButtonButtonSize;
  state: StateEnum;
}

export enum AccessibilityText {
  Ditambahkan = "Ditambahkan",
}

export enum FluffyIconName {
  Check = "CHECK",
}

export interface IndigoOnTap {
  innertubeCommand: RemoveFromWatchLaterCommandClass;
}

export interface RemoveFromWatchLaterCommandClass {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  playlistEditEndpoint: RemoveFromWatchLaterCommandPlaylistEditEndpoint;
}

export interface RemoveFromWatchLaterCommandPlaylistEditEndpoint {
  playlistId: PlaylistID;
  actions: IndecentAction[];
}

export interface IndecentAction {
  action: Action5;
  removedVideoId: string;
}

export enum Action5 {
  ActionRemoveVideoByVideoID = "ACTION_REMOVE_VIDEO_BY_VIDEO_ID",
}

export enum ContentType {
  LockupContentTypePlaylist = "LOCKUP_CONTENT_TYPE_PLAYLIST",
  LockupContentTypeVideo = "LOCKUP_CONTENT_TYPE_VIDEO",
}

export interface FluffyItemPlayback {
  inlinePlayerData: FluffyInlinePlayerData;
}

export interface FluffyInlinePlayerData {
  onSelect: PurpleOn;
  onVisible: OnVisibleClass;
}

export interface PurpleOn {
  innertubeCommand: OnSelectInnertubeCommandClass;
}

export interface OnSelectInnertubeCommandClass {
  clickTrackingParams: string;
  commandMetadata?: AutoplayVideoCommandMetadata;
  watchEndpoint?: PurpleWatchEndpoint;
  commandExecutorCommand?: PurpleCommandExecutorCommand;
}

export interface PurpleCommandExecutorCommand {
  commands: PurpleCommand[];
}

export interface PurpleCommand {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint?: AutoplayVideoWatchEndpoint;
  feedbackEndpoint?: CommandFeedbackEndpoint;
}

export interface CommandFeedbackEndpoint {
  feedbackToken: string;
  uiActions: UIActions;
}

export interface PurpleWatchEndpoint {
  videoId: string;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
  playerParams?: string;
  ustreamerConfig?: WatchEndpointUstreamerConfig;
  playlistId?: string;
  params?: string;
  continuePlayback?: boolean;
  loggingContext?: WatchEndpointLoggingContext;
  playerExtraUrlParams?: Param[];
  nofollow?: boolean;
  startTimeSeconds?: number;
}

export interface WatchEndpointLoggingContext {
  vssLoggingContext: LoggingContext;
}

export interface LoggingContext {
  serializedContextData: SerializedContextData;
}

export enum SerializedContextData {
  CGIIDA3D3D = "CgIIDA%3D%3D",
  Gg1SRGxSEDLXTlRPaTQ0 = "Gg1SRGxSeDlXTlRPaTQ0",
  GiJQTERpMmxpSHFDblZxREdXZHVRMk51R2JFWDY0LVYwLXNj = "GiJQTERpMmxpSHFDblZxREdXZHVRMk51R2JFWDY0LVYwLXNj",
}

export interface Param {
  key: string;
  value: string;
}

export enum WatchEndpointUstreamerConfig {
  KgYKBBICAWQ = "KgYKBBICaWQ=",
  KgYKBBICZW4 = "KgYKBBICZW4=",
  KgkKBxIFZXMTRVM = "KgkKBxIFZXMtRVM=",
  KgoKCBIGZXMTNDE5 = "KgoKCBIGZXMtNDE5",
}

export interface OnVisibleClass {
  innertubeCommand: OnVisibleInnertubeCommand;
}

export interface OnVisibleInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: PurpleWatchEndpoint;
}

export interface PurpleMetadata {
  lockupMetadataViewModel: PurpleLockupMetadataViewModel;
}

export interface PurpleLockupMetadataViewModel {
  title: BodyText;
  image?: PurpleImage;
  metadata: LockupMetadataViewModelMetadata;
  menuButton: PurpleMenuButton;
}

export interface PurpleImage {
  decoratedAvatarViewModel: PurpleDecoratedAvatarViewModel;
}

export interface PurpleDecoratedAvatarViewModel {
  avatar: DecoratedAvatarViewModelAvatar;
  a11yLabel: string;
  rendererContext: TentacledRendererContext;
  liveData?: LiveData;
}

export interface DecoratedAvatarViewModelAvatar {
  avatarViewModel: AvatarAvatarViewModel;
}

export interface AvatarAvatarViewModel {
  image: LogoDarkClass;
  avatarImageSize: AvatarImageSize;
}

export enum AvatarImageSize {
  AvatarSizeM = "AVATAR_SIZE_M",
}

export interface LiveData {
  liveBadgeText: IconName;
}

export interface TentacledRendererContext {
  commandContext: TentacledCommandContext;
  loggingContext?: TentacledLoggingContext;
  accessibilityContext?: Accessibility;
}

export interface TentacledCommandContext {
  onTap: IndecentOnTap;
}

export interface IndecentOnTap {
  innertubeCommand: IndecentInnertubeCommand;
}

export interface IndecentInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  browseEndpoint?: ChannelNavigationEndpointBrowseEndpoint;
  watchEndpoint?: AutoplayVideoWatchEndpoint;
}

export interface ChannelNavigationEndpointBrowseEndpoint {
  browseId: string;
  canonicalBaseUrl?: string;
}

export interface PurpleMenuButton {
  buttonViewModel: FluffyButtonViewModel;
}

export interface FluffyButtonViewModel {
  iconName: PurpleIconName;
  onTap: HilariousOnTap;
  accessibilityText: Tooltip;
  style: PurpleStyle;
  trackingParams: string;
  type: TypeEnum;
  buttonSize: PrimaryButtonButtonSize;
  state: StateEnum;
}

export interface HilariousOnTap {
  innertubeCommand: HilariousInnertubeCommand;
}

export interface HilariousInnertubeCommand {
  clickTrackingParams: string;
  showSheetCommand: FluffyShowSheetCommand;
}

export interface FluffyShowSheetCommand {
  panelLoadingStrategy: TentacledPanelLoadingStrategy;
}

export interface TentacledPanelLoadingStrategy {
  inlineContent: FluffyInlineContent;
}

export interface FluffyInlineContent {
  sheetViewModel: FluffySheetViewModel;
}

export interface FluffySheetViewModel {
  content: TentacledContent;
}

export interface TentacledContent {
  listViewModel: FluffyListViewModel;
}

export interface FluffyListViewModel {
  listItems: FluffyListItem[];
}

export interface FluffyListItem {
  listItemViewModel?: FluffyListItemViewModel;
  downloadListItemViewModel?: DownloadListItemViewModel;
}

export interface FluffyListItemViewModel {
  title: BodyText;
  leadingImage: LeadingImage;
  rendererContext: StickyRendererContext;
}

export interface StickyRendererContext {
  loggingContext?: TentacledLoggingContext;
  commandContext: StickyCommandContext;
}

export interface StickyCommandContext {
  onTap: AmbitiousOnTap;
}

export interface AmbitiousOnTap {
  innertubeCommand: AmbitiousInnertubeCommand;
}

export interface AmbitiousInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: PurpleCommandMetadata;
  signalServiceEndpoint?: FluffySignalServiceEndpoint;
  playlistEditEndpoint?: ServiceEndpointPlaylistEditEndpoint;
  showSheetCommand?: NavigationEndpointShowSheetCommand;
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint;
  feedbackEndpoint?: FluffyFeedbackEndpoint;
  getReportFormEndpoint?: YpcGetOffersEndpoint;
  likeEndpoint?: PurpleLikeEndpoint;
}

export interface FluffyFeedbackEndpoint {
  feedbackToken: string;
  uiActions: UIActions;
  actions: HilariousAction[];
  contentId: string;
}

export interface HilariousAction {
  clickTrackingParams: string;
  replaceEnclosingAction?: FluffyReplaceEnclosingAction;
  hideEnclosingAction?: AdsEngagementPanelContentRenderer;
}

export interface FluffyReplaceEnclosingAction {
  item: FluffyItem;
}

export interface FluffyItem {
  notificationMultiActionRenderer?: PurpleNotificationMultiActionRenderer;
  notificationTextRenderer?: FluffyNotificationTextRenderer;
}

export interface FluffyNotificationTextRenderer {
  successResponseText: TitleElement;
  trackingParams: string;
}

export interface PurpleLikeEndpoint {
  status: LikeStatus;
  target: PurpleTarget;
}

export enum LikeStatus {
  Dislike = "DISLIKE",
  Indifferent = "INDIFFERENT",
  Like = "LIKE",
}

export interface PurpleTarget {
  playlistId: string;
}

export interface LockupMetadataViewModelMetadata {
  contentMetadataViewModel: ContentMetadataViewModel;
}

export interface ContentMetadataViewModel {
  metadataRows: MetadataRow[];
  delimiter: Delimiter;
}

export enum Delimiter {
  Empty = " • ",
}

export interface MetadataRow {
  metadataParts?: MetadataPart[];
  badges?: MetadataRowBadge[];
}

export interface MetadataRowBadge {
  badgeViewModel: BadgeViewModel;
}

export interface BadgeViewModel {
  badgeText: BadgeText;
  badgeStyle: BadgeViewModelBadgeStyle;
  trackingParams: string;
  iconName?: string;
}

export enum BadgeViewModelBadgeStyle {
  BadgeDefault = "BADGE_DEFAULT",
  BadgeMembersOnly = "BADGE_MEMBERS_ONLY",
  BadgePromoted = "BADGE_PROMOTED",
}

export enum BadgeText {
  Baru = "Baru",
  DisulihSuaraOtomatis = "Disulih suara otomatis",
  KhususPelanggan = "Khusus pelanggan",
  UnggulanYouTube = "Unggulan YouTube",
}

export interface MetadataPart {
  text: MetadataPartText;
}

export interface MetadataPartText {
  content: string;
  commandRuns?: TextCommandRun[];
  styleRuns?: AttributedDescriptionStyleRun[];
  attachmentRuns?: TextAttachmentRun[];
}

export interface TextAttachmentRun {
  startIndex: number;
  length: number;
  element: PurpleElement;
  alignment: Alignment;
}

export enum Alignment {
  AlignmentVerticalCenter = "ALIGNMENT_VERTICAL_CENTER",
}

export interface PurpleElement {
  type: PurpleType;
  properties: PurpleProperties;
}

export interface PurpleProperties {
  layoutProperties: PurpleLayoutProperties;
}

export interface PurpleLayoutProperties {
  height: Height;
  width: Height;
  margin: PurpleMargin;
}

export interface Height {
  value: number;
  unit: Unit;
}

export enum Unit {
  DimensionUnitPoint = "DIMENSION_UNIT_POINT",
}

export interface PurpleMargin {
  left: Height;
}

export interface PurpleType {
  imageType: PurpleImageType;
}

export interface PurpleImageType {
  image: FluffyImage;
}

export interface FluffyImage {
  sources: ImageSource[];
}

export interface ImageSource {
  clientResource: ClientResource;
  width: number;
  height: number;
}

export interface TextCommandRun {
  startIndex: number;
  length: number;
  onTap: CunningOnTap;
}

export interface CunningOnTap {
  innertubeCommand: ChannelNavigationEndpointClass;
}

export interface ChannelNavigationEndpointClass {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  browseEndpoint: ChannelNavigationEndpointBrowseEndpoint;
}

export interface AttributedDescriptionStyleRun {
  startIndex: number;
  length?: number;
  weightLabel?: WeightLabel;
  styleRunExtensions?: StyleRunExtensions;
  fontFamilyName?: FontFamilyName;
}

export enum FontFamilyName {
  Roboto = "Roboto",
}

export interface StyleRunExtensions {
  styleRunColorMapExtension: ColorMapExtension;
}

export interface ColorMapExtension {
  colorMap: ColorMap[];
}

export interface ColorMap {
  key: Key;
  value: number;
}

export enum Key {
  UserInterfaceThemeDark = "USER_INTERFACE_THEME_DARK",
  UserInterfaceThemeLight = "USER_INTERFACE_THEME_LIGHT",
}

export enum WeightLabel {
  FontWeightMedium = "FONT_WEIGHT_MEDIUM",
  FontWeightNormal = "FONT_WEIGHT_NORMAL",
}

export interface IndigoRendererContext {
  loggingContext: TentacledLoggingContext;
  accessibilityContext?: Accessibility;
  commandContext: IndigoCommandContext;
}

export interface IndigoCommandContext {
  onTap: PurpleOn;
  onVisible?: CommandContextOnVisible;
}

export interface CommandContextOnVisible {
  performOnceCommand: OnVisiblePerformOnceCommand;
}

export interface OnVisiblePerformOnceCommand {
  identifier: string;
  command: ImpressionEndpoint;
}

export interface ImpressionEndpoint {
  innertubeCommand: ImpressionEndpointInnertubeCommand;
}

export interface ImpressionEndpointInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  feedbackEndpoint?: CommandFeedbackEndpoint;
  openAdAllowlistInstructionCommand?: OpenAdAllowlistInstructionCommand;
}

export interface OpenAdAllowlistInstructionCommand {
  fundingChoiceInstructionPageUrl: FundingChoiceInstructionPageURLClass;
}

export interface OnFocusEffect {
  onFocusStyle: OnFocusStyle;
  onFocusColor?: Color;
  textPrimaryColor?: Color;
  textSecondaryColor?: Color;
  touchResponseColor?: Color;
}

export enum OnFocusStyle {
  OnFocusStyleBackground = "ON_FOCUS_STYLE_BACKGROUND",
  OnFocusStyleBorder = "ON_FOCUS_STYLE_BORDER",
}

export interface RichSectionRenderer {
  content: RichSectionRendererContent;
  trackingParams: string;
}

export interface RichSectionRendererContent {
  richShelfRenderer: RichShelfRenderer;
}

export interface RichShelfRenderer {
  title: TitleElement;
  contents: RichShelfRendererContent[];
  trackingParams: string;
  menu?: RichShelfRendererMenu;
  showMoreButton: SaveButtonClass;
  isExpanded: boolean;
  icon?: Icon;
  isTopDividerHidden: boolean;
  isBottomDividerHidden: boolean;
  showLessButton: SaveButtonClass;
  responsiveContainerConfiguration: ResponsiveContainerConfiguration;
  targetingContext?: TargetingContext;
  rowIndex: number;
}

export interface RichShelfRendererContent {
  richItemRenderer: FluffyRichItemRenderer;
}

export interface FluffyRichItemRenderer {
  content: StickyContent;
  trackingParams: string;
  onFocusEffect: OnFocusEffect;
  colIndex: number;
  rowIndex: number;
}

export interface StickyContent {
  shortsLockupViewModel?: ContentShortsLockupViewModel;
  postRenderer?: PostRenderer;
}

export interface PostRenderer {
  postId: string;
  authorText: AuthorText;
  authorThumbnail: AuthorThumbnailClass;
  authorEndpoint: ChannelNavigationEndpointClass;
  contentText: ContentText;
  backstageAttachment: BackstageAttachment;
  publishedTimeText: PublishedTimeText;
  voteCount: ShortViewCountText;
  voteStatus: LikeStatus;
  actionButtons: ActionButtons;
  actionMenu: ActionMenu;
  trackingParams: string;
  surface: string;
  navigationEndpoint: PurpleNavigationEndpoint;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface ActionButtons {
  commentActionButtonsRenderer: CommentActionButtonsRenderer;
}

export interface CommentActionButtonsRenderer {
  likeButton: LikeButton;
  replyButton: ReplyButton;
  dislikeButton: LikeButton;
  trackingParams: string;
  style: string;
  shareButton: ShareButton;
}

export interface LikeButton {
  toggleButtonRenderer: DislikeButtonToggleButtonRenderer;
}

export interface DislikeButtonToggleButtonRenderer {
  style: ToggledStyleClass;
  size: SizeClass;
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: Icon;
  defaultServiceEndpoint: ServiceEndpoint;
  toggledServiceEndpoint: ServiceEndpoint;
  accessibility: Accessibility;
  trackingParams: string;
  defaultTooltip: string;
  toggledTooltip: string;
  toggledStyle: ToggledStyleClass;
  accessibilityData: DisabledAccessibilityData;
  toggledAccessibilityData: DisabledAccessibilityData;
}

export interface Icon {
  iconType: string;
}

export interface ServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  performCommentActionEndpoint: PerformCommentActionEndpoint;
}

export interface PerformCommentActionEndpoint {
  action: string;
  clientActions: ClientAction[];
}

export interface ClientAction {
  clickTrackingParams: string;
  updateCommentVoteAction: UpdateCommentVoteAction;
}

export interface UpdateCommentVoteAction {
  voteCount: ShortViewCountText;
  voteStatus: LikeStatus;
  postId: string;
}

export interface ShortViewCountText {
  accessibility: DisabledAccessibilityData;
  simpleText: string;
}

export interface SizeClass {
  sizeType: SizeEnum;
}

export enum SizeEnum {
  SizeDefault = "SIZE_DEFAULT",
}

export interface ToggledStyleClass {
  styleType: StyleType;
}

export enum StyleType {
  StyleDefault = "STYLE_DEFAULT",
  StyleDefaultActive = "STYLE_DEFAULT_ACTIVE",
  StyleHomeFilter = "STYLE_HOME_FILTER",
  StyleText = "STYLE_TEXT",
}

export interface ReplyButton {
  buttonRenderer: ReplyButtonButtonRenderer;
}

export interface ReplyButtonButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: SizeEnum;
  text: ShortViewCountText;
  icon: Icon;
  navigationEndpoint: PurpleNavigationEndpoint;
  accessibility: Accessibility;
  tooltip: string;
  trackingParams: string;
  hint: PurpleHint;
  accessibilityData: DisabledAccessibilityData;
}

export interface PurpleHint {
  hintRenderer: PurpleHintRenderer;
}

export interface PurpleHintRenderer {
  hintId: string;
  content: HintRendererContent;
  hintCap: HintCap;
  suggestedPosition: SuggestedPositionClass;
  trackingParams: string;
}

export interface HintRendererContent {
  bubbleHintRenderer: BubbleHintRenderer;
}

export interface BubbleHintRenderer {
  trackingParams: string;
  accessibility: Accessibility;
  detailsText: ShortViewCountText;
  isVisible: boolean;
  style: string;
}

export interface HintCap {
  impressionCap: string;
}

export interface SuggestedPositionClass {
  type: string;
}

export interface PurpleNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  browseEndpoint: PurpleBrowseEndpoint;
}

export interface PurpleBrowseEndpoint {
  browseId: BrowseID;
  params: string;
  canonicalBaseUrl: string;
}

export enum BrowseID {
  FEpostDetail = "FEpost_detail",
}

export interface ShareButton {
  buttonRenderer: FluffyButtonRenderer;
}

export interface FluffyButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: SizeEnum;
  icon: Icon;
  accessibility: Accessibility;
  tooltip: string;
  trackingParams: string;
  hint: FluffyHint;
  accessibilityData: DisabledAccessibilityData;
  command: CommandInnertubeCommand;
}

export interface CommandInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  shareEntityServiceEndpoint: ShareEntityServiceEndpoint;
}

export interface FluffyHint {
  hintRenderer: FluffyHintRenderer;
}

export interface FluffyHintRenderer {
  hintId: string;
  trackingParams: string;
}

export interface ActionMenu {
  menuRenderer: ActionMenuMenuRenderer;
}

export interface ActionMenuMenuRenderer {
  items: TentacledItem[];
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
  menuPopupAccessibility: Accessibility;
}

export interface TentacledItem {
  menuServiceItemRenderer: PurpleMenuServiceItemRenderer;
}

export interface PurpleMenuServiceItemRenderer {
  text: ShortViewCountText;
  icon: Icon;
  serviceEndpoint: FluffyServiceEndpoint;
  trackingParams: string;
}

export interface FluffyServiceEndpoint {
  clickTrackingParams: string;
  showEngagementPanelEndpoint?: ServiceEndpointShowEngagementPanelEndpoint;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  feedbackEndpoint?: TentacledFeedbackEndpoint;
}

export interface TentacledFeedbackEndpoint {
  feedbackToken: string;
  uiActions: UIActions;
  actions: AmbitiousAction[];
}

export interface AmbitiousAction {
  clickTrackingParams: string;
  replaceEnclosingAction: TentacledReplaceEnclosingAction;
}

export interface TentacledReplaceEnclosingAction {
  item: StickyItem;
}

export interface StickyItem {
  notificationMultiActionRenderer: FluffyNotificationMultiActionRenderer;
}

export interface FluffyNotificationMultiActionRenderer {
  responseText: ResponseText;
  buttons: FluffyButton[];
  trackingParams: string;
  dismissalViewStyle: DismissalViewStyle;
}

export interface FluffyButton {
  buttonRenderer: TentacledButtonRenderer;
}

export interface TentacledButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: SizeEnum;
  text: TitleElement;
  serviceEndpoint?: TentacledServiceEndpoint;
  trackingParams: string;
  command?: OnSelectInnertubeCommand;
}

export interface TentacledServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  undoFeedbackEndpoint?: UndoEndpointUndoFeedbackEndpoint;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
}

export interface CommandSignalServiceEndpoint {
  signal: SignalServiceEndpointSignal;
  actions: CunningAction[];
}

export interface CunningAction {
  clickTrackingParams: string;
  signalAction: Signal;
}

export interface Signal {
  signal: string;
}

export interface ResponseText {
  runs: ViewsRun[];
  accessibility: DisabledAccessibilityData;
}

export interface ServiceEndpointShowEngagementPanelEndpoint {
  identifier: PanelIdentifierClass;
  globalConfiguration: YpcGetOffersEndpoint;
  engagementPanelPresentationConfigs: EngagementPanelPresentationConfigs;
}

export interface EngagementPanelPresentationConfigs {
  engagementPanelPopupPresentationConfig: EngagementPanelPopupPresentationConfig;
}

export interface EngagementPanelPopupPresentationConfig {
  popupType: EngagementPanelPopupPresentationConfigPopupType;
}

export enum EngagementPanelPopupPresentationConfigPopupType {
  PanelPopupTypeDialog = "PANEL_POPUP_TYPE_DIALOG",
}

export interface PanelIdentifierClass {
  tag: PanelIdentifierTag;
}

export enum PanelIdentifierTag {
  EngagementPanelStructuredDescription = "engagement-panel-structured-description",
  EngagementPanelTimelineViewConsolidated = "engagement-panel-timeline-view-consolidated",
  PAabuseReport = "PAabuse_report",
}

export interface AuthorText {
  runs: AuthorTextRun[];
  accessibility: DisabledAccessibilityData;
}

export interface AuthorTextRun {
  text: string;
  navigationEndpoint: ChannelNavigationEndpointClass;
}

export interface AuthorThumbnailClass {
  thumbnails: ThumbnailElement[];
  accessibility: DisabledAccessibilityData;
}

export interface BackstageAttachment {
  backstageImageRenderer: BackstageImageRenderer;
}

export interface BackstageImageRenderer {
  image: BackgroundClass;
  trackingParams: string;
}

export interface BackgroundClass {
  thumbnails: ThumbnailElement[];
}

export interface ContentText {
  runs: ContentTextRun[];
}

export interface ContentTextRun {
  text: string;
  navigationEndpoint?: InnertubeCommand;
  loggingDirectives?: AdButtonViewModelLoggingDirectives;
}

export interface InnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  browseEndpoint?: CommandBrowseEndpoint;
  trackingParams?: string;
  urlEndpoint?: NavigationEndpointURLEndpoint;
}

export interface CommandBrowseEndpoint {
  browseId: ID;
  params: string;
}

export enum ID {
  FEhashtag = "FEhashtag",
  UC6JDSboWlMjEadt1GeEFg = "UC6-JDSboWlMjEadt1Ge-EFg",
  UC6Jv4BdpKD1YEMNU7Q2Gxg = "UC6jv4bdpK-D1YEMNU7q2gxg",
  UC9PLqQ0FEDz327Vgf5JwqA = "UC9p_lqQ0FEDz327Vgf5JwqA",
  UCNgbmsjHkB0UuPa8HD4Gjw = "UC_NgbmsjHkB0UuPa8hD4Gjw",
  UCl69AEx4MdqMZH7Jtsm7Tig = "UCl69AEx4MdqMZH7Jtsm7Tig",
}

export interface NavigationEndpointURLEndpoint {
  url: string;
  target: TargetEnum;
  nofollow: boolean;
}

export interface PublishedTimeText {
  runs: PublishedTimeTextRun[];
}

export interface PublishedTimeTextRun {
  text: string;
  navigationEndpoint: PurpleNavigationEndpoint;
}

export interface ContentShortsLockupViewModel {
  entityId: string;
  accessibilityText: string;
  onTap: ShortsLockupViewModelOnTap;
  inlinePlayerData: ShortsLockupViewModelInlinePlayerData;
  menuOnTap: PurpleMenuOnTap;
  indexInCollection: number;
  menuOnTapA11yLabel: Tooltip;
  overlayMetadata: OverlayMetadata;
  thumbnailViewModel: ShortsLockupViewModelThumbnailViewModel;
  stackedFrameData: LoadMarkersCommand;
  titleTruncationStyle: TitleTruncationStyle;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface ShortsLockupViewModelInlinePlayerData {
  onVisible: FluffyOnVisible;
}

export interface FluffyOnVisible {
  innertubeCommand: EndScreenVideoRendererNavigationEndpoint;
}

export interface EndScreenVideoRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: FluffyWatchEndpoint;
}

export interface FluffyWatchEndpoint {
  videoId: string;
  playerParams?: string;
  playerExtraUrlParams?: Param[];
  ustreamerConfig?: WatchEndpointUstreamerConfig;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
}

export interface PurpleMenuOnTap {
  innertubeCommand: CunningInnertubeCommand;
}

export interface CunningInnertubeCommand {
  clickTrackingParams: string;
  showSheetCommand: TentacledShowSheetCommand;
}

export interface TentacledShowSheetCommand {
  panelLoadingStrategy: StickyPanelLoadingStrategy;
}

export interface StickyPanelLoadingStrategy {
  inlineContent: TentacledInlineContent;
}

export interface TentacledInlineContent {
  sheetViewModel: TentacledSheetViewModel;
}

export interface TentacledSheetViewModel {
  content: IndigoContent;
}

export interface IndigoContent {
  listViewModel: TentacledListViewModel;
}

export interface TentacledListViewModel {
  listItems: TentacledListItem[];
}

export interface TentacledListItem {
  listItemViewModel: TentacledListItemViewModel;
}

export interface TentacledListItemViewModel {
  title: BodyText;
  leadingImage: LeadingImage;
  rendererContext: IndecentRendererContext;
}

export interface IndecentRendererContext {
  loggingContext?: TentacledLoggingContext;
  commandContext: IndecentCommandContext;
}

export interface IndecentCommandContext {
  onTap: MagentaOnTap;
}

export interface MagentaOnTap {
  innertubeCommand: MagentaInnertubeCommand;
}

export interface MagentaInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: FluffyCommandMetadata;
  signalServiceEndpoint?: FluffySignalServiceEndpoint;
  feedbackEndpoint?: StickyFeedbackEndpoint;
  userFeedbackEndpoint?: InnertubeCommandUserFeedbackEndpoint;
  getReportFormEndpoint?: YpcGetOffersEndpoint;
}

export interface FluffyCommandMetadata {
  webCommandMetadata: TentacledWebCommandMetadata;
}

export interface TentacledWebCommandMetadata {
  sendPost?: boolean;
  apiUrl?: APIURL;
  ignoreNavigation?: boolean;
}

export interface StickyFeedbackEndpoint {
  feedbackToken: string;
  actions: MagentaAction[];
  contentId: string;
}

export interface MagentaAction {
  clickTrackingParams: string;
  replaceEnclosingAction: StickyReplaceEnclosingAction;
}

export interface StickyReplaceEnclosingAction {
  item: IndigoItem;
}

export interface IndigoItem {
  notificationMultiActionRenderer: TentacledNotificationMultiActionRenderer;
}

export interface TentacledNotificationMultiActionRenderer {
  responseText: TitleElement;
  buttons: TentacledButton[];
  trackingParams: string;
}

export interface TentacledButton {
  buttonRenderer: StickyButtonRenderer;
}

export interface StickyButtonRenderer {
  style: DownloadButtonRendererStyle;
  text: TitleElement;
  serviceEndpoint: StickyServiceEndpoint;
  trackingParams: string;
}

export interface StickyServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  undoFeedbackEndpoint: PurpleUndoFeedbackEndpoint;
}

export interface InnertubeCommandUserFeedbackEndpoint {
  additionalDatas: AdditionalData[];
}

export interface AdditionalData {
  userFeedbackEndpointProductSpecificValueData: Param;
}

export interface ShortsLockupViewModelOnTap {
  innertubeCommand: FriskyInnertubeCommand;
}

export interface FriskyInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  reelWatchEndpoint: ReelWatchEndpoint;
}

export interface ReelWatchEndpoint {
  videoId: string;
  playerParams: string;
  thumbnail: ReelWatchEndpointThumbnail;
  overlay: ReelWatchEndpointOverlay;
  params: string;
  sequenceProvider: SequenceProvider;
  sequenceParams: string;
  loggingContext: ReelWatchEndpointLoggingContext;
  ustreamerConfig: ReelWatchEndpointUstreamerConfig;
  accessibilityRenderer: AccessibilityRenderer;
}

export interface AccessibilityRenderer {
  reelWatchAccessibilityRenderer: ReelWatchAccessibilityRenderer;
}

export interface ReelWatchAccessibilityRenderer {
  enablePlayPauseA11yButton: boolean;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface ReelWatchEndpointLoggingContext {
  vssLoggingContext: LoggingContext;
  qoeLoggingContext: LoggingContext;
}

export interface ReelWatchEndpointOverlay {
  reelPlayerOverlayRenderer: ReelPlayerOverlayRenderer;
}

export interface ReelPlayerOverlayRenderer {
  style: ReelPlayerOverlayRendererStyle;
  trackingParams: string;
  reelPlayerNavigationModel: ReelPlayerNavigationModel;
}

export enum ReelPlayerNavigationModel {
  ReelPlayerNavigationModelUnspecified = "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED",
}

export enum ReelPlayerOverlayRendererStyle {
  ReelPlayerOverlayStyleShorts = "REEL_PLAYER_OVERLAY_STYLE_SHORTS",
}

export enum SequenceProvider {
  ReelWatchSequenceProviderRPC = "REEL_WATCH_SEQUENCE_PROVIDER_RPC",
}

export interface ReelWatchEndpointThumbnail {
  thumbnails: ThumbnailElement[];
  isOriginalAspectRatio: boolean;
}

export enum ReelWatchEndpointUstreamerConfig {
  CAw = "CAw=",
  CAwqBgoEEgJlbg = "CAwqBgoEEgJlbg==",
  CAwqBgoEEgJpZA = "CAwqBgoEEgJpZA==",
}

export interface OverlayMetadata {
  primaryText: BodyText;
  secondaryText: BodyText;
}

export interface LoadMarkersCommand {}

export interface ShortsLockupViewModelThumbnailViewModel {
  thumbnailViewModel: ThumbnailViewModelThumbnailViewModel;
}

export interface ThumbnailViewModelThumbnailViewModel {
  image: LogoDarkClass;
}

export enum TitleTruncationStyle {
  ShortsLockupTitleTruncationStyleUnknown = "SHORTS_LOCKUP_TITLE_TRUNCATION_STYLE_UNKNOWN",
}

export interface RichShelfRendererMenu {
  menuRenderer: PurpleMenuRenderer;
}

export interface PurpleMenuRenderer {
  items: IndecentItem[];
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface IndecentItem {
  menuServiceItemRenderer: FluffyMenuServiceItemRenderer;
}

export interface FluffyMenuServiceItemRenderer {
  text: LiveIndicatorText;
  icon: Icon;
  serviceEndpoint: IndigoServiceEndpoint;
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
}

export interface IndigoServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  feedbackEndpoint: IndigoFeedbackEndpoint;
}

export interface IndigoFeedbackEndpoint {
  feedbackToken: string;
  uiActions: UIActions;
  actions: FriskyAction[];
}

export interface FriskyAction {
  clickTrackingParams: string;
  replaceEnclosingAction: IndigoReplaceEnclosingAction;
}

export interface IndigoReplaceEnclosingAction {
  item: HilariousItem;
  replaceParentSection: boolean;
  targetId: string;
  groupDismissal: GroupDismissal;
}

export interface GroupDismissal {
  targetGroupId: string;
  behavior: string;
}

export interface HilariousItem {
  notificationMultiActionRenderer: StickyNotificationMultiActionRenderer;
}

export interface StickyNotificationMultiActionRenderer {
  responseText: TitleElement;
  buttons: StickyButton[];
  trackingParams: string;
}

export interface StickyButton {
  buttonRenderer: IndigoButtonRenderer;
}

export interface IndigoButtonRenderer {
  style: DownloadButtonRendererStyle;
  text: LiveIndicatorText;
  serviceEndpoint: IndecentServiceEndpoint;
  trackingParams: string;
}

export interface IndecentServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  undoFeedbackEndpoint: FluffyUndoFeedbackEndpoint;
}

export interface FluffyUndoFeedbackEndpoint {
  undoToken: string;
  actions: MischievousAction[];
}

export interface MischievousAction {
  clickTrackingParams: string;
  undoFeedbackAction: UndoFeedbackAction;
}

export interface UndoFeedbackAction {
  hack: boolean;
  targetGroupId: string;
}

export interface LiveIndicatorText {
  simpleText: string;
}

export interface ResponsiveContainerConfiguration {
  enableContentSpecificAspectRatio: boolean;
}

export interface SaveButtonClass {
  buttonRenderer: SaveButtonButtonRenderer;
}

export interface SaveButtonButtonRenderer {
  style: string;
  size: SizeEnum;
  text: TitleElement;
  icon?: Icon;
  accessibility?: Accessibility;
  trackingParams: string;
  isDisabled?: boolean;
  serviceEndpoint?: UnsubscribeCommand;
  command?: FluffyCommand;
}

export interface FluffyCommand {
  clickTrackingParams: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  continuationCommand?: ContinuationEndpointContinuationCommand;
  openPopupAction?: TentacledOpenPopupAction;
  createBackstagePostEndpoint?: CreateBackstagePostEndpoint;
  commandExecutorCommand?: FluffyCommandExecutorCommand;
}

export interface FluffyCommandExecutorCommand {
  commands: TentacledCommand[];
}

export interface TentacledCommand {
  clickTrackingParams: string;
  showEngagementPanelEndpoint?: CommandShowEngagementPanelEndpoint;
  scrollToEngagementPanelCommand?: ScrollToEngagementPanelCommandClass;
}

export interface ScrollToEngagementPanelCommandClass {
  targetId: ScrollToEngagementPanelCommandPanelIdentifier;
}

export enum ScrollToEngagementPanelCommandPanelIdentifier {
  EngagementPanelCommentsSection = "engagement-panel-comments-section",
  EngagementPanelStructuredDescription = "engagement-panel-structured-description",
  PAmodernTranscriptView = "PAmodern_transcript_view",
  WatchNextFeed = "watch-next-feed",
}

export interface CommandShowEngagementPanelEndpoint {
  sourcePanelIdentifier: string;
  identifier: ContentSourcePanelIdentifierClass;
  globalConfiguration: YpcGetOffersEndpoint;
}

export interface ContentSourcePanelIdentifierClass {
  surface?: string;
  tag: ContentSourcePanelIdentifierTag;
}

export enum ContentSourcePanelIdentifierTag {
  EngagementPanelTimelineViewConsolidated = "engagement-panel-timeline-view-consolidated",
  PAmodernTranscriptView = "PAmodern_transcript_view",
  PAsearchPreview = "PAsearch_preview",
}

export interface CreateBackstagePostEndpoint {
  createBackstagePostParams: string;
}

export interface TentacledOpenPopupAction {
  popup: TentacledPopup;
  popupType: string;
}

export interface TentacledPopup {
  confirmDialogRenderer?: PurpleConfirmDialogRenderer;
  multiPageMenuRenderer?: PurpleMultiPageMenuRenderer;
}

export interface PurpleConfirmDialogRenderer {
  title: LiveIndicatorText;
  trackingParams: string;
  dialogMessages: LiveIndicatorText[];
  confirmButton: ShowButtonClass;
  cancelButton: ShowButtonClass;
  primaryIsCancel: boolean;
}

export interface ShowButtonClass {
  buttonRenderer: ShowButtonButtonRenderer;
}

export interface ShowButtonButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: SizeEnum;
  isDisabled: boolean;
  text: LiveIndicatorText;
  trackingParams: string;
  command?: StickyCommand;
}

export interface StickyCommand {
  clickTrackingParams: string;
  commandExecutorCommand?: TentacledCommandExecutorCommand;
  commandMetadata?: AutoplayVideoCommandMetadata;
  urlEndpoint?: CommandURLEndpoint;
}

export interface TentacledCommandExecutorCommand {
  commands: IndigoCommand[];
}

export interface IndigoCommand {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  hideEngagementPanelScrimAction?: HideEngagementPanelScrimAction;
  loopCommand?: LoopCommand;
}

export interface ChangeEngagementPanelVisibilityAction {
  targetId: EngagementPanelTargetIDEnum;
  visibility: VisibilityEnum;
}

export enum EngagementPanelTargetIDEnum {
  EngagementPanelClipCreate = "engagement-panel-clip-create",
  EngagementPanelClipView = "engagement-panel-clip-view",
  EngagementPanelCommentsSection = "engagement-panel-comments-section",
  EngagementPanelErrorCorrections = "engagement-panel-error-corrections",
  EngagementPanelSearchableTranscript = "engagement-panel-searchable-transcript",
  EngagementPanelStructuredDescription = "engagement-panel-structured-description",
}

export enum VisibilityEnum {
  EngagementPanelVisibilityExpanded = "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED",
  EngagementPanelVisibilityHidden = "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN",
}

export interface HideEngagementPanelScrimAction {
  engagementPanelTargetId: EngagementPanelTargetIDEnum;
}

export interface LoopCommand {
  loop: boolean;
}

export interface PurpleMultiPageMenuRenderer {
  sections: MultiPageMenuRendererSection[];
  trackingParams: string;
  style: string;
}

export interface MultiPageMenuRendererSection {
  multiPageMenuSectionRenderer: MultiPageMenuSectionRenderer;
}

export interface MultiPageMenuSectionRenderer {
  items: MultiPageMenuSectionRendererItem[];
  trackingParams: string;
}

export interface MultiPageMenuSectionRendererItem {
  compactLinkRenderer: CompactLinkRenderer;
}

export interface CompactLinkRenderer {
  icon: Icon;
  title: TitleElement;
  navigationEndpoint: CompactLinkRendererNavigationEndpoint;
  trackingParams: string;
  style: CompactLinkRendererStyle;
}

export interface CompactLinkRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  uploadEndpoint?: AdsEngagementPanelContentRenderer;
  signalNavigationEndpoint?: Signal;
  browseEndpoint?: CommandBrowseEndpoint;
}

export enum CompactLinkRendererStyle {
  CompactLinkStyleTypeCreationMenu = "COMPACT_LINK_STYLE_TYPE_CREATION_MENU",
}

export interface UnsubscribeCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  unsubscribeEndpoint: SubscribeEndpoint;
}

export interface SubscribeEndpoint {
  channelIds: ID[];
  params: string;
}

export interface TargetingContext {
  targetId: string;
  targetGroupId: string[];
}

export interface RichGridRendererHeader {
  feedFilterChipBarRenderer: FeedFilterChipBarRenderer;
}

export interface FeedFilterChipBarRenderer {
  contents: FeedFilterChipBarRendererContent[];
  trackingParams: string;
  nextButton: CancelButtonClass;
  previousButton: CancelButtonClass;
  styleType: string;
}

export interface FeedFilterChipBarRendererContent {
  chipCloudChipRenderer: ContentChipCloudChipRenderer;
}

export interface ContentChipCloudChipRenderer {
  style: ToggledStyleClass;
  text: TitleElement;
  trackingParams: string;
  isSelected?: boolean;
  navigationEndpoint?: ChipCloudChipRendererNavigationEndpoint;
  targetId?: string;
  uniqueId?: string;
}

export interface ChipCloudChipRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  continuationCommand: PurpleContinuationCommand;
}

export interface PurpleContinuationCommand {
  token: string;
  request: Request;
  command: IndecentCommand;
}

export interface IndecentCommand {
  clickTrackingParams: string;
  showReloadUiCommand: ShowReloadUICommand;
}

export interface ShowReloadUICommand {
  targetId: TargetID;
  content: ShowReloadUICommandContent;
}

export interface ShowReloadUICommandContent {
  ghostGridViewModel: GhostGridViewModel;
}

export interface GhostGridViewModel {
  numRows: number;
}

export enum TargetID {
  BrowseFeedFEwhatToWatch = "browse-feedFEwhat_to_watch",
}

export interface CancelButtonClass {
  buttonRenderer: InformationButtonButtonRenderer;
}

export interface InformationButtonButtonRenderer {
  style: FluffyStyle;
  size: SizeEnum;
  isDisabled: boolean;
  icon?: Icon;
  tooltip?: string;
  trackingParams: string;
  accessibilityData?: DisabledAccessibilityData;
  accessibility?: Accessibility;
  targetId?: string;
  command?: HilariousCommand;
  text?: LiveIndicatorText;
  navigationEndpoint?: FluffyNavigationEndpoint;
}

export interface HilariousCommand {
  clickTrackingParams: string;
  openPopupAction?: OnClickCommandOpenPopupAction;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  getSurveyCommand?: GetSurveyCommand;
}

export interface GetSurveyCommand {
  endpoint: GetSurveyCommandEndpoint;
  action: string;
}

export interface GetSurveyCommandEndpoint {
  watch: AdsEngagementPanelContentRenderer;
}

export interface OnClickCommandOpenPopupAction {
  popup: StickyPopup;
  popupType: PurplePopupType;
}

export interface StickyPopup {
  confirmDialogRenderer: PurpleConfirmDialogRenderer;
}

export interface FluffyNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint?: CurrentVideoEndpointWatchEndpoint;
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint;
}

export interface CurrentVideoEndpointWatchEndpoint {
  videoId: string;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
}

export enum FluffyStyle {
  StyleDefault = "STYLE_DEFAULT",
  StyleOpacity = "STYLE_OPACITY",
  StyleText = "STYLE_TEXT",
}

export interface ReflowOptions {
  minimumRowsOfVideosAtStart: number;
  minimumRowsOfVideosBetweenSections: number;
}

export interface TwoColumnWatchNextResults {
  results: TwoColumnWatchNextResultsResults;
  secondaryResults: TwoColumnWatchNextResultsSecondaryResults;
  autoplay?: TwoColumnWatchNextResultsAutoplay;
  conversationBar?: ConversationBar;
}

export interface TwoColumnWatchNextResultsAutoplay {
  autoplay: AutoplayAutoplay;
}

export interface AutoplayAutoplay {
  sets: Set[];
  countDownSecs: number;
  trackingParams: string;
}

export interface Set {
  mode: string;
  autoplayVideo: NavigationEndpointElement;
}

export interface ConversationBar {
  liveChatRenderer: LiveChatRenderer;
}

export interface LiveChatRenderer {
  continuations: Continuation[];
  header: LiveChatRendererHeader;
  trackingParams: string;
  clientMessages: ClientMessages;
  initialDisplayState: string;
  showButton: ShowButtonClass;
  isReplay?: boolean;
}

export interface ClientMessages {
  reconnectMessage: TitleElement;
  unableToReconnectMessage: TitleElement;
  fatalError: TitleElement;
  reconnectedMessage: TitleElement;
  genericError: TitleElement;
}

export interface Continuation {
  reloadContinuationData: ReloadContinuationData;
}

export interface ReloadContinuationData {
  continuation: string;
  clickTrackingParams: string;
}

export interface LiveChatRendererHeader {
  liveChatHeaderRenderer: LiveChatHeaderRenderer;
}

export interface LiveChatHeaderRenderer {
  overflowMenu: OverflowMenu;
  collapseButton: VoiceSearchButtonClass;
  viewSelector: ViewSelector;
}

export interface VoiceSearchButtonClass {
  buttonRenderer: VoiceSearchButtonButtonRenderer;
}

export interface VoiceSearchButtonButtonRenderer {
  style?: DownloadButtonRendererStyle;
  size?: SizeEnum;
  isDisabled?: boolean;
  icon: Icon;
  accessibility?: Accessibility;
  trackingParams: string;
  command?: AmbitiousCommand;
  accessibilityData?: DisabledAccessibilityData;
  serviceEndpoint?: HilariousServiceEndpoint;
  tooltip?: string;
}

export interface AmbitiousCommand {
  clickTrackingParams: string;
  commandMetadata?: OnResponseReceivedEndpointCommandMetadata;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
  hideEngagementPanelEndpoint?: InnertubeCommandHideEngagementPanelEndpoint;
  commandExecutorCommand?: StickyCommandExecutorCommand;
  openPopupAction?: OnClickCommandOpenPopupAction;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
}

export interface StickyCommandExecutorCommand {
  commands: CunningCommand[];
}

export interface CunningCommand {
  clickTrackingParams: string;
  hideEngagementPanelEndpoint?: OnTapShowEngagementPanelEndpoint;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  updateToggleButtonStateCommand?: UpdateToggleButtonStateCommand;
}

export interface OnTapShowEngagementPanelEndpoint {
  identifier: PanelIdentifierClass;
}

export interface UpdateTimedMarkersSyncObserverCommand {
  isEnabled: boolean;
  timedSyncEntityKey: TimedSyncEntityKey;
  panelSyncEntityKey: PanelSyncEntityKey;
}

export enum PanelSyncEntityKey {
  Eh10AW1LBGluZV92AWV3X3N5BmNfZW50AXR5X2TleSDEASgB = "Eh10aW1lbGluZV92aWV3X3N5bmNfZW50aXR5X2tleSDEASgB",
  EiZtb2Rlcm5FdHJhbnNjcmlwdF92AWV3X3N5BmNfZW50AXR5X2TleSDEASgB = "EiZtb2Rlcm5fdHJhbnNjcmlwdF92aWV3X3N5bmNfZW50aXR5X2tleSDEASgB",
}

export enum TimedSyncEntityKey {
  Eh10AW1LBGluZV92AWV3X3N5BmNfZW50AXR5X2TleSDASgB = "Eh10aW1lbGluZV92aWV3X3N5bmNfZW50aXR5X2tleSD-ASgB",
  EiZtb2Rlcm5FdHJhbnNjcmlwdF92AWV3X3N5BmNfZW50AXR5X2TleSDASgB = "EiZtb2Rlcm5fdHJhbnNjcmlwdF92aWV3X3N5bmNfZW50aXR5X2tleSD-ASgB",
}

export interface UpdateToggleButtonStateCommand {
  toggled: boolean;
  buttonId: string;
}

export interface OnResponseReceivedEndpointCommandMetadata {
  webCommandMetadata: StickyWebCommandMetadata;
}

export interface StickyWebCommandMetadata {
  sendPost: boolean;
}

export interface InnertubeCommandHideEngagementPanelEndpoint {
  panelIdentifier: ScrollToEngagementPanelCommandPanelIdentifier;
}

export interface HilariousServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: OnResponseReceivedEndpointCommandMetadata;
  signalServiceEndpoint: TentacledSignalServiceEndpoint;
}

export interface TentacledSignalServiceEndpoint {
  signal: SignalServiceEndpointSignal;
  actions: BraggadociousAction[];
}

export interface BraggadociousAction {
  clickTrackingParams: string;
  openPopupAction: StickyOpenPopupAction;
}

export interface StickyOpenPopupAction {
  popup: IndigoPopup;
  popupType: string;
}

export interface IndigoPopup {
  voiceSearchDialogRenderer: VoiceSearchDialogRenderer;
}

export interface VoiceSearchDialogRenderer {
  placeholderHeader: TitleElement;
  promptHeader: TitleElement;
  exampleQuery1: TitleElement;
  exampleQuery2: TitleElement;
  promptMicrophoneLabel: TitleElement;
  loadingHeader: TitleElement;
  connectionErrorHeader: TitleElement;
  connectionErrorMicrophoneLabel: TitleElement;
  permissionsHeader: TitleElement;
  permissionsSubtext: TitleElement;
  disabledHeader: TitleElement;
  disabledSubtext: TitleElement;
  microphoneButtonAriaLabel: TitleElement;
  exitButton: ClearButtonClass;
  trackingParams: string;
  microphoneOffPromptHeader: TitleElement;
}

export interface ClearButtonClass {
  buttonRenderer: ClearButtonButtonRenderer;
}

export interface ClearButtonButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: SizeEnum;
  isDisabled: boolean;
  icon: Icon;
  trackingParams: string;
  accessibilityData: DisabledAccessibilityData;
}

export interface OverflowMenu {
  menuRenderer: OverflowMenuMenuRenderer;
}

export interface OverflowMenuMenuRenderer {
  items: AmbitiousItem[];
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
}

export interface AmbitiousItem {
  menuServiceItemRenderer?: MenuItemRenderer;
  clientSideToggleMenuItemRenderer?: ClientSideToggleMenuItemRenderer;
  menuNavigationItemRenderer?: MenuItemRenderer;
}

export interface ClientSideToggleMenuItemRenderer {
  defaultText: TitleElement;
  defaultIcon: Icon;
  toggledText: TitleElement;
  toggledIcon: Icon;
  menuItemIdentifier: string;
  command: ClientSideToggleMenuItemRendererCommand;
}

export interface ClientSideToggleMenuItemRendererCommand {
  clickTrackingParams: string;
  toggleLiveChatTimestampsEndpoint: AdsEngagementPanelContentRenderer;
}

export interface MenuItemRenderer {
  text: TitleElement;
  icon: Icon;
  navigationEndpoint?: MenuNavigationItemRendererNavigationEndpoint;
  trackingParams: string;
  serviceEndpoint?: MenuNavigationItemRendererServiceEndpoint;
}

export interface MenuNavigationItemRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: TentacledCommandMetadata;
  userFeedbackEndpoint?: NavigationEndpointUserFeedbackEndpoint;
  showSheetCommand?: NavigationEndpointShowSheetCommand;
}

export interface TentacledCommandMetadata {
  webCommandMetadata?: IndigoWebCommandMetadata;
  interactionLoggingCommandMetadata?: InteractionLoggingCommandMetadata;
}

export interface IndigoWebCommandMetadata {
  ignoreNavigation: boolean;
}

export interface NavigationEndpointUserFeedbackEndpoint {
  hack: boolean;
  bucketIdentifier: string;
}

export interface MenuNavigationItemRendererServiceEndpoint {
  clickTrackingParams: string;
  showLiveChatParticipantsEndpoint?: AdsEngagementPanelContentRenderer;
  popoutLiveChatEndpoint?: CommonConfig;
  commandMetadata?: PurpleCommandMetadata;
  showSheetCommand?: NavigationEndpointShowSheetCommand;
  showEngagementPanelEndpoint?: ServiceEndpointShowEngagementPanelEndpoint;
  playlistEditEndpoint?: ServiceEndpointPlaylistEditEndpoint;
}

export interface ViewSelector {
  sortFilterSubMenuRenderer: ViewSelectorSortFilterSubMenuRenderer;
}

export interface ViewSelectorSortFilterSubMenuRenderer {
  subMenuItems: SubMenuItem[];
  accessibility: DisabledAccessibilityData;
  trackingParams: string;
  targetId: string;
}

export interface SubMenuItem {
  title: string;
  selected: boolean;
  continuation?: Continuation;
  accessibility: DisabledAccessibilityData;
  subtitle: string;
  trackingParams: string;
  serviceEndpoint?: Endpoint;
}

export interface Endpoint {
  clickTrackingParams: string;
  relatedChipCommand?: RelatedChipCommand;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  continuationCommand?: ServiceEndpointContinuationCommand;
}

export interface ServiceEndpointContinuationCommand {
  token: string;
  request: Request;
  command: MagentaCommand;
}

export interface MagentaCommand {
  clickTrackingParams: string;
  showReloadUiCommand: ScrollToEngagementPanelCommandClass;
}

export interface RelatedChipCommand {
  targetSectionIdentifier: string;
  loadCached: boolean;
  contents: RelatedChipCommandContent[];
}

export interface RelatedChipCommandContent {
  lockupViewModel?: FluffyLockupViewModel;
  reelShelfRenderer?: ReelShelfRenderer;
  continuationItemRenderer?: FluffyContinuationItemRenderer;
}

export interface FluffyContinuationItemRenderer {
  trigger: string;
  continuationEndpoint: PurpleContinuationEndpoint;
  button: SaveButtonClass;
}

export interface FluffyLockupViewModel {
  contentImage: TentacledContentImage;
  metadata: FluffyMetadata;
  contentId: string;
  contentType: ContentType;
  rendererContext: AmbitiousRendererContext;
}

export interface TentacledContentImage {
  thumbnailViewModel?: TentacledThumbnailViewModel;
  collectionThumbnailViewModel?: CollectionThumbnailViewModel;
}

export interface TentacledThumbnailViewModel {
  image: LogoDarkClass;
  overlays: StickyOverlay[];
}

export interface StickyOverlay {
  thumbnailBottomOverlayViewModel?: FluffyThumbnailBottomOverlayViewModel;
  thumbnailHoverOverlayToggleActionsViewModel?: ThumbnailHoverOverlayToggleActionsViewModel;
  animatedThumbnailOverlayViewModel?: AnimatedThumbnailOverlayViewModel;
}

export interface AnimatedThumbnailOverlayViewModel {
  thumbnail: LogoDarkClass;
}

export interface FluffyThumbnailBottomOverlayViewModel {
  badges: ThumbnailBottomOverlayViewModelBadge[];
  progressBar?: ProgressBar;
}

export interface ProgressBar {
  thumbnailOverlayProgressBarViewModel: ThumbnailOverlayProgressBarViewModel;
}

export interface ThumbnailOverlayProgressBarViewModel {
  startPercent: number;
}

export interface FluffyMetadata {
  lockupMetadataViewModel: FluffyLockupMetadataViewModel;
}

export interface FluffyLockupMetadataViewModel {
  title: BodyText;
  image?: TentacledImage;
  metadata: LockupMetadataViewModelMetadata;
  menuButton: MenuButton;
}

export interface TentacledImage {
  decoratedAvatarViewModel: FluffyDecoratedAvatarViewModel;
}

export interface FluffyDecoratedAvatarViewModel {
  avatar: DecoratedAvatarViewModelAvatar;
  a11yLabel: string;
  rendererContext: HilariousRendererContext;
}

export interface HilariousRendererContext {
  commandContext: HilariousCommandContext;
}

export interface HilariousCommandContext {
  onTap: CunningOnTap;
}

export interface AmbitiousRendererContext {
  loggingContext: TentacledLoggingContext;
  accessibilityContext?: Accessibility;
  commandContext: AmbitiousCommandContext;
}

export interface AmbitiousCommandContext {
  onTap: OnVisibleClass;
}

export interface ReelShelfRenderer {
  title: TitleElement;
  items: ReelShelfRendererItem[];
  trackingParams: string;
  icon: Icon;
  nextButton: ReelShelfRendererNextButton;
  previousButton: ReelShelfRendererNextButton;
}

export interface ReelShelfRendererItem {
  shortsLockupViewModel: ItemShortsLockupViewModel;
}

export interface ItemShortsLockupViewModel {
  entityId: string;
  accessibilityText: string;
  onTap: ShortsLockupViewModelOnTap;
  menuOnTap: FluffyMenuOnTap;
  indexInCollection: number;
  menuOnTapA11yLabel: Tooltip;
  overlayMetadata: OverlayMetadata;
  thumbnailViewModel: ShortsLockupViewModelThumbnailViewModel;
  stackedFrameData: LoadMarkersCommand;
  titleTruncationStyle: TitleTruncationStyle;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface FluffyMenuOnTap {
  innertubeCommand: MischievousInnertubeCommand;
}

export interface MischievousInnertubeCommand {
  clickTrackingParams: string;
  showSheetCommand: StickyShowSheetCommand;
}

export interface StickyShowSheetCommand {
  panelLoadingStrategy: IndigoPanelLoadingStrategy;
}

export interface IndigoPanelLoadingStrategy {
  inlineContent: StickyInlineContent;
}

export interface StickyInlineContent {
  sheetViewModel: StickySheetViewModel;
}

export interface StickySheetViewModel {
  content: IndecentContent;
}

export interface IndecentContent {
  listViewModel: StickyListViewModel;
}

export interface StickyListViewModel {
  listItems: StickyListItem[];
}

export interface StickyListItem {
  listItemViewModel: StickyListItemViewModel;
}

export interface StickyListItemViewModel {
  title: BodyText;
  leadingImage: LeadingImage;
  rendererContext: CunningRendererContext;
}

export interface CunningRendererContext {
  loggingContext?: TentacledLoggingContext;
  commandContext: CunningCommandContext;
}

export interface CunningCommandContext {
  onTap: FriskyOnTap;
}

export interface FriskyOnTap {
  innertubeCommand: BraggadociousInnertubeCommand;
}

export interface BraggadociousInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: FluffyCommandMetadata;
  signalServiceEndpoint?: StickySignalServiceEndpoint;
  getReportFormEndpoint?: YpcGetOffersEndpoint;
  feedbackEndpoint?: StickyFeedbackEndpoint;
  userFeedbackEndpoint?: InnertubeCommandUserFeedbackEndpoint;
}

export interface StickySignalServiceEndpoint {
  signal: SignalServiceEndpointSignal;
  actions: Action1[];
}

export interface Action1 {
  clickTrackingParams: string;
  addToPlaylistCommand?: AddToPlaylistCommand;
  openPopupAction?: IndigoOpenPopupAction;
}

export interface IndigoOpenPopupAction {
  popup: IndecentPopup;
  popupType: FluffyPopupType;
}

export interface IndecentPopup {
  notificationActionRenderer: NotificationActionRenderer;
}

export interface NotificationActionRenderer {
  responseText: LiveIndicatorText;
  trackingParams: string;
}

export enum FluffyPopupType {
  Toast = "TOAST",
}

export interface ReelShelfRendererNextButton {
  buttonRenderer: IndecentButtonRenderer;
}

export interface IndecentButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: SizeEnum;
  icon: Icon;
  accessibility: Accessibility;
}

export interface TwoColumnWatchNextResultsResults {
  results: ResultsResults;
}

export interface ResultsResults {
  contents: ResultsContent[];
  trackingParams: string;
}

export interface ResultsContent {
  videoPrimaryInfoRenderer?: VideoPrimaryInfoRenderer;
  videoSecondaryInfoRenderer?: VideoSecondaryInfoRenderer;
  compositeVideoPrimaryInfoRenderer?: LoadMarkersCommand;
  itemSectionRenderer?: PurpleItemSectionRenderer;
}

export interface PurpleItemSectionRenderer {
  contents: HilariousContent[];
  trackingParams: string;
  sectionIdentifier?: string;
  targetId?: string;
}

export interface HilariousContent {
  continuationItemRenderer?: TentacledContinuationItemRenderer;
  videoMetadataCarouselViewModel?: VideoMetadataCarouselViewModel;
}

export interface TentacledContinuationItemRenderer {
  trigger: string;
  continuationEndpoint: PurpleContinuationEndpoint;
}

export interface VideoMetadataCarouselViewModel {
  carouselTitles: CarouselTitle[];
  carouselItems: CarouselItemElement[];
}

export interface CarouselItemElement {
  carouselItemViewModel: CarouselItemViewModel;
}

export interface CarouselItemViewModel {
  itemType: string;
  carouselItem: CarouselItemViewModelCarouselItem;
}

export interface CarouselItemViewModelCarouselItem {
  textCarouselItemViewModel: TextCarouselItemViewModel;
}

export interface TextCarouselItemViewModel {
  iconName: string;
  text: BodyText;
  onTap: TextCarouselItemViewModelOnTap;
  trackingParams: string;
  button: TextCarouselItemViewModelButton;
}

export interface TextCarouselItemViewModelButton {
  buttonViewModel: ButtonButtonViewModel;
}

export interface ButtonButtonViewModel {
  title: string;
  onTap: TextCarouselItemViewModelOnTap;
  style: PurpleStyle;
  trackingParams: string;
  type: TypeEnum;
  buttonSize: PrimaryButtonButtonSize;
}

export interface TextCarouselItemViewModelOnTap {
  innertubeCommand: InnertubeCommand1;
}

export interface InnertubeCommand1 {
  clickTrackingParams: string;
  setLiveChatCollapsedStateAction: LoadMarkersCommand;
}

export interface CarouselTitle {
  carouselTitleViewModel: CarouselTitleViewModel;
}

export interface CarouselTitleViewModel {
  title: string;
  previousButton: MenuButton;
  nextButton: MenuButton;
}

export interface VideoPrimaryInfoRenderer {
  title: TitleElement;
  viewCount: ViewCount;
  videoActions: VideoActions;
  trackingParams: string;
  badges?: VideoPrimaryInfoRendererBadge[];
  dateText: LiveIndicatorText;
  relativeDateText?: ShortViewCountText;
  updatedMetadataEndpoint?: VideoPrimaryInfoRendererUpdatedMetadataEndpoint;
  superTitleLink?: SuperTitleLink;
}

export interface VideoPrimaryInfoRendererBadge {
  metadataBadgeRenderer: PurpleMetadataBadgeRenderer;
}

export interface PurpleMetadataBadgeRenderer {
  icon: Icon;
  style: string;
  label: string;
  trackingParams: string;
}

export interface SuperTitleLink {
  runs: SuperTitleLinkRun[];
}

export interface SuperTitleLinkRun {
  text: string;
  navigationEndpoint?: CommandClass;
  loggingDirectives?: AdButtonViewModelLoggingDirectives;
}

export interface CommandClass {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  browseEndpoint: CommandBrowseEndpoint;
  trackingParams?: string;
}

export interface VideoPrimaryInfoRendererUpdatedMetadataEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  updatedMetadataEndpoint: UpdatedMetadataEndpointUpdatedMetadataEndpoint;
}

export interface UpdatedMetadataEndpointUpdatedMetadataEndpoint {
  videoId: VideoID;
  initialDelayMs: number;
  params: string;
}

export enum VideoID {
  MT8EHLMn2Uw = "MT8eHLMn2uw",
  OzeFAY8T8Y = "OzeFAY_8T8Y",
  The11DjZb5QZ90 = "11DjZb5qZ90",
}

export interface VideoActions {
  menuRenderer: VideoActionsMenuRenderer;
}

export interface VideoActionsMenuRenderer {
  items: CunningItem[];
  trackingParams: string;
  topLevelButtons: TopLevelButtonElement[];
  accessibility: DisabledAccessibilityData;
  flexibleItems: FlexibleItem[];
}

export interface FlexibleItem {
  menuFlexibleItemRenderer: MenuFlexibleItemRenderer;
}

export interface MenuFlexibleItemRenderer {
  menuItem: MenuItem;
  topLevelButton: MenuFlexibleItemRendererTopLevelButton;
}

export interface MenuItem {
  menuServiceItemDownloadRenderer?: MenuServiceItemDownloadRenderer;
  listItemViewModel?: MenuItemListItemViewModel;
  menuServiceItemRenderer?: MenuItemMenuServiceItemRenderer;
}

export interface MenuItemListItemViewModel {
  title: BodyText;
  leadingImage: LeadingImage;
  entityKey: EntityKey;
  entitySelectorType: string;
  rendererContext: MagentaRendererContext;
}

export interface MagentaRendererContext {
  commandContext: MagentaCommandContext;
}

export interface MagentaCommandContext {
  onTap: MischievousOnTap;
}

export interface MischievousOnTap {
  innertubeCommand: ShowPlaybackRateUpsellPanelCommandClass;
}

export interface ShowPlaybackRateUpsellPanelCommandClass {
  clickTrackingParams: string;
  commandMetadata: ShowPlaybackRateUpsellPanelCommandCommandMetadata;
  showDialogCommand: ShowPlaybackRateUpsellPanelCommandShowDialogCommand;
}

export interface ShowPlaybackRateUpsellPanelCommandCommandMetadata {
  interactionLoggingCommandMetadata: InteractionLoggingCommandMetadata;
}

export interface ShowPlaybackRateUpsellPanelCommandShowDialogCommand {
  panelLoadingStrategy: FluffyPanelLoadingStrategy;
}

export interface MenuServiceItemDownloadRenderer {
  serviceEndpoint: OnTapServiceEndpoint;
  trackingParams: string;
  playerStateEntityKey: EntityKey;
}

export interface MenuItemMenuServiceItemRenderer {
  text: TitleElement;
  icon: Icon;
  serviceEndpoint: MenuServiceItemRendererInnertubeCommand;
  trackingParams: string;
  isDisabled?: boolean;
}

export interface MenuServiceItemRendererInnertubeCommand {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  commandMetadata?: ShowPlaybackRateUpsellPanelCommandCommandMetadata;
  showSheetCommand?: NavigationEndpointShowSheetCommand;
  showEngagementPanelEndpoint?: ServiceEndpointShowEngagementPanelEndpoint;
}

export interface MenuFlexibleItemRendererTopLevelButton {
  downloadButtonRenderer?: DownloadButtonRenderer;
  buttonViewModel?: TentacledButtonViewModel;
}

export interface TentacledButtonViewModel {
  iconName: string;
  title: string;
  onTap: BraggadociousOnTap;
  accessibilityText: string;
  style: PurpleStyle;
  trackingParams: string;
  type: TypeEnum;
  buttonSize: PrimaryButtonButtonSize;
  state?: StateEnum;
  accessibilityId?: string;
  buttonEntitySelectorType?: string;
  entityKey?: EntityKey;
  isFullWidth?: boolean;
  tooltip?: string;
}

export interface BraggadociousOnTap {
  innertubeCommand?: ShowPlaybackRateUpsellPanelCommandClass;
  serialCommand?: PurpleSerialCommand;
}

export interface PurpleSerialCommand {
  commands: FriskyCommand[];
}

export interface FriskyCommand {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: MenuServiceItemRendererInnertubeCommand;
}

export interface LogGestureCommand {
  gestureType: GestureType;
  trackingParams: string;
}

export enum GestureType {
  GestureEventTypeLogGenericClick = "GESTURE_EVENT_TYPE_LOG_GENERIC_CLICK",
}

export interface DownloadButtonRenderer {
  trackingParams: string;
  style: DownloadButtonRendererStyle;
  size: SizeEnum;
  targetId: string;
  command: DownloadButtonRendererCommand;
  playerStateEntityKey: EntityKey;
}

export interface DownloadButtonRendererCommand {
  clickTrackingParams: string;
  offlineVideoEndpoint: CommandOfflineVideoEndpoint;
}

export interface CommandOfflineVideoEndpoint {
  videoId: VideoID;
  onAddCommand: OnAddCommand;
  action: string;
}

export interface CunningItem {
  menuServiceItemRenderer: MenuItemRenderer;
}

export interface TopLevelButtonElement {
  segmentedLikeDislikeButtonViewModel?: SegmentedLikeDislikeButtonViewModel;
  buttonViewModel?: StickyButtonViewModel;
}

export interface StickyButtonViewModel {
  iconName: IconName;
  title: string;
  onTap: OnTap1;
  accessibilityText: string;
  style: PurpleStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: TypeEnum;
  buttonSize: PrimaryButtonButtonSize;
  state: StateEnum;
  accessibilityId: string;
  tooltip: string;
}

export interface OnTap1 {
  serialCommand: FluffySerialCommand;
}

export interface FluffySerialCommand {
  commands: MischievousCommand[];
}

export interface MischievousCommand {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: CommandInnertubeCommand;
}

export interface SegmentedLikeDislikeButtonViewModel {
  likeButtonViewModel: SegmentedLikeDislikeButtonViewModelLikeButtonViewModel;
  dislikeButtonViewModel: SegmentedLikeDislikeButtonViewModelDislikeButtonViewModel;
  iconType: string;
  likeCountEntity: LikeCountEntity;
  dynamicLikeCountUpdateData: DynamicLikeCountUpdateData;
  teasersOrderEntityKey: string;
}

export interface SegmentedLikeDislikeButtonViewModelDislikeButtonViewModel {
  dislikeButtonViewModel: DislikeButtonViewModelDislikeButtonViewModel;
}

export interface DislikeButtonViewModelDislikeButtonViewModel {
  toggleButtonViewModel: DislikeButtonViewModelToggleButtonViewModel;
  dislikeEntityKey: string;
}

export interface DislikeButtonViewModelToggleButtonViewModel {
  toggleButtonViewModel: PurpleToggleButtonViewModel;
}

export interface PurpleToggleButtonViewModel {
  defaultButtonViewModel: PurpleDefaultButtonViewModel;
  toggledButtonViewModel: FluffyToggledButtonViewModel;
  trackingParams: string;
  isTogglingDisabled: boolean;
}

export interface PurpleDefaultButtonViewModel {
  buttonViewModel: IndigoButtonViewModel;
}

export interface IndigoButtonViewModel {
  iconName: LikeStatus;
  title?: string;
  onTap: OnTap2;
  accessibilityText: string;
  style: PrimaryButtonStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: TypeEnum;
  buttonSize: PurpleButtonSize;
  accessibilityId: AccessibilityID;
  tooltip?: string;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
}

export enum AccessibilityID {
  IDVideoDislikeButton = "id.video.dislike.button",
  IDVideoLikeButton = "id.video.like.button",
}

export enum PurpleButtonSize {
  ButtonViewModelSizeDefault = "BUTTON_VIEW_MODEL_SIZE_DEFAULT",
  ButtonViewModelSizeLarge = "BUTTON_VIEW_MODEL_SIZE_LARGE",
}

export interface OnTap2 {
  serialCommand: TentacledSerialCommand;
}

export interface TentacledSerialCommand {
  commands: BraggadociousCommand[];
}

export interface BraggadociousCommand {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: InnertubeCommand2;
}

export interface InnertubeCommand2 {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  likeEndpoint: FluffyLikeEndpoint;
}

export interface FluffyLikeEndpoint {
  status: LikeStatus;
  target: FluffyTarget;
  dislikeParams: string;
}

export interface FluffyTarget {
  videoId: VideoID;
}

export enum PrimaryButtonStyle {
  ButtonViewModelStyleMono = "BUTTON_VIEW_MODEL_STYLE_MONO",
  ButtonViewModelStyleOverlay = "BUTTON_VIEW_MODEL_STYLE_OVERLAY",
}

export interface TooltipData {
  tooltipViewModel: TooltipViewModel;
}

export interface TooltipViewModel {
  tooltipText: string;
  placement: Placement;
  style: TooltipViewModelStyle;
}

export enum Placement {
  TooltipViewModelPlacementTop = "TOOLTIP_VIEW_MODEL_PLACEMENT_TOP",
}

export enum TooltipViewModelStyle {
  TooltipViewModelStylePlayer = "TOOLTIP_VIEW_MODEL_STYLE_PLAYER",
}

export interface FluffyToggledButtonViewModel {
  buttonViewModel: IndecentButtonViewModel;
}

export interface IndecentButtonViewModel {
  iconName: LikeStatus;
  title?: string;
  onTap: OnTap3;
  accessibilityText: string;
  style: PrimaryButtonStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: TypeEnum;
  buttonSize: PurpleButtonSize;
  accessibilityId: AccessibilityID;
  tooltip?: string;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
}

export interface OnTap3 {
  serialCommand: StickySerialCommand;
}

export interface StickySerialCommand {
  commands: Command1[];
}

export interface Command1 {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: InnertubeCommand3;
}

export interface InnertubeCommand3 {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  likeEndpoint: TentacledLikeEndpoint;
}

export interface TentacledLikeEndpoint {
  status: LikeStatus;
  target: FluffyTarget;
  removeLikeParams: string;
}

export interface DynamicLikeCountUpdateData {
  updateStatusKey: string;
  placeholderLikeCountValuesKey: string;
  updateDelayLoopId: string;
  updateDelaySec: number;
}

export interface SegmentedLikeDislikeButtonViewModelLikeButtonViewModel {
  likeButtonViewModel: LikeButtonViewModelLikeButtonViewModel;
}

export interface LikeButtonViewModelLikeButtonViewModel {
  toggleButtonViewModel: LikeButtonViewModelToggleButtonViewModel;
  likeStatusEntityKey: string;
  likeStatusEntity: LikeStatusEntity;
}

export interface LikeStatusEntity {
  key: string;
  likeStatus: LikeStatus;
}

export interface LikeButtonViewModelToggleButtonViewModel {
  toggleButtonViewModel: FluffyToggleButtonViewModel;
}

export interface FluffyToggleButtonViewModel {
  defaultButtonViewModel: FluffyDefaultButtonViewModel;
  toggledButtonViewModel: FluffyToggledButtonViewModel;
  identifier: string;
  trackingParams: string;
  isTogglingDisabled: boolean;
}

export interface FluffyDefaultButtonViewModel {
  buttonViewModel: HilariousButtonViewModel;
}

export interface HilariousButtonViewModel {
  iconName: LikeStatus;
  title: string;
  onTap: OnTap4;
  accessibilityText: string;
  style: PrimaryButtonStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: TypeEnum;
  buttonSize: PurpleButtonSize;
  accessibilityId: AccessibilityID;
  tooltip?: string;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
}

export interface OnTap4 {
  serialCommand: IndigoSerialCommand;
}

export interface IndigoSerialCommand {
  commands: Command2[];
}

export interface Command2 {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: InnertubeCommand4;
}

export interface InnertubeCommand4 {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  likeEndpoint: StickyLikeEndpoint;
}

export interface StickyLikeEndpoint {
  status: LikeStatus;
  target: FluffyTarget;
  likeParams: string;
}

export interface LikeCountEntity {
  key: string;
  likeCountIfLiked?: BodyText;
  likeCountIfDisliked?: BodyText;
  likeCountIfIndifferent?: BodyText;
  expandedLikeCountIfLiked?: BodyText;
  expandedLikeCountIfDisliked?: BodyText;
  expandedLikeCountIfIndifferent?: BodyText;
  likeCountLabel?: BodyText;
  likeButtonA11yText?: BodyText;
  likeCountIfLikedNumber?: string;
  likeCountIfDislikedNumber?: string;
  likeCountIfIndifferentNumber?: string;
  shouldExpandLikeCount?: boolean;
  sentimentFactoidA11yTextIfLiked?: BodyText;
  sentimentFactoidA11yTextIfDisliked?: BodyText;
}

export interface ViewCount {
  videoViewCountRenderer: VideoViewCountRenderer;
}

export interface VideoViewCountRenderer {
  viewCount: ViewsClass;
  shortViewCount?: LiveIndicatorText;
  originalViewCount: string;
  isLive?: boolean;
  extraShortViewCount?: LiveIndicatorText;
  entityKey?: string;
}

export interface VideoSecondaryInfoRenderer {
  owner: Owner;
  subscribeButton: SubscribeButton;
  metadataRowContainer: MetadataRowContainer;
  showMoreText: LiveIndicatorText;
  showLessText: LiveIndicatorText;
  trackingParams: string;
  defaultExpanded: boolean;
  descriptionCollapsedLines: number;
  showMoreCommand: ShowMoreCommand;
  showLessCommand: ShowLessCommandClass;
  attributedDescription: AttributedDescription;
  headerRuns: HeaderRun[];
}

export interface AttributedDescription {
  content: string;
  commandRuns: AttributedDescriptionCommandRun[];
  styleRuns: AttributedDescriptionStyleRun[];
  attachmentRuns?: AttributedDescriptionAttachmentRun[];
  decorationRuns?: DecorationRun[];
}

export interface AttributedDescriptionAttachmentRun {
  startIndex: number;
  length: number;
  element: FluffyElement;
  alignment: Alignment;
}

export interface FluffyElement {
  type: FluffyType;
  properties: FluffyProperties;
}

export interface FluffyProperties {
  layoutProperties: FluffyLayoutProperties;
}

export interface FluffyLayoutProperties {
  height: Height;
  width: Height;
  margin: FluffyMargin;
}

export interface FluffyMargin {
  top: Height;
}

export interface FluffyType {
  imageType: FluffyImageType;
}

export interface FluffyImageType {
  image: VideoAttributeViewModelImage;
}

export interface VideoAttributeViewModelImage {
  sources: CommonConfig[];
}

export interface AttributedDescriptionCommandRun {
  startIndex: number;
  length: number;
  onTap: OnTap5;
  onTapOptions?: OnTapOptions;
  loggingDirectives?: InfoCardIconRenderer;
}

export interface OnTap5 {
  innertubeCommand: InnertubeCommand;
}

export interface OnTapOptions {
  accessibilityInfo: AccessibilityInfo;
}

export interface AccessibilityInfo {
  accessibilityLabel: string;
}

export interface DecorationRun {
  textDecorator: TextDecorator;
}

export interface TextDecorator {
  highlightTextDecorator: HighlightTextDecorator;
}

export interface HighlightTextDecorator {
  startIndex: number;
  length: number;
  backgroundCornerRadius: number;
  bottomPadding: number;
  highlightTextDecoratorExtensions: HighlightTextDecoratorExtensions;
}

export interface HighlightTextDecoratorExtensions {
  highlightTextDecoratorColorMapExtension: ColorMapExtension;
}

export interface HeaderRun {
  startIndex: number;
  length: number;
  headerMapping: HeaderMapping;
}

export enum HeaderMapping {
  AttributedStringHeaderMappingUnspecified = "ATTRIBUTED_STRING_HEADER_MAPPING_UNSPECIFIED",
}

export interface MetadataRowContainer {
  metadataRowContainerRenderer: MetadataRowContainerRenderer;
}

export interface MetadataRowContainerRenderer {
  collapsedItemCount: number;
  trackingParams: string;
}

export interface Owner {
  videoOwnerRenderer: VideoOwnerRenderer;
}

export interface VideoOwnerRenderer {
  thumbnail: BackgroundClass;
  title: Byline;
  subscriptionButton: SubscriptionButton;
  navigationEndpoint: ChannelNavigationEndpointClass;
  subscriberCountText: ShortViewCountText;
  trackingParams: string;
  badges?: VideoOwnerRendererBadge[];
  membershipButton?: MembershipButton;
}

export interface VideoOwnerRendererBadge {
  metadataBadgeRenderer: FluffyMetadataBadgeRenderer;
}

export interface FluffyMetadataBadgeRenderer {
  icon: Icon;
  style: string;
  tooltip: string;
  trackingParams: string;
  accessibilityData: Accessibility;
}

export interface MembershipButton {
  timedAnimationButtonRenderer: TimedAnimationButtonRenderer;
}

export interface TimedAnimationButtonRenderer {
  buttonRenderer: A11YSkipNavigationButton;
}

export interface A11YSkipNavigationButton {
  buttonRenderer: A11YSkipNavigationButtonButtonRenderer;
}

export interface A11YSkipNavigationButtonButtonRenderer {
  style: TentacledStyle;
  size: SizeEnum;
  isDisabled: boolean;
  text: TitleElement;
  serviceEndpoint?: AmbitiousServiceEndpoint;
  trackingParams: string;
  accessibilityData?: DisabledAccessibilityData;
  targetId?: string;
  command?: OnResponseReceivedEndpoint;
}

export interface OnResponseReceivedEndpoint {
  clickTrackingParams: string;
  commandMetadata?: OnResponseReceivedEndpointCommandMetadata;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
  loadMarkersCommand?: LoadMarkersCommand;
}

export interface AmbitiousServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  ypcGetOffersEndpoint: YpcGetOffersEndpoint;
}

export enum TentacledStyle {
  StyleBlueText = "STYLE_BLUE_TEXT",
  StyleDefault = "STYLE_DEFAULT",
  StyleSuggestive = "STYLE_SUGGESTIVE",
}

export interface SubscriptionButton {
  type: string;
  subscribed?: boolean;
}

export interface Byline {
  runs: AuthorTextRun[];
}

export interface ShowLessCommandClass {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction: ChangeEngagementPanelVisibilityAction;
}

export interface ShowMoreCommand {
  clickTrackingParams: string;
  commandExecutorCommand: ShowMoreCommandCommandExecutorCommand;
}

export interface ShowMoreCommandCommandExecutorCommand {
  commands: Command3[];
}

export interface Command3 {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  scrollToEngagementPanelCommand?: ScrollToEngagementPanelCommandClass;
}

export interface SubscribeButton {
  subscribeButtonRenderer: SubscribeButtonRenderer;
}

export interface SubscribeButtonRenderer {
  buttonText: TitleElement;
  subscribed: boolean;
  enabled: boolean;
  type: string;
  channelId: ID;
  showPreferences: boolean;
  subscribedButtonText: TitleElement;
  unsubscribedButtonText: TitleElement;
  trackingParams: string;
  unsubscribeButtonText: TitleElement;
  subscribeAccessibility: DisabledAccessibilityData;
  unsubscribeAccessibility: DisabledAccessibilityData;
  notificationPreferenceButton: NotificationPreferenceButton;
  targetId: string;
  subscribedEntityKey: string;
  onSubscribeEndpoints: SubscribeCommand[];
  onUnsubscribeEndpoints: OnUnsubscribeEndpoint[];
}

export interface NotificationPreferenceButton {
  subscriptionNotificationToggleButtonRenderer: SubscriptionNotificationToggleButtonRenderer;
}

export interface SubscriptionNotificationToggleButtonRenderer {
  states: StateElement[];
  currentStateId: number;
  trackingParams: string;
  command: SubscriptionNotificationToggleButtonRendererCommand;
  targetId: string;
  secondaryIcon: Icon;
}

export interface SubscriptionNotificationToggleButtonRendererCommand {
  clickTrackingParams: string;
  commandExecutorCommand: IndigoCommandExecutorCommand;
}

export interface IndigoCommandExecutorCommand {
  commands: Command4[];
}

export interface Command4 {
  clickTrackingParams: string;
  openPopupAction: IndecentOpenPopupAction;
}

export interface IndecentOpenPopupAction {
  popup: HilariousPopup;
  popupType: string;
}

export interface HilariousPopup {
  menuPopupRenderer: PurpleMenuPopupRenderer;
}

export interface PurpleMenuPopupRenderer {
  items: MagentaItem[];
}

export interface MagentaItem {
  menuServiceItemRenderer: TentacledMenuServiceItemRenderer;
}

export interface TentacledMenuServiceItemRenderer {
  text: ViewsClass;
  icon: Icon;
  serviceEndpoint: CunningServiceEndpoint;
  trackingParams: string;
  isSelected?: boolean;
}

export interface CunningServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  modifyChannelNotificationPreferenceEndpoint?: YpcGetOffersEndpoint;
  signalServiceEndpoint?: OnUnsubscribeEndpointSignalServiceEndpoint;
}

export interface OnUnsubscribeEndpointSignalServiceEndpoint {
  signal: SignalServiceEndpointSignal;
  actions: Action2[];
}

export interface Action2 {
  clickTrackingParams: string;
  openPopupAction: HilariousOpenPopupAction;
}

export interface HilariousOpenPopupAction {
  popup: AmbitiousPopup;
  popupType: PurplePopupType;
}

export interface AmbitiousPopup {
  confirmDialogRenderer: FluffyConfirmDialogRenderer;
}

export interface FluffyConfirmDialogRenderer {
  trackingParams: string;
  dialogMessages: TitleElement[];
  confirmButton: SaveButtonClass;
  cancelButton: SaveButtonClass;
  primaryIsCancel: boolean;
}

export interface StateElement {
  stateId: number;
  nextStateId: number;
  state: CancelButtonClass;
}

export interface SubscribeCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  subscribeEndpoint: SubscribeEndpoint;
}

export interface OnUnsubscribeEndpoint {
  clickTrackingParams: string;
  commandMetadata: OnResponseReceivedEndpointCommandMetadata;
  signalServiceEndpoint: OnUnsubscribeEndpointSignalServiceEndpoint;
}

export interface TwoColumnWatchNextResultsSecondaryResults {
  secondaryResults: SecondaryResultsSecondaryResults;
}

export interface SecondaryResultsSecondaryResults {
  results: SecondaryResultsResult[];
  trackingParams: string;
  continuations: any[];
}

export interface SecondaryResultsResult {
  relatedChipCloudRenderer?: RelatedChipCloudRenderer;
  itemSectionRenderer?: ResultItemSectionRenderer;
}

export interface ResultItemSectionRenderer {
  contents: RelatedChipCommandContent[];
  trackingParams: string;
  sectionIdentifier: string;
  targetId: ScrollToEngagementPanelCommandPanelIdentifier;
}

export interface RelatedChipCloudRenderer {
  content: RelatedChipCloudRendererContent;
  showProminentChips: boolean;
}

export interface RelatedChipCloudRendererContent {
  chipCloudRenderer: ChipCloudRenderer;
}

export interface ChipCloudRenderer {
  chips: ChipCloudRendererChip[];
  trackingParams: string;
  horizontalScrollable: boolean;
  nextButton: CloseButtonClass;
  previousButton: CloseButtonClass;
  style: ChipCloudRendererStyle;
}

export interface ChipCloudRendererChip {
  chipCloudChipRenderer: ChipChipCloudChipRenderer;
}

export interface ChipChipCloudChipRenderer {
  style: ToggledStyleClass;
  text: LiveIndicatorText;
  navigationEndpoint: Endpoint;
  trackingParams: string;
  isSelected: boolean;
}

export interface CloseButtonClass {
  buttonRenderer: CloseButtonButtonRenderer;
}

export interface CloseButtonButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: SizeEnum;
  isDisabled: boolean;
  icon: Icon;
  accessibility: Accessibility;
  trackingParams: string;
}

export interface ChipCloudRendererStyle {
  backgroundStyle: string;
}

export interface CurrentVideoEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: CurrentVideoEndpointWatchEndpoint;
}

export interface EngagementPanel {
  engagementPanelSectionListRenderer: EngagementPanelSectionListRenderer;
}

export interface EngagementPanelSectionListRenderer {
  panelIdentifier?: EngagementPanelTargetIDEnum;
  header?: EngagementPanelSectionListRendererHeader;
  content?: EngagementPanelSectionListRendererContent;
  veType?: number;
  targetId?: string;
  visibility: VisibilityEnum;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
  onShowCommands?: OnShowCommand[];
  resizability?: string;
  onCloseCommand?: OnCloseCommand;
  identifier?: ContentSourcePanelIdentifierClass;
}

export interface EngagementPanelSectionListRendererContent {
  sectionListRenderer?: SectionListRenderer;
  adsEngagementPanelContentRenderer?: AdsEngagementPanelContentRenderer;
  clipSectionRenderer?: ClipSectionRenderer;
  structuredDescriptionContentRenderer?: StructuredDescriptionContentRenderer;
  continuationItemRenderer?: StickyContinuationItemRenderer;
}

export interface ClipSectionRenderer {
  contents: ClipSectionRendererContent[];
}

export interface ClipSectionRendererContent {
  clipCreationRenderer: ClipCreationRenderer;
}

export interface ClipCreationRenderer {
  trackingParams: string;
  userAvatar: BackgroundClass;
  titleInput: TitleInput;
  scrubber: Scrubber;
  saveButton: SaveButtonClass;
  displayName: LiveIndicatorText;
  publicityLabel: string;
  cancelButton: SaveButtonClass;
  adStateOverlay: AdStateOverlay;
  externalVideoId: VideoID;
  publicityLabelIcon: string;
}

export interface AdStateOverlay {
  clipAdStateRenderer: ClipAdStateRenderer;
}

export interface ClipAdStateRenderer {
  title: TitleElement;
  body: TitleElement;
}

export interface Scrubber {
  clipCreationScrubberRenderer: ClipCreationScrubberRenderer;
}

export interface ClipCreationScrubberRenderer {
  lengthTemplate: string;
  maxLengthMs: number;
  minLengthMs: number;
  defaultLengthMs: number;
  windowSizeMs: number;
  startAccessibility: DisabledAccessibilityData;
  endAccessibility: DisabledAccessibilityData;
  durationAccessibility: DisabledAccessibilityData;
}

export interface TitleInput {
  clipCreationTextInputRenderer: ClipCreationTextInputRenderer;
}

export interface ClipCreationTextInputRenderer {
  placeholderText: TitleElement;
  maxCharacterLimit: number;
}

export interface StickyContinuationItemRenderer {
  trigger: string;
  continuationEndpoint: FluffyContinuationEndpoint;
}

export interface FluffyContinuationEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  getTranscriptEndpoint: YpcGetOffersEndpoint;
}

export interface SectionListRenderer {
  contents?: SectionListRendererContent[];
  trackingParams: string;
  hack?: boolean;
}

export interface SectionListRendererContent {
  itemSectionRenderer: FluffyItemSectionRenderer;
}

export interface FluffyItemSectionRenderer {
  contents: AmbitiousContent[];
  trackingParams: string;
  sectionIdentifier: string;
  targetId: ScrollToEngagementPanelCommandPanelIdentifier;
}

export interface AmbitiousContent {
  continuationItemRenderer: TentacledContinuationItemRenderer;
}

export interface StructuredDescriptionContentRenderer {
  items: StructuredDescriptionContentRendererItem[];
}

export interface StructuredDescriptionContentRendererItem {
  videoDescriptionHeaderRenderer?: VideoDescriptionHeaderRenderer;
  expandableVideoDescriptionBodyRenderer?: ExpandableVideoDescriptionBodyRenderer;
  horizontalCardListRenderer?: HorizontalCardListRenderer;
  videoDescriptionTranscriptSectionRenderer?: VideoDescriptionTranscriptSectionRenderer;
  videoDescriptionInfocardsSectionRenderer?: VideoDescriptionInfocardsSectionRenderer;
}

export interface ExpandableVideoDescriptionBodyRenderer {
  showMoreText: ShortViewCountText;
  showLessText: LiveIndicatorText;
  attributedDescriptionBodyText: AttributedDescription;
  headerRuns: HeaderRun[];
  backgroundColorStyle: string;
  lightThemeColorPalette: ThemeColorPalette;
  darkThemeColorPalette: ThemeColorPalette;
  colorSampledDescriptionBodyText: AttributedDescription;
  enableColorSampledDescriptionBodyText: boolean;
}

export interface ThemeColorPalette {
  baseBackground: number;
  raisedBackground: number;
  additiveBackground: number;
  textPrimary: number;
  textSecondary: number;
  invertedBackground: number;
  overlayBackground: number;
}

export interface HorizontalCardListRenderer {
  cards: HorizontalCardListRendererCard[];
  trackingParams: string;
  header: HorizontalCardListRendererHeader;
  style: SuggestedPositionClass;
  footerButton: FooterButton;
}

export interface HorizontalCardListRendererCard {
  videoAttributeViewModel: VideoAttributeViewModel;
}

export interface VideoAttributeViewModel {
  image: VideoAttributeViewModelImage;
  imageStyle: string;
  title: string;
  subtitle: string;
  secondarySubtitle: BodyText;
  orientation: string;
  sizingRule: string;
  overflowMenuOnTap: OverflowMenuOnTap;
  overflowMenuA11yLabel: Tooltip;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface OverflowMenuOnTap {
  innertubeCommand: OverflowMenuOnTapInnertubeCommand;
}

export interface OverflowMenuOnTapInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: StickyCommandMetadata;
  confirmDialogEndpoint: ConfirmDialogEndpoint;
}

export interface StickyCommandMetadata {
  webCommandMetadata: IndigoWebCommandMetadata;
}

export interface ConfirmDialogEndpoint {
  content: ConfirmDialogEndpointContent;
}

export interface ConfirmDialogEndpointContent {
  confirmDialogRenderer: ContentConfirmDialogRenderer;
}

export interface ContentConfirmDialogRenderer {
  title: TitleElement;
  trackingParams: string;
  dialogMessages: DialogMessage[];
  confirmButton: A11YSkipNavigationButton;
  primaryIsCancel: boolean;
}

export interface DialogMessage {
  runs: PurpleRun[];
}

export interface PurpleRun {
  text: string;
  bold?: boolean;
}

export interface FooterButton {
  buttonViewModel: FooterButtonButtonViewModel;
}

export interface FooterButtonButtonViewModel {
  iconName: IconName;
  onTap: OnTap6;
  style: PurpleStyle;
  trackingParams: string;
  type: string;
  buttonSize: PrimaryButtonButtonSize;
  titleFormatted: BodyText;
}

export interface OnTap6 {
  innertubeCommand: InnertubeCommandClass;
}

export interface InnertubeCommandClass {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  browseEndpoint: EndpointBrowseEndpoint;
}

export interface EndpointBrowseEndpoint {
  browseId: string;
}

export interface HorizontalCardListRendererHeader {
  richListHeaderRenderer: RichListHeaderRenderer;
}

export interface RichListHeaderRenderer {
  title: LiveIndicatorText;
  subtitle: LiveIndicatorText;
  trackingParams: string;
}

export interface VideoDescriptionHeaderRenderer {
  title: TitleElement;
  channel: LiveIndicatorText;
  views: ViewsClass;
  publishDate: LiveIndicatorText;
  factoid?: FactoidElement[];
  channelNavigationEndpoint: ChannelNavigationEndpointClass;
  channelThumbnail: Channel;
}

export interface Channel {
  thumbnails: CommonConfig[];
}

export interface FactoidElement {
  factoidRenderer?: FactoidRenderer;
  viewCountFactoidRenderer?: ViewCountFactoidRenderer;
}

export interface FactoidRenderer {
  value: LiveIndicatorText;
  label: LiveIndicatorText;
  accessibilityText: string;
  backgroundColorStyle: string;
  lightThemeColorPalette: ThemeColorPalette;
  darkThemeColorPalette: ThemeColorPalette;
  enableColorSampledText: boolean;
  position?: string;
}

export interface ViewCountFactoidRenderer {
  viewCountEntityKey: string;
  factoid: ViewCountFactoidRendererFactoid;
  viewCountType: string;
}

export interface ViewCountFactoidRendererFactoid {
  factoidRenderer: FactoidRenderer;
}

export interface VideoDescriptionInfocardsSectionRenderer {
  sectionTitle: LiveIndicatorText;
  creatorVideosButton: CreatorButton;
  creatorAboutButton: CreatorButton;
  sectionSubtitle: ShortViewCountText;
  channelAvatar: Channel;
  channelEndpoint: ChannelNavigationEndpointClass;
  trackingParams: string;
}

export interface CreatorButton {
  buttonRenderer: CreatorAboutButtonButtonRenderer;
}

export interface CreatorAboutButtonButtonRenderer {
  style: string;
  size: SizeEnum;
  isDisabled: boolean;
  text: LiveIndicatorText;
  icon: Icon;
  trackingParams: string;
  command: CommandClass;
}

export interface VideoDescriptionTranscriptSectionRenderer {
  sectionTitle: TitleElement;
  subHeaderText: TitleElement;
  primaryButton: SaveButtonClass;
  trackingParams: string;
}

export interface EngagementPanelSectionListRendererHeader {
  engagementPanelTitleHeaderRenderer: EngagementPanelTitleHeaderRenderer;
}

export interface EngagementPanelTitleHeaderRenderer {
  title: ViewsClass;
  contextualInfo?: TitleElement;
  menu?: EngagementPanelTitleHeaderRendererMenu;
  visibilityButton: VoiceSearchButtonClass;
  trackingParams: string;
  subheader?: Subheader;
  informationButton?: CancelButtonClass;
}

export interface EngagementPanelTitleHeaderRendererMenu {
  sortFilterSubMenuRenderer?: MenuSortFilterSubMenuRenderer;
  menuRenderer?: FluffyMenuRenderer;
}

export interface FluffyMenuRenderer {
  items: FriskyItem[];
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
}

export interface FriskyItem {
  menuServiceItemRenderer: StickyMenuServiceItemRenderer;
}

export interface StickyMenuServiceItemRenderer {
  text: TitleElement;
  serviceEndpoint: OnResponseReceivedEndpoint;
  trackingParams: string;
}

export interface MenuSortFilterSubMenuRenderer {
  subMenuItems: SubMenuItem[];
  icon: Icon;
  accessibility: DisabledAccessibilityData;
  trackingParams: string;
}

export interface Subheader {
  chipBarViewModel: ChipBarViewModel;
}

export interface ChipBarViewModel {
  chips: ChipBarViewModelChip[];
  chipBarStateEntityKey: string;
}

export interface ChipBarViewModelChip {
  chipViewModel: ChipViewModel;
}

export interface ChipViewModel {
  text: string;
  selected: boolean;
  displayType: string;
  tapCommand: TapCommand;
  accessibilityLabel: string;
  loggingDirectives: AdButtonViewModelLoggingDirectives;
}

export interface TapCommand {
  innertubeCommand: TapCommandInnertubeCommand;
}

export interface TapCommandInnertubeCommand {
  clickTrackingParams: string;
  commandExecutorCommand: IndecentCommandExecutorCommand;
}

export interface IndecentCommandExecutorCommand {
  commands: Command5[];
}

export interface Command5 {
  clickTrackingParams: string;
  updateEngagementPanelContentCommand?: UpdateEngagementPanelContentCommand;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
}

export interface UpdateEngagementPanelContentCommand {
  targetPanelIdentifier: ContentSourcePanelIdentifierClass;
  contentSourcePanelIdentifier: ContentSourcePanelIdentifierClass;
  globalConfiguration: YpcGetOffersEndpoint;
}

export interface OnCloseCommand {
  clickTrackingParams: string;
  commandExecutorCommand: OnCloseCommandCommandExecutorCommand;
}

export interface OnCloseCommandCommandExecutorCommand {
  commands: Command6[];
}

export interface Command6 {
  clickTrackingParams: string;
  updateTimedMarkersSyncObserverCommand: UpdateTimedMarkersSyncObserverCommand;
}

export interface OnShowCommand {
  clickTrackingParams: string;
  scrollToEngagementPanelCommand?: ScrollToEngagementPanelCommand;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  showEngagementPanelScrimAction?: ShowEngagementPanelScrimAction;
}

export interface ScrollToEngagementPanelCommand {
  panelIdentifier?: PanelIdentifierClass;
  targetId?: string;
}

export interface ShowEngagementPanelScrimAction {
  engagementPanelTargetId: EngagementPanelTargetIDEnum;
  onClickCommands: OnClickCommand[];
}

export interface OnClickCommand {
  clickTrackingParams: string;
  openPopupAction: OnClickCommandOpenPopupAction;
}

export interface FrameworkUpdates {
  entityBatchUpdate: EntityBatchUpdate;
}

export interface EntityBatchUpdate {
  mutations: any[];
  timestamp: Timestamp;
}

export interface Timestamp {
  seconds: string;
  nanos: number;
}

export interface InitialDataHeader {
  feedTabbedHeaderRenderer: FeedTabbedHeaderRenderer;
}

export interface FeedTabbedHeaderRenderer {
  title: TitleElement;
}

export interface InitialDataMicroformat {
  microformatDataRenderer: MicroformatDataRenderer;
}

export interface MicroformatDataRenderer {
  videoDetails: MicroformatDataRendererVideoDetails;
}

export interface MicroformatDataRendererVideoDetails {
  comments?: Comment[];
}

export interface Comment {
  type: string;
  dateCreated: Date;
  text: string;
  author: Author;
  upvoteCount: number;
}

export interface Author {
  type: string;
  name: string;
  url: string;
  alternateName: string;
}

export interface OnResponseReceivedAction {
  clickTrackingParams: string;
  adsControlFlowOpportunityReceivedCommand: AdsControlFlowOpportunityReceivedCommand;
}

export interface AdsControlFlowOpportunityReceivedCommand {
  opportunityType: string;
  isInitialLoad: boolean;
  adSlotAndLayoutMetadata: AdSlotAndLayoutMetadatum[];
  enablePacfLoggingWeb: boolean;
}

export interface AdSlotAndLayoutMetadatum {
  adSlotMetadata: AdSlotMetadata;
  adLayoutMetadata: AdLayoutMetadat[];
}

export interface PageVisualEffect {
  cinematicContainerRenderer: CinematicContainerRenderer;
}

export interface CinematicContainerRenderer {
  gradientColorConfig: GradientColorConfig[];
  presentationStyle: string;
  config: CinematicContainerRendererConfig;
}

export interface CinematicContainerRendererConfig {
  lightThemeBackgroundColor: number;
  darkThemeBackgroundColor: number;
  animationConfig: AnimationConfig;
  colorSourceSizeMultiplier: number;
  applyClientImageBlur: boolean;
  bottomColorSourceHeightMultiplier: number;
  maxBottomColorSourceHeight: number;
  colorSourceWidthMultiplier: number;
  colorSourceHeightMultiplier: number;
  blurStrength: number;
  watchFullscreenConfig: WatchFullscreenConfig;
  enableInLightTheme: boolean;
}

export interface AnimationConfig {
  minImageUpdateIntervalMs?: number;
  crossfadeDurationMs?: number;
  crossfadeStartOffset: number;
  maxFrameRate: number;
}

export interface WatchFullscreenConfig {
  colorSourceWidthMultiplier: number;
  colorSourceHeightMultiplier: number;
  scrimWidthMultiplier: number;
  scrimHeightMultiplier: number;
  flatScrimColor?: number;
  scrimGradientConfig?: ScrimGradientConfig;
}

export interface ScrimGradientConfig {
  gradientType: string;
  gradientColors: GradientColor[];
  gradientStartPointX: number;
  gradientStartPointY: number;
  gradientEndPointX: number;
  gradientEndPointY: number;
}

export interface GradientColor {
  lightThemeColor: number;
  darkThemeColor: number;
  startLocation: number;
}

export interface GradientColorConfig {
  darkThemeColor: number;
  startLocation?: number;
}

export interface PlayerOverlays {
  playerOverlayRenderer: PlayerOverlayRenderer;
}

export interface PlayerOverlayRenderer {
  endScreen: EndScreen;
  shareButton: CancelButtonClass;
  addToMenu: AddToMenu;
  videoDetails: PlayerOverlayRendererVideoDetails;
  decoratedPlayerBarRenderer: DecoratedPlayerBarRenderer;
  fullscreenQuickActionsBar: FullscreenQuickActionsBar;
  speedmasterUserEdu: SpeedmasterUserEdu;
  showPlaybackRateUpsellPanelCommand: ShowPlaybackRateUpsellPanelCommandClass;
  autoplay?: PlayerOverlayRendererAutoplay;
  liveIndicatorText?: LiveIndicatorText;
  autonavToggle?: AutonavToggle;
}

export interface AddToMenu {
  menuRenderer: AddToMenuMenuRenderer;
}

export interface AddToMenuMenuRenderer {
  items: MischievousItem[];
  trackingParams: string;
}

export interface MischievousItem {
  menuServiceItemRenderer?: MenuItemRenderer;
  menuNavigationItemRenderer?: MenuItemRenderer;
}

export interface AutonavToggle {
  autoplaySwitchButtonRenderer: AutoplaySwitchButtonRenderer;
}

export interface AutoplaySwitchButtonRenderer {
  onEnabledCommand: OnAbledCommand;
  onDisabledCommand: OnAbledCommand;
  enabledAccessibilityData: DisabledAccessibilityData;
  disabledAccessibilityData: DisabledAccessibilityData;
  trackingParams: string;
  enabled: boolean;
}

export interface OnAbledCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  setSettingEndpoint: SetSettingEndpoint;
}

export interface SetSettingEndpoint {
  settingItemId: string;
  boolValue: boolean;
  settingItemIdForClient: string;
}

export interface PlayerOverlayRendererAutoplay {
  playerOverlayAutoplayRenderer: PlayerOverlayAutoplayRenderer;
}

export interface PlayerOverlayAutoplayRenderer {
  title: LiveIndicatorText;
  videoTitle: ShortViewCountText;
  byline: Byline;
  pauseText: LiveIndicatorText;
  background: BackgroundClass;
  countDownSecs: number;
  cancelButton: CancelButtonClass;
  nextButton: CancelButtonClass;
  trackingParams: string;
  closeButton: CloseButtonClass;
  thumbnailOverlays: PlayerOverlayAutoplayRendererThumbnailOverlay[];
  preferImmediateRedirect: boolean;
  videoId: string;
  publishedTimeText: LiveIndicatorText;
  webShowNewAutonavCountdown: boolean;
  webShowBigThumbnailEndscreen: boolean;
  shortViewCountText: ShortViewCountText;
  countDownSecsForFullscreen: number;
}

export interface PlayerOverlayAutoplayRendererThumbnailOverlay {
  thumbnailOverlayTimeStatusRenderer: PurpleThumbnailOverlayTimeStatusRenderer;
}

export interface PurpleThumbnailOverlayTimeStatusRenderer {
  text: ShortViewCountText;
  style: ThumbnailOverlayTimeStatusRendererStyle;
}

export enum ThumbnailOverlayTimeStatusRendererStyle {
  Default = "DEFAULT",
  Live = "LIVE",
}

export interface DecoratedPlayerBarRenderer {
  decoratedPlayerBarRenderer: LoadMarkersCommand;
}

export interface EndScreen {
  watchNextEndScreenRenderer: WatchNextEndScreenRenderer;
}

export interface WatchNextEndScreenRenderer {
  results: WatchNextEndScreenRendererResult[];
  title: LiveIndicatorText;
  trackingParams: string;
}

export interface WatchNextEndScreenRendererResult {
  endScreenVideoRenderer?: EndScreenVideoRenderer;
  endScreenPlaylistRenderer?: EndScreenPlaylistRenderer;
}

export interface EndScreenPlaylistRenderer {
  playlistId: string;
  title: LiveIndicatorText;
  thumbnail: BackgroundClass;
  videoCount: string;
  longBylineText: Byline;
  videoCountText: TitleElement;
  navigationEndpoint: EndScreenPlaylistRendererNavigationEndpoint;
  trackingParams: string;
}

export interface EndScreenPlaylistRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: TentacledWatchEndpoint;
}

export interface TentacledWatchEndpoint {
  videoId: string;
  playlistId: string;
  loggingContext: WatchEndpointLoggingContext;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
}

export interface EndScreenVideoRenderer {
  videoId: string;
  thumbnail: BackgroundClass;
  title: ShortViewCountText;
  shortBylineText: Byline;
  navigationEndpoint: EndScreenVideoRendererNavigationEndpoint;
  trackingParams: string;
  shortViewCountText: ShortViewCountTextClass;
  publishedTimeText: LiveIndicatorText;
  thumbnailOverlays: EndScreenVideoRendererThumbnailOverlay[];
  lengthText?: ShortViewCountText;
  lengthInSeconds?: number;
}

export interface EndScreenVideoRendererThumbnailOverlay {
  thumbnailOverlayTimeStatusRenderer?: FluffyThumbnailOverlayTimeStatusRenderer;
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
}

export interface ThumbnailOverlayNowPlayingRenderer {
  text: TitleElement;
}

export interface FluffyThumbnailOverlayTimeStatusRenderer {
  text: ShortViewCountTextClass;
  style: ThumbnailOverlayTimeStatusRendererStyle;
  icon?: Icon;
}

export interface FullscreenQuickActionsBar {
  quickActionsViewModel: QuickActionsViewModel;
}

export interface QuickActionsViewModel {
  quickActionButtons: QuickActionButton[];
}

export interface QuickActionButton {
  likeButtonViewModel?: LikeButtonViewModelLikeButtonViewModel;
  dislikeButtonViewModel?: DislikeButtonViewModelDislikeButtonViewModel;
  toggleButtonViewModel?: QuickActionButtonToggleButtonViewModel;
  buttonViewModel?: QuickActionButtonButtonViewModel;
}

export interface QuickActionButtonButtonViewModel {
  iconName: string;
  onTap: OnTap7;
  accessibilityText: string;
  style: PrimaryButtonStyle;
  trackingParams: string;
  isFullWidth?: boolean;
  type: TypeEnum;
  buttonSize: PurpleButtonSize;
  state?: StateEnum;
  accessibilityId?: string;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
  tooltip?: Tooltip;
}

export interface OnTap7 {
  serialCommand?: FluffySerialCommand;
  innertubeCommand?: InnertubeCommand5;
}

export interface InnertubeCommand5 {
  clickTrackingParams: string;
  openPopupAction: AmbitiousOpenPopupAction;
}

export interface AmbitiousOpenPopupAction {
  popup: CunningPopup;
  popupType: string;
}

export interface CunningPopup {
  menuPopupRenderer: FluffyMenuPopupRenderer;
}

export interface FluffyMenuPopupRenderer {
  items: CunningItem[];
}

export interface QuickActionButtonToggleButtonViewModel {
  defaultButtonViewModel: TentacledDefaultButtonViewModel;
  toggledButtonViewModel: TentacledToggledButtonViewModel;
  trackingParams: string;
  toggledStateEntitySelectorType: string;
}

export interface TentacledDefaultButtonViewModel {
  buttonViewModel: AmbitiousButtonViewModel;
}

export interface AmbitiousButtonViewModel {
  iconName: string;
  onTap: OnTap8;
  accessibilityText: string;
  style: PrimaryButtonStyle;
  trackingParams: string;
  type: TypeEnum;
  buttonSize: PurpleButtonSize;
  state: StateEnum;
  enableIconButton: boolean;
  tooltipData?: TooltipData;
  isFullWidth?: boolean;
  accessibilityId?: string;
}

export interface OnTap8 {
  innertubeCommand?: InnertubeCommand6;
  serialCommand?: IndecentSerialCommand;
}

export interface InnertubeCommand6 {
  clickTrackingParams: string;
  showEngagementPanelEndpoint: InnertubeCommandHideEngagementPanelEndpoint;
}

export interface IndecentSerialCommand {
  commands: Command7[];
}

export interface Command7 {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: InnertubeCommand1;
}

export interface TentacledToggledButtonViewModel {
  buttonViewModel: CunningButtonViewModel;
}

export interface CunningButtonViewModel {
  iconName: string;
  onTap: OnTap9;
  accessibilityText: string;
  style: PrimaryButtonStyle;
  trackingParams: string;
  type: TypeEnum;
  buttonSize: PurpleButtonSize;
  state: StateEnum;
  enableIconButton: boolean;
  tooltipData?: TooltipData;
  isFullWidth?: boolean;
  accessibilityId?: string;
}

export interface OnTap9 {
  innertubeCommand?: InnertubeCommand7;
  serialCommand?: HilariousSerialCommand;
}

export interface InnertubeCommand7 {
  clickTrackingParams: string;
  hideEngagementPanelEndpoint: InnertubeCommandHideEngagementPanelEndpoint;
}

export interface HilariousSerialCommand {
  commands: Command8[];
}

export interface Command8 {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: InnertubeCommand8;
}

export interface InnertubeCommand8 {
  clickTrackingParams: string;
  setLiveChatCollapsedStateAction: SetLiveChatCollapsedStateAction;
}

export interface SetLiveChatCollapsedStateAction {
  collapsed: boolean;
}

export interface SpeedmasterUserEdu {
  speedmasterEduViewModel: SpeedmasterEduViewModel;
}

export interface SpeedmasterEduViewModel {
  bodyText: BodyText;
}

export interface PlayerOverlayRendererVideoDetails {
  playerOverlayVideoDetailsRenderer: PlayerOverlayVideoDetailsRenderer;
}

export interface PlayerOverlayVideoDetailsRenderer {
  title: LiveIndicatorText;
  subtitle: TitleElement;
  channelAvatar: ChannelAvatar;
  onTap: PlayerOverlayVideoDetailsRendererOnTap;
}

export interface ChannelAvatar {
  avatarViewModel: ChannelAvatarAvatarViewModel;
}

export interface ChannelAvatarAvatarViewModel {
  image: VideoAttributeViewModelImage;
  avatarImageSize: string;
}

export interface PlayerOverlayVideoDetailsRendererOnTap {
  clickTrackingParams: string;
  showEngagementPanelEndpoint: OnTapShowEngagementPanelEndpoint;
}

export interface InitialDataResponseContext {
  serviceTrackingParams: ServiceTrackingParam[];
  maxAgeSeconds?: number;
  mainAppWebResponseContext: MainAppWebResponseContext;
  webResponseContextExtensionData: PurpleWebResponseContextExtensionData;
}

export interface MainAppWebResponseContext {
  datasyncId: string;
  loggedOut: boolean;
  trackingParam: string;
}

export interface ServiceTrackingParam {
  service: Service;
  params: Param[];
}

export enum Service {
  CSI = "CSI",
  Ecatcher = "ECATCHER",
  Gfeedback = "GFEEDBACK",
  GoogleHelp = "GOOGLE_HELP",
  GuidedHelp = "GUIDED_HELP",
}

export interface PurpleWebResponseContextExtensionData {
  webResponseContextPreloadData: WebResponseContextPreloadData;
  ytConfigData: YtConfigData;
  hasDecorated: boolean;
  webPrefetchData?: WebPrefetchData;
}

export interface WebPrefetchData {
  navigationEndpoints: NavigationEndpointElement[];
}

export interface WebResponseContextPreloadData {
  preloadMessageNames: string[];
}

export interface YtConfigData {
  visitorData: string;
  sessionIndex: number;
  rootVisualElementType: number;
}

export interface Topbar {
  desktopTopbarRenderer: DesktopTopbarRenderer;
}

export interface DesktopTopbarRenderer {
  logo: DesktopTopbarRendererLogo;
  searchbox: Searchbox;
  trackingParams: string;
  countryCode: string;
  topbarButtons: TopbarButton[];
  hotkeyDialog: HotkeyDialog;
  backButton: BackButtonClass;
  forwardButton: BackButtonClass;
  a11ySkipNavigationButton: A11YSkipNavigationButton;
  voiceSearchButton: VoiceSearchButtonClass;
}

export interface BackButtonClass {
  buttonRenderer: BackButtonButtonRenderer;
}

export interface BackButtonButtonRenderer {
  trackingParams: string;
  command: OnResponseReceivedEndpoint;
}

export interface HotkeyDialog {
  hotkeyDialogRenderer: HotkeyDialogRenderer;
}

export interface HotkeyDialogRenderer {
  title: TitleElement;
  sections: HotkeyDialogRendererSection[];
  dismissButton: A11YSkipNavigationButton;
  trackingParams: string;
}

export interface HotkeyDialogRendererSection {
  hotkeyDialogSectionRenderer: HotkeyDialogSectionRenderer;
}

export interface HotkeyDialogSectionRenderer {
  title: TitleElement;
  options: Option[];
}

export interface Option {
  hotkeyDialogSectionOptionRenderer: HotkeyDialogSectionOptionRenderer;
}

export interface HotkeyDialogSectionOptionRenderer {
  label: TitleElement;
  hotkey: string;
  hotkeyAccessibilityLabel?: DisabledAccessibilityData;
}

export interface DesktopTopbarRendererLogo {
  topbarLogoRenderer: TopbarLogoRenderer;
}

export interface TopbarLogoRenderer {
  iconImage: Icon;
  tooltipText: TitleElement;
  endpoint: InnertubeCommandClass;
  trackingParams: string;
  overrideEntityKey: string;
}

export interface Searchbox {
  fusionSearchboxRenderer: FusionSearchboxRenderer;
}

export interface FusionSearchboxRenderer {
  icon: Icon;
  placeholderText: TitleElement;
  config: FusionSearchboxRendererConfig;
  trackingParams: string;
  searchEndpoint: FusionSearchboxRendererSearchEndpoint;
  clearButton: ClearButtonClass;
  showImageSourceDialog: ShowImageSourceDialog;
}

export interface FusionSearchboxRendererConfig {
  webSearchboxConfig: WebSearchboxConfig;
}

export interface WebSearchboxConfig {
  requestLanguage: string;
  requestDomain: string;
  hasOnscreenKeyboard: boolean;
  focusSearchbox: boolean;
}

export interface FusionSearchboxRendererSearchEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  searchEndpoint: SearchEndpointSearchEndpoint;
}

export interface SearchEndpointSearchEndpoint {
  query: string;
}

export interface ShowImageSourceDialog {
  clickTrackingParams: string;
  showDialogCommand: ShowImageSourceDialogShowDialogCommand;
}

export interface ShowImageSourceDialogShowDialogCommand {
  panelLoadingStrategy: IndecentPanelLoadingStrategy;
}

export interface IndecentPanelLoadingStrategy {
  inlineContent: IndigoInlineContent;
}

export interface IndigoInlineContent {
  dialogViewModel: DialogViewModel;
}

export interface DialogViewModel {
  header: DialogViewModelHeader;
  footer: Footer;
  content: DialogViewModelContent;
}

export interface DialogViewModelContent {
  basicContentViewModel: BasicContentViewModel;
}

export interface BasicContentViewModel {
  paragraphs: Paragraph[];
}

export interface Footer {
  panelFooterViewModel: PanelFooterViewModel;
}

export interface PanelFooterViewModel {
  primaryButton: AryButton;
  secondaryButton: AryButton;
  shouldHideDivider: boolean;
}

export interface AryButton {
  buttonViewModel: PrimaryButtonButtonViewModel;
}

export interface PrimaryButtonButtonViewModel {
  title: string;
  style: PurpleStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: string;
}

export interface DialogViewModelHeader {
  dialogHeaderViewModel: DialogHeaderViewModel;
}

export interface DialogHeaderViewModel {
  headline: BodyText;
}

export interface TopbarButton {
  buttonRenderer?: SaveButtonButtonRenderer;
  notificationTopbarButtonRenderer?: NotificationTopbarButtonRenderer;
  topbarMenuButtonRenderer?: TopbarMenuButtonRenderer;
}

export interface NotificationTopbarButtonRenderer {
  icon: Icon;
  menuRequest: NotificationTopbarButtonRendererMenuRequest;
  style: string;
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
  tooltip: string;
  updateUnseenCountEndpoint: UpdateUnseenCountEndpoint;
  notificationCount: number;
  handlerDatas: string[];
}

export interface NotificationTopbarButtonRendererMenuRequest {
  clickTrackingParams: string;
  commandMetadata: OnResponseReceivedEndpointCommandMetadata;
  signalServiceEndpoint: MenuRequestSignalServiceEndpoint;
}

export interface MenuRequestSignalServiceEndpoint {
  signal: string;
  actions: Action3[];
}

export interface Action3 {
  clickTrackingParams: string;
  openPopupAction: CunningOpenPopupAction;
}

export interface CunningOpenPopupAction {
  popup: MagentaPopup;
  popupType: string;
  beReused: boolean;
}

export interface MagentaPopup {
  multiPageMenuRenderer: FluffyMultiPageMenuRenderer;
}

export interface FluffyMultiPageMenuRenderer {
  trackingParams: string;
  style: string;
  showLoadingSpinner: boolean;
}

export interface UpdateUnseenCountEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  signalServiceEndpoint: Signal;
}

export interface TopbarMenuButtonRenderer {
  avatar: AuthorThumbnailClass;
  menuRequest: TopbarMenuButtonRendererMenuRequest;
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
  tooltip: string;
}

export interface TopbarMenuButtonRendererMenuRequest {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  signalServiceEndpoint: MenuRequestSignalServiceEndpoint;
}

export interface InitialPlayerResponse {
  responseContext: InitialPlayerResponseResponseContext;
  playabilityStatus: PlayabilityStatus;
  streamingData?: StreamingData;
  heartbeatParams?: HeartbeatParams;
  playbackTracking?: PlaybackTracking;
  videoDetails: InitialPlayerResponseVideoDetails;
  playerConfig?: PlayerConfig;
  storyboards?: Storyboards;
  microformat: InitialPlayerResponseMicroformat;
  cards?: Cards;
  trackingParams: string;
  auxiliaryUi: AuxiliaryUI;
  adBreakHeartbeatParams: string;
  frameworkUpdates: FrameworkUpdates;
  captions?: Captions;
}

export interface AuxiliaryUI {
  messageRenderers: MessageRenderers;
}

export interface MessageRenderers {
  bkaEnforcementMessageViewModel: BkaEnforcementMessageViewModel;
}

export interface BkaEnforcementMessageViewModel {
  title: ThumbnailHoverOverlayViewModelTitle;
  primaryButton: PrimaryButton;
  secondaryButton: SecondaryButton;
  logo: LogoDarkClass;
  feedbackMessage: FeedbackMessage;
  trackingParams: string;
  bulletList: BulletList;
  logoDark: LogoDarkClass;
  impressionEndpoints: ImpressionEndpoint[];
  displayType: string;
  isVisible: boolean;
}

export interface BulletList {
  bulletListItems: BulletListItem[];
}

export interface BulletListItem {
  title: ThumbnailHoverOverlayViewModelTitle;
}

export interface FeedbackMessage {
  content: string;
  commandRuns: FeedbackMessageCommandRun[];
  styleRuns: FeedbackMessageStyleRun[];
}

export interface FeedbackMessageCommandRun {
  startIndex: number;
  length: number;
  onTap: OnTap10;
}

export interface OnTap10 {
  innertubeCommand: InnertubeCommand9;
}

export interface InnertubeCommand9 {
  clickTrackingParams: string;
  sendFeedbackAction: SendFeedbackAction;
}

export interface SendFeedbackAction {
  bucket: string;
  productId: string;
  enableAnonymousFeedback: boolean;
}

export interface FeedbackMessageStyleRun {
  startIndex: number;
  length: number;
  fontColor?: number;
}

export interface PrimaryButton {
  title: string;
  onTap: PrimaryButtonOnTap;
  accessibilityText: string;
  style: PrimaryButtonStyle;
  trackingParams: string;
  type: string;
  buttonSize: PrimaryButtonButtonSize;
  state: StateEnum;
  iconTrailing: boolean;
}

export interface PrimaryButtonOnTap {
  parallelCommand: PurpleParallelCommand;
}

export interface PurpleParallelCommand {
  commands: ImpressionEndpoint[];
}

export interface SecondaryButton {
  title: string;
  onTap: SecondaryButtonOnTap;
  accessibilityText: string;
  style: PrimaryButtonStyle;
  trackingParams: string;
  type: TypeEnum;
  buttonSize: PrimaryButtonButtonSize;
  state: StateEnum;
  iconTrailing: boolean;
}

export interface SecondaryButtonOnTap {
  parallelCommand: FluffyParallelCommand;
}

export interface FluffyParallelCommand {
  commands: ParallelCommandCommand[];
}

export interface ParallelCommandCommand {
  innertubeCommand: InnertubeCommand10;
}

export interface InnertubeCommand10 {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  feedbackEndpoint?: CommandFeedbackEndpoint;
  browseEndpoint?: EndpointBrowseEndpoint;
}

export interface Captions {
  playerCaptionsTracklistRenderer: PlayerCaptionsTracklistRenderer;
}

export interface PlayerCaptionsTracklistRenderer {
  captionTracks: CaptionTrack[];
  audioTracks: AudioTrack[];
  translationLanguages: TranslationLanguage[];
  defaultAudioTrackIndex: number;
}

export interface AudioTrack {
  captionTrackIndices: number[];
}

export interface CaptionTrack {
  baseUrl: string;
  name: LiveIndicatorText;
  vssId: string;
  languageCode: string;
  kind: string;
  isTranslatable: boolean;
  trackName: string;
}

export interface TranslationLanguage {
  languageCode: string;
  languageName: LiveIndicatorText;
}

export interface Cards {
  cardCollectionRenderer: CardCollectionRenderer;
}

export interface CardCollectionRenderer {
  cards: CardCollectionRendererCard[];
  headerText: LiveIndicatorText;
  icon: CloseButton;
  closeButton: CloseButton;
  trackingParams: string;
  allowTeaserDismiss: boolean;
  logIconVisibilityUpdates: boolean;
}

export interface CardCollectionRendererCard {
  cardRenderer: CardRenderer;
}

export interface CardRenderer {
  teaser: Teaser;
  cueRanges: CueRange[];
  trackingParams: string;
}

export interface CueRange {
  startCardActiveMs: string;
  endCardActiveMs: string;
  teaserDurationMs: string;
  iconAfterTeaserMs: string;
}

export interface Teaser {
  simpleCardTeaserRenderer: SimpleCardTeaserRenderer;
}

export interface SimpleCardTeaserRenderer {
  message: LiveIndicatorText;
  trackingParams: string;
  prominent: boolean;
  logVisibilityUpdates: boolean;
  onTapCommand: ShowLessCommandClass;
}

export interface CloseButton {
  infoCardIconRenderer: InfoCardIconRenderer;
}

export interface HeartbeatParams {
  intervalMilliseconds?: string;
  softFailOnError: boolean;
  heartbeatServerData: string;
  heartbeatAttestationConfig?: HeartbeatAttestationConfig;
}

export interface HeartbeatAttestationConfig {
  requiresAttestation: boolean;
}

export interface InitialPlayerResponseMicroformat {
  playerMicroformatRenderer: PlayerMicroformatRenderer;
}

export interface PlayerMicroformatRenderer {
  thumbnail: BackgroundClass;
  embed: Embed;
  title: LiveIndicatorText;
  description: LiveIndicatorText;
  ownerProfileUrl: string;
  externalChannelId: ID;
  isFamilySafe: boolean;
  availableCountries: string[];
  isUnlisted: boolean;
  hasYpcMetadata: boolean;
  viewCount: string;
  category: string;
  publishDate: Date;
  ownerChannelName: string;
  liveBroadcastDetails?: LiveBroadcastDetails;
  uploadDate: Date;
  isShortsEligible: boolean;
  externalVideoId: string;
  likeCount: string;
  canonicalUrl: string;
  lengthSeconds?: string;
}

export interface Embed {
  iframeUrl: string;
  width: number;
  height: number;
}

export interface LiveBroadcastDetails {
  isLiveNow: boolean;
  startTimestamp: Date;
  endTimestamp?: Date;
}

export interface PlayabilityStatus {
  status: string;
  playableInEmbed: boolean;
  offlineability?: Offlineability;
  liveStreamability?: LiveStreamability;
  miniplayer: Miniplayer;
  contextParams: string;
  reason?: string;
}

export interface LiveStreamability {
  liveStreamabilityRenderer: LiveStreamabilityRenderer;
}

export interface LiveStreamabilityRenderer {
  videoId: string;
  broadcastId?: string;
  pollDelayMs: string;
  offlineSlate?: OfflineSlate;
}

export interface OfflineSlate {
  liveStreamOfflineSlateRenderer: LiveStreamOfflineSlateRenderer;
}

export interface LiveStreamOfflineSlateRenderer {
  scheduledStartTime: string;
  mainText: TitleElement;
  subtitleText: LiveIndicatorText;
  thumbnail: BackgroundClass;
  actionButtons: ActionButton[];
  offlineSlateStyle: string;
}

export interface ActionButton {
  toggleButtonRenderer: ActionButtonToggleButtonRenderer;
}

export interface ActionButtonToggleButtonRenderer {
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: Icon;
  defaultText: LiveIndicatorText;
  defaultServiceEndpoint: DefaultServiceEndpoint;
  toggledIcon: Icon;
  toggledText: LiveIndicatorText;
  toggledServiceEndpoint: ToggledServiceEndpoint;
  trackingParams: string;
}

export interface DefaultServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  addUpcomingEventReminderEndpoint: YpcGetOffersEndpoint;
}

export interface ToggledServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  removeUpcomingEventReminderEndpoint: YpcGetOffersEndpoint;
}

export interface Miniplayer {
  miniplayerRenderer: MiniplayerRenderer;
}

export interface MiniplayerRenderer {
  playbackMode: string;
}

export interface Offlineability {
  offlineabilityRenderer: OfflineabilityRenderer;
}

export interface OfflineabilityRenderer {
  offlineable: boolean;
  infoRenderer: InfoRenderer;
  clickTrackingParams: string;
}

export interface InfoRenderer {
  dismissableDialogRenderer: DismissableDialogRenderer;
}

export interface DismissableDialogRenderer {
  dialogMessage: string;
  trackingParams: string;
  title: string;
}

export interface PlaybackTracking {
  videostatsPlaybackUrl: URL;
  videostatsDelayplayUrl: URL;
  videostatsWatchtimeUrl: URL;
  ptrackingUrl: URL;
  qoeUrl: URL;
  atrUrl: AtrURL;
  videostatsScheduledFlushWalltimeSeconds: number[];
  videostatsDefaultFlushIntervalSeconds: number;
}

export interface AtrURL {
  baseUrl: string;
  elapsedMediaTimeSeconds: number;
}

export interface PlayerConfig {
  granularVariableSpeedConfig: GranularVariableSpeedConfig;
  vssClientConfig: VssClientConfig;
  audioConfig: AudioConfig;
  streamSelectionConfig: StreamSelectionConfig;
  livePlayerConfig?: LivePlayerConfig;
  daiConfig: DaiConfig;
  mediaCommonConfig: MediaCommonConfig;
  webPlayerConfig: WebPlayerConfig;
}

export interface AudioConfig {
  enablePerFormatLoudness: boolean;
  loudnessTargetLkfs: number;
  loudnessDb?: number;
  perceptualLoudnessDb?: number;
  trackAbsoluteLoudnessLkfs?: number;
}

export interface DaiConfig {
  allowUstreamerRequestAdconfig: boolean;
  sendSsdaiMissingAdBreakReasons: boolean;
}

export interface GranularVariableSpeedConfig {
  minimumPlaybackRate: number;
  maximumPlaybackRate: number;
  stepSize: number;
  defaultPlaybackRateOptions: DefaultPlaybackRateOption[];
}

export interface DefaultPlaybackRateOption {
  label: string;
  value: number;
  isPremiumUpsell: boolean;
  priority: number;
}

export interface LivePlayerConfig {
  liveReadaheadSeconds: number;
  hasSubfragmentedFmp4: boolean;
  isLiveHeadPlayable: boolean;
}

export interface MediaCommonConfig {
  dynamicReadaheadConfig: DynamicReadaheadConfig;
  mediaUstreamerRequestConfig: MediaUstreamerRequestConfig;
  useServerDrivenAbr: boolean;
  serverPlaybackStartConfig: ServerPlaybackStartConfig;
  enableServerDrivenRequestCancellation?: boolean;
  platypusUseEnvoyNetFetch: boolean;
  fixLivePlaybackModelDefaultPosition: boolean;
}

export interface DynamicReadaheadConfig {
  maxReadAheadMediaTimeMs: number;
  minReadAheadMediaTimeMs: number;
  readAheadGrowthRateMs: number;
}

export interface MediaUstreamerRequestConfig {
  videoPlaybackUstreamerConfig: string;
}

export interface ServerPlaybackStartConfig {
  enable: boolean;
  playbackStartPolicy: PlaybackStartPolicy;
}

export interface PlaybackStartPolicy {
  startMinReadaheadPolicy: StartMinReadaheadPolicy[];
}

export interface StartMinReadaheadPolicy {
  minReadaheadMs: number;
}

export interface StreamSelectionConfig {
  maxBitrate: string;
}

export interface VssClientConfig {
  vssUsePostRequest: boolean;
}

export interface WebPlayerConfig {
  useCobaltTvosDash: boolean;
  webPlayerActionsPorting: WebPlayerActionsPorting;
}

export interface WebPlayerActionsPorting {
  getSharePanelCommand: GetSharePanelCommand;
  subscribeCommand: SubscribeCommand;
  unsubscribeCommand: UnsubscribeCommand;
  addToWatchLaterCommand: AddToWatchLaterCommand;
  removeFromWatchLaterCommand: RemoveFromWatchLaterCommandClass;
}

export interface AddToWatchLaterCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  playlistEditEndpoint: ServiceEndpointPlaylistEditEndpoint;
}

export interface GetSharePanelCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  webPlayerShareEntityServiceEndpoint: WebPlayerShareEntityServiceEndpoint;
}

export interface WebPlayerShareEntityServiceEndpoint {
  serializedShareEntity: string;
}

export interface InitialPlayerResponseResponseContext {
  serviceTrackingParams: ServiceTrackingParam[];
  maxAgeSeconds: number;
  mainAppWebResponseContext: MainAppWebResponseContext;
  webResponseContextExtensionData: FluffyWebResponseContextExtensionData;
}

export interface FluffyWebResponseContextExtensionData {
  webResponseContextPreloadData: WebResponseContextPreloadData;
  hasDecorated: boolean;
}

export interface Storyboards {
  playerLiveStoryboardSpecRenderer?: PlayerLiveStoryboardSpecRenderer;
  playerStoryboardSpecRenderer?: PlayerStoryboardSpecRenderer;
}

export interface PlayerLiveStoryboardSpecRenderer {
  spec: string;
}

export interface PlayerStoryboardSpecRenderer {
  spec: string;
  recommendedLevel: number;
  fineScrubbingRecommendedLevel: number;
  highResolutionRecommendedLevel: number;
}

export interface StreamingData {
  expiresInSeconds: string;
  adaptiveFormats: AdaptiveFormat[];
  dashManifestUrl?: string;
  hlsManifestUrl?: string;
  serverAbrStreamingUrl: string;
  formats?: Format[];
}

export interface AdaptiveFormat {
  itag: number;
  url?: string;
  mimeType: string;
  bitrate: number;
  width?: number;
  height?: number;
  quality: Quality;
  fps?: number;
  qualityLabel?: string;
  projectionType: ProjectionType;
  targetDurationSec?: number;
  maxDvrDurationSec?: number;
  qualityOrdinal: string;
  highReplication?: boolean;
  audioQuality?: AudioQuality;
  audioSampleRate?: string;
  audioChannels?: number;
  initRange?: Range;
  indexRange?: Range;
  lastModified?: string;
  contentLength?: string;
  averageBitrate?: number;
  colorInfo?: ColorInfo;
  approxDurationMs?: string;
  loudnessDb?: number;
  trackAbsoluteLoudnessLkfs?: number;
  xtags?: Xtags;
  isDrc?: boolean;
  isVb?: boolean;
}

export enum AudioQuality {
  AudioQualityLow = "AUDIO_QUALITY_LOW",
  AudioQualityMedium = "AUDIO_QUALITY_MEDIUM",
}

export interface ColorInfo {
  primaries: Primaries;
  transferCharacteristics: TransferCharacteristics;
  matrixCoefficients: MatrixCoefficients;
}

export enum MatrixCoefficients {
  ColorMatrixCoefficientsBt709 = "COLOR_MATRIX_COEFFICIENTS_BT709",
}

export enum Primaries {
  ColorPrimariesBt709 = "COLOR_PRIMARIES_BT709",
}

export enum TransferCharacteristics {
  ColorTransferCharacteristicsBt709 = "COLOR_TRANSFER_CHARACTERISTICS_BT709",
}

export interface Range {
  start: string;
  end: string;
}

export enum ProjectionType {
  Rectangular = "RECTANGULAR",
}

export enum Quality {
  Hd1080 = "hd1080",
  Hd1440 = "hd1440",
  Hd720 = "hd720",
  Large = "large",
  Medium = "medium",
  Small = "small",
  Tiny = "tiny",
}

export enum Xtags {
  CgcKAnZiEgEx = "CgcKAnZiEgEx",
  CggKA2RyYxIBMQ = "CggKA2RyYxIBMQ",
}

export interface Format {
  itag: number;
  mimeType: string;
  bitrate: number;
  width: number;
  height: number;
  lastModified: string;
  contentLength: string;
  quality: Quality;
  fps: number;
  qualityLabel: string;
  projectionType: ProjectionType;
  averageBitrate: number;
  audioQuality: AudioQuality;
  approxDurationMs: string;
  audioSampleRate: string;
  audioChannels: number;
  signatureCipher: string;
  qualityOrdinal: string;
}

export interface InitialPlayerResponseVideoDetails {
  videoId: string;
  title: string;
  lengthSeconds: string;
  isLive?: boolean;
  channelId: ID;
  isOwnerViewing: boolean;
  shortDescription: string;
  isCrawlable: boolean;
  isLiveDvrEnabled?: boolean;
  thumbnail: BackgroundClass;
  liveChunkReadahead?: number;
  allowRatings: boolean;
  viewCount: string;
  author: string;
  isLowLatencyLiveStream?: boolean;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  latencyClass?: string;
  isLiveContent: boolean;
  isTvfilmVideo: boolean;
  keywords?: string[];
  isUpcoming?: boolean;
}

export interface UpdateViewershipAction {
  updateViewershipAction?: {
    viewCount?: {
      videoViewCountRenderer?: {
        viewCount?: {
          simpleText?: string;
          runs?: Array<{ text: string }>;
        };
        isLive?: boolean;
        extraShortViewCount?: {
          simpleText?: string;
        };
        unlabeledViewCountValue?: {
          simpleText?: string;
        };
        originalViewCount?: string;
      };
    };
  };
}

export interface UpdateDateTextAction {
  updateDateTextAction?: {
    dateText?: {
      simpleText?: string;
      runs?: Array<{ text: string }>;
    };
  };
}

export interface YouTubeUpdateResponse {
  actions?: Array<UpdateViewershipAction | UpdateDateTextAction>;
}
