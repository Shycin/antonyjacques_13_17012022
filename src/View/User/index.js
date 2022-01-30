import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav'
import Footer from '../Footer'
import Loader from '../../Component/Loader'
import ItemTransaction from '../../Component/ItemTransaction'

import './index.css';

import { Token, Profile, Loading, modificationAsync } from '../../features/authentification/authentificationSlice';
import { Loading as Loading_account, userAccount, accountAsync } from '../../features/account/accountSlice';

import * as Status from '../../features/authentification/authentificationStatus';
import * as Status_account from '../../features/account/accountStatus';
import checkToken from '../../services/CheckToken'

export default function User() {  

    const dispatch = useDispatch();
    const token = useSelector(Token);


    // user data
    const User = useSelector(Profile);
    const loading = useSelector(Loading);


    // account load 
    const User_account = useSelector(userAccount);
    const loading_account = useSelector(Loading_account);


    checkToken({redirect: '/login', trigger: false})

    const [ toggleEditName, setToggleEditName ] = useState(false)
    const [ name, setName ] = useState({firstName: null, lastName: null})
    const [ waitDispactch, setWaitDispatch ] = useState(false)


    useEffect(() => {
        if(User)
        {
            dispatch(accountAsync({userID: User.id}))
            setName(name => ({...name, firstName:User.firstName, lastName: User.lastName}))
        }
        

        if(User && waitDispactch)
        {
            setWaitDispatch(false)
            setToggleEditName(false)
        }
    }, [User])

    return (
        <div className="App">
        { loading === Status.LOGIN || loading === Status.WAIT || !token
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
                                        <input type='text' placeholder={User ? User.firstName : ''} onChange={(e) => setName(name => ({...name, firstName: e.target.value})) }/>
                                    </div>
                                    <div>
                                        <input type='text' placeholder={User ? User.lastName : ''} onChange={(e) => setName(name => ({...name, lastName: e.target.value})) }/>
                                    </div>
                                </div>
                                <div className='edition-flex'>
                                    <div>
                                        <button className="modification-button" onClick={() => {setWaitDispatch(true); dispatch(modificationAsync({token: token,lastName: name.lastName, firstName: name.firstName}))}}>Save</button>
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
                {
                    loading_account === Status_account.INIT || !User_account
                    ? <Loader />
                    : User_account.map((element,index) => {
                        return <ItemTransaction
                            key={index}
                            title={element.title}
                            account={element.account}
                            amount={element.ammount}
                            description={element.description}
                        />
                    })
                }
            </main>
            <Footer />
            </>
        }
        </div>
    );
}
