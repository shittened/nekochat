import logo from './logo.svg';
import './App.css';
import { createClient } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const supabase_url = 'https://qbxtufbnezrmrayacnpd.supabase.co'
const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFieHR1ZmJuZXpybXJheWFjbnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NTMwODQsImV4cCI6MjA1NDQyOTA4NH0.ECa5tTU4ejtRRsy2nzxI9FPnsGLaCeEGbRk5GmCwvrs'
const supabase = createClient(supabase_url, supabase_key)

var logged_in = false

function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()

    const handleSignup = async (event) => {
        event.preventDefault()
        setLoading(true)
        setError('')
        setSuccessMessage('')

        try {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) {
                setError(error.message)
            }
            else {
                setSuccessMessage('Confirm verification email from Supabase then log in pls')
                setEmail('')
                setPassword('')
            }
        }    
        catch (error) {
            setError('An error occurred while signing up.')
        }
        finally {
            setLoading(false)
            return ChatPage()
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        setError('')
        setSuccessMessage('')

        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                setError(error.message);
            }
            else {
                setSuccessMessage('Logging in')
                setEmail('')
                setPassword('')
                navigate('/chat')
            }
        }
        catch (error) {
            setError('An error occurred while signing up.')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className = "App">
            <div className = "auth_page">
                <div className = "sinup">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSignup}>
                        <input
                            type="email"
                            value={email}
                            placeholder = "E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder = "Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    </form>
                </div>
                <div className = "login">
                    <h2>Log in</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            value={email}
                            placeholder = "E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder = "Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    </form>
                </div>

            </div>
        </div>
    );
}

function ChatPage() {
    return (
        <div className="App">
        <h1>what the sigma</h1>
        </div>
    )

}

function App() {
    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<AuthPage />} />
                <Route path = "/chat" element = {<ChatPage />} />
            </Routes>
        </Router>
    )
}

export default App;
