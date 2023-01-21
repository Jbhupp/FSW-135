import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

export default function UserProvider(props) {
    const initState = {
         user: JSON.parse(localStorage.getItem("user")) || {},
         token: localStorage.getItem("token") || "", 
         issues: [],
         errMsg: ""}
    const [userState, setUserState] = useState(initState)

    function handleAuthError(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
        .then (res => {
            //console.log(res)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem("token",res.data.token)
            const {user, token} = res.data
            setUserState(prevState=>({
               ...prevState,
               user: user,
               token : token
            }))
        })
        .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post('/auth/login', credentials)
        .then(res => {
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem("token",res.data.token)
            const {user, token} = res.data
            setUserState(prevState => ({
                ...prevState,
                user: user,
                token: token
            }))
        })
        .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function logout (){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUserState({
            user:  {},
            token: "", 
            issues: []
        })
    }
    return (
        <UserContext.Provider value ={ {
             ...userState, signup, login, logout 
             } }>
            { props.children }
        </UserContext.Provider>
    )
}