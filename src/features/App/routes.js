import React from 'react';
import LandingPage from '../Landing';
import {
  LANDING,
  POSTS,
  REGISTER,
  LOGIN,
  ACCOUNT,
  MY_POSTS,
  POST_SAVE,
  SAVED,
  SETTINGS,
  ALERTS,
  ALERT_CREATE,
  POST_PREVIEW,
  POST_CREATE,
  POST_PAGE,
  ALERT_VIEW,
  ACCOUNT_DELETE,
  ACCOUNT_EDIT,
  PASSWORD_EDIT,
  PASSWORD_RESET,
  SET_PASSWORD,
  ACCOUNT_VERIFY,
  ADMIN,
  ADMIN_BLOGS,
  ADMIN_USERS,
  ABOUT,
  DONATE,
  TERMS,
  PRIVACY,
  NEWSLETTER,
  FAQ,
} from '../../constants/routes';

const RegisterPage = React.lazy(() => import('../Account/Register'));
const LoginPage = React.lazy(() => import('../Account/Login'));
const AccountPage = React.lazy(() => import('../Account'));
const AboutPage = React.lazy(() => import('../Pages/About'));
const DonatePage = React.lazy(() => import('../Pages/Donate'));

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
const PostPreview = React.lazy(() => import('../Post/PostPreview'));
const PostPage = React.lazy(() => import('../Post/PostPage'));
const PostForm = React.lazy(() => import('../Post/PostForm'));
const NotFoundPage = React.lazy(() => import('../Shared/404'));

export default ({ refetch, session, history, location }) => [
  {
    path: REGISTER,
    exact: true,
    props: { refetch },
    suspense: true,
    Component: RegisterPage,
  },
  {
    path: LOGIN,
    exact: true,
    props: { refetch, session },
    suspense: true,
    Component: LoginPage,
  },
  {
    path: [
      ACCOUNT,
      MY_POSTS,
      SAVED,
      SETTINGS,
      POST_SAVE,
      ALERT_CREATE,
      ALERTS,
      ACCOUNT_DELETE,
      ACCOUNT_EDIT,
      PASSWORD_EDIT,
    ],
    exact: true,
    props: {
      refetch,
      session,
      location,
      history,
    },
    suspense: true,
    Component: AccountPage,
  },
  {
    path: PASSWORD_RESET,
    exact: true,
    props: {
      session,
    },
    suspense: true,
    Component: PasswordReset,
  },
  {
    path: SET_PASSWORD,
    exact: true,
    props: {
      session,
    },
    suspense: true,
    Component: NewPassword,
  },
  {
    path: ACCOUNT_VERIFY,
    exact: false,
    props: {
      session,
      refetch,
    },
    suspense: true,
    Component: AccountVerify,
  },
  {
    path: [ADMIN, ADMIN_BLOGS, ADMIN_USERS],
    exact: true,
    props: {
      session,
      history,
    },
    suspense: true,
    Component: AdminPage,
  },
  {
    path: [LANDING, ALERT_VIEW, POSTS],
    exact: true,
    props: {
      refetch,
      session,
      history,
    },
    suspense: false,
    Component: LandingPage,
  },
  {
    path: POST_PREVIEW,
    exact: true,
    props: {
      session,
      history,
      refetch,
    },
    suspense: true,
    Component: PostPreview,
  },

  {
    path: `${POST_CREATE}/:slug?`,
    exact: true,
    props: {
      session,
      history,
      refetch,
    },
    suspense: true,
    Component: PostForm,
  },
  {
    path: POST_PAGE,
    exact: true,
    props: {
      session,
      history,
      refetch,
    },
    suspense: true,
    Component: PostPage,
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
  {
    props: {},
    suspense: true,
    Component: NotFoundPage,
  },
];
