import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth.actions';
import ImageUploader from 'react-images-upload';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [Upload, setUpload] = useState({ image: '' });
  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              phone: '',
              policy: false,
              login: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Email non valide')
                .max(255)
                .required('Veuillez saisir un email '),
              firstName: Yup.string()
                .max(255)
                .required('Veuillez saisir votre prénom '),
              lastName: Yup.string()
                .max(255)
                .required('Veuillez saisir votre nom'),
              password: Yup.string()
                .max(255)
                .required('Veuillez saisir un mot de passe '),
          
              login: Yup.string()
                .max(255)
                .required('Veuillez saisir un login '),
              phone: Yup.string().required('Veuillez saisir votre téléphone')
            })}
            onSubmit={values => {
              let firstName = values.firstName;
              let lastName = values.lastName;
              let email = values.email;
              let phone = values.phone;
              let password = values.password;
              let login = values.login;
              let role = values.policy ? 'ASSOCIATION' : 'USER';
              let formData = new FormData();
              formData.append('firstName', firstName);
              formData.append('lastName', lastName);
              formData.append('email', email);
              formData.append('phone', phone);
              formData.append('password', password);
              formData.append('login', login);
              formData.append('role',role); 
              formData.append('image', Upload.image);
              console.log(values);
              dispatcher(register(formData, navigate));
              //
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Creer Un Nouveau Compte
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  ></Typography>
                </Box>
                <TextField
                  error={Boolean(touched.login && errors.login)}
                  fullWidth
                  helperText={touched.login && errors.login}
                  label="Login"
                  margin="normal"
                  name="login"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.login}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Prénom"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Nom"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Télphone"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="phone"
                  value={values.phone}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Mot de passe"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    Je suis une association
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box my={2}>
                  <ImageUploader
                    withIcon={true}
                    buttonText="Choisir une image"
                    withPreview={true}
                    onChange={e => {
                      setUpload({
                        image: e[0]
                      });
                    }}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    singleImage={true}
                  />
                </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    S'inscrire
                  </Button>
                </Box>

                <Typography color="textSecondary" variant="body1">
                  Vous avez déja un compte?{' '}
                  <Link component={RouterLink} to="/" variant="h6">
                    Se connecter
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
