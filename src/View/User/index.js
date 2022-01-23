import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav'
import Footer from '../Footer'
import Loader from '../../Component/Loader'

import './index.css';

import { Token, Profile, Loading, modificationAsync } from '../../features/authentification/authentificationSlice';
import * as Status from '../../features/authentification/authentificationStatus';
import checkToken from '../../services/CheckToken'

export default function User() {  

    const [ toggleEditName, setToggleEditName ] = useState(false)

    const dispatch = useDispatch();
    const token = useSelector(Token);

    const User = useSelector(Profile);
    const loading = useSelector(Loading);

    checkToken({redirect: '/login', trigger: false})

    const editName = function() {

    }

    return (
        <div className="App">
        { loading === Status.LOGIN  
            ? <Loader/>
            : <>
            <Nav />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{User && !toggleEditName ? User.firstName + ' ' + User.lastName + '!': ''}</h1>
                    {
                        !toggleEditName
                        ? <>
                            <button className="edit-button" onClick={() => setToggleEditName(true)}>Edit Name</button>
                        </>
                        : <>
                            <div className='edition-flex-column'>
                                <div className='edition-flex'>
                                    <div>
                                        <input type='text' placeholder={User ? User.firstName : ''}/>
                                    </div>
                                    <div>
                                        <input type='text' placeholder={User ? User.lastName : ''}/>
                                    </div>
                                </div>
                                <div className='edition-flex'>
                                    <div>
                                        <button className="modification-button" onClick={() => dispatch(modificationAsync({token: token,lastName: "Jacques", firstName: "Antony"}))}>Save</button>
                                    </div>
                                    <div>
                                        <button className="modification-button" onClick={() => setToggleEditName(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
            <Footer />
            </>
        }
        </div>
    );
}
