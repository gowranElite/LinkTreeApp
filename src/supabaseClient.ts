import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://irxycqgncaypaeuowjea.supabase.co";
const supabaseAnonKey = "sb_publishable_LMfT5blGED4rmOvQg9BIRg_UYkVZ_rL";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
