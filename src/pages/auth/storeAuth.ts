import create from 'zustand';
import supabase from '../../services/supabase';
import { User } from "@supabase/supabase-js";
import env from '../../configs/vars';
import axios from "axios";

const API = axios.create({ baseURL: env.reactAppHost });
const userJson = localStorage.getItem('profile');
const user = userJson ? JSON.parse(userJson) : null;
const tokenProfile = user ? user.token : null;

API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${tokenProfile}`;
    return req;
});

interface IAuthStore {
    getGame: (id: any) => void;
    getGames: () => void;
    signUpApp: (formData: any) => void;
    signInApp: (formData: any) => void;
    signOutApp: () => void;
    createGame: (formData: any) => void;
    updateGame: (id: any, formData: any) => void;
    deleteGame: (id: any) => void;
    likeGame: (id: any) => void;
    commentGame: (id: any, formData: any) => void;
    getSession: () => void;
    signIn: () => void;
    signOut: () => void;
    setUser: (user: User | null) => void;
    games: string | null;
    game: string | null;
    user: User | null;
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
    refreshSession: () => void;
    roles: string[];
    setRoles: (roles: string[]) => void;
}


export const useAuthStore = create<IAuthStore>((set, get) => ({
    games: null,
    game: null,
    //  user: session?.user ?? null,
    //  accessToken: session.data.session?.access_token ?? null,
    user: null,
    accessToken: null,
    roles: [],
    signUpApp: async (formData) => {
        try {
            const { data } = await API.post(`/user/register`, formData)
            return data
        } catch (error: any) {
            return error
        }
    },
    signInApp: async (formData) => {
        try {
            const { data } = await API.post(`/user/login`, formData)
            localStorage.setItem('profile', JSON.stringify(data));
            return data
        } catch (error: any) {
            return error
        }
    },
    signOutApp: async () => {
        await localStorage.clear();
    },
    getGame: async (id) => {
        try {
            const { data }: any = await API.get(`/game/${id}`)
            set(() => ({
                game: data,
            }));
            return data
        } catch (error) {
            return error
        }
    },
    getGames: async () => {
        try {
            const { data: { data } }: any = await API.get(`/game`)
            set(() => ({
                games: data,
            }));
            return data
        } catch (error) {
            return error
        }
    },
    createGame: async (formData) => {
        try {
            // const title: string = formData.title || null;
            // const form = new FormData();
            // form.append('title', title);
            await API.post(`/game/createGame`, formData)
        } catch (error) {
            return error
        }
    },
    updateGame: async (id, formData) => {
        try {
            await API.put(`/game/updateGame/${id}`, formData)
        } catch (error) {
        }
    },
    deleteGame: async (id) => {
        try {
            await API.delete(`/game/deleteGame/${id}`)
        } catch (error) {
            return error
        }
    },
    likeGame: async (id) => {
        try {
            const { data: { game } }: any = await API.put(`/game/likeGame/${id}`)
            set(() => ({
                game: game,
            }));
            return game
        } catch (error) {
            return error
        }
    },
    commentGame: async (id, comment) => {
        console.log("commentGame comment=====>>", comment);
        try {
            const { data: { game } }: any = await API.post(`/game/commentGame/${id}`, { comment })
            set(() => ({
                game: game,
            }));
            return game
        } catch (error) {
            return error
        }
    },
    signIn: () => {
        supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: env.discordRedirect,
            }
        });
    },
    signOut: () => {
        supabase.auth.signOut();
        set(() => ({
            user: null,
            accessToken: null,
            roles: []
        }));
    },
    setUser: user => {
        set(() => ({
            user
        }));
    },
    setAccessToken: accessToken => {
        set(() => ({
            accessToken
        }));
    },
    setRoles: roles => {
        set(() => ({
            roles
        }));
    },
    refreshSession: () => {
        supabase.auth.refreshSession();
    },
    getSession: async () => {
        try {
            const { data }: any = await supabase.auth.getSession();
            const { session }: any = data;
            set(() => ({
                user: session.user,
                accessToken: session.access_token,
            }));
        } catch (error) {
            return error
        }
    }

})
);
