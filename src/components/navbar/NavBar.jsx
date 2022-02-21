import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import Logo from '../../assets/images/navbar-logo.svg'
import Avatar from '../../assets/images/navbar-avatar.svg'
import './NavBar.scss'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
import {API_URL} from "../../config";

const NavBar = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.file.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    let avatar = currentUser.avatar ? `${API_URL}/${currentUser.avatar}` : Avatar

    const logoutHandler = () => {
        dispatch(logout())
    }

    function setSearchNameHandler(e) {
        setSearchName(e.target.value)
        if(searchTimeout) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== '') {
            setSearchTimeout(setTimeout(() => {
                dispatch(searchFiles(e.target.value))
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className='navbar'>
            <div className="navbar__container">
                <div className="container__left">
                    <img src={Logo} alt="" className='navbar__logo'/>
                    <div className="navbar__header">MERN CLOUD</div>
                </div>
                <div className="container__right">
                    {!isAuth &&
                        <>
                            <Link to='login' className="navbar__auth">Войти</Link>
                            <Link to='registration' className="navbar__auth">Зарегистрироваться</Link>
                        </>
                    }
                    {isAuth &&
                        <>
                            <input
                                type="text"
                                placeholder='Название файла'
                                className='navbar__search'
                                value={searchName}
                                onChange={setSearchNameHandler}
                            />
                            <div
                                className='navbar__auth'
                                onClick={logoutHandler}
                            >Выйти</div>
                            <Link to='profile'>
                                <img
                                    src={avatar}
                                    alt=""
                                    className='navbar__avatar'
                                />
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;
