import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uesyokxtzhkeqmdusawa.supabase.co";
const supabasePublishableKey =
  "sb_publishable_TNrpYj5iqOMUXw1r2VRRUQ_IP6NBQHi";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
