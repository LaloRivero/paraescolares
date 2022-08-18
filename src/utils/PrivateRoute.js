import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AppContext from '../Lib/AppContext'
import Dashboard from '../Components/Dashboard'
import Login from '../Components/Login'

const PrivateRoute = ({ path }) => {
    const {user} = useContext(AppContext)
    if ( user && path === '/dashboard' ) {
      return <Dashboard />
    }
    if (user && path === '/login'){
      return <Navigate to='/dashboard'/>
    }
    return <Login />
}

export default PrivateRoute;