
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SchoolIcon from '@mui/icons-material/School';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { postRequest } from '../utils/requests';
import { backend, apiPath } from '../utils/urls';
import { PageContext } from '../App';
import { joinPaths } from '@remix-run/router';

export default function LoginPage(props) {
  const pageContextValue = React.useContext(PageContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const loginBody = {
      name: data.get('email'),
      password: data.get('password'),
    }
    const loginURL = joinPaths([backend, apiPath.login]);
    postRequest(loginBody, loginURL).then(json => {
      if (json.state === true) {
        props.handleLoginSuccess({
          ...loginBody,
          admin: json.admin,
          token: json.token
        });
      } else {
        pageContextValue.handler.setErrorBox(json.message);
      }
    })
    .catch(e => {
      pageContextValue.handler.setErrorBox(e);
    });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ userSelect: "none" }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <SchoolIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember my E-Mail"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up now!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
    </Container>
  );
}
