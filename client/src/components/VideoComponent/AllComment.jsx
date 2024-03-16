import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function AllComment({comment}) {
    const[user, setUser] = useState(null)
    const token = useSelector(state => state.accessTokenSlice.token);

    const fetchUser = useCallback(async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/users/user-by-id`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: comment?.owner })
            })

            if(!response) {
                throw new Error("Something went wrong while adding a comment")
            }

            const jsonResponse = await response.json()
            setUser(jsonResponse)
        } catch (error) {
            throw new Error(error)
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [comment])

    return (
        <div className='flex flex-wrap justify-start w-full items-start gap-2'>
                <img className='w-10 h-10 rounded-full' src={user?.data?.avatar} alt='Profile'/>
                <div className=''>
                    <div >
                        <h1 className='text-gray-400'>{user?.data?.username}</h1>
                        <p>{comment?.content}</p>
                    </div>
                    <div className='flex flex-wrap justify-start items-center gap-3'>
                        <div className='rounded-full px-6 py-1 bg-gray-200'>
                            <FontAwesomeIcon style={{ fontSize: '14px' }} icon={faThumbsUp} />
                        </div>
                        <div className='rounded-full px-6 py-1 bg-gray-200'>
                            <FontAwesomeIcon style={{ fontSize: '14px' }} flip="horizontal" icon={faThumbsDown} />
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default AllComment
