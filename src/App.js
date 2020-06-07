import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useLocation } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { selectActivePage, setActivePage } from './features/activePage';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useTranslation } from 'react-i18next';
import Loader from './components/loader/Loader';
import './App.scss';

function App({ route }) {

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
          background: { default: '#18191a' },
          primary: { main: '#593d88' },
          secondary: { main: '#a6d4fa' },
          success: { main: '#A6E22E' },
          error: { main: '#FF7597' }
        },
        props: {
          MuiMenu: {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            },
            getContentAnchorEl: null
          },

          MuiSnackbar: {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            }
          }
        }
      }), []
  );

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = useSelector(selectActivePage);
  const currentPageTitle = 'pages.' + currentPage;
  const ready = i18n.isInitialized;

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const changeLanguage = lang => {
    i18n.changeLanguage(lang).then();
    closeMenu();
  };

  useEffect(() => {
    dispatch(setActivePage(location.pathname))
  }, [dispatch, location]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {ready
        ? <section>
          <AppBar position="static">
            <Toolbar className="app-toolbar">
              <Typography className="toolbar-title">{t(currentPageTitle)}</Typography>

              <Button aria-controls="simple-menu"
                      aria-haspopup="true"
                      className="lang-button"
                      onClick={toggleMenu}>
                {i18n.language === 'en' ? 'Language' : 'Язык'}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenu}>
                <MenuItem className="lang-menu-item" onClick={() => changeLanguage('en')}>English</MenuItem>
                <MenuItem className="lang-menu-item" onClick={() => changeLanguage('ru')}>Русский</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          <section className="main-content">
            {renderRoutes(route.routes)}
          </section>
        </section>
        : <Loader />
      }
    </ThemeProvider>
  );
}

export default App;
