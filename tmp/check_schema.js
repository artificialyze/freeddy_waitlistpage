
// require('dotenv').config({ path: 'e:/Antigravity/f1/.env.local' });
const { createClient } = require('@supabase/supabase-js');


async function checkSchema() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // We can't easily check schema via JS client for all tables, but we can try to select one row
  const { data, error } = await supabase.from('messages').select('*').limit(1);
  if (error) {
    console.error('Error fetching messages:', error);
  } else {
    console.log('Messages table sample:', data);
  }
}

checkSchema();
