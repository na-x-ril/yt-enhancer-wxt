export interface InitialData {
  responseContext: InitialDataResponseContext;
  contents: Contents;
  currentVideoEndpoint: CurrentVideoEndpoint;
  trackingParams: string;
  playerOverlays: PlayerOverlays;
  onResponseReceivedEndpoints: OnResponseReceivedEndpoint[];
  engagementPanels: EngagementPanel[];
  topbar: Topbar;
  pageVisualEffects: PageVisualEffect[];
  frameworkUpdates: InitialDataFrameworkUpdates;
  microformat?: InitialDataMicroformat;
}

export interface Contents {
  twoColumnWatchNextResults: TwoColumnWatchNextResults;
}

export interface TwoColumnWatchNextResults {
  results: TwoColumnWatchNextResultsResults;
  secondaryResults: TwoColumnWatchNextResultsSecondaryResults;
  autoplay: TwoColumnWatchNextResultsAutoplay;
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

export interface NavigationEndpointElement {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: AutoplayVideoWatchEndpoint;
}

export interface AutoplayVideoCommandMetadata {
  webCommandMetadata: PurpleWebCommandMetadata;
}

export interface PurpleWebCommandMetadata {
  url?: string;
  webPageType?: WebPageType;
  rootVe?: number;
  apiUrl?: APIURL;
  sendPost?: boolean;
}

export type APIURL =
  | "/youtubei/v1/browse"
  | "/youtubei/v1/share/get_share_panel"
  | "/youtubei/v1/feedback"
  | "/youtubei/v1/like/dislike"
  | "/youtubei/v1/like/like"
  | "/youtubei/v1/get_survey"
  | "/youtubei/v1/next"
  | "/youtubei/v1/updated_metadata"
  | "/youtubei/v1/like/removelike"
  | "/youtubei/v1/notification/modify_channel_preference"
  | "/youtubei/v1/subscription/unsubscribe"
  | "/youtubei/v1/subscription/subscribe"
  | "/youtubei/v1/playlist/create"
  | "/youtubei/v1/get_transcript"
  | "/youtubei/v1/account/set_setting"
  | "/youtubei/v1/account/account_menu"
  | "/youtubei/v1/browse/edit_playlist"
  | "/youtubei/v1/share/get_web_player_share_panel";

export type WebPageType =
  | "WEB_PAGE_TYPE_WATCH"
  | "WEB_PAGE_TYPE_UNKNOWN"
  | "WEB_PAGE_TYPE_BROWSE"
  | "WEB_PAGE_TYPE_CHANNEL"
  | "WEB_PAGE_TYPE_SEARCH";

export interface AutoplayVideoWatchEndpoint {
  videoId: string;
  params: PurpleParams;
  playerParams: PurplePlayerParams;
  watchEndpointSupportedPrefetchConfig: WatchEndpointSupportedPrefetchConfig;
}

export type PurpleParams = "EAEYAdoBBAgBKgDyBQIKAA%3D%3D";

export type PurplePlayerParams =
  "QAFIAQ%3D%3D" | "QAFIAdIHCQkRA54VBgUm4g%3D%3D";

export interface WatchEndpointSupportedPrefetchConfig {
  prefetchHintConfig: PrefetchHintConfig;
}

export interface PrefetchHintConfig {
  prefetchPriority: number;
  countdownUiRelativeSecondsPrefetchCondition: number;
}

export interface ConversationBar {
  liveChatRenderer: LiveChatRenderer;
}

export interface LiveChatRenderer {
  continuations: ContinuationElement[];
  header: LiveChatRendererHeader;
  trackingParams: string;
  clientMessages: ClientMessages;
  initialDisplayState: string;
  showButton: ShowButtonElement;
  isReplay?: boolean;
}

export interface ClientMessages {
  reconnectMessage: MessageTitle;
  unableToReconnectMessage: MessageTitle;
  fatalError: MessageTitle;
  reconnectedMessage: MessageTitle;
  genericError: MessageTitle;
}

export interface MessageTitle {
  runs: MessageTitleRun[];
}

export interface MessageTitleRun {
  text: string;
}

export interface ContinuationElement {
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
  collapseButton: CancelButton;
  viewSelector: ViewSelector;
}

export interface CancelButton {
  buttonRenderer: NextButtonButtonRenderer;
}

export interface NextButtonButtonRenderer {
  style?: DownloadButtonRendererStyle;
  size?: Size;
  isDisabled?: boolean;
  icon?: IconImageClass;
  accessibility?: Accessibility;
  trackingParams: string;
  command?: PurpleCommand;
  accessibilityData?: DisabledAccessibilityData;
  text?: LiveIndicatorText;
  navigationEndpoint?: PurpleNavigationEndpoint;
}

export interface Accessibility {
  label: string;
}

export interface DisabledAccessibilityData {
  accessibilityData: Accessibility;
}

export interface PurpleCommand {
  clickTrackingParams: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
  hideEngagementPanelEndpoint?: InnertubeCommandHideEngagementPanelEndpoint;
  commandExecutorCommand?: PurpleCommandExecutorCommand;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  getSurveyCommand?: GetSurveyCommand;
}

export interface ChangeEngagementPanelVisibilityAction {
  targetId: PanelIdentifier;
  visibility: VisibilityEnum;
}

export type PanelIdentifier =
  | "engagement-panel-structured-description"
  | "engagement-panel-macro-markers-description-chapters"
  | "engagement-panel-searchable-transcript"
  | "engagement-panel-error-corrections"
  | "engagement-panel-comments-section";

export type VisibilityEnum =
  "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN" | "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED";

export interface PurpleCommandExecutorCommand {
  commands: FluffyCommand[];
}

export interface FluffyCommand {
  clickTrackingParams: string;
  hideEngagementPanelEndpoint?: OnTapShowEngagementPanelEndpoint;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  updateToggleButtonStateCommand?: UpdateToggleButtonStateCommand;
}

export interface OnTapShowEngagementPanelEndpoint {
  identifier: PanelIdentifierClass;
}

export interface PanelIdentifierClass {
  tag: PanelIdentifierTag;
}

export type PanelIdentifierTag =
  | "PAabuse_report"
  | "engagement-panel-timeline-view-consolidated"
  | "engagement-panel-structured-description";

export interface UpdateTimedMarkersSyncObserverCommand {
  isEnabled: boolean;
  timedSyncEntityKey: TimedSyncEntityKey;
  panelSyncEntityKey: PanelSyncEntityKey;
}

export type PanelSyncEntityKey =
  | "Eh10aW1lbGluZV92aWV3X3N5bmNfZW50aXR5X2tleSDEASgB"
  | "EiZtb2Rlcm5fdHJhbnNjcmlwdF92aWV3X3N5bmNfZW50aXR5X2tleSDEASgB";

export type TimedSyncEntityKey =
  | "Eh10aW1lbGluZV92aWV3X3N5bmNfZW50aXR5X2tleSD-ASgB"
  | "EiZtb2Rlcm5fdHJhbnNjcmlwdF92aWV3X3N5bmNfZW50aXR5X2tleSD-ASgB";

export interface UpdateToggleButtonStateCommand {
  toggled: boolean;
  buttonId: string;
}

export interface ContinuationEndpointCommandMetadata {
  webCommandMetadata: FluffyWebCommandMetadata;
}

export interface FluffyWebCommandMetadata {
  sendPost: boolean;
  apiUrl?: APIURL;
}

export interface GetSurveyCommand {
  endpoint: GetSurveyCommandEndpoint;
  action: string;
}

export interface GetSurveyCommandEndpoint {
  watch: AdsEngagementPanelContentRenderer;
}

export interface AdsEngagementPanelContentRenderer {
  hack: boolean;
}

export interface InnertubeCommandHideEngagementPanelEndpoint {
  panelIdentifier: PanelIdentifier;
}

export interface CommandSignalServiceEndpoint {
  signal: Signal;
  actions: PurpleAction[];
}

export interface PurpleAction {
  clickTrackingParams: string;
  signalAction: SignalAction;
}

export interface SignalAction {
  signal: string;
}

export type Signal = "CLIENT_SIGNAL";

export interface IconImageClass {
  iconType: string;
}

export interface PurpleNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: PurpleWatchEndpoint;
}

export interface PurpleWatchEndpoint {
  videoId: string;
  params: FluffyParams;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
}

export type FluffyParams = "wAEBuAUB" | "8gUCCgA%3D";

export interface WatchEndpointSupportedOnesieConfig {
  html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig;
}

export interface Html5PlaybackOnesieConfig {
  commonConfig: CommonConfig;
}

export interface CommonConfig {
  url: string;
}

export type Size = "SIZE_DEFAULT";

export type DownloadButtonRendererStyle =
  | "STYLE_DEFAULT"
  | "STYLE_TEXT"
  | "STYLE_BLUE_TEXT"
  | "STYLE_SUGGESTIVE"
  | "STYLE_MONO_FILLED"
  | "STYLE_MONO_TONAL";

export interface LiveIndicatorText {
  simpleText: string;
}

export interface OverflowMenu {
  menuRenderer: OverflowMenuMenuRenderer;
}

export interface OverflowMenuMenuRenderer {
  items: PurpleItem[];
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
}

export interface PurpleItem {
  menuServiceItemRenderer?: MenuItemRenderer;
  menuNavigationItemRenderer?: MenuItemRenderer;
}

export interface MenuItemRenderer {
  text: MessageTitle;
  icon: IconImageClass;
  navigationEndpoint?: MenuNavigationItemRendererNavigationEndpoint;
  trackingParams: string;
  serviceEndpoint?: MenuNavigationItemRendererServiceEndpoint;
}

export interface MenuNavigationItemRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: PurpleCommandMetadata;
  userFeedbackEndpoint?: NavigationEndpointUserFeedbackEndpoint;
  signInEndpoint?: InnertubeCommandSignInEndpoint;
}

export interface PurpleCommandMetadata {
  webCommandMetadata: TentacledWebCommandMetadata;
}

export interface TentacledWebCommandMetadata {
  ignoreNavigation?: boolean;
  url?: string;
  webPageType?: WebPageType;
  rootVe?: number;
}

export interface InnertubeCommandSignInEndpoint {
  nextEndpoint: PurpleNextEndpoint;
}

export interface PurpleNextEndpoint {
  clickTrackingParams: string;
  showSheetCommand: NextEndpointShowSheetCommand;
}

export interface NextEndpointShowSheetCommand {
  panelLoadingStrategy: PurplePanelLoadingStrategy;
}

export interface PurplePanelLoadingStrategy {
  requestTemplate: RequestTemplate;
}

export interface RequestTemplate {
  panelId: PanelID;
  params: string;
}

export type PanelID = "PApremium_upsell" | "PAadd_to_playlist";

export interface NavigationEndpointUserFeedbackEndpoint {
  hack: boolean;
  bucketIdentifier: string;
}

export interface MenuNavigationItemRendererServiceEndpoint {
  clickTrackingParams: string;
  showLiveChatParticipantsEndpoint?: AdsEngagementPanelContentRenderer;
  popoutLiveChatEndpoint?: CommonConfig;
  commandMetadata?: FluffyCommandMetadata;
  modalEndpoint?: ServiceEndpointModalEndpoint;
  showEngagementPanelEndpoint?: ServiceEndpointShowEngagementPanelEndpoint;
}

export interface FluffyCommandMetadata {
  webCommandMetadata: StickyWebCommandMetadata;
}

export interface StickyWebCommandMetadata {
  ignoreNavigation: boolean;
}

export interface ServiceEndpointModalEndpoint {
  modal: PurpleModal;
}

export interface PurpleModal {
  modalWithTitleAndButtonRenderer: PurpleModalWithTitleAndButtonRenderer;
}

export interface PurpleModalWithTitleAndButtonRenderer {
  title: MessageTitle;
  content: MessageTitle;
  button: ShowButtonElement;
}

export interface ShowButtonElement {
  buttonRenderer: ShowButtonButtonRenderer;
}

export interface ShowButtonButtonRenderer {
  style: PurpleStyle;
  size: Size;
  isDisabled: boolean;
  text: LiveIndicatorText;
  trackingParams: string;
  navigationEndpoint?: FluffyNavigationEndpoint;
  command?: TentacledCommand;
}

export interface TentacledCommand {
  clickTrackingParams: string;
  commandMetadata: FluffyCommandMetadata;
  userFeedbackEndpoint: CommandUserFeedbackEndpoint;
}

export interface CommandUserFeedbackEndpoint {
  additionalDatas: AdditionalData[];
  bucketIdentifier: string;
}

export interface AdditionalData {
  userFeedbackEndpointProductSpecificValueData: Param;
}

export interface Param {
  key: string;
  value: string;
}

export interface FluffyNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  signInEndpoint: PurpleSignInEndpoint;
}

export interface PurpleSignInEndpoint {
  nextEndpoint?: FluffyNextEndpoint;
  idamTag?: string;
  hack?: boolean;
  continueAction?: string;
}

export interface FluffyNextEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint?: NextEndpointWatchEndpoint;
  likeEndpoint?: NextEndpointLikeEndpoint;
}

export interface NextEndpointLikeEndpoint {
  status: IconNameEnum;
  target: TargetClass;
  dislikeParams?: string;
  likeParams?: string;
}

export type IconNameEnum = "DISLIKE" | "LIKE";

export interface TargetClass {
  videoId: VideoID;
}

export type VideoID =
  | "CD0anTgxEJc"
  | "l-GDQJHuvu0"
  | "m-bz5mV0a4U"
  | "hlO4qb_v6hM"
  | "dlVjn_Aw-eU"
  | "zelymST8P2U";

export interface NextEndpointWatchEndpoint {
  videoId: string;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
  playerParams?: string;
  ustreamerConfig?: UstreamerConfig;
}

export type UstreamerConfig = "KgkKBxIFZW4tVVM=" | "KgYKBBICZW4=";

export type PurpleStyle =
  | "STYLE_DEFAULT"
  | "STYLE_MONO_FILLED"
  | "STYLE_BRAND"
  | "STYLE_INACTIVE_OUTLINE";

export interface ServiceEndpointShowEngagementPanelEndpoint {
  identifier: PanelIdentifierClass;
  globalConfiguration: GetTranscriptEndpoint;
  engagementPanelPresentationConfigs: EngagementPanelPresentationConfigs;
}

export interface EngagementPanelPresentationConfigs {
  engagementPanelPopupPresentationConfig: EngagementPanelPopupPresentationConfig;
}

export interface EngagementPanelPopupPresentationConfig {
  popupType: EngagementPanelPopupPresentationConfigPopupType;
}

export type EngagementPanelPopupPresentationConfigPopupType =
  "PANEL_POPUP_TYPE_DIALOG";

export interface GetTranscriptEndpoint {
  params: string;
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
  continuation?: ContinuationElement;
  accessibility: DisabledAccessibilityData;
  subtitle: string;
  trackingParams: string;
  serviceEndpoint?: SubMenuItemServiceEndpoint;
}

export interface SubMenuItemServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  continuationCommand: ServiceEndpointContinuationCommand;
}

export interface ServiceEndpointContinuationCommand {
  token: string;
  request: Request;
  command: ContinuationCommandCommand;
}

export interface ContinuationCommandCommand {
  clickTrackingParams: string;
  showReloadUiCommand: ScrollToEngagementPanelCommandClass;
}

export interface ScrollToEngagementPanelCommandClass {
  targetId: PanelIdentifier;
}

export type Request = "CONTINUATION_REQUEST_TYPE_WATCH_NEXT";

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
  compositeVideoPrimaryInfoRenderer?: ClientForecastingAdRenderer;
  itemSectionRenderer?: PurpleItemSectionRenderer;
}

