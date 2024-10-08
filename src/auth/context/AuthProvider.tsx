import React, { ReactNode, useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { AuthReducer } from './authReducer'
import { IUser } from '../../utils/interface/user'
import { types } from './types'
import { toast } from 'sonner'

// Define las props del AuthProvider
interface AuthProviderProps {
    children: ReactNode
}

// Inicializa el estado sin localStorage
const init = () => {
    return {
        user: { username: '', password: '' },
        logged: false,
    }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, init())

    const login = async (user: IUser) => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                credentials: 'include',
            })

            const data = await response.json()

            if (response.ok) {
                dispatch({ type: types.login, payload: data.user })
                toast.success('Login exitoso')
            } else {
                toast.error(`Error: ${data.message}`)
            }
        } catch (error) {
            toast.error('Error al conectar con el servidor')
        }
    }

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Envío de cookies o tokens si es necesario
            })

            if (response.ok) {
                dispatch({ type: types.logout })
                toast.success('Logout exitoso')
            } else {
                const data = await response.json()
                toast.error(`Error al cerrar sesión: ${data.message}`)
            }
        } catch (error) {
            toast.error('Error al conectar con el servidor')
        }
    }

    return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>
}
