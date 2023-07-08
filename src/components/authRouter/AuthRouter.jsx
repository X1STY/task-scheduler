import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import AuthContext from '../../context/AuthProvider'

const AuthRouter = () => {

    const { auth } = useContext(AuthContext)

    return (
        auth?.fullName ? 
            <Outlet /> :
            <Navigate to='/login' />
    )
}

export default AuthRouter