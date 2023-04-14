import { AuthApiError, Provider, Session, User } from "@supabase/gotrue-js"

interface IAuthStore {
    signIn: () => Promise<{
        session: Session | null;
        user: User | null;
        provider?: Provider;
        url?: string | null;
        error: AuthApiError;
    }>;
    signOut: () => Promise<{ error: AuthApiError | null }> | null;
    setUser: (user: User | null) => void;
    user: User | null;
    accessToken: string | null;
    setAccessToken: string | null;
    refreshSession: () => Promise<{ error: AuthApiError | null }> | null;
    roles: Array<string>;
    setRoles: (roles: Array<string>) => void;
}