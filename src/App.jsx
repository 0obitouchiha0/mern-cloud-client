import {useEffect} from 'react'
import NavBar from "./components/navbar/NavBar";
import './App.scss'
import {Routes, Route, Navigate} from 'react-router-dom'
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import Disc from "./components/disc/Disc";
import {useDispatch, useSelector} from "react-redux";
import {auth} from './actions/user'
import Profile from "./components/profile/Profile";

function App() {

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(auth())
    }, [])

  return (
    <div className='app'>
      <NavBar/>
        {!isAuth
            ? <Routes>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/*' element={<Navigate to='/login'/>}/>
            </Routes>
            : <Routes>
                <Route path='/' element={<Disc/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/*' element={<Navigate to='/'/>}/>
            </Routes>
        }
    </div>
  );
}

export default App;
