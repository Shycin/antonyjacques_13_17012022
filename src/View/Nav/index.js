import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import './index.css';
import logo from '../img/argentBankLogo.png'

import { logout, Token, Profile } from '../../features/authentification/authentificationSlice';



export default function Nav() {
    
    const dispatch = useDispatch()

    const Login = useSelector(Token);
    const profile = useSelector(Profile);

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {
                    profile
                    ? <Link to="/profile" className="main-nav-item">
                        <FontAwesomeIcon icon={faUserCircle} />
                            {profile.firstName}
                        </Link>
                    : ''
                }
                {
                    Login 
                    ? <Link to="/" className="main-nav-item" onClick={() => dispatch(logout())}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Sign Out
                    </Link>
                    : <Link to="/login" className="main-nav-item">
                        <FontAwesomeIcon icon={faUserCircle} />
                        Sign In
                    </Link>
                }
                
            </div>
        </nav>
    );
}
