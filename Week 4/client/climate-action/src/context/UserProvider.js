import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

export default function UserProvider(props) {
    const initState = {
         user: JSON.parse(localStorage.getItem("user")) || {},
         token: localStorage.getItem("token") || "", 
         issues: []}
    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
        .then (res => {
            console.log(res)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem("token",res.data.token)
            setUserState(prevState=>({
               ...prevState,
               token: res.data.token,
               user: res.data.user 
            }))
        })
        .catch(err => console.dir(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post('/auth/login', credentials)
        .then(res => console.log(res))
        .catch(err => console.dir(err.response.data.errMsg))
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