export interface ClientForecastingAdRenderer {}

export interface PurpleItemSectionRenderer {
  contents: PurpleContent[];
  trackingParams: string;
  header?: ItemSectionRendererHeader;
  sectionIdentifier?: string;
  targetId?: string;
}

export interface PurpleContent {
  videoMetadataCarouselViewModel?: VideoMetadataCarouselViewModel;
  continuationItemRenderer?: PurpleContinuationItemRenderer;
  messageRenderer?: MessageRenderer;
}

export interface PurpleContinuationItemRenderer {
  trigger: string;
  continuationEndpoint: PurpleContinuationEndpoint;
}

export interface PurpleContinuationEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  continuationCommand: ContinuationEndpointContinuationCommand;
}

export interface ContinuationEndpointContinuationCommand {
  token: string;
  request: Request;
}

export interface MessageRenderer {
  text: MessageRendererText;
  trackingParams: string;
}

export interface MessageRendererText {
  runs: PurpleRun[];
}

export interface PurpleRun {
  text: string;
  navigationEndpoint?: TentacledNavigationEndpoint;
}

export interface TentacledNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  urlEndpoint: CommonConfig;
}

export interface VideoMetadataCarouselViewModel {
  carouselTitles: CarouselTitle[];
  carouselItems: CarouselItemElement[];
  teasersOrderEntityKey: string;
}

export interface CarouselItemElement {
  carouselItemViewModel: CarouselItemViewModel;
}

export interface CarouselItemViewModel {
  itemType: string;
  carouselItem: CarouselItemViewModelCarouselItem;
  teaserType: string;
  rendererContext: CarouselItemViewModelRendererContext;
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
  buttonViewModel: PurpleButtonViewModel;
}

export interface PurpleButtonViewModel {
  title: string;
  onTap: TextCarouselItemViewModelOnTap;
  style: FluffyStyle;
  trackingParams: string;
  type: TentacledType;
  buttonSize: PurpleButtonSize;
}

export type PurpleButtonSize =
  "BUTTON_VIEW_MODEL_SIZE_XSMALL" | "BUTTON_VIEW_MODEL_SIZE_DEFAULT";

export interface TextCarouselItemViewModelOnTap {
  innertubeCommand: PurpleInnertubeCommand;
}

export interface PurpleInnertubeCommand {
  clickTrackingParams: string;
  setLiveChatCollapsedStateAction: ClientForecastingAdRenderer;
}

export type FluffyStyle =
  "BUTTON_VIEW_MODEL_STYLE_MONO" | "BUTTON_VIEW_MODEL_STYLE_RAISED";

export type TentacledType =
  | "BUTTON_VIEW_MODEL_TYPE_TONAL"
  | "BUTTON_VIEW_MODEL_TYPE_TEXT"
  | "BUTTON_VIEW_MODEL_TYPE_OUTLINE";

export interface BodyText {
  content: string;
}

export interface CarouselItemViewModelRendererContext {
  loggingContext: PurpleLoggingContext;
}

export interface PurpleLoggingContext {
  loggingDirectives: LoggingDirectives;
}

export interface LoggingDirectives {
  trackingParams: string;
  visibility: VisibilityClass;
}

export interface VisibilityClass {
  types: string;
}

export interface CarouselTitle {
  carouselTitleViewModel: CarouselTitleViewModel;
}

export interface CarouselTitleViewModel {
  title: string;
  previousButton: HeaderButtonClass;
  nextButton: HeaderButtonClass;
  teaserType: string;
}

export interface HeaderButtonClass {
  buttonViewModel: HeaderButtonButtonViewModel;
}

export interface HeaderButtonButtonViewModel {
  iconName: PurpleIconName;
  accessibilityText: OverflowMenuA11YLabelEnum;
  style: FluffyStyle;
  trackingParams: string;
  type: TentacledType;
  buttonSize: PurpleButtonSize;
  state?: StateEnum;
  onTap?: PurpleOnTap;
  loggingDirectives?: LoggingDirectives;
}

export type OverflowMenuA11YLabelEnum =
  "Next" | "Previous" | "More actions" | "Close";

export type PurpleIconName =
  "CHEVRON_RIGHT" | "CHEVRON_LEFT" | "MORE_VERT" | "CLOSE";

export interface PurpleOnTap {
  innertubeCommand: FluffyInnertubeCommand;
}

export interface FluffyInnertubeCommand {
  clickTrackingParams: string;
  showSheetCommand?: InnertubeCommandShowSheetCommand;
  hideEngagementPanelEndpoint?: InnertubeCommandHideEngagementPanelEndpoint;
}

export interface InnertubeCommandShowSheetCommand {
  panelLoadingStrategy: FluffyPanelLoadingStrategy;
}

export interface FluffyPanelLoadingStrategy {
  inlineContent: PurpleInlineContent;
}

export interface PurpleInlineContent {
  sheetViewModel: SheetViewModel;
}

export interface SheetViewModel {
  content: SheetViewModelContent;
}

export interface SheetViewModelContent {
  listViewModel: ContentListViewModel;
}

export interface ContentListViewModel {
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
  loggingContext: PurpleLoggingContext;
  commandContext: PurpleCommandContext;
}

export interface PurpleCommandContext {
  onTap: FluffyOnTap;
}

export interface FluffyOnTap {
  innertubeCommand: ServiceEndpoint;
}

export interface ServiceEndpoint {
  clickTrackingParams: string;
  offlineVideoEndpoint: OfflineVideoEndpoint;
}

export interface OfflineVideoEndpoint {
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
  offlineabilityEntityKey?: string;
  isCrossDeviceDownload: boolean;
}

export type GetDownloadActionCommandParams = "CAEQAA%3D%3D" | "CAIQAA%3D%3D";

export interface PurpleListItemViewModel {
  title: BodyText;
  leadingImage: LeadingImage;
  rendererContext: PurpleRendererContext;
}

export interface LeadingImage {
  sources: TrailingImageSource[];
}

export interface TrailingImageSource {
  clientResource: SourceClientResource;
}

export interface SourceClientResource {
  imageName: Name;
}

export type Name =
  | "TV_OFF"
  | "LIVE"
  | "MUSIC"
  | "CHECK_CIRCLE_FILLED"
  | "yt-sys-icons:chevron_right"
  | "ADD_TO_QUEUE_TAIL"
  | "BOOKMARK_BORDER"
  | "SHARE";

export interface PurpleRendererContext {
  loggingContext?: PurpleLoggingContext;
  commandContext: FluffyCommandContext;
}

export interface FluffyCommandContext {
  onTap: TentacledOnTap;
}

export interface TentacledOnTap {
  innertubeCommand: TentacledInnertubeCommand;
}

export interface TentacledInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  signalServiceEndpoint?: InnertubeCommandSignalServiceEndpoint;
  signInEndpoint?: InnertubeCommandSignInEndpoint;
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint;
}

export interface ShareEntityServiceEndpoint {
  serializedShareEntity: string;
  commands: ShareEntityServiceEndpointCommand[];
}

export interface ShareEntityServiceEndpointCommand {
  clickTrackingParams: string;
  openPopupAction: PurpleOpenPopupAction;
}

export interface PurpleOpenPopupAction {
  popup: PurplePopup;
  popupType: OpenPopupActionPopupType;
  beReused: boolean;
}

export interface PurplePopup {
  unifiedSharePanelRenderer: UnifiedSharePanelRenderer;
}

export interface UnifiedSharePanelRenderer {
  trackingParams: string;
  showLoadingSpinner: boolean;
}

export type OpenPopupActionPopupType = "DIALOG";

export interface InnertubeCommandSignalServiceEndpoint {
  signal: Signal;
  actions: FluffyAction[];
}

export interface FluffyAction {
  clickTrackingParams: string;
  addToPlaylistCommand: AddToPlaylistCommand;
}

export interface AddToPlaylistCommand {
  openMiniplayer: boolean;
  videoId: string;
  listType: ListType;
  onCreateListCommand: OnCreateListCommand;
  videoIds: string[];
  videoCommand: CurrentVideoEndpoint;
}

export type ListType = "PLAYLIST_EDIT_LIST_TYPE_QUEUE";

export interface OnCreateListCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
}

export interface CreatePlaylistServiceEndpoint {
  videoIds: string[];
  params: CreatePlaylistServiceEndpointParams;
}

export type CreatePlaylistServiceEndpointParams = "CAQ%3D";

export interface CurrentVideoEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: NextEndpointWatchEndpoint;
}

export type StateEnum = "BUTTON_VIEW_MODEL_STATE_ACTIVE";

export interface ItemSectionRendererHeader {
  commentsHeaderRenderer: CommentsHeaderRenderer;
}

export interface CommentsHeaderRenderer {
  countText: MessageTitle;
  trackingParams: string;
  screenReaderOnly: boolean;
}

export interface VideoPrimaryInfoRenderer {
  title: SuperTitleLink;
  viewCount: VideoPrimaryInfoRendererViewCount;
  videoActions: VideoActions;
  trackingParams: string;
  updatedMetadataEndpoint?: VideoPrimaryInfoRendererUpdatedMetadataEndpoint;
  dateText: LiveIndicatorText;
  relativeDateText?: ShortViewCountText;
  badges?: VideoPrimaryInfoRendererBadge[];
  superTitleLink?: SuperTitleLink;
}

export interface VideoPrimaryInfoRendererBadge {
  metadataBadgeRenderer: PurpleMetadataBadgeRenderer;
}

export interface PurpleMetadataBadgeRenderer {
  icon: IconImageClass;
  style: string;
  label: Label;
  trackingParams: string;
}

export type Label = "Auto-dubbed" | "Dubbed";

export interface ShortViewCountText {
  accessibility?: DisabledAccessibilityData;
  simpleText: string;
}

export interface SuperTitleLink {
  runs: SuperTitleLinkRun[];
}

export interface SuperTitleLinkRun {
  text: string;
  navigationEndpoint?: RunCommand;
  loggingDirectives?: LoggingDirectives;
}

export interface RunCommand {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  browseEndpoint: CommandBrowseEndpoint;
}

export interface CommandBrowseEndpoint {
  browseId: ID;
  params: string;
}

export type ID =
  | "FEhashtag"
  | "UC0qLe0cqi6y49Yx-OL5Ht9A"
  | "UCSp-OaMpsO8K0KkOqyBl7_w"
  | "UCl69AEx4MdqMZH7Jtsm7Tig"
  | "UCCbEyT5MkkAmy8QlaxXAuww"
  | "SPunlimited";

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

export interface VideoActions {
  menuRenderer: VideoActionsMenuRenderer;
}

export interface VideoActionsMenuRenderer {
  items: FluffyItem[];
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
  menuServiceItemRenderer?: MenuItemRenderer;
}

export interface MenuServiceItemDownloadRenderer {
  serviceEndpoint: ServiceEndpoint;
  trackingParams: string;
  playerStateEntityKey?: PlayerStateEntityKeyEnum;
}

export type PlayerStateEntityKeyEnum =
  "Eh8veW91dHViZS9hcHAvd2F0Y2gvcGxheWVyX3N0YXRlIMMCKAE%3D";

export interface MenuFlexibleItemRendererTopLevelButton {
  downloadButtonRenderer?: DownloadButtonRenderer;
  buttonViewModel?: FluffyButtonViewModel;
}

export interface FluffyButtonViewModel {
  iconName: string;
  title: string;
  onTap: StickyOnTap;
  accessibilityText: string;
  style: FluffyStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: TentacledType;
  buttonSize: PurpleButtonSize;
  tooltip: string;
}

export interface StickyOnTap {
  serialCommand: PurpleSerialCommand;
}

export interface PurpleSerialCommand {
  commands: StickyCommand[];
}

export interface StickyCommand {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: StickyInnertubeCommand;
}

export interface StickyInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata?: FluffyCommandMetadata;
  modalEndpoint?: ServiceEndpointModalEndpoint;
  showEngagementPanelEndpoint?: ServiceEndpointShowEngagementPanelEndpoint;
}

export interface LogGestureCommand {
  gestureType: GestureType;
  trackingParams: string;
}

export type GestureType = "GESTURE_EVENT_TYPE_LOG_GENERIC_CLICK";

export interface DownloadButtonRenderer {
  trackingParams: string;
  style: DownloadButtonRendererStyle;
  size: Size;
  targetId: string;
  command: ServiceEndpoint;
  playerStateEntityKey?: PlayerStateEntityKeyEnum;
  hasLabel: boolean;
}

export interface FluffyItem {
  listItemViewModel?: ItemListItemViewModel;
  menuServiceItemRenderer?: MenuItemRenderer;
}

export interface ItemListItemViewModel {
  title: BodyText;
  subtitle?: BodyText;
  leadingImage: LeadingImage;
  elcShouldLogExplicitGestures: boolean;
  entityKey: PlayerStateEntityKeyEnum;
  entitySelectorType: string;
  rendererContext: FluffyRendererContext;
}

export interface FluffyRendererContext {
  loggingContext: FluffyLoggingContext;
  commandContext: TentacledCommandContext;
}

export interface TentacledCommandContext {
  onTap: IndigoOnTap;
}

export interface IndigoOnTap {
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

export interface InteractionLoggingCommandMetadata {
  screenVisualElement: ScreenVisualElement;
}

export interface ScreenVisualElement {
  uiType: number;
}

export interface ShowPlaybackRateUpsellPanelCommandShowDialogCommand {
  panelLoadingStrategy: TentacledPanelLoadingStrategy;
}

export interface TentacledPanelLoadingStrategy {
  requestTemplate: RequestTemplate;
  screenVe: number;
}

export interface FluffyLoggingContext {
  loggingDirectives: InfoCardIconRenderer;
}

export interface InfoCardIconRenderer {
  trackingParams: string;
}

export interface TopLevelButtonElement {
  segmentedLikeDislikeButtonViewModel?: SegmentedLikeDislikeButtonViewModel;
  buttonViewModel?: TentacledButtonViewModel;
}

export interface TentacledButtonViewModel {
  iconName: Name;
  title: TooltipEnum;
  onTap: IndecentOnTap;
  accessibilityText: TooltipEnum;
  style: FluffyStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: TentacledType;
  buttonSize: PurpleButtonSize;
  state: StateEnum;
  accessibilityId: string;
  tooltip: TooltipEnum;
}

export type TooltipEnum = "Share" | "More actions";

export interface IndecentOnTap {
  serialCommand: FluffySerialCommand;
}

export interface FluffySerialCommand {
  commands: IndigoCommand[];
}

export interface IndigoCommand {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: CommandNavigationEndpoint;
}

export interface CommandNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  shareEntityServiceEndpoint: ShareEntityServiceEndpoint;
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
  toggledButtonViewModel: PurpleToggledButtonViewModel;
  trackingParams: string;
  isTogglingDisabled: boolean;
}

export interface PurpleDefaultButtonViewModel {
  buttonViewModel: StickyButtonViewModel;
}

export interface StickyButtonViewModel {
  iconName: IconNameEnum;
  title?: string;
  onTap: HilariousOnTap;
  accessibilityText: string;
  style: TentacledStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: TentacledType;
  buttonSize: FluffyButtonSize;
  accessibilityId: AccessibilityID;
  tooltip?: PurpleTooltip;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
}

export type AccessibilityID =
  "id.video.dislike.button" | "id.video.like.button";

export type FluffyButtonSize =
  "BUTTON_VIEW_MODEL_SIZE_DEFAULT" | "BUTTON_VIEW_MODEL_SIZE_LARGE";

export interface HilariousOnTap {
  serialCommand: TentacledSerialCommand;
}

