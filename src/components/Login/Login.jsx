import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {saveName} from "../../features/users/usersSlice";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import '../../styles/login.scss'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const valid = new RegExp(/^[a-zA-Zа-яА-Я0-9_]{0,}$/)
    const [name, setName] = useState('')

    let validName = valid.test(name)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validName) {
            dispatch(saveName(e.target[0].value))
            navigate('/game')
        } else {
            alert('Incorrect name')
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="login__form">
                <TextField error={!validName} onChange={(e) => setName(e.target.value)} required label="User Name" variant="outlined" />
                <Button type="submit" variant="outlined">Save</Button>
            </form>
        </div>
    );
};

export default Login;