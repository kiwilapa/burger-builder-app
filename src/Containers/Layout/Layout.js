import { useSelector } from 'react-redux'
import { Routes, Route, Outlet, Redirect } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { Abc } from '@mui/icons-material'

// ----------------- importing from other files -----------------
import Home from "../Home/Home"
import NavigationBar from '../../Components/NavigationBar/NavigationBar'

const Layout = () => {

    const token = useSelector(state => state.userForm.currentUser.token)    

    return (
        <div>
            <NavigationBar />
            <Routes>
                <Route path = '/'>
                    <Route index element = {<Home />}/>
                    <Route path = 'create-burger' />
                </Route>
            </Routes>
            {/* <div>Inside home</div> */}
        </div>
    )
}

export default Layout