export interface TentacledSerialCommand {
  commands: IndecentCommand[];
}

export interface IndecentCommand {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: SignInEndpoint;
}

export interface SignInEndpoint {
  clickTrackingParams: string;
  commandMetadata: FluffyCommandMetadata;
  modalEndpoint: SignInEndpointModalEndpoint;
}

export interface SignInEndpointModalEndpoint {
  modal: FluffyModal;
}

export interface FluffyModal {
  modalWithTitleAndButtonRenderer: FluffyModalWithTitleAndButtonRenderer;
}

export interface FluffyModalWithTitleAndButtonRenderer {
  title: LiveIndicatorText;
  content: LiveIndicatorText;
  button: ShowButtonElement;
}

export type TentacledStyle =
  "BUTTON_VIEW_MODEL_STYLE_MONO" | "BUTTON_VIEW_MODEL_STYLE_OVERLAY";

export type PurpleTooltip = "I dislike this" | "I like this";

export interface TooltipData {
  tooltipViewModel: TooltipViewModel;
}

export interface TooltipViewModel {
  tooltipText: string;
  placement: Placement;
  style: TooltipViewModelStyle;
}

export type Placement = "TOOLTIP_VIEW_MODEL_PLACEMENT_TOP";

export type TooltipViewModelStyle = "TOOLTIP_VIEW_MODEL_STYLE_PLAYER";

export interface PurpleToggledButtonViewModel {
  buttonViewModel: IndigoButtonViewModel;
}

export interface IndigoButtonViewModel {
  iconName: IconNameEnum;
  title?: string;
  onTap: AmbitiousOnTap;
  accessibilityText: string;
  style: TentacledStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: TentacledType;
  buttonSize: FluffyButtonSize;
  accessibilityId: AccessibilityID;
  tooltip?: FluffyTooltip;
  enableIconButton?: boolean;
  tooltipData?: TooltipData;
}

export interface AmbitiousOnTap {
  serialCommand: StickySerialCommand;
}

export interface StickySerialCommand {
  commands: HilariousCommand[];
}

export interface HilariousCommand {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: IndigoInnertubeCommand;
}

export interface IndigoInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  likeEndpoint: InnertubeCommandLikeEndpoint;
}

export interface InnertubeCommandLikeEndpoint {
  status: LikeStatusEnum;
  target: TargetClass;
  removeLikeParams: string;
}

export type LikeStatusEnum = "INDIFFERENT";

export type FluffyTooltip = "I dislike this" | "Unlike";

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
  likeStatus: LikeStatusEnum;
}

export interface LikeButtonViewModelToggleButtonViewModel {
  toggleButtonViewModel: FluffyToggleButtonViewModel;
}

export interface FluffyToggleButtonViewModel {
  defaultButtonViewModel: PurpleDefaultButtonViewModel;
  toggledButtonViewModel: PurpleToggledButtonViewModel;
  identifier: IdentifierEnum;
  trackingParams: string;
  isTogglingDisabled: boolean;
}

export type IdentifierEnum = "watch-like";

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

export interface VideoPrimaryInfoRendererViewCount {
  videoViewCountRenderer: PurpleVideoViewCountRenderer;
}

export interface PurpleVideoViewCountRenderer {
  viewCount: ShortViewCountClass;
  isLive?: boolean;
  originalViewCount: string;
  extraShortViewCount?: ShortViewCountText;
  entityKey?: string;
  shortViewCount?: LiveIndicatorText;
}

export interface ShortViewCountClass {
  runs?: MessageTitleRun[];
  simpleText?: string;
}

export interface VideoSecondaryInfoRenderer {
  owner: Owner;
  subscribeButton: VideoSecondaryInfoRendererSubscribeButton;
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
  element: PurpleElement;
  alignment: Alignment;
}

export type Alignment = "ALIGNMENT_VERTICAL_CENTER";

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

export type Unit = "DIMENSION_UNIT_POINT";

export interface PurpleMargin {
  top: Height;
}

export interface PurpleType {
  imageType: PurpleImageType;
}

export interface PurpleImageType {
  image: PurpleImage;
}

export interface PurpleImage {
  sources: CommonConfig[];
}

export interface AttributedDescriptionCommandRun {
  startIndex: number;
  length: number;
  onTap: CunningOnTap;
  onTapOptions?: OnTapOptions;
  loggingDirectives?: InfoCardIconRenderer;
}

export interface CunningOnTap {
  innertubeCommand: IndecentInnertubeCommand;
}

export interface IndecentInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  urlEndpoint?: NavigationEndpointURLEndpoint;
  watchEndpoint?: OnTapWatchEndpoint;
  browseEndpoint?: CommandBrowseEndpoint;
}

export interface NavigationEndpointURLEndpoint {
  url: string;
  target?: TargetEnum;
  nofollow: boolean;
}

export type TargetEnum = "TARGET_NEW_WINDOW";

export interface OnTapWatchEndpoint {
  videoId: VideoID;
  continuePlayback: boolean;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
  startTimeSeconds?: number;
  playerParams?: string;
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

export interface ColorMapExtension {
  colorMap: SampledColor[];
}

export interface SampledColor {
  key: string;
  value: number;
}

export interface AttributedDescriptionStyleRun {
  startIndex: number;
  length: number;
  styleRunExtensions: StyleRunExtensions;
  fontFamilyName?: FontFamilyName;
}

export type FontFamilyName = "Roboto";

export interface StyleRunExtensions {
  styleRunColorMapExtension: ColorMapExtension;
}

export interface HeaderRun {
  startIndex: number;
  length: number;
  headerMapping: HeaderMapping;
}

export type HeaderMapping = "ATTRIBUTED_STRING_HEADER_MAPPING_UNSPECIFIED";

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
  thumbnail: IconClass;
  title: VideoOwnerRendererTitle;
  subscriptionButton: SubscriptionButtonClass;
  navigationEndpoint: ChannelNavigationEndpoint;
  subscriberCountText: ShortViewCountText;
  trackingParams: string;
  badges?: VideoOwnerRendererBadge[];
  membershipButton?: MembershipButton;
}

export interface VideoOwnerRendererBadge {
  metadataBadgeRenderer: FluffyMetadataBadgeRenderer;
}

export interface FluffyMetadataBadgeRenderer {
  icon: IconImageClass;
  style: string;
  tooltip: AccessibilityLabelEnum;
  trackingParams: string;
  accessibilityData: Accessibility;
}

export type AccessibilityLabelEnum = "Verified";

export interface MembershipButton {
  timedAnimationButtonRenderer: TimedAnimationButtonRenderer;
}

export interface TimedAnimationButtonRenderer {
  buttonRenderer: TimedAnimationButtonRendererButtonRenderer;
}

export interface TimedAnimationButtonRendererButtonRenderer {
  buttonRenderer: ButtonRendererButtonRenderer;
}

export interface ButtonRendererButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: Size;
  isDisabled: boolean;
  text: MessageTitle;
  navigationEndpoint: StickyNavigationEndpoint;
  trackingParams: string;
  accessibilityData: DisabledAccessibilityData;
  targetId: string;
}

export interface StickyNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: FluffyCommandMetadata;
  modalEndpoint: ServiceEndpointModalEndpoint;
}

export interface ChannelNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  browseEndpoint: ChannelNavigationEndpointBrowseEndpoint;
}

export interface ChannelNavigationEndpointBrowseEndpoint {
  browseId: string;
  canonicalBaseUrl: string;
}

export interface SubscriptionButtonClass {
  type: string;
}

export interface IconClass {
  thumbnails: ThumbnailElement[];
}

export interface ThumbnailElement {
  url: string;
  width?: number;
  height?: number;
}

export interface VideoOwnerRendererTitle {
  runs: FluffyRun[];
}

export interface FluffyRun {
  text: string;
  navigationEndpoint: ChannelNavigationEndpoint;
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
  commands: AmbitiousCommand[];
}

export interface AmbitiousCommand {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  scrollToEngagementPanelCommand?: ScrollToEngagementPanelCommandClass;
}

export interface VideoSecondaryInfoRendererSubscribeButton {
  subscribeButtonRenderer: PurpleSubscribeButtonRenderer;
}

export interface PurpleSubscribeButtonRenderer {
  buttonText: MessageTitle;
  subscribed: boolean;
  enabled: boolean;
  type: string;
  channelId: ID;
  showPreferences: boolean;
  subscribedButtonText: MessageTitle;
  unsubscribedButtonText: MessageTitle;
  trackingParams: string;
  unsubscribeButtonText: MessageTitle;
  subscribeAccessibility: DisabledAccessibilityData;
  unsubscribeAccessibility: DisabledAccessibilityData;
  notificationPreferenceButton: NotificationPreferenceButton;
  targetId: string;
  signInEndpoint: SignInEndpoint;
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
  secondaryIcon: IconImageClass;
}

export interface SubscriptionNotificationToggleButtonRendererCommand {
  clickTrackingParams: string;
  commandExecutorCommand: FluffyCommandExecutorCommand;
}

export interface FluffyCommandExecutorCommand {
  commands: CunningCommand[];
}

export interface CunningCommand {
  clickTrackingParams: string;
  openPopupAction: FluffyOpenPopupAction;
}

export interface FluffyOpenPopupAction {
  popup: FluffyPopup;
  popupType: string;
}

export interface FluffyPopup {
  menuPopupRenderer: PurpleMenuPopupRenderer;
}

export interface PurpleMenuPopupRenderer {
  items: TentacledItem[];
}

export interface TentacledItem {
  menuServiceItemRenderer: PurpleMenuServiceItemRenderer;
}

export interface PurpleMenuServiceItemRenderer {
  text: ShortViewCountClass;
  icon: IconImageClass;
  serviceEndpoint: ServiceEndpointElement;
  trackingParams: string;
  isSelected?: boolean;
}

export interface ServiceEndpointElement {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  modifyChannelNotificationPreferenceEndpoint?: GetTranscriptEndpoint;
  signalServiceEndpoint?: OnUnsubscribeEndpointSignalServiceEndpoint;
  subscribeEndpoint?: SubscribeEndpoint;
}

export interface OnUnsubscribeEndpointSignalServiceEndpoint {
  signal: Signal;
  actions: TentacledAction[];
}

export interface TentacledAction {
  clickTrackingParams: string;
  openPopupAction: TentacledOpenPopupAction;
}

export interface TentacledOpenPopupAction {
  popup: TentacledPopup;
  popupType: OpenPopupActionPopupType;
}

export interface TentacledPopup {
  confirmDialogRenderer: PopupConfirmDialogRenderer;
}

export interface PopupConfirmDialogRenderer {
  trackingParams: string;
  dialogMessages: MessageTitle[];
  confirmButton: A11YSkipNavigationButtonClass;
  cancelButton: A11YSkipNavigationButtonClass;
  primaryIsCancel: boolean;
}

export interface A11YSkipNavigationButtonClass {
  buttonRenderer: A11YSkipNavigationButtonButtonRenderer;
}

export interface A11YSkipNavigationButtonButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: Size;
  isDisabled?: boolean;
  text?: MessageTitle;
  accessibility?: Accessibility;
  trackingParams: string;
  serviceEndpoint?: UnsubscribeCommand;
  command?: MagentaCommand;
  accessibilityData?: DisabledAccessibilityData;
  icon?: IconImageClass;
}

export interface MagentaCommand {
  clickTrackingParams: string;
  commandMetadata?: ContinuationEndpointCommandMetadata;
  continuationCommand?: ContinuationEndpointContinuationCommand;
  commandExecutorCommand?: TentacledCommandExecutorCommand;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
}

export interface TentacledCommandExecutorCommand {
  commands: FriskyCommand[];
}

export interface FriskyCommand {
  clickTrackingParams?: string;
  updateEngagementPanelContentCommand?: PurpleUpdateEngagementPanelContentCommand;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
  entityUpdateCommand?: PurpleEntityUpdateCommand;
  scrollToEngagementPanelCommand?: OnShowCommandScrollToEngagementPanelCommand;
  showEngagementPanelEndpoint?: CommandShowEngagementPanelEndpoint;
  commandMetadata?: AutoplayVideoCommandMetadata;
  browseEndpoint?: CommandBrowseEndpoint;
  feedbackEndpoint?: FeedbackEndpoint;
}

export interface PurpleEntityUpdateCommand {
  entityBatchUpdate: PurpleEntityBatchUpdate;
}

export interface PurpleEntityBatchUpdate {
  mutations: PurpleMutation[];
}

export interface PurpleMutation {
  entityKey: string;
  type: MutationType;
  payload: PurplePayload;
}

export interface PurplePayload {
  chipBarStateEntity: ChipBarStateEntity;
}

export interface ChipBarStateEntity {
  key: string;
  selectedIndex: number;
}

export type MutationType =
  "ENTITY_MUTATION_TYPE_DELETE" | "ENTITY_MUTATION_TYPE_REPLACE";

export interface FeedbackEndpoint {
  feedbackToken: string;
  uiActions: UIActions;
}

export interface UIActions {
  hideEnclosingContainer: boolean;
}

export interface OnShowCommandScrollToEngagementPanelCommand {
  panelIdentifier?: PanelIdentifierClass;
  targetId?: TargetID;
}

export type TargetID =
  | "PAmodern_transcript_view"
  | "PAsearch_preview"
  | "engagement-panel-searchable-transcript";

export interface CommandShowEngagementPanelEndpoint {
  sourcePanelIdentifier: string;
  identifier: ContentSourcePanelIdentifierClass;
  globalConfiguration: GetTranscriptEndpoint;
}

export interface ContentSourcePanelIdentifierClass {
  surface?: Surface;
  tag: ContentSourcePanelIdentifierTag;
}

export type Surface = "ENGAGEMENT_PANEL_SURFACE_WATCH";

export type ContentSourcePanelIdentifierTag =
  | "engagement-panel-macro-markers-description-chapters"
  | "engagement-panel-timeline-view-consolidated"
  | "PAmodern_transcript_view"
  | "PAtimeline_view"
  | "PAsearch_preview";

export interface PurpleUpdateEngagementPanelContentCommand {
  targetPanelIdentifier: ContentSourcePanelIdentifierClass;
  contentSourcePanelIdentifier: ContentSourcePanelIdentifierClass;
  globalConfiguration?: GetTranscriptEndpoint;
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

export interface StateElement {
  stateId: number;
  nextStateId: number;
  state: CancelButton;
}

export interface SubscribeCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  subscribeEndpoint: SubscribeEndpoint;
}

export interface OnUnsubscribeEndpoint {
  clickTrackingParams: string;
  commandMetadata: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint: OnUnsubscribeEndpointSignalServiceEndpoint;
}

export interface OnUnsubscribeEndpointCommandMetadata {
  webCommandMetadata: IndigoWebCommandMetadata;
}

export interface IndigoWebCommandMetadata {
  sendPost: boolean;
}

export interface TwoColumnWatchNextResultsSecondaryResults {
  secondaryResults: SecondaryResultsSecondaryResults;
}

export interface SecondaryResultsSecondaryResults {
  results: SecondaryResultsResult[];
  trackingParams: string;
}

export interface SecondaryResultsResult {
  itemSectionRenderer: ResultItemSectionRenderer;
}

export interface ResultItemSectionRenderer {
  contents: FluffyContent[];
  trackingParams: string;
  sectionIdentifier: string;
  targetId: string;
}

export interface FluffyContent {
  lockupViewModel?: LockupViewModel;
  continuationItemRenderer?: FluffyContinuationItemRenderer;
}

export interface FluffyContinuationItemRenderer {
  trigger: string;
  continuationEndpoint: PurpleContinuationEndpoint;
  button: A11YSkipNavigationButtonClass;
}

