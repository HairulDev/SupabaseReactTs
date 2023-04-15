import React, { useEffect, useState } from 'react';
import {
    Avatar, Button, CssBaseline, TextField, FormControlLabel,
    Checkbox, Link, Grid, Box, Typography, Container, Switch,
} from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import discord from '../../assets/img/discord.svg';

import supabase from '../../services/supabase';
import { useAuthStore } from './storeAuth';


const theme = createTheme();

export default function Auth() {
    const navigate = useNavigate();
    const initialsState = { email: '', password: '' };
    const [form, setForm] = useState(initialsState);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [reviewImage, setReviewImage] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { user, setUser, accessToken, signInApp, signUpApp, signIn, setAccessToken, setRoles, signOut, refreshSession } = useAuthStore();

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
        <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    ));


    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const clear = () => {
        setForm(initialsState);
    };
    // handle change form
    const onChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setDisableSubmit(true)
        if (isSignup) {
            const data = await signUpApp({ ...form });
            const { message }: any = data;
            console.log("erro signUpApp+====>", message);
            clear();
            setMessage(`${message}`);
            setOpen(true);
            setIsSignup((prevIsSignup) => !prevIsSignup);
        } else {
            await signInApp({ ...form })
            clear();
            navigate('/')
        }
        setDisableSubmit(false)
    };


    const handleOAuth = async () => {
        await signIn();
    };


    useEffect(() => {
        const { data: { subscription } } =
            supabase.auth.onAuthStateChange(
                async (event, session) => {
                    if (session?.user && !session?.access_token) {
                        await refreshSession();
                    }
                    setUser(session?.user ?? null);
                    setAccessToken(session?.access_token ?? null);
                    if (event === 'SIGNED_OUT') setRoles([]);
                })

        return () => {
            subscription?.unsubscribe();
        }
    }, [])

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            bgcolor: 'white',
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Typography>
                        <Box component="form"
                            onSubmit={handleSubmit}
                            noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={form.password}
                                onChange={onChange}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2, }}
                                disabled={disableSubmit}
                            >
                                {isSignup ? 'Sign Up' : 'Sign In'}
                            </Button>
                            <Button
                                onClick={handleOAuth}
                                fullWidth
                                variant="outlined"
                                color='secondary'
                                sx={{
                                    mt: 1, mb: 2,
                                }}
                            >
                                <img
                                    style={{ width: 30 }}
                                    src={discord} />  Discord Sign In
                            </Button>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isSignup}
                                        onChange={switchMode}
                                        aria-label="login switch"
                                        color='warning'
                                    />
                                }
                                label={isSignup ? 'Signin' : 'Signup'}
                            />
                        </Box>
                    </Box>
                    {open && (
                        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                            <Alert onClose={() => setOpen(false)} severity="success">
                                <AlertTitle>Success</AlertTitle>
                                {message}
                            </Alert>
                        </Snackbar>
                    )}
                </Container>
            </ThemeProvider>
        </>
    );
}