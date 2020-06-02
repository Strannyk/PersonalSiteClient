import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useLocation } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { setActivePage, selectActivePage } from './features/activePage';
import './App.scss';

function App({ route }) {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: { type: 'dark' }
      }), []
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = useSelector(selectActivePage);

  useEffect(() => {
    dispatch(setActivePage(location.pathname))
  }, [dispatch, location]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>Pge: {currentPage}</div>
      {renderRoutes(route.routes)}
    </ThemeProvider>
  );
}

export default App;
