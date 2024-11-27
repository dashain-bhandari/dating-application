import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jcwfkdxfgmrsdaygzofs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjd2ZrZHhmZ21yc2RheWd6b2ZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjcyOTk3OSwiZXhwIjoyMDI4MzA1OTc5fQ.OwJ5hiwFFsWh2dbYhozJWJwSaZQdWfJSAKOpvovF6oU";
export const supabase = createClient(supabaseUrl, supabaseKey);