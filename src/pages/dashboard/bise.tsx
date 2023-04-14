
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabase';


const Dashboadsdsdrd: React.FC = () => {
    const [user, setUser] = useState<any>([]);

    const navigate = useNavigate();


    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                //value.data.user
                console.log("getUser value ===", value);
                if (value.data?.user) {
                    console.log("value.data.user===", value.data.user);
                    setUser(value.data.user)
                }
            })
        }
        getUserData();
    }, [])

    async function signOutUser() {
        const { error } = await supabase.auth.signOut();
        navigate('/')
    }
    // useEffect(() => {
    //     const { data: listener } = supabase.auth.onAuthStateChange(
    //         async (event, session) => {
    //             if (session?.user && !session?.access_token) {
    //                 const { data, error } = await supabase.auth.refreshSession()
    //                 const { session, user } = data
    //                 console.log("refreshSession session =====>>>>>", session)
    //                 console.log("refreshSession user =====>>>>>", user)
    //             }
    //             setAccessToken(session?.access_token ?? null)
    //             setAccessToken(session?.user ?? null)
    //             if (event === 'SIGNED_IN') console.log("event SIGNED_IN");
    //             // return () => listener.unsubscribe();
    //         })
    // }, [session]);

    // console.log("session=====>>>>>", session);
    // if (!session) {
    //     return (
    //         <Auth />
    //     )
    // } else {
    //     return (
    //         <div>Logged in!</div>
    //     )
    // }
    return (
        <>
            {Object.keys(user).length !== 0 ? (
                <>
                    <h1>Sucess</h1>
                    <Button onClick={() => signOutUser()} >
                        Sign Out
                    </Button>
                </>
            ) : (
                <>
                    <h1>User is not logged in</h1>
                    <Button onClick={() => { navigate('/') }}>Go back home</Button>
                </>
            )}
        </>
    )
}

export default Dashboadsdsdrd