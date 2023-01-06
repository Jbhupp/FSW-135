import React, {useContext} from 'react'
import Issue from './Issue.js'
import { IssueContext } from './../context/IssuesProvider';

export default function IssueList(props){
    // const { issues } = props
    const { issues } = useContext(IssueContext)
    return (
        <div className='issue-list'>
            { issues.map(issue => <Issue {...issue} key={issue._id}/>)}
        </div>
    )
}