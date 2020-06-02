const pages = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Contact',
    path: '/contact'
  }
];

export default {
  getPathFromName(name) {
    const page = pages.filter(page => page.name === name)[0];
    return page ? page.path : null;
  },

  getNameFromPath(path) {
    const page = pages.filter(page => page.path === path)[0];
    return page ? page.name : null;
  }
};
