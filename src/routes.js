import App from "./App";
import Home from './components/home/Home';
import Contact from './components/contact/Contact';
import NotFound from './404';
import pages from './services/pageService';

export const routes = [
  {
    component: App,
    routes: [
      {
        path: pages.getPathFromName('Home'),
        exact: true,
        component: Home
      },
      {
        path: pages.getPathFromName('Contact'),
        exact: true,
        component: Contact
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
];
