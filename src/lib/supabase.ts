import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://nglxsnvqbapbqmrjmzhw.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQyMDc5OWIzLTMzYzYtNGM2YS1iYjg3LWU4ZjYwZGJhNWVmZSJ9.eyJwcm9qZWN0SWQiOiJuZ2x4c252cWJhcGJxbXJqbXpodyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY2NjY1NDcxLCJleHAiOjIwODIwMjU0NzEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.9NsfNGtZw4pCByrmIIAL542o0KcZgapZUEzLJAHlW6k';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };