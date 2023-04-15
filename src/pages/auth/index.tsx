import React, { useEffect, useState } from 'react';
import {
    Avatar, Button, CssBaseline, TextField, FormControlLabel,
    Checkbox, Link, Grid, Box, Typography, Container,
} from '@mui/material';

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
    const { user, setUser, accessToken, signInApp, signIn, setAccessToken, setRoles, signOut, refreshSession } = useAuthStore();

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
            await signInApp({ ...form })
            clear();
            navigate('/')
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

    const signOutUser = async () => {
        await signOut()
        setUser(null)
    }

    return (
        <>
            {user ? (
                <>
                    <h1>Sucess</h1>
                    <Button onClick={() => signOutUser()} >
                        Sign Out
                    </Button>
                </>
            ) : (
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
                                Sign in
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
                                    Sign In
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
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        </>
    );
}