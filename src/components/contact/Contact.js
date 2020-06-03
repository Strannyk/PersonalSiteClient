import React from 'react';
import { NavLink } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useTranslation } from 'react-i18next';
import './Contact.scss';

function Contact() {

  const { t } = useTranslation();

  return (
    <div>
      <NavLink to="/" className="home-link">
        <ArrowBack className="home-link-icon" />
        {t('toHome')}
      </NavLink>
    </div>
  );
}

export default Contact;
