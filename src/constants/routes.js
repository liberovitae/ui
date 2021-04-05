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
export const SAVED = '/account/saved';
export const MY_POSTS = '/account/posts';

// JOBS
export const JOBS = '/jobs';
export const JOB_POST = '/job/create';
export const JOB_BASE = '/job';

// POSTS
export const POSTS = '/:type';
export const POST_PAGE = '/:type/:slug';
export const POST_CREATE = '/:type/create';
export const POST_PREVIEW = '/:type/create/:slug?/preview';
export const POST_SAVE = '/:type/save/:slug?';

// ALERTS
export const ALERT_CREATE = '/alert/create';
export const ALERT_VIEW = '/alert/view/:slug';
export const ALERT_BASE = '/alert';

// // COMPANY
export const COMPANY_BASE = '/company';
export const COMPANY_CREATE = '/company/create';

// BLOG
export const BLOG_PAGE = '/blog/:slug';
export const BLOG_POST = '/blog/create/:slug?';

// VENUES
export const VENUES = '/venues';
export const VENUE_POST = '/venue/create';
export const VENUE_BASE = '/venue';

// EVENTS
export const EVENTS = '/events';
export const EVENT_POST = '/event/create';
export const EVENT_BASE = '/event';