export interface LockupViewModel {
  contentImage: ContentImage;
  metadata: LockupViewModelMetadata;
  contentId: string;
  contentType: ContentType;
  themedPalette: SaturatedColorPalettes;
  rendererContext: LockupViewModelRendererContext;
  itemPlayback?: ItemPlayback;
}

export interface ContentImage {
  thumbnailViewModel: ThumbnailViewModel;
}

export interface ThumbnailViewModel {
  image: ThumbnailClass;
  overlays: Overlay[];
}

export interface ThumbnailClass {
  sources: ThumbnailElement[];
}

export interface Overlay {
  thumbnailBottomOverlayViewModel?: ThumbnailBottomOverlayViewModel;
  animatedThumbnailOverlayViewModel?: AnimatedThumbnailOverlayViewModel;
  thumbnailOverlayBadgeViewModel?: ThumbnailOverlayBadgeViewModel;
}

export interface AnimatedThumbnailOverlayViewModel {
  thumbnail: ThumbnailClass;
}

export interface ThumbnailBottomOverlayViewModel {
  badges: ThumbnailBottomOverlayViewModelBadge[];
}

export interface ThumbnailBottomOverlayViewModelBadge {
  thumbnailBadgeViewModel: BadgeThumbnailBadgeViewModel;
}

export interface BadgeThumbnailBadgeViewModel {
  icon?: LeadingImage;
  text: string;
  badgeStyle: PurpleBadgeStyle;
  animationActivationTargetId: string;
  animationActivationEntityKey: PlayerStateEntityKeyEnum;
  lottieData: LottieData;
  animatedText: AnimatedText;
  animationActivationEntitySelectorType: AnimationActivationEntitySelectorType;
  rendererContext?: ThumbnailBadgeViewModelRendererContext;
  inlinePlaybackBadgeData?: InlinePlaybackBadgeData;
}

export type AnimatedText = "Now playing";

export type AnimationActivationEntitySelectorType =
  "THUMBNAIL_BADGE_ANIMATION_ENTITY_SELECTOR_TYPE_PLAYER_STATE";

export type PurpleBadgeStyle =
  | "THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE"
  | "THUMBNAIL_OVERLAY_BADGE_STYLE_DEFAULT";

export interface InlinePlaybackBadgeData {
  replicateAsTimestamp: boolean;
}

export interface LottieData {
  url: string;
  settings: Settings;
}

export interface Settings {
  loop: boolean;
  autoplay: boolean;
}

export interface ThumbnailBadgeViewModelRendererContext {
  accessibilityContext: Accessibility;
}

export interface ThumbnailOverlayBadgeViewModel {
  thumbnailBadges: ThumbnailBadge[];
  position: Position;
}

export type Position = "THUMBNAIL_OVERLAY_BADGE_POSITION_TOP_START";

export interface ThumbnailBadge {
  thumbnailBadgeViewModel: ThumbnailBadgeThumbnailBadgeViewModel;
}

export interface ThumbnailBadgeThumbnailBadgeViewModel {
  text: TextEnum;
  badgeStyle: FluffyBadgeStyle;
  rendererContext: ThumbnailBadgeViewModelRendererContext;
}

export type FluffyBadgeStyle = "THUMBNAIL_OVERLAY_BADGE_STYLE_SPECIAL";

export type TextEnum = "New";

export type ContentType = "LOCKUP_CONTENT_TYPE_VIDEO";

export interface ItemPlayback {
  inlinePlayerData: InlinePlayerData;
}

export interface InlinePlayerData {
  onSelect: On;
  onVisible: OnVisible;
}

export interface On {
  innertubeCommand: OnSelectNavigationEndpoint;
}

export interface OnSelectNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: FluffyWatchEndpoint;
}

export interface FluffyWatchEndpoint {
  videoId: string;
  nofollow?: boolean;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
  playlistId?: string;
  params?: FluffyParams;
  playerParams?: FluffyPlayerParams;
  loggingContext?: WatchEndpointLoggingContext;
  ustreamerConfig?: UstreamerConfig;
}

export interface WatchEndpointLoggingContext {
  vssLoggingContext: VssLoggingContext;
}

export interface VssLoggingContext {
  serializedContextData: string;
}

export type FluffyPlayerParams =
  | "oAcB0gcJCUcMAYcqIYzv"
  | "ugUHEgVlbi1VUw%3D%3D"
  | "0gcJCUcMAYcqIYzv"
  | "ugUHEgVlbi1VU9IHCQlHDAGHKiGM7w%3D%3D"
  | "ugUEEgJlbg%3D%3D"
  | "ugUEEgJlbtIHCQlHDAGHKiGM7w%3D%3D"
  | "oAcB";

export interface OnVisible {
  innertubeCommand: OnVisibleInnertubeCommand;
}

export interface OnVisibleInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: TentacledWatchEndpoint;
}

export interface TentacledWatchEndpoint {
  videoId: string;
  playerParams: string;
  playerExtraUrlParams: Param[];
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
  ustreamerConfig?: UstreamerConfig;
}

export interface LockupViewModelMetadata {
  lockupMetadataViewModel: LockupMetadataViewModel;
}

export interface LockupMetadataViewModel {
  title: BodyText;
  image: LockupMetadataViewModelImage;
  metadata: LockupMetadataViewModelMetadata;
  menuButton: HeaderButtonClass;
}

export interface LockupMetadataViewModelImage {
  decoratedAvatarViewModel?: DecoratedAvatarViewModel;
  avatarStackViewModel?: AvatarStackViewModel;
}

export interface AvatarStackViewModel {
  avatars: AvatarElement[];
  avatarClusterSize: string;
  layoutType: string;
  rendererContext: AvatarStackViewModelRendererContext;
}

export interface AvatarElement {
  avatarViewModel: PurpleAvatarViewModel;
}

export interface PurpleAvatarViewModel {
  image: ThumbnailClass;
}

export interface AvatarStackViewModelRendererContext {
  loggingContext: PurpleLoggingContext;
  accessibilityContext: Accessibility;
  commandContext: StickyCommandContext;
}

export interface StickyCommandContext {
  onTap: MagentaOnTap;
}

export interface MagentaOnTap {
  innertubeCommand: HilariousInnertubeCommand;
}

export interface HilariousInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: ShowPlaybackRateUpsellPanelCommandCommandMetadata;
  showDialogCommand: NavigationEndpointShowDialogCommand;
}

export interface NavigationEndpointShowDialogCommand {
  panelLoadingStrategy: StickyPanelLoadingStrategy;
}

export interface StickyPanelLoadingStrategy {
  inlineContent: FluffyInlineContent;
  screenVe: number;
}

export interface FluffyInlineContent {
  dialogViewModel: PurpleDialogViewModel;
}

export interface PurpleDialogViewModel {
  header: DialogViewModelHeader;
  customContent: CustomContent;
}

export interface CustomContent {
  listViewModel: CustomContentListViewModel;
}

export interface CustomContentListViewModel {
  listItems: FluffyListItem[];
}

export interface FluffyListItem {
  listItemViewModel: FluffyListItemViewModel;
}

export interface FluffyListItemViewModel {
  title: ListItemViewModelTitle;
  subtitle: BodyText;
  trailingImage: LeadingImage;
  leadingAccessory: LeadingAccessory;
  rendererContext: TentacledRendererContext;
}

export interface LeadingAccessory {
  avatarViewModel: LeadingAccessoryAvatarViewModel;
}

export interface LeadingAccessoryAvatarViewModel {
  image: FluffyImage;
  accessibilityText: string;
  avatarImageSize: AvatarImageSize;
}

export type AvatarImageSize = "AVATAR_SIZE_M";

export interface FluffyImage {
  sources: CommonConfig[];
  processor: Processor;
}

export interface Processor {
  borderImageProcessor: BorderImageProcessor;
}

export interface BorderImageProcessor {
  circular: boolean;
}

export interface TentacledRendererContext {
  accessibilityContext: Accessibility;
  commandContext: IndigoCommandContext;
}

export interface IndigoCommandContext {
  onTap: FriskyOnTap;
}

export interface FriskyOnTap {
  innertubeCommand: NavigationEndpointClass;
}

export interface NavigationEndpointClass {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  browseEndpoint: EndpointBrowseEndpoint;
}

export interface EndpointBrowseEndpoint {
  browseId: string;
}

export interface ListItemViewModelTitle {
  content: string;
  styleRuns: TitleStyleRun[];
  attachmentRuns?: TitleAttachmentRun[];
}

export interface TitleAttachmentRun {
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
  left: Height;
}

export interface FluffyType {
  imageType: FluffyImageType;
}

export interface FluffyImageType {
  image: TentacledImage;
}

export interface TentacledImage {
  sources: ImageSource[];
}

export interface ImageSource {
  clientResource: SourceClientResource;
  width: number;
  height: number;
}

export interface TitleStyleRun {
  fontColor?: number;
  weightLabel?: WeightLabel;
  startIndex?: number;
  styleRunExtensions?: StyleRunExtensions;
}

export type WeightLabel = "FONT_WEIGHT_BOLD";

export interface DialogViewModelHeader {
  dialogHeaderViewModel: DialogHeaderViewModel;
}

export interface DialogHeaderViewModel {
  headline: BodyText;
}

export interface DecoratedAvatarViewModel {
  avatar: DecoratedAvatarViewModelAvatar;
  a11yLabel: string;
  rendererContext: DecoratedAvatarViewModelRendererContext;
}

export interface DecoratedAvatarViewModelAvatar {
  avatarViewModel: FluffyAvatarViewModel;
}

export interface FluffyAvatarViewModel {
  image: ThumbnailClass;
  avatarImageSize: AvatarImageSize;
}

export interface DecoratedAvatarViewModelRendererContext {
  commandContext: IndecentCommandContext;
}

export interface IndecentCommandContext {
  onTap: MischievousOnTap;
}

export interface MischievousOnTap {
  innertubeCommand: ChannelNavigationEndpoint;
}

export interface LockupMetadataViewModelMetadata {
  contentMetadataViewModel: ContentMetadataViewModel;
}

export interface ContentMetadataViewModel {
  metadataRows: MetadataRow[];
  delimiter?: Delimiter;
}

export type Delimiter = " ";

export interface MetadataRow {
  metadataParts?: MetadataPart[];
  badges?: MetadataRowBadge[];
}

export interface MetadataRowBadge {
  badgeViewModel: BadgeViewModel;
}

export interface BadgeViewModel {
  badgeText: Label;
  badgeStyle: BadgeViewModelBadgeStyle;
  trackingParams: string;
  iconName: BadgeViewModelIconName;
}

export type BadgeViewModelBadgeStyle = "BADGE_DEFAULT";

export type BadgeViewModelIconName = "PERSON_RADAR_FILLED";

export interface MetadataPart {
  text: BodyText;
  icon?: LeadingIconClass;
  accessibilityLabel?: string;
  leadingIcon?: LeadingIconClass;
}

export interface LeadingIconClass {
  name: NameEnum;
  height: number;
  width: number;
  accessibilityLabel?: AccessibilityLabelEnum;
  marginEndToken?: MarginEndToken;
}

export interface MarginEndToken {
  spacing: number;
}

export type NameEnum = "CHECK_CIRCLE_FILLED" | "PLAY_ARROW_OUTLINED";

export interface LockupViewModelRendererContext {
  loggingContext: PurpleLoggingContext;
  accessibilityContext: Accessibility;
  commandContext: HilariousCommandContext;
}

export interface HilariousCommandContext {
  onTap: On;
}

export interface SaturatedColorPalettes {
  lightThemePalette: { [key: string]: number };
  darkThemePalette: { [key: string]: number };
}

export interface EngagementPanel {
  engagementPanelSectionListRenderer: EngagementPanelSectionListRenderer;
}

export interface EngagementPanelSectionListRenderer {
  content?: EngagementPanelSectionListRendererContent;
  targetId?: string;
  visibility: VisibilityEnum;
  loggingDirectives: LoggingDirectives;
  onShowCommands?: OnShowCommand[];
  identifier?: ContentSourcePanelIdentifierClass;
  panelIdentifier?: PanelIdentifier;
  veType?: number;
  header?: EngagementPanelSectionListRendererHeader;
  resizability?: string;
  onCloseCommand?: OnCloseCommand;
}

export interface EngagementPanelSectionListRendererContent {
  adsEngagementPanelContentRenderer?: AdsEngagementPanelContentRenderer;
  sectionListRenderer?: SectionListRenderer;
  structuredDescriptionContentRenderer?: StructuredDescriptionContentRenderer;
  macroMarkersListRenderer?: MacroMarkersListRenderer;
  continuationItemRenderer?: TentacledContinuationItemRenderer;
}

export interface TentacledContinuationItemRenderer {
  trigger: string;
  continuationEndpoint: FluffyContinuationEndpoint;
}

export interface FluffyContinuationEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  getTranscriptEndpoint: GetTranscriptEndpoint;
}

export interface MacroMarkersListRenderer {
  contents: MacroMarkersListRendererContent[];
  syncButtonLabel: MessageTitle;
  trackingParams: string;
  syncModelEntityKey: string;
}

export interface MacroMarkersListRendererContent {
  macroMarkersListItemRenderer: ContentMacroMarkersListItemRenderer;
}

export interface ContentMacroMarkersListItemRenderer {
  title: LiveIndicatorText;
  timeDescription: ShortViewCountText;
  thumbnail: IconClass;
  onTap: MacroMarkersListItemRendererOnTap;
  trackingParams: string;
  shareButton: ShareButton;
  repeatButton: RepeatButton;
  macroMarkerRepeatStateEntityKey: MacroMarkerRepeatStateEntityKeyEnum;
  endRepeatCommand: EndRepeatCommand;
  playerStateEntityKey: PlayerStateEntityKeyEnum;
  carouselType: string;
  timeDescriptionA11yLabel: string;
}

export interface EndRepeatCommand {
  clickTrackingParams: string;
  commandExecutorCommand: EndRepeatCommandCommandExecutorCommand;
}

export interface EndRepeatCommandCommandExecutorCommand {
  commands: MischievousCommand[];
}

export interface MischievousCommand {
  clickTrackingParams: string;
  entityUpdateCommand?: FluffyEntityUpdateCommand;
  repeatChapterCommand?: CommandRepeatChapterCommand;
}

export interface FluffyEntityUpdateCommand {
  entityBatchUpdate: FluffyEntityBatchUpdate;
}

export interface FluffyEntityBatchUpdate {
  mutations: FluffyMutation[];
}

export interface FluffyMutation {
  entityKey: MacroMarkerRepeatStateEntityKeyEnum;
  type: MutationType;
}

export type MacroMarkerRepeatStateEntityKeyEnum =
  "EgxyZXBlYXRfc3RhdGUgyQIoAQ%3D%3D";

export interface CommandRepeatChapterCommand {
  repeat: Repeat;
}

export type Repeat = "REPEAT_CHAPTER_TYPE_DISABLE_REPEAT";

export interface MacroMarkersListItemRendererOnTap {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  watchEndpoint: OnTapWatchEndpoint;
}

export interface RepeatButton {
  toggleButtonRenderer: ToggleButtonRenderer;
}

export interface ToggleButtonRenderer {
  style: ToggledStyleClass;
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: IconImageClass;
  defaultServiceEndpoint: DefaultServiceEndpoint;
  toggledServiceEndpoint: EndRepeatCommand;
  trackingParams: string;
  toggledStyle: ToggledStyleClass;
  accessibilityData: DisabledAccessibilityData;
  toggledAccessibilityData: DisabledAccessibilityData;
}

