import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Form from '../../components/molecules/Form';
import GameItem from '../../components/molecules/GameItem';
import Header from '../../components/molecules/Header';
import { useAuthStore } from '../auth/storeAuth';



const Dashboard = () => {

    const userJson = localStorage.getItem('profile');
    const tokenProfile = userJson ? JSON.parse(userJson) : null;

    const { getSession, getGames, getGame, games, user }: any = useAuthStore();
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        getGames();
        getSession();
    }, [getGames, getSession,])


    return (
        <>
            <Header />
            <Container sx={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', p: 2
            }}>
                <Grid item xs={12}>
                    {tokenProfile && (
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    )}
                </Grid>
                <Grid container sx={{ justifyContent: 'center', p: 2, }}>
                    {games && games.map((item: any) => (
                        <GameItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            played={item.played}
                            likes={item.likes}
                            comments={item.comments}
                            createdAt={item.created_at}
                            creator={item.creator}
                            setCurrentId={setCurrentId}

                        />
                    ))}
                </Grid>
            </Container >
        </>
    )
}

export default Dashboard;
