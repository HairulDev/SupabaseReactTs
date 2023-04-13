const DiscordOAuth2 = require('discord-oauth2');
const env = require('../../configs/vars');

const discordOAuthClient = new DiscordOAuth2({
    clientId: env.discordId,
    clientSecret: env.discordKey,
    redirectUri: env.discordRedirect, // Ganti dengan URL callback aplikasi Anda
});

export default discordOAuthClient;