export interface DefaultServiceEndpoint {
  clickTrackingParams: string;
  repeatChapterCommand: DefaultServiceEndpointRepeatChapterCommand;
}

export interface DefaultServiceEndpointRepeatChapterCommand {
  repeat: string;
  startTimeMs: string;
  endTimeMs: string;
  repeatStateEntityKey: MacroMarkerRepeatStateEntityKeyEnum;
}

export interface ToggledStyleClass {
  styleType: StyleType;
}

export type StyleType = "STYLE_DEFAULT_ACTIVE" | "STYLE_BLUE_TEXT";

export interface ShareButton {
  buttonRenderer: PurpleButtonRenderer;
}

export interface PurpleButtonRenderer {
  style: DownloadButtonRendererStyle;
  icon: IconImageClass;
  trackingParams: string;
  accessibilityData: DisabledAccessibilityData;
  command: CommandNavigationEndpoint;
}

export interface SectionListRenderer {
  trackingParams: string;
  hack?: boolean;
  contents?: SectionListRendererContent[];
}

export interface SectionListRendererContent {
  itemSectionRenderer: FluffyItemSectionRenderer;
}

export interface FluffyItemSectionRenderer {
  contents: TentacledContent[];
  trackingParams: string;
  sectionIdentifier: string;
  targetId: PanelIdentifier;
}

export interface TentacledContent {
  continuationItemRenderer: PurpleContinuationItemRenderer;
}

export interface StructuredDescriptionContentRenderer {
  items: StructuredDescriptionContentRendererItem[];
  floatingButton?: FloatingButton;
}

export interface FloatingButton {
  floatingButtonViewModel: FloatingButtonViewModel;
}

export interface FloatingButtonViewModel {
  button: HeaderButtonClass;
  buttonPosition: string;
  triggerMechanism: TriggerMechanism;
}

export interface TriggerMechanism {
  scrollState: ScrollState;
}

export interface ScrollState {
  itemIndex: number;
  condition: string;
}

export interface StructuredDescriptionContentRendererItem {
  videoTitleHeaderViewModel?: VideoTitleHeaderViewModel;
  videoDescriptionHeaderRenderer?: VideoDescriptionHeaderRenderer;
  expandableVideoDescriptionBodyRenderer?: ExpandableVideoDescriptionBodyRenderer;
  videoAttributesSectionViewModel?: VideoAttributesSectionViewModel;
  videoDescriptionInfocardsSectionRenderer?: VideoDescriptionInfocardsSectionRenderer;
  itemSectionRenderer?: ItemItemSectionRenderer;
  expandableMetadataRenderer?: ExpandableMetadataRenderer;
  horizontalCardListRenderer?: HorizontalCardListRenderer;
  videoDescriptionTranscriptSectionRenderer?: VideoDescriptionTranscriptSectionRenderer;
  howThisWasMadeSectionViewModel?: HowThisWasMadeSectionViewModel;
}

export interface ExpandableMetadataRenderer {
  header: ExpandableMetadataRendererHeader;
  expandedContent: ExpandedContent;
  expandButton: CancelButton;
  collapseButton: CancelButton;
  trackingParams: string;
  colorData: ColorData;
  useCustomColors: boolean;
  expandedMenuFooter: ExpandedMenuFooter;
  loggingDirectives: LoggingDirectives;
}

export interface ColorData {
  lightColorPalette: VibrantColorPaletteClass;
  darkColorPalette: VibrantColorPaletteClass;
  vibrantColorPalette: VibrantColorPaletteClass;
  saturatedColorPalettes: SaturatedColorPalettes;
}

export interface VibrantColorPaletteClass {
  section1Color: number;
  section2Color: number;
  section3Color: number;
  primaryTitleColor: number;
  secondaryTitleColor: number;
  iconActivatedColor: number;
  iconInactiveColor: number;
  section4Color: number;
  iconDisabledColor: number;
}

export interface ExpandedContent {
  videoSummaryContentViewModel: VideoSummaryContentViewModel;
}

export interface VideoSummaryContentViewModel {
  paragraphs: Paragraph[];
}

export interface Paragraph {
  videoSummaryParagraphViewModel: VideoSummaryParagraphViewModel;
}

export interface VideoSummaryParagraphViewModel {
  text: BodyText;
}

export interface ExpandedMenuFooter {
  menuRenderer: ExpandedMenuFooterMenuRenderer;
}

export interface ExpandedMenuFooterMenuRenderer {
  trackingParams: string;
  topLevelButtons: ShowButtonElement[];
}

export interface ExpandableMetadataRendererHeader {
  collapsedTitle: LiveIndicatorText;
  collapsedLabel: LiveIndicatorText;
  expandedTitle: LiveIndicatorText;
  expandedSubtitle: LiveIndicatorText;
  collapsedLabelIcon: IconImageClass;
  expandedTitleIcon: IconImageClass;
  expandedSubtitleTapCommand: ExpandedSubtitleTapCommandClass;
  expandedSubtitleTrailingIcon: IconImageClass;
}

export interface ExpandedSubtitleTapCommandClass {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  urlEndpoint: ExpandedSubtitleTapCommandURLEndpoint;
}

export interface ExpandedSubtitleTapCommandURLEndpoint {
  url: string;
  target: TargetEnum;
}

export interface ExpandableVideoDescriptionBodyRenderer {
  showMoreText: ShortViewCountText;
  showLessText: LiveIndicatorText;
  attributedDescriptionBodyText: AttributedDescription;
  headerRuns: HeaderRun[];
  backgroundColorStyle: string;
  lightThemeColorPalette: Palette;
  darkThemeColorPalette: Palette;
  colorSampledDescriptionBodyText: AttributedDescription;
  enableColorSampledDescriptionBodyText: boolean;
}

export interface Palette {
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
  style: SubscriptionButtonClass;
  centerItems?: boolean;
  footerButton?: HorizontalCardListRendererFooterButton;
}

export interface HorizontalCardListRendererCard {
  macroMarkersListItemRenderer?: CardMacroMarkersListItemRenderer;
  videoAttributeViewModel?: CardVideoAttributeViewModel;
}

export interface CardMacroMarkersListItemRenderer {
  title: LiveIndicatorText;
  timeDescription: LiveIndicatorText;
  thumbnail: IconClass;
  onTap: MacroMarkersListItemRendererOnTap;
  trackingParams: string;
  layout: string;
  carouselType: string;
  lightThemeColorSamplingPalette: Palette;
  darkThemeColorSamplingPalette: Palette;
}

export interface CardVideoAttributeViewModel {
  image: PurpleImage;
  imageStyle: string;
  title: string;
  subtitle: string;
  secondarySubtitle: BodyText;
  orientation: string;
  onTap: BraggadociousOnTap;
  sizingRule: string;
  overflowMenuOnTap: OverflowMenuOnTap;
  overflowMenuA11yLabel: OverflowMenuA11YLabelEnum;
  loggingDirectives: LoggingDirectives;
}

export interface BraggadociousOnTap {
  innertubeCommand: CurrentVideoEndpoint;
}

export interface OverflowMenuOnTap {
  innertubeCommand: OverflowMenuOnTapInnertubeCommand;
}

export interface OverflowMenuOnTapInnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: FluffyCommandMetadata;
  confirmDialogEndpoint: ConfirmDialogEndpoint;
}

export interface ConfirmDialogEndpoint {
  content: ConfirmDialogEndpointContent;
}

export interface ConfirmDialogEndpointContent {
  confirmDialogRenderer: ContentConfirmDialogRenderer;
}

export interface ContentConfirmDialogRenderer {
  title: MessageTitle;
  trackingParams: string;
  dialogMessages: DialogMessage[];
  confirmButton: A11YSkipNavigationButtonClass;
  primaryIsCancel: boolean;
}

export interface DialogMessage {
  runs: TentacledRun[];
}

export interface TentacledRun {
  text: string;
  bold?: boolean;
}

export interface HorizontalCardListRendererFooterButton {
  buttonViewModel: IndecentButtonViewModel;
}

export interface IndecentButtonViewModel {
  iconName: Name;
  onTap: FriskyOnTap;
  style: FluffyStyle;
  trackingParams: string;
  type: TentacledType;
  buttonSize: PurpleButtonSize;
  titleFormatted: BodyText;
}

export interface HorizontalCardListRendererHeader {
  richListHeaderRenderer: RichListHeaderRenderer;
}

export interface RichListHeaderRenderer {
  title: LiveIndicatorText;
  trackingParams: string;
  navigationButton?: NavigationButton;
  subtitle?: LiveIndicatorText;
}

export interface NavigationButton {
  buttonRenderer: NavigationButtonButtonRenderer;
}

export interface NavigationButtonButtonRenderer {
  style: string;
  text: LiveIndicatorText;
  trackingParams: string;
  command: BraggadociousCommand;
}

export interface BraggadociousCommand {
  clickTrackingParams: string;
  commandExecutorCommand: StickyCommandExecutorCommand;
}

export interface StickyCommandExecutorCommand {
  commands: Command1[];
}

export interface Command1 {
  clickTrackingParams: string;
  updateEngagementPanelContentCommand?: FluffyUpdateEngagementPanelContentCommand;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
  entityUpdateCommand?: PurpleEntityUpdateCommand;
  scrollToEngagementPanelCommand?: PurpleScrollToEngagementPanelCommand;
}

export interface PurpleScrollToEngagementPanelCommand {
  panelIdentifier: PanelIdentifierClass;
}

export interface FluffyUpdateEngagementPanelContentCommand {
  targetPanelIdentifier: ContentSourcePanelIdentifierClass;
  contentSourcePanelIdentifier: ContentSourcePanelIdentifierClass;
}

export interface HowThisWasMadeSectionViewModel {
  sectionTitle: BodyText;
  bodyText: PurpleBodyText;
  bodyHeader: BodyText;
  attributionText: ClientForecastingAdRenderer;
  shouldRemoveBottomPadding: boolean;
  rendererContext: CarouselItemViewModelRendererContext;
}

export interface PurpleBodyText {
  content: string;
  commandRuns: BodyTextCommandRun[];
  styleRuns: BodyTextStyleRun[];
}

export interface BodyTextCommandRun {
  startIndex: number;
  length: number;
  onTap: OnTap1;
}

export interface OnTap1 {
  innertubeCommand: ExpandedSubtitleTapCommandClass;
}

export interface BodyTextStyleRun {
  startIndex: number;
  length: number;
  fontColor: number;
}

export interface ItemItemSectionRenderer {
  contents: StickyContent[];
  trackingParams: string;
  sectionIdentifier: string;
}

export interface StickyContent {
  linearLayoutViewModel: LinearLayoutViewModel;
}

export interface LinearLayoutViewModel {
  items: LinearLayoutViewModelItem[];
  rendererContext: CarouselItemViewModelRendererContext;
}

export interface LinearLayoutViewModelItem {
  sectionHeaderViewModel?: SectionHeaderViewModel;
  listViewModel?: ItemListViewModel;
}

export interface ItemListViewModel {
  listItems: TentacledListItem[];
}

export interface TentacledListItem {
  listItemViewModel: TentacledListItemViewModel;
}

export interface TentacledListItemViewModel {
  title: BodyText;
  leadingImage: PurpleLeadingImage;
  elcShouldLogExplicitGestures: boolean;
  leadingImageAccessoryType: LeadingImageAccessoryType;
  trailingLabel?: BodyText;
  disableHorizontalPadding: boolean;
  leadingIconAccessorySize: LeadingIconAccessorySize;
  labelTextColorToken: ColorToken;
  leadingIconColorToken: ColorToken;
  titleMaxLines: number;
  titleTypographyToken: TypographyToken;
  trailingLabelTypographyToken: TypographyToken;
  leadingAssetAccessorySize: LeadingAssetAccessorySize;
  trailingAccessoriesList?: TrailingAccessoriesList;
}

export interface ColorToken {
  ytSysColorBaselineReference: YtSysColorBaselineReference;
}

export type YtSysColorBaselineReference =
  "YT_SYS_COLOR_BASELINE_REFERENCE_TEXT_SECONDARY";

export interface LeadingAssetAccessorySize {
  ytSysMeasurementReference: YtSysMeasurementReference;
}

export type YtSysMeasurementReference =
  "YT_SYS_MEASUREMENT_REFERENCE_ICON_SIZE_STANDARD";

export type LeadingIconAccessorySize = "LIST_ITEM_ICON_ACCESSORY_SIZE_XSMALL";

export interface PurpleLeadingImage {
  sources: PurpleSource[];
}

export interface PurpleSource {
  customImageSource: CustomImageSource;
}

export interface CustomImageSource {
  youtubeIconSource: YoutubeIconSource;
}

export interface YoutubeIconSource {
  clientResource: YoutubeIconSourceClientResource;
}

export interface YoutubeIconSourceClientResource {
  icon: IconEnum;
}

export type IconEnum =
  | "YTICON_OUTLINE_CALENDAR_S24"
  | "YTICON_OUTLINE_VIDEO_S24"
  | "YTICON_OUTLINE_THUMB_UP_S24";

export type LeadingImageAccessoryType = "LIST_ITEM_IMAGE_ACCESSORY_TYPE_ICON";

export interface TypographyToken {
  ytSysTypographyTypestackReference: YtSysTypographyTypestackReference;
}

export type YtSysTypographyTypestackReference =
  | "YT_SYS_TYPOGRAPHY_TYPESTACK_REFERENCE_BODY_M_DEFAULT"
  | "YT_SYS_TYPOGRAPHY_TYPESTACK_REFERENCE_BODY_M_HEAVY";

export interface TrailingAccessoriesList {
  trailingAccessories: TrailingAccessory[];
}

export interface TrailingAccessory {
  listItemViewCountViewModel?: ListItemViewCountViewModel;
  listItemLikeCountViewModel?: ListItemLikeCountViewModel;
}

export interface ListItemLikeCountViewModel {
  valueIfLiked: string;
  valueIfDisliked: string;
  valueIfIndifferent: string;
  statusEntityKey: string;
  countEntityKey: string;
  typographyToken: TypographyToken;
}

export interface ListItemViewCountViewModel {
  viewCount: string;
  entityKey: string;
  type: string;
  typographyToken: TypographyToken;
}

export interface SectionHeaderViewModel {
  headline: BodyText;
  sectionHeaderSize: string;
  disableHorizontalPadding: boolean;
}

export interface VideoAttributesSectionViewModel {
  headerTitle: string;
  videoAttributeViewModels: VideoAttributeViewModelElement[];
  footerButton: VideoAttributesSectionViewModelFooterButton;
}

export interface VideoAttributesSectionViewModelFooterButton {
  buttonViewModel: HilariousButtonViewModel;
}

export interface HilariousButtonViewModel {
  iconName: string;
  title: string;
  onTap: FriskyOnTap;
  accessibilityText: string;
  style: FluffyStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: TentacledType;
  buttonSize: PurpleButtonSize;
}

export interface VideoAttributeViewModelElement {
  videoAttributeViewModel: VideoAttributeViewModelVideoAttributeViewModel;
}

export interface VideoAttributeViewModelVideoAttributeViewModel {
  image: ThumbnailClass;
  imageStyle: string;
  title: string;
  subtitle: string;
  orientation: string;
  onTap: FriskyOnTap;
  sizingRule: string;
  loggingDirectives: LoggingDirectives;
}

export interface VideoDescriptionHeaderRenderer {
  channel: LiveIndicatorText;
  views: ShortViewCountClass;
  publishDate: LiveIndicatorText;
  channelNavigationEndpoint: ChannelNavigationEndpoint;
  channelThumbnail: Channel;
  factoid?: FactoidElement[];
  title?: MessageTitle;
}

