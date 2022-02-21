import React, {useState} from 'react';
import './auth.scss'
import Input from "../../utils/input/Input";
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const loginHandler = () => {
        dispatch(login(email, password))
    }

    return (
        <div className='container'>
            <div className='auth'>
                <div className="auth__header">Войти</div>
                <Input
                    type='text'
                    placeholder='Введите email...'
                    value={email}
                    onChange={setEmail}
                />
                <Input
                    type='password'
                    placeholder='Введите пароль...'
                    value={password}
                    onChange={setPassword}
                />
                <div className="auth__footer">
                    <button
                        className="btn"
                        onClick={loginHandler}
                    >Войти</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
