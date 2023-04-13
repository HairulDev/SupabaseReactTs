import React from 'react';

import supabase from '../../services/supabase';
import env from '../../configs/vars';
const discordRedirect: any = env.discordRedirect;


function Auth() {
    console.log("discordRedirect===>>>>", discordRedirect);
    // Menginisialisasi OAuth Discord
    const initDiscordOAuth = async () => {
        // Melakukan request ke endpoint OAuth Discord Supabase
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: discordRedirect,
            }
        });

        if (error) {
            console.error('Gagal menginisialisasi OAuth Discord:', error);
        } else if (data) {
            console.log("data=====>>>>>>", data);
        }
    };

    return (
        <div>
            <h1>Contoh OAuth Discord dengan @supabase/gotrue-js</h1>
            <button onClick={initDiscordOAuth}>
                Login dengan Discord
            </button>
        </div>
    );
};

export default Auth;
