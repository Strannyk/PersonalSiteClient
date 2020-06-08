import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import http from '../../services/httpService';
import Loader from '../loader/Loader';
import './Contact.scss';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300
    }
  }
}));

function Alert(props) {

  return <MuiAlert elevation={3} variant="filled" {...props} />;
}

function Contact() {

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [requestCV, setRequestCV] = useState(false);

  const [nameIsValid, setNameIsValid] = useState(true);
  const [messageIsValid, setMessageIsValid] = useState(true);
  const [companyIsValid, setCompanyIsValid] = useState(true);


  const [nameErrorText, setNameErrorText] = useState(null);
  const [messageErrorText, setMessageErrorText] = useState(null);

  const [loader, setLoader] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = () => {
    if (dataIsValidate()) {
      setLoader(true);
      const data = {
        name: name,
        company: company,
        message: message,
        requestCV: requestCV
      };

      http.sendMessage(data)
        .then(res => {
          if (String(res.status).startsWith('2')) {
            handleSubmitSuccess();
            clearData();
          }
          else {
            handleSubmitError();
          }
        })
        .catch(err => {
          handleSubmitError();
          console.log(err);
        })
        .finally(() => setLoader(false))
    }
  };

  const handleSubmitSuccess = () => {
    setAlertSeverity('success');
    setAlertMessage('message.success');
    setSnackbarOpen(true);
  };

  const handleSubmitError = () => {
    setAlertSeverity('error');
    setAlertMessage('message.error');
    setSnackbarOpen(true);
  };

  const dataIsValidate = () => {
    const maxLength = 255;

    const nameIsNotEmpty = !!name.trim();
    const nameInNotLong = name.length <= maxLength;

    const messageIsNotEmpty = !!message.trim();
    const messageInNotLong = message.length <= maxLength;

    const formCompanyIsValid = company.length <= maxLength;

    const formNameIsValid = nameIsNotEmpty && nameInNotLong;
    const formMessageIsValid = messageIsNotEmpty && messageInNotLong;

    if (!formNameIsValid) {
      const errorMessage = nameIsNotEmpty ? 'feedbackForm.errors.tooLong' : 'feedbackForm.errors.noName';
      setNameErrorText(errorMessage);
    }

    if (!formMessageIsValid) {
      const errorMessage = messageIsNotEmpty ? 'feedbackForm.errors.tooLong' : 'feedbackForm.errors.noMessage';
      setMessageErrorText(errorMessage);
    }

    setNameIsValid(formNameIsValid);
    setMessageIsValid(formMessageIsValid);
    setCompanyIsValid(formCompanyIsValid);

    return formNameIsValid && formMessageIsValid && formCompanyIsValid;
  };

  const clearData = () => {
    setName('');
    setCompany('');
    setMessage('');
    setRequestCV(false);
  };

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <NavLink to="/" className="home-link">
        <ArrowBack className="home-link-icon" />
        {t('toHome')}
      </NavLink>

      <form className={[classes.root, 'feedback-form'].join(' ')} noValidate autoComplete="off">
        <TextField label={t('feedbackForm.name')}
                   value={name}
                   onChange={e => setName(e.target.value)}
                   onFocus={() => setNameIsValid(true)}
                   error={!nameIsValid}
                   helperText={nameIsValid ? null : t(nameErrorText)}
                   color="secondary"
                   variant="outlined" />

        <TextField label={t('feedbackForm.company')}
                   value={company}
                   onChange={e => setCompany(e.target.value)}
                   onFocus={() => setCompanyIsValid(true)}
                   error={!companyIsValid}
                   helperText={companyIsValid ? null : t('feedbackForm.errors.tooLong')}
                   color="secondary"
                   variant="outlined" />

        <TextField label={t('feedbackForm.message')}
                   value={message}
                   onChange={e => setMessage(e.target.value)}
                   onFocus={() => setMessageIsValid(true)}
                   error={!messageIsValid}
                   helperText={messageIsValid ? null : t(messageErrorText)}
                   color="secondary"
                   multiline rows={4}
                   variant="outlined" />

        <div className="checkbox-wrapper">
          <FormControlLabel
            control={
              <Checkbox checked={requestCV} onChange={() => setRequestCV(!requestCV)} />
            }
            label={t('feedbackForm.requestCV')} />
        </div>

        <Button variant="outlined"
                color="secondary"
                onClick={() => handleSubmit()}>
          {t('feedbackForm.send')}
        </Button>
      </form>

      <Snackbar className="snackbar"
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}>
        <Alert severity={alertSeverity}>{t(alertMessage)}</Alert>
      </Snackbar>

      {loader &&
      <Loader />
      }
    </div>
  );
}

export default Contact;
