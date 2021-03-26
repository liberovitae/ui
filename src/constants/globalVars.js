// Define our global state/reactive variables through Apollo client
import { makeVar } from '@apollo/client';
import tabPicker from '../helpers/tabPicker';
import routePicker from '../helpers/routePicker';

export const tabIndex = makeVar(tabPicker());
export const hero = makeVar({
  title: '',
  subtitle: '',
  country: null,
});
export const darkTheme = makeVar(
  JSON.parse(localStorage.getItem('darkTheme')),
);
export const hideBlog = makeVar(
  JSON.parse(localStorage.getItem('hideBlog')),
);
export const contentDrawer = makeVar({ show: false, slug: null });
export const backdrop = makeVar(false);
export const drawer = makeVar(false);
export const isLoading = makeVar(false);
export const quickSearch = makeVar({
  show: false,
  autofocus: false,
});
export const filterSearch = makeVar({
  show: false,
  autofocus: false,
});
export const navSidebar = makeVar(false);
export const useLocalCache = makeVar(false);
export const routeConfig = makeVar(routePicker());
export const siteHeader = makeVar(routeConfig().defaultSiteHeader);
