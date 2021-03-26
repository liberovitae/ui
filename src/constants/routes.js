// ADMIN
export const ADMIN = '/admin';
export const ADMIN_BLOGS = '/admin/blogs';
export const ADMIN_USERS = '/admin/users';

// SITE
export const LANDING = '/';
export const TERMS = '/terms';
export const PRIVACY = '/privacy';
export const ABOUT = '/about';
export const DONATE = '/donate';
export const FEED = '/feed';
export const NEWSLETTER = '/newsletter';
export const FAQ = '/faq';

// ACCOUNT
export const REGISTER = '/register';
export const LOGIN = '/login';
export const SETTINGS = '/account/settings';
export const ACCOUNT = '/account';
export const ALERTS = '/account/alerts';
export const ACCOUNT_DELETE = '/account/delete';
export const ACCOUNT_EDIT = '/account/edit';
export const PASSWORD_EDIT = '/account/password';
export const ACCOUNT_VERIFY = '/account/verify/:token/:type?';
export const PASSWORD_RESET = '/account/password_reset';
export const SET_PASSWORD = '/account/password_reset/:token';
export const MY_JOBS = '/account/jobs';
export const SAVED = '/account/saved';
export const MY_VENUES = '/account/venues';
export const MY_EVENTS = '/account/events';
export const SAVED_VENUES = '/account/venues/saved';
export const SAVE_VENUES = '/account/venues/save/:slug';

// JOBS
export const JOBS = '/jobs';
export const JOB_POST = '/job/post';
export const JOB_BASE = '/job';

// ITEMS
export const ITEMS = '/:type';
export const ITEM_PAGE = '/:type/:slug';
export const ITEM_POST = '/:type/post';
export const ITEM_PREVIEW = '/:type/post/:slug?/preview';
export const ITEM_SAVE = '/:type/save/:slug?';

// ALERTS
export const ALERT_POST = '/alert/post/:slug?';
export const ALERT_VIEW = '/alert/view/:slug';
export const ALERT_BASE = '/alert';

// COMPANY
export const COMPANY_EDIT = '/account/company';
export const COMPANY_POST = '/post-company';

// BLOG
export const BLOG_PAGE = '/blog/:slug';
export const BLOG_POST = '/blog/post/:slug?';

// VENUES
export const VENUES = '/venues';
export const VENUE_POST = '/venue/post';
export const VENUE_BASE = '/venue';

// EVENTS
export const EVENTS = '/events';
export const EVENT_POST = '/event/post';
export const EVENT_BASE = '/event';
