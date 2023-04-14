import React, { useEffect, useState } from 'react';
import {
    Avatar, Button, CssBaseline, TextField, FormControlLabel,
    Checkbox, Link, Grid, Box, Typography, Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import supabase from '../../services/supabase';
import env from '../../configs/vars';
import { useNavigate } from 'react-router-dom';
import { Auth, } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'


const discordRedirect = env.discordRedirect;
const theme = createTheme();


const AuthSusdpabase: React.FC = () => {
    const [session, setSession] = useState<any>(null);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    // const handleOAuth = async () => {
    //     const { error } = await supabase.auth.signInWithOAuth({
    //         provider: 'discord',
    //         options: {
    //             redirectTo: discordRedirect,
    //         }
    //     });
    //     if (error) {
    //         console.error('Failed to sign in with Discord:', error);
    //     }
    // };

    supabase.auth.onAuthStateChange(
        async (event, session) => {
            console.log("onAuthStateChange event ====", event);
            console.log("onAuthStateChange session ====", session);
            if (event !== 'SIGNED_OUT') {
                // forwad to success URL
                navigate('/success')
            } else {
                //forward to localhost:3100
                navigate('/')
            }
        })



    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        theme="dark"
                        providers={["discord"]}
                    />
                    {/* <Box component="form"
                        // onSubmit={handleSubmit}
                        noValidate sx={{ mt: 1 }}>
                        <Button
                            onClick={handleOAuth}
                            fullWidth
                            variant="contained"
                            color='secondary'
                            sx={{ mt: 1, mb: 2 }}
                        >
                            Discord Sign In
                        </Button>
                    </Box> */}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default AuthSusdpabase;