export type AuthProps = {
    children: React.ReactNode
}

export type AuthContextt = {
        authInfo: any,
        handleLogin : (arg1: string, arg2:string) => void,
        handleLogout: () => void,
        isAuth: () => void,
}