export interface Channel {
  thumbnails: CommonConfig[];
}

export interface FactoidElement {
  factoidRenderer?: FactoidRenderer;
  viewCountFactoidRenderer?: ViewCountFactoidRenderer;
  uploadTimeFactoidRenderer?: UploadTimeFactoidRenderer;
}

export interface FactoidRenderer {
  value: LiveIndicatorText;
  label: LiveIndicatorText;
  accessibilityText: string;
  backgroundColorStyle: string;
  position?: string;
}

export interface UploadTimeFactoidRenderer {
  uploadTimeEntity: VisibleOnLoad;
  factoid: UploadTimeFactoidRendererFactoid;
}

export interface UploadTimeFactoidRendererFactoid {
  factoidRenderer: FactoidRenderer;
}

export interface VisibleOnLoad {
  key: string;
}

export interface ViewCountFactoidRenderer {
  viewCountEntityKey: string;
  factoid: UploadTimeFactoidRendererFactoid;
  viewCountType: string;
}

export interface VideoDescriptionInfocardsSectionRenderer {
  sectionTitle: LiveIndicatorText;
  creatorVideosButton: CreatorButton;
  creatorAboutButton: CreatorButton;
  sectionSubtitle: ShortViewCountText;
  channelAvatar: Channel;
  channelEndpoint: ChannelNavigationEndpoint;
  creatorCustomUrlButtons?: CreatorCustomURLButton[];
  trackingParams: string;
}

export interface CreatorButton {
  buttonRenderer: CreatorAboutButtonButtonRenderer;
}

export interface CreatorAboutButtonButtonRenderer {
  style: PurpleStyle;
  size: Size;
  isDisabled: boolean;
  text: LiveIndicatorText;
  icon: IconImageClass;
  trackingParams: string;
  command: RunCommand;
}

export interface CreatorCustomURLButton {
  buttonViewModel: CreatorCustomURLButtonButtonViewModel;
}

export interface CreatorCustomURLButtonButtonViewModel {
  title: string;
  onTap: OnTap1;
  style: StickyStyle;
  trackingParams: string;
  type: TentacledType;
  buttonSize: PurpleButtonSize;
  iconImage: ThumbnailElement;
}

export type StickyStyle = "BUTTON_VIEW_MODEL_STYLE_CUSTOM";

export interface VideoDescriptionTranscriptSectionRenderer {
  sectionTitle: MessageTitle;
  subHeaderText: MessageTitle;
  primaryButton: A11YSkipNavigationButtonClass;
  trackingParams: string;
}

export interface VideoTitleHeaderViewModel {
  videoTitle: VideoTitle;
  headerButton: HeaderButtonClass;
  rendererContext: CarouselItemViewModelRendererContext;
}

export interface VideoTitle {
  content: string;
  commandRuns?: VideoTitleCommandRun[];
  styleRuns?: VideoTitleStyleRun[];
}

export interface VideoTitleCommandRun {
  startIndex: number;
  length: number;
  onTap: OnTap2;
  loggingDirectives: InfoCardIconRenderer;
}

export interface OnTap2 {
  innertubeCommand: RunCommand;
}

export interface VideoTitleStyleRun {
  startIndex: number;
  length: number;
  weightLabel: string;
}

export interface EngagementPanelSectionListRendererHeader {
  engagementPanelTitleHeaderRenderer: EngagementPanelTitleHeaderRenderer;
}

export interface EngagementPanelTitleHeaderRenderer {
  title: ShortViewCountClass;
  contextualInfo?: MessageTitle;
  menu?: Menu;
  visibilityButton: CancelButton;
  trackingParams: string;
  subheader?: Subheader;
  subtitle?: ClientForecastingAdRenderer;
}

export interface Menu {
  sortFilterSubMenuRenderer?: MenuSortFilterSubMenuRenderer;
  menuRenderer?: MenuMenuRenderer;
}

export interface MenuMenuRenderer {
  items: StickyItem[];
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
}

export interface StickyItem {
  menuServiceItemRenderer: FluffyMenuServiceItemRenderer;
}

export interface FluffyMenuServiceItemRenderer {
  text: MessageTitle;
  serviceEndpoint: OnResponseReceivedEndpoint;
  trackingParams: string;
}

export interface OnResponseReceivedEndpoint {
  clickTrackingParams: string;
  commandMetadata?: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
  loadMarkersCommand?: LoadMarkersCommand;
}

export interface LoadMarkersCommand {
  entityKeys?: string[];
  visibleOnLoadKeys?: string[];
}

export interface MenuSortFilterSubMenuRenderer {
  subMenuItems: SubMenuItem[];
  icon: IconImageClass;
  accessibility: DisabledAccessibilityData;
  trackingParams: string;
}

export interface Subheader {
  chipBarViewModel: ChipBarViewModel;
}

export interface ChipBarViewModel {
  chips: Chip[];
  chipBarStateEntityKey: string;
}

export interface Chip {
  chipViewModel: ChipViewModel;
}

export interface ChipViewModel {
  text: string;
  selected: boolean;
  displayType: string;
  tapCommand: TapCommand;
  accessibilityLabel: string;
  loggingDirectives: LoggingDirectives;
}

export interface TapCommand {
  innertubeCommand: TapCommandInnertubeCommand;
}

export interface TapCommandInnertubeCommand {
  clickTrackingParams: string;
  commandExecutorCommand: IndigoCommandExecutorCommand;
}

export interface IndigoCommandExecutorCommand {
  commands: Command2[];
}

export interface Command2 {
  clickTrackingParams: string;
  updateEngagementPanelContentCommand?: PurpleUpdateEngagementPanelContentCommand;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
}

export interface OnCloseCommand {
  clickTrackingParams: string;
  commandExecutorCommand: OnCloseCommandCommandExecutorCommand;
}

export interface OnCloseCommandCommandExecutorCommand {
  commands: Command3[];
}

export interface Command3 {
  clickTrackingParams: string;
  updateTimedMarkersSyncObserverCommand: UpdateTimedMarkersSyncObserverCommand;
}

export interface OnShowCommand {
  clickTrackingParams: string;
  scrollToEngagementPanelCommand: OnShowCommandScrollToEngagementPanelCommand;
}

export interface InitialDataFrameworkUpdates {
  entityBatchUpdate: TentacledEntityBatchUpdate;
}

export interface TentacledEntityBatchUpdate {
  mutations: TentacledMutation[];
  timestamp: PurpleTimestamp;
}

export interface TentacledMutation {
  entityKey: string;
  type: MutationType;
  payload?: FluffyPayload;
  options?: Options;
}

export interface Options {
  persistenceOption: string;
}

export interface FluffyPayload {
  teasersOrderEntity?: TeasersOrderEntity;
  likeStatusEntity?: LikeStatusEntity;
  subscriptionStateEntity?: SubscriptionStateEntity;
  viewCountEntity?: PurpleViewCountEntity;
  macroMarkersListEntity?: MacroMarkersListEntity;
}

export interface MacroMarkersListEntity {
  key: string;
  externalVideoId: VideoID;
  markersList: MarkersList;
}

export interface MarkersList {
  markerType: string;
  markers: Marker[];
  markersMetadata: MarkersMetadata;
  markersDecoration: MarkersDecoration;
}

export interface Marker {
  startMillis: string;
  durationMillis: string;
  intensityScoreNormalized: number;
}

export interface MarkersDecoration {
  timedMarkerDecorations: TimedMarkerDecoration[];
}

export interface TimedMarkerDecoration {
  visibleTimeRangeStartMillis: number;
  visibleTimeRangeEndMillis: number;
  decorationTimeMillis: number;
  label: MessageTitle;
  icon: string;
}

export interface MarkersMetadata {
  heatmapMetadata: HeatmapMetadata;
}

export interface HeatmapMetadata {
  maxHeightDp: number;
  minHeightDp: number;
  showHideAnimationDurationMillis: number;
}

export interface SubscriptionStateEntity {
  key: string;
  subscribed: boolean;
}

export interface TeasersOrderEntity {
  collectionKey: string;
  teasersInOrder: string[];
  orderedTeasers: string[];
}

export interface PurpleViewCountEntity {
  key: string;
  viewCount: LiveIndicatorText;
  shortViewCount: ShortViewCountText;
  extraShortViewCount: ShortViewCountText;
  viewCountLength: number;
  shortViewCountLength: number;
  unlabeledViewCountValue: LiveIndicatorText;
  viewCountLabel: LiveIndicatorText;
  viewCountNumber: string;
  extraShortViewCountLength: number;
  videoType: string;
}

export interface PurpleTimestamp {
  seconds: string;
  nanos: number;
}

export interface InitialDataMicroformat {
  microformatDataRenderer: MicroformatDataRenderer;
}

export interface MicroformatDataRenderer {
  videoDetails: MicroformatDataRendererVideoDetails;
}

export interface MicroformatDataRendererVideoDetails {
  comments: Comment[];
}

export interface Comment {
  type: string;
  dateCreated: Date;
  text: string;
  author: Author;
  upvoteCount?: number;
}

export interface Author {
  type: string;
  name: string;
  url: string;
  alternateName: string;
}

export interface PageVisualEffect {
  cinematicContainerRenderer: CinematicContainerRenderer;
}

export interface CinematicContainerRenderer {
  gradientColorConfig?: GradientColorConfig[];
  presentationStyle: string;
  config: CinematicContainerRendererConfig;
  colorStore?: ColorStore;
}

export interface ColorStore {
  sampledColors: SampledColor[];
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
  crossfadeStartOffset: number;
  maxFrameRate: number;
  minImageUpdateIntervalMs?: number;
  crossfadeDurationMs?: number;
}

export interface WatchFullscreenConfig {
  colorSourceWidthMultiplier: number;
  colorSourceHeightMultiplier: number;
  scrimWidthMultiplier: number;
  scrimHeightMultiplier: number;
  scrimGradientConfig: ScrimGradientConfig;
}

export interface ScrimGradientConfig {
  gradientType: string;
  gradientColors?: GradientColor[];
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
  autoplay: PlayerOverlayRendererAutoplay;
  shareButton: ShareButtonClass;
  addToMenu: AddToMenu;
  videoDetails: PlayerOverlayRendererVideoDetails;
  liveIndicatorText?: LiveIndicatorText;
  autonavToggle: AutonavToggle;
  decoratedPlayerBarRenderer: PlayerOverlayRendererDecoratedPlayerBarRenderer;
  fullscreenQuickActionsBar: FullscreenQuickActionsBar;
  speedmasterUserEdu: SpeedmasterUserEdu;
  showPlaybackRateUpsellPanelCommand: ShowPlaybackRateUpsellPanelCommandClass;
}

export interface AddToMenu {
  menuRenderer: AddToMenuMenuRenderer;
}

export interface AddToMenuMenuRenderer {
  items: IndigoItem[];
  trackingParams: string;
}

export interface IndigoItem {
  menuNavigationItemRenderer: MenuItemRenderer;
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
  settingItemIdForClient: SettingItemIDForClient;
}

export type SettingItemIDForClient = "AUTONAV_FOR_SIGN_OUT";

export interface PlayerOverlayRendererAutoplay {
  playerOverlayAutoplayRenderer: PlayerOverlayAutoplayRenderer;
}

export interface PlayerOverlayAutoplayRenderer {
  title: LiveIndicatorText;
  videoTitle: ShortViewCountText;
  byline: Byline;
  pauseText: LiveIndicatorText;
  background: Background;
  countDownSecs: number;
  cancelButton: CancelButton;
  nextButton: CancelButton;
  trackingParams: string;
  closeButton: A11YSkipNavigationButtonClass;
  thumbnailOverlays: PlayerOverlayAutoplayRendererThumbnailOverlay[];
  preferImmediateRedirect: boolean;
  videoId: string;
  publishedTimeText: LiveIndicatorText;
  webShowNewAutonavCountdown: boolean;
  webShowBigThumbnailEndscreen: boolean;
  shortViewCountText: ShortViewCountText;
  countDownSecsForFullscreen: number;
}

export interface Background {
  thumbnails: ThumbnailElement[];
  lightColorPalette: BackgroundDarkColorPalette;
  darkColorPalette: BackgroundDarkColorPalette;
}

export interface BackgroundDarkColorPalette {
  section2Color: number;
  section3Color: number;
  primaryTitleColor: number;
  secondaryTitleColor: number;
  section4Color: number;
}

export interface Byline {
  runs: BylineRun[];
}

export interface BylineRun {
  text: string;
  navigationEndpoint: IndigoNavigationEndpoint;
}

export interface IndigoNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: TentacledCommandMetadata;
  browseEndpoint?: ChannelNavigationEndpointBrowseEndpoint;
  showDialogCommand?: NavigationEndpointShowDialogCommand;
}

export interface TentacledCommandMetadata {
  webCommandMetadata?: PurpleWebCommandMetadata;
  interactionLoggingCommandMetadata?: InteractionLoggingCommandMetadata;
}

export interface PlayerOverlayAutoplayRendererThumbnailOverlay {
  thumbnailOverlayTimeStatusRenderer: PurpleThumbnailOverlayTimeStatusRenderer;
}

export interface PurpleThumbnailOverlayTimeStatusRenderer {
  text: ShortViewCountText;
  style: ThumbnailOverlayTimeStatusRendererStyle;
}

export type ThumbnailOverlayTimeStatusRendererStyle = "LIVE" | "DEFAULT";

export interface PlayerOverlayRendererDecoratedPlayerBarRenderer {
  decoratedPlayerBarRenderer: DecoratedPlayerBarRendererDecoratedPlayerBarRenderer;
}

export interface DecoratedPlayerBarRendererDecoratedPlayerBarRenderer {
  playerBar?: PlayerBar;
  playerBarActionButton?: PlayerBarActionButton;
  buttonType?: string;
}

export interface PlayerBar {
  multiMarkersPlayerBarRenderer: MultiMarkersPlayerBarRenderer;
}

export interface MultiMarkersPlayerBarRenderer {
  visibleOnLoad: VisibleOnLoad;
  markersMap?: MarkersMap[];
  trackingParams: string;
}

export interface MarkersMap {
  key: string;
  value: Value;
}

export interface Value {
  chapters: Chapter[];
  trackingParams: string;
  onChapterRepeat: OnChapterRepeat;
}

export interface Chapter {
  chapterRenderer: ChapterRenderer;
}

export interface ChapterRenderer {
  title: LiveIndicatorText;
  timeRangeStartMillis: number;
  onActiveCommand: OnActiveCommand;
  thumbnail: IconClass;
}

export interface OnActiveCommand {
  clickTrackingParams: string;
  setActivePanelItemAction: SetActivePanelItemAction;
}

export interface SetActivePanelItemAction {
  panelTargetId: PanelIdentifier;
  itemIndex: number;
}

export interface OnChapterRepeat {
  clickTrackingParams: string;
  openPopupAction: OnChapterRepeatOpenPopupAction;
}

export interface OnChapterRepeatOpenPopupAction {
  popup: StickyPopup;
  popupType: string;
}

export interface StickyPopup {
  notificationActionRenderer: NotificationActionRenderer;
}

export interface NotificationActionRenderer {
  responseText: MessageTitle;
  actionButton: ActionButton;
  trackingParams: string;
}

export interface ActionButton {
  buttonRenderer: FluffyButtonRenderer;
}

export interface FluffyButtonRenderer {
  style: DownloadButtonRendererStyle;
  text: MessageTitle;
  trackingParams: string;
  command: Command4;
}

export interface Command4 {
  clickTrackingParams: string;
  repeatChapterCommand: CommandRepeatChapterCommand;
}

