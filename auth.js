const supabase = window.supabase

const supabase_url = 'https://qbxtufbnezrmrayacnpd.supabase.co'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFieHR1ZmJuZXpybXJheWFjbnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NTMwODQsImV4cCI6MjA1NDQyOTA4NH0.ECa5tTU4ejtRRsy2nzxI9FPnsGLaCeEGbRk5GmCwvrs'
const client = supabase.createClient(supabase_url, supabase_key)

const signup_form = document.querySelector('#signup-form')
const login_form = document.querySelector('#login-form')

signup_form.addEventListener(
    'submit', function(e) {
        e.preventDefault()
        const signup_name = document.querySelector('#signup_name').value
        const signup_email = document.querySelector('#signup_email').value
        const signup_password = document.querySelector('#signup_password').value
        Signup(signup_name, signup_email, signup_password)
    }
)

login_form.addEventListener(
    'submit', function(e) {
        e.preventDefault()
        const login_email = document.querySelector('#login_email').value
        const login_password = document.querySelector('#login_password').value
        Login(login_email, login_password)
    }
)

async function Signup(name, email, password) {
    const user = await client.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                first_name: name
            }
        }
    })
    alert('Now ples log in')
}

function Login(email, password) {
    document.cookie = 'email=' + email
    document.cookie='password=' + password
    window.open('chat.html', '_self')
}
