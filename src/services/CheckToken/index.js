/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Token, tokenIsInvalid, TokenIsValid, tokenVerifAsync } from '../../features/authentification/authentificationSlice';

const CheckToken = function ({redirect = '/', trigger = false}) {
    const dispatch = useDispatch();

    const currentToken = useSelector(Token);
    const tokenValidity = useSelector(TokenIsValid);
    const history = useHistory();

    useEffect(() => { 
        console.log(currentToken, localStorage.getItem('token'))
        if(currentToken || localStorage.getItem('token'))
        {
            console.log(currentToken)
            const token = currentToken ? currentToken : localStorage.getItem('token')
            console.log(token)
            dispatch(tokenVerifAsync({token: token}))
        }
        else
        {
            dispatch(tokenIsInvalid())
        }
    }, []) // check if current token is valid on load function
    useEffect(() => { if (tokenValidity === trigger) { history.push(redirect); }}, [tokenValidity]) // if token validation change state and return false, redirect to good page
}
export default CheckToken