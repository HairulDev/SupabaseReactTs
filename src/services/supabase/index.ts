
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import env from '../../configs/vars';
const supabaseUrl: any = env.urlSupabase;
const supabsaeKey: any = env.keySupabase;
const supabase: SupabaseClient = createClient(supabaseUrl, supabsaeKey);

export default supabase!;
