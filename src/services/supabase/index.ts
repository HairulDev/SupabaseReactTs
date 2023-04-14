
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import env from '../../configs/vars';
const supabaseUrl: any = env.urlSupabase;
const supabaseKey: any = env.keySupabase;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
export default supabase!;
