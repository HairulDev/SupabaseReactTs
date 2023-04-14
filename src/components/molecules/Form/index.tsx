import { Avatar, Button, Card, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../../pages/auth/storeAuth';


const Form = ({ currentId, setCurrentId }: any) => {

    const userJson = localStorage.getItem('profile');
    const tokenProfile = userJson ? JSON.parse(userJson) : null;
    const initialsState = { title: '' };
    const [form, setForm] = useState(initialsState);
    const [reviewImage, setReviewImage] = useState<Blob | null>(null);
    const [disableSubmit, setDisableSubmit] = useState(false);

    const { createGame, getGames, getGame, updateGame, user, game }: any = useAuthStore();

    useEffect(() => {
        getGame(currentId);
    }, [currentId,])

    useEffect(() => {
        setForm({ title: game?.title });
    }, [game])


    const clear = async () => {
        await getGames();
        setCurrentId(0);
        setForm(initialsState);
        setDisableSubmit(false)
    };


    const onChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onChangeFile = async (e: any) => {
        const file = e.target.files[0];
        setReviewImage(file)
        setForm({ ...form, [e.target.name]: file });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setDisableSubmit(true)
        if (currentId === 0) {
            await createGame({ ...form })
        } else {
            await updateGame(currentId, form)
        }
        await clear();
    };


    return (
        <Card sx={{ p: 2, width: '34rem' }} >
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ mb: 2 }}>{currentId ? `Editing` : 'Create'}</Typography>
                <Grid container alignItems="stretch" spacing={3}>
                    <Grid item xs={1}>
                        {user && user ? (
                            <div >
                                {/* <Avatar src={} /> */}
                            </div>
                        ) : (
                            <Avatar />
                        )}

                    </Grid>
                    <Grid item xs={11}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                variant="outlined"
                                placeholder={`What's your game name ${tokenProfile?.user.name} ?`}
                                fullWidth
                                multiline
                                value={form.title}
                                onChange={onChange} />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button
                                sx={{
                                    zIndex: 1,
                                }}
                                variant="contained"
                                component="label"
                            >
                                Browse
                                <input
                                    type="file"
                                    name="selectedFile"
                                    hidden
                                    onChange={onChangeFile}
                                />

                            </Button>
                            <TextField
                                inputProps={{ style: { textAlign: "center" } }}
                                disabled
                                size="small"
                                sx={{ marginLeft: "-2rem", border: "none" }}
                                onChange={onChangeFile}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Grid container>
                                <Grid item xs={9}>
                                    {reviewImage && (
                                        <img src={URL.createObjectURL(reviewImage)} width={100} />
                                    )}
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" size="large" type="submit"
                                        disabled={disableSubmit}
                                    >Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </form>
        </Card >
    )
}

export default Form