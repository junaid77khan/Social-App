import React, { useCallback, useEffect, useState } from 'react'
import Button from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useSelector } from 'react-redux';

function Footer({videoData}) {
    const[boolLike, setBoolLike] = useState(null)
    const[boolDisLike, setBoolDisLike] = useState(null)
    const token = useSelector(state => state.accessTokenSlice.token);

    const fetchLikeData = useCallback( async() => {
        const res = await fetch(`http://localhost:5000/api/v1/likes/boolLike/b/${videoData?._id}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if(!res.ok) {
            throw new Error("Something went wrong while fetching like information")
        }
        const jsonRes = await res.json()
        setBoolLike(jsonRes.data)
    })

    const fetchDislikeData = useCallback( async() => {
        const res = await fetch(`http://localhost:5000/api/v1/dislikes/dislikebool/b/${videoData?._id}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if(!res.ok) {
            throw new Error("Something went wrong while fetching dislike information")
        }
        const jsonRes = await res.json()
        console.log("Dislike", jsonRes.data);
        setBoolDisLike(jsonRes.data)
    })

    const toggleLike = useCallback( async() => {
        const res = await fetch(`http://localhost:5000/api/v1/likes/toggle/v/${videoData?._id}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if(!res.ok) {
            throw new Error("Something went wrong while fetching liking video")
        }
        const jsonRes = await res.json()
        setBoolLike(jsonRes.data)
    })

    const toggleDisLike = useCallback( async() => {
        const res = await fetch(`http://localhost:5000/api/v1/dislikes/toggle/v/${videoData?._id}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if(!res.ok) {
            throw new Error("Something went wrong while fetching liking video")
        }
        const jsonRes = await res.json()
        setBoolDisLike(jsonRes.data)
    })

    useEffect(() => {
        fetchLikeData()
        fetchDislikeData()
    }, [toggleLike, toggleDisLike])

    const handleToggleLike = () => {
        if(boolDisLike == boolLike || boolLike) {
            // both are not selected
            toggleLike()
        } else {
            toggleLike()
            toggleDisLike()
        }
    }

    const handleToggleDislike = () => {
        if(boolDisLike == boolLike || boolDisLike) {
            // both are not selected
            toggleDisLike()
        } else {
            toggleLike()
            toggleDisLike()
        }
    }
    return (
        <div className=" bg-gray-200 rounded-lg w-full px-4 pb-4">
            <p className="text-gray-500 font-bolder">Views - {videoData?.views}</p>
            <h1 className="text-xl font-semibold text-gray-900">{videoData?.title}</h1>
            <div className='pr-3 flex flex-wrap justify-between items-center'>
                <div className='flex flex-wrap gap-3 items-center justify-between'>
                    <img className='rounded-full h-10 w-10' src={videoData?.owner?.avatar} />
                    <h1 className='font-semibold'>{videoData?.owner?.username}</h1>
                    <div className='flex flex-wrap justify-center items-center gap-1'>
                        <div onClick={handleToggleLike} className='rounded-full px-6 py-1 bg-gray-300'>
                            <FontAwesomeIcon style={{color: (boolLike) ? 'blue' : 'black'}} icon={faThumbsUp} />
                        </div>
                        <div onClick={handleToggleDislike} className='rounded-full px-6 py-1 bg-gray-300'>
                            <FontAwesomeIcon style={{color: (boolDisLike) ? 'blue' : 'black'}} flip="horizontal" icon={faThumbsDown} />
                        </div>
                    </div>
                </div>
                <div>
                   <Button>Subscribe</Button>
                    {/* <button className='px-5 py-2 font-semibold bg-red-500 rounded-full text-white'>Subscribe</button> */}
                </div>
            </div>
            {/* <h2 className="text-lg text-gray-800">{videoData?.description}</h2> */}
        </div>
    )
}

export default Footer
