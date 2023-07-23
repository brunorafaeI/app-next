'use client'

import { httpClient } from "@/common/libs/httpClient";
import { ReactNode, createContext, useContext, useState } from "react";

interface UserInfoProps {
  id: string
  name: string
  email: string
  token: string
}

interface SignInCredentials {
  name: string
  email: string
}

interface AuthContextProps {
  isLoggedIn: boolean;
  userInfo: UserInfoProps
  SingIn: (credentials: SignInCredentials) => Promise<void>
  SingOut: () => void
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfoProps>(() => {
    return JSON.parse(localStorage.getItem('@app:userInfo') || '{}')
  })

  const SingIn = async ({ email, name }: SignInCredentials) => {
    const userInfo = await httpClient.request({
      method: 'POST',
      path: '/signin',
      body: JSON.stringify({ email, name })
    })

    localStorage.setItem('@app:userInfo', userInfo)

    setIsLoggedIn(true)
    setUserInfo(userInfo)
  }

  const SingOut = () => {
    localStorage.removeItem('@app:userInfo')

    setIsLoggedIn(false)
    setUserInfo({} as UserInfoProps)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, SingIn, SingOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error("No AuthContext provided")
  }

  return authContext
}