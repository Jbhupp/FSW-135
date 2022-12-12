import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { UserContext } from './UserProvider';
//import { use } from '../../../../server/routes/issueRouter';

export const IssueContext = React.createContext()


export default function IssueProvider(props) {

    const initState = {
         issues: []
        }
    const { token, user } = useContext(UserContext)
    const [issueState, setIssueState] = useState(initState)

    const axiosInstance = axios.create({
        baseURL: '/api/issues',
        headers: {'Authorization': `Bearer ${token}`}
    });
    

    // function to add an issue
    // function to get all USER issues
    
    // function to upvote issue -- remember to set up in backend
    // function to downvote issue -- remember to set up in backend
    // function to delete an issue -- optional
    
    // function to get all issues

    function getallIssues() {
        axiosInstance.get("/").then(function (response) {
            console.log("response: ", response)
    })
    }
    useEffect(function (){
        getallIssues()
    },[])
    
    
    return (
        <IssueContext.Provider value ={ {
             ...issueState,
             } }>
            { props.children }
        </IssueContext.Provider>
    )
}