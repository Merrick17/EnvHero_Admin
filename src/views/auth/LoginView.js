import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { useDispatch } from 'react-redux';
import { login } from 'src/actions/auth.actions';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;
const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispacther = useDispatch();
  const state = useSelector((state) => state.loadingReducer);
  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              login: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              login: Yup.string()

                .max(255)
                .required('Veuillez entrer un email'),
              password: Yup.string()
                .max(255)
                .required('Mot de passe obligatoire')
            })}
            onSubmit={(values, actions) => {
              let loginUser = values.login;
              let password = values.password;
              dispacther(login(loginUser, password, navigate));
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
                    Se Connecter
                  </Typography>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography> */}
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Avec Facebook
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Avec Google
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={3} mb={1}>
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Ou avec votre Login et Mot de passe
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.login && errors.login)}
                  fullWidth
                  helperText={touched.login && errors.login}
                  label="Login"
                  margin="normal"
                  name="login"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.login}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Mot de passe "
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={state}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Se Connecter
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Vous n'avez pas un compte ?{' '}
                  <Link component={RouterLink} to="/register" variant="h6">
                    S'inscrire
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
        <ClipLoader
          css={override}
          size={150}
          color={'#123abc'}
          loading={state}
        />
      </Box>
    </Page>
  );
};

export default LoginView;
