import React from 'react';
import LandingPage from '../Landing';
import {
  LANDING,
  JOBS,
  VENUES,
  REGISTER,
  LOGIN,
  ACCOUNT,
  MY_JOBS,
  MY_VENUES,
  COMPANY_EDIT,
  COMPANY_POST,
  ITEM_SAVE,
  SAVED,
  SETTINGS,
  ALERTS,
  ALERT_POST,
  ITEM_PREVIEW,
  ITEM_PAGE,
  JOB_POST,
  ALERT_VIEW,
  ACCOUNT_DELETE,
  ACCOUNT_EDIT,
  PASSWORD_EDIT,
  PASSWORD_RESET,
  SET_PASSWORD,
  VENUE_POST,
  ACCOUNT_VERIFY,
  ADMIN,
  ADMIN_BLOGS,
  ADMIN_USERS,
  BLOG_POST,
  ABOUT,
  DONATE,
  TERMS,
  PRIVACY,
  NEWSLETTER,
  FAQ,
  BLOG_PAGE,
  EVENTS,
  EVENT_POST,
  EVENT_BASE,
} from '../../constants/routes';

const RegisterPage = React.lazy(() => import('../Account/Register'));
const LoginPage = React.lazy(() => import('../Account/Login'));
const AccountPage = React.lazy(() => import('../Account'));
const AboutPage = React.lazy(() => import('../Pages/About'));
const DonatePage = React.lazy(() => import('../Pages/Donate'));
const CompanyForm = React.lazy(() =>
  import('../Company/CompanyForm'),
);
const JobForm = React.lazy(() => import('../Job/JobForm'));
const VenueForm = React.lazy(() => import('../Venue/VenueForm'));
const PasswordReset = React.lazy(() =>
  import('../Account/PasswordReset'),
);
const NewPassword = React.lazy(() =>
  import('../Account/NewPassword'),
);
const AccountVerify = React.lazy(() => import('../Account/Verify'));
const AdminPage = React.lazy(() => import('../Admin'));
const TermsPage = React.lazy(() => import('../Pages/Terms'));
const PrivacyPage = React.lazy(() => import('../Pages/Privacy'));
const NewsletterPage = React.lazy(() =>
  import('../Pages/Newsletter'),
);
const FAQPage = React.lazy(() => import('../Pages/FAQ'));
const BlogPage = React.lazy(() => import('../Blog/BlogPage'));
const ItemPreview = React.lazy(() => import('../Item/ItemPreview'));
const ItemPage = React.lazy(() => import('../Item/ItemPage'));

export default ({ refetch, session, history, location }) => [
  {
    path: [LANDING, ALERT_VIEW, JOBS, VENUES, EVENTS],
    exact: true,
    props: {
      refetch: refetch,
      session: session,
      history: history,
    },
    suspense: false,
    Component: LandingPage,
  },
  {
    path: REGISTER,
    exact: true,
    props: { refetch: refetch },
    suspense: true,
    Component: RegisterPage,
  },
  {
    path: LOGIN,
    exact: true,
    props: { refetch: refetch, session: session },
    suspense: true,
    Component: LoginPage,
  },
  {
    path: [
      ACCOUNT,
      MY_JOBS,
      MY_VENUES,
      COMPANY_EDIT,
      SAVED,
      SETTINGS,
      ITEM_SAVE,
      ALERT_POST,
      ALERTS,
      ACCOUNT_DELETE,
      ACCOUNT_EDIT,
      PASSWORD_EDIT,
    ],
    exact: true,
    props: {
      refetch: refetch,
      session: session,
      location: location,
      history: history,
    },
    suspense: true,
    Component: AccountPage,
  },
  {
    path: PASSWORD_RESET,
    exact: true,
    props: {
      session: session,
    },
    suspense: true,
    Component: PasswordReset,
  },
  {
    path: SET_PASSWORD,
    exact: true,
    props: {
      session: session,
    },
    suspense: true,
    Component: NewPassword,
  },
  {
    path: ACCOUNT_VERIFY,
    exact: false,
    props: {
      session: session,
      refetch: refetch,
    },
    suspense: true,
    Component: AccountVerify,
  },
  {
    path: [ADMIN, BLOG_POST, ADMIN_BLOGS, ADMIN_USERS],
    exact: true,
    props: {
      session: session,
      history: history,
    },
    suspense: true,
    Component: AdminPage,
  },
  {
    path: BLOG_PAGE,
    exact: true,
    props: {
      session: session,
    },
    suspense: true,
    Component: BlogPage,
  },
  {
    path: COMPANY_POST,
    exact: true,
    props: {
      session: session,
      history: history,
      refetch: refetch,
    },
    suspense: true,
    Component: CompanyForm,
  },
  {
    path: ITEM_PREVIEW,
    exact: true,
    props: {
      session: session,
      history: history,
      refetch: refetch,
    },
    suspense: true,
    Component: ItemPreview,
  },
  {
    path: `${JOB_POST}/:slug?`,
    exact: true,
    props: {
      session: session,
      history: history,
      refetch: refetch,
    },
    suspense: true,
    Component:
      session && session.me && !session.me.company
        ? CompanyForm
        : JobForm,
  },
  {
    path: `${VENUE_POST}/:slug?`,
    exact: true,
    props: {
      session: session,
      history: history,
      refetch: refetch,
    },
    suspense: true,
    Component: VenueForm,
  },
  {
    path: ITEM_PAGE,
    exact: true,
    props: {
      session: session,
      history: history,
      refetch: refetch,
    },
    suspense: true,
    Component: ItemPage,
  },

  {
    path: ABOUT,
    exact: true,
    props: {},
    suspense: true,
    Component: AboutPage,
  },
  {
    path: DONATE,
    exact: true,
    props: {},
    suspense: true,
    Component: DonatePage,
  },
  {
    path: TERMS,
    exact: true,
    props: {},
    suspense: true,
    Component: TermsPage,
  },
  {
    path: PRIVACY,
    exact: true,
    props: {},
    suspense: true,
    Component: PrivacyPage,
  },
  {
    path: NEWSLETTER,
    exact: true,
    props: {},
    suspense: true,
    Component: NewsletterPage,
  },
  {
    path: FAQ,
    exact: true,
    props: {},
    suspense: true,
    Component: FAQPage,
  },
];
