import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

export default function () {

  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <div className="not-found-code">404</div>
      <NavLink to="/">
        <Button variant="outlined" color="secondary">{t('toHome')}</Button>
      </NavLink>
    </div>
  );
}
