import React, {useState} from 'react';
import './auth.scss'
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const regHandler = () => {
        registration(email, password)
    }

    return (
        <div className='container'>
            <div className='auth'>
                <div className="auth__header">Регистрация</div>
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
                        onClick={regHandler}
                    >Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
