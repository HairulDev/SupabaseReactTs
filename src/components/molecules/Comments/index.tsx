import { Avatar, Box, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useAuthStore } from '../../../pages/auth/storeAuth';
import Progress from '../Progress';

const Comments = (props: any) => {
    const { id, comments, }: any = props;

    const { commentGame, getGame } = useAuthStore();
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [commentWrite, setCommentWrite] = useState('');

    const clear = async () => {
        await getGame(id);
        setCommentWrite('');
        setDisableSubmit(false)
    }

    const handleComment = async (e: any) => {
        e.preventDefault();
        setDisableSubmit(true);
        await commentGame(id, commentWrite);
        clear();
    };

    return (
        <Box>
            <Grid item xs={12}>
                {
                    comments && comments.map((comment: any) => (
                        <Grid container>
                            <Grid item xs={1}>
                                <Avatar
                                    sx={{ bgcolor: 'red' }} >
                                    {comment.name[0]}
                                </Avatar>
                            </Grid>
                            <Grid item xs={11} >
                                <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }} gutterBottom variant="subtitle1">
                                    {comment.name}
                                </Typography>
                                <Typography sx={{ textAlign: 'left', mb: 2, mt: -1 }} gutterBottom variant="subtitle1" >
                                    {comment.comment}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))
                }
                <Grid container>
                    <Grid item xs={1}>
                        <Avatar
                            sx={{ bgcolor: 'red' }} >

                        </Avatar>
                    </Grid>
                    <Grid item xs={11} >
                        <form onSubmit={handleComment}>
                            <TextField
                                sx={{ width: '80%', }}
                                placeholder="Write something"
                                value={commentWrite}
                                onChange={(e) => setCommentWrite(e.target.value)}
                                disabled={disableSubmit}
                                autoFocus={true}
                            />
                        </form>
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    )
}

export default Comments