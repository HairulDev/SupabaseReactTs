import React from 'react';
import discordOAuthClient from '../../../services/discord';


const DiscordLoginButton: React.FC = () => {
    const handleLogin = () => {
        window.location.href = discordOAuthClient.generateAuthUrl({
            scope: ['identify'], // Scope yang diperlukan dari Discord
        });
    };

    return (
        <button onClick={handleLogin}>
            Login with Discord
        </button>
    );
};

export default DiscordLoginButton;
