import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import './Contact.scss';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300
    }
  }
}));

function Contact() {

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [requestCV, setRequestCV] = useState(false);

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <NavLink to="/" className="home-link">
        <ArrowBack className="home-link-icon" />
        {t('toHome')}
      </NavLink>

      <form className={[classes.root, 'feedback-form'].join(' ')} noValidate autoComplete="off">
        <div className="form-element-wrapper">
          <TextField label={t('feedbackForm.name')}
                     defaultValue={name}
                     onBlur={e => setName(e.target.value)}
                     error={false}
                     helperText={false ? t('feedbackForm.errors.noName') : null}
                     color="secondary"
                     variant="outlined" />
        </div>

        <div className="form-element-wrapper">
          <TextField label={t('feedbackForm.company')}
                     defaultValue={company}
                     onBlur={e => setCompany(e.target.value)}
                     color="secondary"
                     variant="outlined" />
        </div>

        <div className="form-element-wrapper">
          <TextField label={t('feedbackForm.message')}
                     defaultValue={message}
                     onBlur={e => setMessage(e.target.value)}
                     error={false}
                     helperText={false ? t('feedbackForm.errors.noMessage') : null}
                     color="secondary"
                     multiline rows={4}
                     variant="outlined" />
        </div>

        <div className="form-element-wrapper">
          <div className="checkbox-wrapper">
            <FormControlLabel
              control={
                <Checkbox checked={requestCV} onChange={() => setRequestCV(!requestCV)} />
              }
              label={t('feedbackForm.requestCV')} />
          </div>
        </div>

        <div className="form-element-wrapper">
          <Button variant="outlined" color="secondary">{t('feedbackForm.send')}</Button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
