import { useState, useEffect } from 'react';
import supabase from '../../services/supabase'

export default function Dashboard2() {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
            setSession(session)
        })

        return () => subscription.unsubscribe();
    }, []);
    console.log("session=====>>>>>", session);


    return (
        <div>Logged in!</div>
    )
}
