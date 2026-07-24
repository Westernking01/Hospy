const { createClient } = require('@supabase/supabase-js');
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
s.auth.signUp({email: 'testcustomer123@example.com', password: 'Password123!'})
  .then(r => console.log('Signup result:', JSON.stringify(r)))
  .catch(console.error);
