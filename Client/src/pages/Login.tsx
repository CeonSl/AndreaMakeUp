import { loginRequest, profileRequest } from '../api/auth'
import { useAuthStore } from '../store/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import LoginPage from '../components/LoginPage';
import { useState } from 'react';

export function Login() {
    const setToken = useAuthStore(state => state.setToken)
    const setProfile = useAuthStore(state => state.setProfile)
    const [error, setError] = useState<{ errors: [] }>({ errors: [] })

    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[2] as HTMLInputElement).value
        console.log(password);
        try {
            const resLogin = await loginRequest(email, password)
            console.log('respuesto',resLogin);
            setToken(resLogin.data.token)
            const resProfile = await profileRequest()
            setProfile(resProfile.data.profile)
            navigate('/products')
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const messages = error.response?.data.messages
                setError({ 'errors': messages })
                console.log(messages);
            }
        }

    }

    return (
        <LoginPage handleSubmit={handleSubmit} error={error} />
    )
}