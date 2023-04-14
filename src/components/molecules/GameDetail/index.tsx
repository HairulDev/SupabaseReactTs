import { Card, Chip, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../../pages/auth/storeAuth';
import Comments from '../Comments';
import GameItem from '../GameItem';
import Header from '../Header';
import Progress from '../Progress';
import LoginIcon from '@mui/icons-material/Login';

const GameDetail = () => {
    const { id } = useParams();
    const userJson = localStorage.getItem('profile');
    const user = userJson ? JSON.parse(userJson) : null;
    const tokenProfile = user ? user.token : null;

    const { getGame, game, }: any = useAuthStore();

    useEffect(() => {
        getGame(id);
    }, [id])


    if (!tokenProfile)
        return (
            <Container
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    mt: 35,
                }}
            >
                <Chip
                    component="a"
                    href="/auth"
                    size="medium"
                    color="primary"
                    icon={<LoginIcon />}
                    label="Sign In first please"
                />
            </Container>
        );

    return (
        <Container>
            <Header />
            <Card sx={{ mt: 2, p: 2 }}>
                <Grid container>
                    {
                        game ? (
                            <>
                                <Grid item xs={4}>
                                    <GameItem
                                        key={game.id}
                                        id={game.id}
                                        title={game.title}
                                        played={game.played}
                                        likes={game.likes}
                                        comments={game.comments}
                                        createdAt={game.created_at}
                                        creator={game.creator}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Comments
                                        id={game.id}
                                        comments={game.comments}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <Progress />

                        )
                    }
                </Grid>
            </Card>
        </Container>
    )

}

export default GameDetail;