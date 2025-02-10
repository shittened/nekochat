const supabase = window.supabase

const supabase_url = 'https://qbxtufbnezrmrayacnpd.supabase.co'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFieHR1ZmJuZXpybXJheWFjbnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NTMwODQsImV4cCI6MjA1NDQyOTA4NH0.ECa5tTU4ejtRRsy2nzxI9FPnsGLaCeEGbRk5GmCwvrs'
const client = supabase.createClient(supabase_url, supabase_key)

const email = document.cookie.split(';')[0].split('=')[1]
const password = document.cookie.split(';')[1].split('=')[1]
const message_form = document.querySelector('#message-form')
const message_input = document.querySelector('#message-input')
const messages_display = document.querySelector('#messages')

async function Login(email, password) {
    const user = await client.auth.signInWithPassword({
        email: email,
        password: password
    })
}

async function SendMessage(message) {
    const user = await client.auth.getUser()
    const created_by = user.data.user.user_metadata.first_name
    await client.from('messages').insert([{
        message: message,
        created_by: created_by
    }]).select()
    message_input.value = ''
}

message_form.addEventListener(
    'submit', function(e) {
        e.preventDefault()
        const message = message_input.value
        SendMessage(message)
    }
)

async function GetMessages() {
    const {data:messages} = await client.from('messages').select('*')
    messages.forEach(AddMessageToChat)
}

function AddMessageToChat(message) {
    const message_div = document.createElement('div')
    message_div.classList.add(['message'])
    message_div.innerHTML = `
        <div class = "message-author">
            ${message.created_by}
        </div>
        <div class = "message-content">
            ${message.message}
        </div>
    `
    messages_display.append(message_div)

    client.channel('custom-insert-channel')
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'messages' 
            },
            (message) => {
                AddMessageToChat(message.new)
            }
        ).subscribe()
}

Login(email, password)
GetMessages()