export interface PlayerBarActionButton {
  buttonRenderer: PlayerBarActionButtonButtonRenderer;
}

export interface PlayerBarActionButtonButtonRenderer {
  text: MessageTitle;
  trackingParams: string;
  command: Command5;
  tooltip?: string;
  loggingDirectives?: LoggingDirectives;
}

export interface Command5 {
  clickTrackingParams: ClickTrackingParams;
  commandExecutorCommand: IndecentCommandExecutorCommand;
}

export type ClickTrackingParams =
  | "CGMQkNAGIhMItur43-G-lwMVk_I4Bh2MawtOygEE7TEc3w=="
  | "CEYQ3IMOIhMItd3x9-K-lwMV40adCR0Q_woEygEEsSqeWw==";

export interface IndecentCommandExecutorCommand {
  commands: Command6[];
}

export interface Command6 {
  clickTrackingParams: ClickTrackingParams;
  updateEngagementPanelContentCommand?: PurpleUpdateEngagementPanelContentCommand;
  updateTimedMarkersSyncObserverCommand?: UpdateTimedMarkersSyncObserverCommand;
  entityUpdateCommand?: PurpleEntityUpdateCommand;
  scrollToEngagementPanelCommand?: PurpleScrollToEngagementPanelCommand;
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
  endScreenVideoRenderer: EndScreenVideoRenderer;
}

export interface EndScreenVideoRenderer {
  videoId: string;
  thumbnail: Background;
  title: ShortViewCountText;
  shortBylineText: Byline;
  navigationEndpoint: OnSelectNavigationEndpoint;
  trackingParams: string;
  shortViewCountText: ShortViewCountTextClass;
  publishedTimeText: LiveIndicatorText;
  thumbnailOverlays: EndScreenVideoRendererThumbnailOverlay[];
  lengthText?: ShortViewCountText;
  lengthInSeconds?: number;
}

export interface ShortViewCountTextClass {
  runs?: MessageTitleRun[];
  accessibility: DisabledAccessibilityData;
  simpleText?: string;
}

export interface EndScreenVideoRendererThumbnailOverlay {
  thumbnailOverlayTimeStatusRenderer?: FluffyThumbnailOverlayTimeStatusRenderer;
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
}

export interface ThumbnailOverlayNowPlayingRenderer {
  text: MessageTitle;
}

export interface FluffyThumbnailOverlayTimeStatusRenderer {
  text: ShortViewCountTextClass;
  style: ThumbnailOverlayTimeStatusRendererStyle;
  icon?: IconImageClass;
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
  iconName: FluffyIconName;
  onTap: OnTap3;
  accessibilityText: TooltipEnum;
  style: TentacledStyle;
  trackingParams: string;
  isFullWidth?: boolean;
  type: TentacledType;
  buttonSize: FluffyButtonSize;
  state?: StateEnum;
  accessibilityId?: string;
  enableIconButton?: boolean;
  tooltipData: TooltipData;
}

export type FluffyIconName = "SHARE" | "MORE_HORIZ";

export interface OnTap3 {
  serialCommand?: FluffySerialCommand;
  innertubeCommand?: AmbitiousInnertubeCommand;
}

export interface AmbitiousInnertubeCommand {
  clickTrackingParams: string;
  openPopupAction: InnertubeCommandOpenPopupAction;
}

export interface InnertubeCommandOpenPopupAction {
  popup: IndigoPopup;
  popupType: string;
}

export interface IndigoPopup {
  menuPopupRenderer: FluffyMenuPopupRenderer;
}

export interface FluffyMenuPopupRenderer {
  items: IndecentItem[];
}

export interface IndecentItem {
  menuServiceItemRenderer: MenuItemRenderer;
}

export interface QuickActionButtonToggleButtonViewModel {
  defaultButtonViewModel: FluffyDefaultButtonViewModel;
  toggledButtonViewModel: FluffyToggledButtonViewModel;
  trackingParams: string;
  toggledStateEntitySelectorType: string;
}

export interface FluffyDefaultButtonViewModel {
  buttonViewModel: AmbitiousButtonViewModel;
}

export interface AmbitiousButtonViewModel {
  iconName: string;
  onTap: OnTap4;
  accessibilityText: string;
  style: TentacledStyle;
  trackingParams: string;
  isFullWidth?: boolean;
  type: TentacledType;
  buttonSize: FluffyButtonSize;
  state: StateEnum;
  accessibilityId?: string;
  enableIconButton: boolean;
  tooltipData?: TooltipData;
}

export interface OnTap4 {
  serialCommand?: IndigoSerialCommand;
  innertubeCommand?: CunningInnertubeCommand;
}

export interface CunningInnertubeCommand {
  clickTrackingParams: string;
  commandExecutorCommand: HilariousCommandExecutorCommand;
}

export interface HilariousCommandExecutorCommand {
  commands: Command7[];
}

export interface Command7 {
  clickTrackingParams: string;
  showEngagementPanelEndpoint?: InnertubeCommandHideEngagementPanelEndpoint;
  scrollToEngagementPanelCommand?: ScrollToEngagementPanelCommandClass;
}

export interface IndigoSerialCommand {
  commands: Command8[];
}

export interface Command8 {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: PurpleInnertubeCommand;
}

export interface FluffyToggledButtonViewModel {
  buttonViewModel: CunningButtonViewModel;
}

export interface CunningButtonViewModel {
  iconName: string;
  onTap: OnTap5;
  accessibilityText: string;
  style: TentacledStyle;
  trackingParams: string;
  isFullWidth?: boolean;
  type: TentacledType;
  buttonSize: FluffyButtonSize;
  state: StateEnum;
  accessibilityId?: string;
  enableIconButton: boolean;
  tooltipData?: TooltipData;
}

export interface OnTap5 {
  serialCommand?: IndecentSerialCommand;
  innertubeCommand?: MagentaInnertubeCommand;
}

export interface MagentaInnertubeCommand {
  clickTrackingParams: string;
  hideEngagementPanelEndpoint: InnertubeCommandHideEngagementPanelEndpoint;
}

export interface IndecentSerialCommand {
  commands: Command9[];
}

export interface Command9 {
  logGestureCommand?: LogGestureCommand;
  innertubeCommand?: FriskyInnertubeCommand;
}

export interface FriskyInnertubeCommand {
  clickTrackingParams: string;
  commandExecutorCommand: AmbitiousCommandExecutorCommand;
}

export interface AmbitiousCommandExecutorCommand {
  commands: Command10[];
}

export interface Command10 {
  clickTrackingParams: string;
  setLiveChatCollapsedStateAction?: SetLiveChatCollapsedStateAction;
  popoutLiveChatEndpoint?: CommonConfig;
}

export interface SetLiveChatCollapsedStateAction {
  collapsed: boolean;
}

export interface ShareButtonClass {
  buttonRenderer: VoiceSearchButtonButtonRenderer;
}

export interface VoiceSearchButtonButtonRenderer {
  style: IndigoStyle;
  size: Size;
  isDisabled: boolean;
  icon: IconImageClass;
  navigationEndpoint?: CommandNavigationEndpoint;
  tooltip: ButtonRendererTooltip;
  trackingParams: string;
  serviceEndpoint?: ButtonRendererServiceEndpoint;
  accessibilityData?: DisabledAccessibilityData;
}

export interface ButtonRendererServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint: PurpleSignalServiceEndpoint;
}

export interface PurpleSignalServiceEndpoint {
  signal: Signal;
  actions: StickyAction[];
}

export interface StickyAction {
  clickTrackingParams: string;
  openPopupAction: StickyOpenPopupAction;
}

export interface StickyOpenPopupAction {
  popup: IndecentPopup;
  popupType: string;
}

export interface IndecentPopup {
  voiceSearchDialogRenderer: VoiceSearchDialogRenderer;
}

export interface VoiceSearchDialogRenderer {
  placeholderHeader: MessageTitle;
  promptHeader: MessageTitle;
  exampleQuery1: MessageTitle;
  exampleQuery2: MessageTitle;
  promptMicrophoneLabel: MessageTitle;
  loadingHeader: MessageTitle;
  connectionErrorHeader: MessageTitle;
  connectionErrorMicrophoneLabel: MessageTitle;
  permissionsHeader: MessageTitle;
  permissionsSubtext: MessageTitle;
  disabledHeader: MessageTitle;
  disabledSubtext: MessageTitle;
  microphoneButtonAriaLabel: MessageTitle;
  exitButton: CancelButton;
  trackingParams: string;
  microphoneOffPromptHeader: MessageTitle;
}

export type IndigoStyle = "STYLE_OPACITY" | "STYLE_DEFAULT";

export type ButtonRendererTooltip = "Share" | "Search with your voice";

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
  subtitle: MessageTitle;
  onTap: PlayerOverlayVideoDetailsRendererOnTap;
}

export interface PlayerOverlayVideoDetailsRendererOnTap {
  clickTrackingParams: string;
  showEngagementPanelEndpoint: OnTapShowEngagementPanelEndpoint;
}

export interface InitialDataResponseContext {
  serviceTrackingParams: ServiceTrackingParam[];
  mainAppWebResponseContext: PurpleMainAppWebResponseContext;
  responseId: string;
  webResponseContextExtensionData: PurpleWebResponseContextExtensionData;
}

export interface PurpleMainAppWebResponseContext {
  loggedOut: boolean;
  trackingParam: string;
}

export interface ServiceTrackingParam {
  service: Service;
  params: Param[];
}

export type Service = "CSI" | "GFEEDBACK" | "GUIDED_HELP" | "ECATCHER";

export interface PurpleWebResponseContextExtensionData {
  webResponseContextPreloadData: WebResponseContextPreloadData;
  ytConfigData: YtConfigData;
  webPrefetchData: WebPrefetchData;
  hasDecorated: boolean;
}

export interface WebPrefetchData {
  navigationEndpoints: NavigationEndpointElement[];
}

export interface WebResponseContextPreloadData {
  preloadMessageNames: string[];
}

export interface YtConfigData {
  visitorData: string;
  rootVisualElementType: number;
}

export interface Topbar {
  desktopTopbarRenderer: DesktopTopbarRenderer;
}

export interface DesktopTopbarRenderer {
  logo: Logo;
  searchbox: Searchbox;
  trackingParams: string;
  countryCode: string;
  topbarButtons: TopbarButton[];
  hotkeyDialog: HotkeyDialog;
  backButton: BackButtonClass;
  forwardButton: BackButtonClass;
  a11ySkipNavigationButton: A11YSkipNavigationButtonClass;
  voiceSearchButton: ShareButtonClass;
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
  title: MessageTitle;
  sections: Section[];
  dismissButton: A11YSkipNavigationButtonClass;
  trackingParams: string;
}

export interface Section {
  hotkeyDialogSectionRenderer: HotkeyDialogSectionRenderer;
}

export interface HotkeyDialogSectionRenderer {
  title: MessageTitle;
  options: Option[];
}

export interface Option {
  hotkeyDialogSectionOptionRenderer: HotkeyDialogSectionOptionRenderer;
}

export interface HotkeyDialogSectionOptionRenderer {
  label: MessageTitle;
  hotkey: string;
  hotkeyAccessibilityLabel?: DisabledAccessibilityData;
}

export interface Logo {
  topbarLogoRenderer: TopbarLogoRenderer;
}

export interface TopbarLogoRenderer {
  iconImage: IconImageClass;
  tooltipText: MessageTitle;
  endpoint: NavigationEndpointClass;
  trackingParams: string;
  overrideEntityKey: string;
}

export interface Searchbox {
  fusionSearchboxRenderer: FusionSearchboxRenderer;
}

export interface FusionSearchboxRenderer {
  icon: IconImageClass;
  placeholderText: MessageTitle;
  config: FusionSearchboxRendererConfig;
  trackingParams: string;
  searchEndpoint: FusionSearchboxRendererSearchEndpoint;
  clearButton: CancelButton;
  showImageSourceDialog: ShowImageSourceDialog;
  disableAiAppearance: boolean;
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
  panelLoadingStrategy: IndigoPanelLoadingStrategy;
}

export interface IndigoPanelLoadingStrategy {
  inlineContent: TentacledInlineContent;
}

export interface TentacledInlineContent {
  dialogViewModel: FluffyDialogViewModel;
}

export interface FluffyDialogViewModel {
  header: DialogViewModelHeader;
  footer: Footer;
  content: DialogViewModelContent;
}

export interface DialogViewModelContent {
  basicContentViewModel: BasicContentViewModel;
}

export interface BasicContentViewModel {
  paragraphs: VideoSummaryParagraphViewModel[];
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
  title: TitleEnum;
  style: FluffyStyle;
  trackingParams: string;
  isFullWidth: boolean;
  type: StickyType;
}

export type TitleEnum = "Visit source" | "Cancel";

export type StickyType =
  "BUTTON_VIEW_MODEL_TYPE_FILLED" | "BUTTON_VIEW_MODEL_TYPE_TONAL";

export interface TopbarButton {
  topbarMenuButtonRenderer?: TopbarMenuButtonRenderer;
  buttonRenderer?: TopbarButtonButtonRenderer;
}

export interface TopbarButtonButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: string;
  text: MessageTitle;
  icon: IconImageClass;
  navigationEndpoint: IndecentNavigationEndpoint;
  trackingParams: string;
  targetId: string;
}

export interface IndecentNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  signInEndpoint: FluffySignInEndpoint;
}

export interface FluffySignInEndpoint {
  idamTag: string;
}

export interface TopbarMenuButtonRenderer {
  icon: IconImageClass;
  menuRequest: MenuRequest;
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
  tooltip: string;
  style: DownloadButtonRendererStyle;
}

export interface MenuRequest {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  signalServiceEndpoint: MenuRequestSignalServiceEndpoint;
}

export interface MenuRequestSignalServiceEndpoint {
  signal: string;
  actions: IndigoAction[];
}

export interface IndigoAction {
  clickTrackingParams: string;
  openPopupAction: IndigoOpenPopupAction;
}

export interface IndigoOpenPopupAction {
  popup: HilariousPopup;
  popupType: string;
  beReused: boolean;
}

export interface HilariousPopup {
  multiPageMenuRenderer: MultiPageMenuRenderer;
}

export interface MultiPageMenuRenderer {
  trackingParams: string;
  style: string;
  showLoadingSpinner: boolean;
}

export interface InitialPlayerResponse {
  responseContext: InitialPlayerResponseResponseContext;
  playabilityStatus: PlayabilityStatus;
  streamingData?: StreamingData;
  heartbeatParams?: HeartbeatParams;
  playbackTracking?: PlaybackTracking;
  videoDetails: InitialPlayerResponseVideoDetails;
  annotations?: Annotation[];
  playerConfig?: PlayerConfig;
  storyboards?: Storyboards;
  microformat: InitialPlayerResponseMicroformat;
  cards?: Cards;
  trackingParams: string;
  messages?: Message[];
  adPlacements?: AdPlacement[];
  adBreakHeartbeatParams: string;
  frameworkUpdates: InitialPlayerResponseFrameworkUpdates;
  captions?: Captions;
}

export interface AdPlacement {
  adPlacementRenderer: AdPlacementRenderer;
}

export interface AdPlacementRenderer {
  config: AdPlacementRendererConfig;
  renderer: Renderer;
  adSlotLoggingData: AdSlotLoggingData;
}

export interface AdSlotLoggingData {
  serializedSlotAdServingDataEntry: string;
}

export interface AdPlacementRendererConfig {
  adPlacementConfig: AdPlacementConfig;
}

export interface AdPlacementConfig {
  kind: string;
  adTimeOffset: AdTimeOffset;
  hideCueRangeMarker: boolean;
}

