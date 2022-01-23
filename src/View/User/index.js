import React from 'react';
import { useSelector } from 'react-redux';

import Nav from '../Nav'
import Footer from '../Footer'
import Loader from '../../Component/Loader'

import './index.css';

import { Profile, Loading } from '../../features/authentification/authentificationSlice';
import * as Status from '../../features/authentification/authentificationStatus';
import checkToken from '../../services/CheckToken'

export default function User() {  

    const User = useSelector(Profile);
    const loading = useSelector(Loading);

    checkToken({redirect: '/login', trigger: false})

    return (
        <div className="App">
        { loading === Status.LOGIN  
            ? <Loader/>
            : <>
            <Nav />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{User ? User.firstName : ''} {User ? User.lastName : ''}!</h1>
                    <button className="edit-button">Edit Name</button>
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
