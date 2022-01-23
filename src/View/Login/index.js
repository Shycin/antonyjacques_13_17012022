import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Loading, errorLogin, authentificationAsync, tokenVerifAsync } from '../../features/authentification/authentificationSlice';
import * as Status from '../../features/authentification/authentificationStatus';
import checkToken from '../../services/CheckToken'

import Nav from '../Nav'
import Footer from '../Footer'

import Loader from '../../Component/Loader'

import './index.css';

export default function Login() {
    const [login, setLogin] = useState({email: null, password: null})
    const [remember, setRemember] = useState(false)

    const dispatch = useDispatch();

    const loading = useSelector(Loading);
    const error_login = useSelector(errorLogin);

    const history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('token') !== null)
        {
            dispatch(tokenVerifAsync({ token: localStorage.getItem('token') }))
        }

        if(localStorage.getItem('mail') !== null)
        {
            setRemember(true)
            setLogin(login => ({ ...login, email: localStorage.getItem('mail') }))
        }
    }, [])


    checkToken({redirect: '/profile', trigger: true})
    


    function Login(e) {
        e.preventDefault();

        if (remember) {
            localStorage.setItem('mail', login.email)
        } else {
            localStorage.removeItem('mail')
        }

        dispatch(authentificationAsync(login))
    }

    return (
    <>
        { loading === Status.LOGIN  
            ? <Loader/>
            : <div className="App">
                <Nav />
                <main className="main bg-dark">
                    <section className="sign-in-content">
                        <i className="fa fa-user-circle sign-in-icon"></i>
                        <h1>Sign In</h1>
                        <form>
                            <div className="input-wrapper">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" 
                                    onChange={(e) => setLogin(login => ({...login, email: e.target.value})) }
                                    value={login.email ? login.email : ''}
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" 
                                    onChange={(e) => setLogin(login => ({...login, password: e.target.value})) }
                                />
                            </div>
                            <div className="input-remember">
                                <input type="checkbox" id="remember-me" checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                /><label htmlFor="remember-me">Remember me</label>
                            </div>
                            { loading === Status.WAIT 
                                ? <Loader className="input-wrapper" /> 
                                : <button className="sign-in-button" onClick={(e) => Login(e)} >Sign In</button> }
                            <div className='input-error'>{error_login}</div>
                        </form>
                    </section>
                </main>
                <Footer />
            </div>
        }
    </>
    );
}