export interface AdTimeOffset {
  offsetStartMilliseconds: string;
  offsetEndMilliseconds: string;
}

export interface Renderer {
  clientForecastingAdRenderer: ClientForecastingAdRenderer;
}

export interface Annotation {
  playerAnnotationsExpandedRenderer: PlayerAnnotationsExpandedRenderer;
}

export interface PlayerAnnotationsExpandedRenderer {
  featuredChannel: FeaturedChannel;
  allowSwipeDismiss: boolean;
  annotationId: string;
}

export interface FeaturedChannel {
  startTimeMs: string;
  endTimeMs: string;
  watermark: IconClass;
  trackingParams: string;
  navigationEndpoint: NavigationEndpointClass;
  channelName: string;
  subscribeButton: FeaturedChannelSubscribeButton;
}

export interface FeaturedChannelSubscribeButton {
  subscribeButtonRenderer: FluffySubscribeButtonRenderer;
}

export interface FluffySubscribeButtonRenderer {
  buttonText: MessageTitle;
  subscribed: boolean;
  enabled: boolean;
  type: string;
  channelId: ID;
  showPreferences: boolean;
  subscribedButtonText: MessageTitle;
  unsubscribedButtonText: MessageTitle;
  trackingParams: string;
  unsubscribeButtonText: MessageTitle;
  serviceEndpoints: ServiceEndpointElement[];
  subscribeAccessibility: DisabledAccessibilityData;
  unsubscribeAccessibility: DisabledAccessibilityData;
  signInEndpoint: TentacledSignInEndpoint;
}

export interface TentacledSignInEndpoint {
  clickTrackingParams: string;
  commandMetadata: StickyCommandMetadata;
}

export interface StickyCommandMetadata {
  webCommandMetadata: CommonConfig;
}

export interface Captions {
  playerCaptionsTracklistRenderer: PlayerCaptionsTracklistRenderer;
}

export interface PlayerCaptionsTracklistRenderer {
  captionTracks: CaptionTrack[];
  audioTracks: AudioTrackElement[];
  translationLanguages: TranslationLanguage[];
  defaultAudioTrackIndex: number;
}

export interface AudioTrackElement {
  captionTrackIndices: number[];
  defaultCaptionTrackIndex?: number;
  hasDefaultTrack?: boolean;
  captionsInitialState?: string;
  audioTrackId?: AudioTrackID;
}

export type AudioTrackID = "en-US.10" | "id.4";

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

export interface InitialPlayerResponseFrameworkUpdates {
  entityBatchUpdate: StickyEntityBatchUpdate;
}

export interface StickyEntityBatchUpdate {
  mutations: StickyMutation[];
  timestamp: PurpleTimestamp;
}

export interface StickyMutation {
  entityKey: string;
  type: MutationType;
  payload: TentacledPayload;
}

export interface TentacledPayload {
  offlineabilityEntity: OfflineabilityEntity;
}

export interface OfflineabilityEntity {
  key: string;
  offlineabilityRenderer?: string;
  addToOfflineButtonState: string;
  contentCheckOk?: boolean;
  racyCheckOk?: boolean;
  loggingDirectives?: LoggingDirectives;
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

export interface Message {
  mealbarPromoRenderer: MealbarPromoRenderer;
}

export interface MealbarPromoRenderer {
  icon: IconClass;
  messageTexts: MessageTitle[];
  actionButton: A11YSkipNavigationButtonClass;
  dismissButton: A11YSkipNavigationButtonClass;
  triggerCondition: string;
  style: string;
  trackingParams: string;
  impressionEndpoints: ImpressionEndpoint[];
  isVisible: boolean;
  messageTitle: MessageTitle;
  iconDark: IconClass;
  supplementalText: MessageTitle;
}

export interface ImpressionEndpoint {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  feedbackEndpoint: FeedbackEndpoint;
}

export interface InitialPlayerResponseMicroformat {
  playerMicroformatRenderer: PlayerMicroformatRenderer;
}

export interface PlayerMicroformatRenderer {
  thumbnail: IconClass;
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
  externalVideoId: VideoID;
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
  videoId: VideoID;
  broadcastId: string;
  pollDelayMs: string;
  offlineSlate?: OfflineSlate;
}

export interface OfflineSlate {
  liveStreamOfflineSlateRenderer: LiveStreamOfflineSlateRenderer;
}

export interface LiveStreamOfflineSlateRenderer {
  scheduledStartTime: string;
  mainText: MessageTitle;
  subtitleText: LiveIndicatorText;
  thumbnail: IconClass;
  offlineSlateStyle: string;
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
  infoRenderer?: InfoRenderer;
  clickTrackingParams: string;
  formats?: Format[];
}

export interface Format {
  name: MessageTitle;
  formatType: string;
  availabilityType: AvailabilityType;
  savedSettingShouldExpire: boolean;
}

export type AvailabilityType =
  | "OFFLINEABILITY_AVAILABILITY_TYPE_PREMIUM_LOCKED"
  | "OFFLINEABILITY_AVAILABILITY_TYPE_FREE";

export interface InfoRenderer {
  dismissableDialogRenderer: DismissableDialogRenderer;
}

export interface DismissableDialogRenderer {
  dialogMessage: string;
  trackingParams: string;
  title: string;
}

export interface PlaybackTracking {
  videostatsPlaybackUrl: PtrackingURLClass;
  videostatsDelayplayUrl: PtrackingURLClass;
  videostatsWatchtimeUrl: PtrackingURLClass;
  ptrackingUrl: PtrackingURLClass;
  qoeUrl: PtrackingURLClass;
  atrUrl: AtrURLClass;
  videostatsScheduledFlushWalltimeSeconds: number[];
  videostatsDefaultFlushIntervalSeconds: number;
  youtubeRemarketingUrl?: AtrURLClass;
  googleRemarketingUrl?: AtrURLClass;
}

export interface AtrURLClass {
  baseUrl: string;
  elapsedMediaTimeSeconds: number;
}

export interface PtrackingURLClass {
  baseUrl: string;
}

export interface PlayerConfig {
  granularVariableSpeedConfig: GranularVariableSpeedConfig;
  vssClientConfig: VssClientConfig;
  audioConfig: AudioConfig;
  streamSelectionConfig: StreamSelectionConfig;
  playerControlsConfig: PlayerControlsConfig;
  livePlayerConfig?: LivePlayerConfig;
  daiConfig: DaiConfig;
  mediaCommonConfig: MediaCommonConfig;
  webPlayerConfig: WebPlayerConfig;
}

export interface AudioConfig {
  enablePerFormatLoudness: boolean;
  loudnessTargetLkfs: number;
  loudnessNormalizationConfig: LoudnessNormalizationConfig;
  loudnessDb?: number;
  perceptualLoudnessDb?: number;
  trackAbsoluteLoudnessLkfs?: number;
}

export interface LoudnessNormalizationConfig {
  applyStatefulNormalization: boolean;
  preserveStatefulLoudnessTarget: boolean;
  maxStatefulTimeThresholdSec: number;
  minimumLoudnessTargetLkfs: number;
}

export interface DaiConfig {
  enableDai?: boolean;
  enableServerStitchedDai?: boolean;
  daiType?: string;
  enablePreroll?: boolean;
  ssaEnabledPlayback?: boolean;
  allowUstreamerRequestAdconfig?: boolean;
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
  hasSubfragmentedWebm: boolean;
  isLiveHeadPlayable: boolean;
}

export interface MediaCommonConfig {
  dynamicReadaheadConfig: DynamicReadaheadConfig;
  mediaUstreamerRequestConfig: MediaUstreamerRequestConfig;
  useServerDrivenAbr: boolean;
  serverPlaybackStartConfig: ServerPlaybackStartConfig;
  enableServerDrivenRequestCancellation?: boolean;
  splitScreenEligible?: boolean;
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

export interface PlayerControlsConfig {
  showCachedInTimebar: boolean;
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
  removeFromWatchLaterCommand: RemoveFromWatchLaterCommand;
}

export interface AddToWatchLaterCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  playlistEditEndpoint: AddToWatchLaterCommandPlaylistEditEndpoint;
}

export interface AddToWatchLaterCommandPlaylistEditEndpoint {
  playlistId: string;
  actions: IndecentAction[];
}

export interface IndecentAction {
  addedVideoId: VideoID;
  action: string;
}

export interface GetSharePanelCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  webPlayerShareEntityServiceEndpoint: WebPlayerShareEntityServiceEndpoint;
}

export interface WebPlayerShareEntityServiceEndpoint {
  serializedShareEntity: string;
}

export interface RemoveFromWatchLaterCommand {
  clickTrackingParams: string;
  commandMetadata: ContinuationEndpointCommandMetadata;
  playlistEditEndpoint: RemoveFromWatchLaterCommandPlaylistEditEndpoint;
}

export interface RemoveFromWatchLaterCommandPlaylistEditEndpoint {
  playlistId: string;
  actions: HilariousAction[];
}

export interface HilariousAction {
  action: string;
  removedVideoId: VideoID;
}

export interface InitialPlayerResponseResponseContext {
  serviceTrackingParams: ServiceTrackingParam[];
  maxAgeSeconds: number;
  mainAppWebResponseContext: PurpleMainAppWebResponseContext;
  responseId: string;
  webResponseContextExtensionData: FluffyWebResponseContextExtensionData;
}

export interface FluffyWebResponseContextExtensionData {
  webResponseContextPreloadData?: WebResponseContextPreloadData;
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
  serverAbrStreamingUrl: string;
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
  qualityOrdinal: QualityOrdinal;
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
  xtags?: string;
  isDrc?: boolean;
  isVb?: boolean;
  appliedDrcTargetCenterForBackgroundDb?: number;
  appliedVocalsGainFactor?: number;
  vocalsBackgroundLoudnessDifferenceDb?: number;
  audioTrack?: AdaptiveFormatAudioTrack;
}

export type AudioQuality = "AUDIO_QUALITY_MEDIUM" | "AUDIO_QUALITY_LOW";

export interface AdaptiveFormatAudioTrack {
  displayName: DisplayName;
  id: AudioTrackID;
  audioIsDefault: boolean;
  isAutoDubbed?: boolean;
}

export type DisplayName = "English (US)" | "Indonesian original";

export interface ColorInfo {
  primaries: Primaries;
  transferCharacteristics: TransferCharacteristics;
  matrixCoefficients: MatrixCoefficients;
}

export type MatrixCoefficients = "COLOR_MATRIX_COEFFICIENTS_BT709";

export type Primaries = "COLOR_PRIMARIES_BT709";

export type TransferCharacteristics = "COLOR_TRANSFER_CHARACTERISTICS_BT709";

export interface Range {
  start: string;
  end: string;
}

export type ProjectionType = "RECTANGULAR";

export type Quality =
  | "hd1080"
  | "hd720"
  | "large"
  | "medium"
  | "small"
  | "tiny"
  | "hd2160"
  | "hd1440";

export type QualityOrdinal =
  | "QUALITY_ORDINAL_1080P"
  | "QUALITY_ORDINAL_720P"
  | "QUALITY_ORDINAL_480P"
  | "QUALITY_ORDINAL_360P"
  | "QUALITY_ORDINAL_240P"
  | "QUALITY_ORDINAL_144P"
  | "QUALITY_ORDINAL_UNKNOWN"
  | "QUALITY_ORDINAL_2160P"
  | "QUALITY_ORDINAL_1440P";

export interface InitialPlayerResponseVideoDetails {
  videoId: VideoID;
  title: string;
  lengthSeconds: string;
  isLive?: boolean;
  keywords?: string[];
  channelId: ID;
  isOwnerViewing: boolean;
  shortDescription: string;
  isCrawlable: boolean;
  isLiveDvrEnabled?: boolean;
  thumbnail: IconClass;
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
  isUpcoming?: boolean;
}

export interface UpdatedMetadata {
  responseContext: UpdatedMetadataResponseContext;
  continuation: UpdatedMetadataContinuation;
  actions?: UpdatedMetadataAction[];
  frameworkUpdates: UpdatedMetadataFrameworkUpdates;
}

export interface UpdatedMetadataAction {
  updateViewershipAction?: UpdateViewershipAction;
  updateDateTextAction?: UpdateDateTextAction;
  updateTitleAction?: UpdateTitleAction;
  updateDescriptionAction?: UpdateDescriptionAction;
  clickTrackingParams?: string;
}

export interface UpdateDateTextAction {
  dateText: LiveIndicatorText;
}

export interface UpdateDescriptionAction {
  description: Description;
}

export interface Description {
  runs: DescriptionRun[];
}

export interface DescriptionRun {
  text: string;
  navigationEndpoint?: HilariousNavigationEndpoint;
  loggingDirectives?: LoggingDirectives;
}

export interface HilariousNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AutoplayVideoCommandMetadata;
  urlEndpoint?: NavigationEndpointURLEndpoint;
  browseEndpoint?: CommandBrowseEndpoint;
}

export interface UpdateTitleAction {
  title: UpdateTitleActionTitle;
}

export interface UpdateTitleActionTitle {
  runs: StickyRun[];
}

export interface StickyRun {
  text: string;
  navigationEndpoint?: AmbitiousNavigationEndpoint;
  loggingDirectives?: ClientForecastingAdRenderer;
}

export interface AmbitiousNavigationEndpoint {
  commandMetadata: AutoplayVideoCommandMetadata;
  browseEndpoint: CommandBrowseEndpoint;
}

export interface UpdateViewershipAction {
  viewCount: UpdateViewershipActionViewCount;
}

export interface UpdateViewershipActionViewCount {
  videoViewCountRenderer: FluffyVideoViewCountRenderer;
}

export interface FluffyVideoViewCountRenderer {
  viewCount: LiveIndicatorText;
  isLive?: boolean;
  extraShortViewCount: ShortViewCountText;
  unlabeledViewCountValue: LiveIndicatorText;
  originalViewCount: string;
  viewCountLabel?: LiveIndicatorText;
}

export interface UpdatedMetadataContinuation {
  timedContinuationData: TimedContinuationData;
}

export interface TimedContinuationData {
  timeoutMs: number;
  continuation: string;
  clickTrackingParams?: string;
}

export interface UpdatedMetadataFrameworkUpdates {
  entityBatchUpdate: IndigoEntityBatchUpdate;
}

export interface IndigoEntityBatchUpdate {
  mutations: IndigoMutation[];
  timestamp: FluffyTimestamp;
}

export interface IndigoMutation {
  entityKey: string;
  type: MutationType;
  payload: StickyPayload;
}

export interface StickyPayload {
  likeCountEntity?: LikeCountEntity;
  viewCountEntity?: FluffyViewCountEntity;
}

export interface FluffyViewCountEntity {
  key: string;
  viewCount: ShortViewCountClass;
  shortViewCount?: ShortViewCountClass;
  extraShortViewCount: LiveIndicatorText;
  viewCountLength: number;
  shortViewCountLength?: number;
  extraShortViewCountLength: number;
  unlabeledViewCountValue?: LiveIndicatorText;
  viewCountLabel?: LiveIndicatorText;
  viewCountNumber?: string;
}

export interface FluffyTimestamp {
  seconds: string;
  nanos: number | string;
}

export interface UpdatedMetadataResponseContext {
  visitorData?: string;
  serviceTrackingParams: ServiceTrackingParam[];
  mainAppWebResponseContext: FluffyMainAppWebResponseContext;
  responseId: string;
  webResponseContextExtensionData: FluffyWebResponseContextExtensionData;
}

export interface FluffyMainAppWebResponseContext {
  loggedOut: boolean;
  datasyncId?: string;
}
