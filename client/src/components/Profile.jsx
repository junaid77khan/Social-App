import React, { useEffect, useState } from 'react';
import Header from './Header';
import VideoCard from './VideoCard';
import Container from './container/Container'
import { useSelector } from 'react-redux';

function Profile() {
    const [stats, setStats] = useState();
    const[videos, setVideos] = useState([]);
    const[user, setUser] = useState({})
    const token = useSelector(state => state.accessTokenSlice.token)
    const userData = useSelector(state => state.authSlice.userData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get stats
                let response = await fetch('http://localhost:5000/api/v1/dashboard/stats', {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                });
    
                if (!response.ok) {
                    throw new Error("Server response is not ok");
                }
    
                let responseData = await response.json();
                setStats(responseData.data);

                // get channel videos
                response = await fetch('http://localhost:5000/api/v1/dashboard/videos', {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                });
    
                if (!response.ok) {
                    throw new Error("Server response is not ok");
                }
    
                responseData = await response.json();
                setVideos(responseData.data);
            } catch (error) {
                console.log(error);
                throw new Error("Something went wrong while fetching stats from server");
            }

            // get curr user
            const response = await fetch('http://localhost:5000/api/v1/users/current-user', {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                });
    
                if (!response.ok) {
                    throw new Error("Server response is not ok");
                }
    
                const responseData = await response.json();
                setUser(responseData.data);
        };
    
        fetchData();
    }, [])

    return (
        <Container>
            <div className='flex flex-wrap pt-6 items-center flex-col bg-gray-100 min-h-screen w-full'>
            <Header />
            {/* profile section */}
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 mt-2 w-full">
                {/* Rounded profile photo */}
                <div className="flex items-center justify-center mb-6">
                    <img className="rounded-full h-24 w-24 object-cover" src={user.avatar} alt='Profile photo' />
                </div>

                {/* Fullname and Username */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold">{user.fullName}</h2>
                    <p className="text-gray-600">{user.username}</p>
                </div>

                {/* subsribers and subscribed */}
                <div className='flex flex-wrap justify-center items-center font-bold'>
                    <p>Subscribers: {stats?.subscribers?.subscribersCount}</p>
                </div>

                {/* more information about profile */}
                <div className="mt-6">
                    <div className="flex justify-center gap-10">
                        <div className="text-center">
                            <p className="text-gray-600">Total Views</p>
                            <p className="text-lg font-semibold">{stats?.totalViews?.viewsCount}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-600">Total Likes</p>
                            <p className="text-lg font-semibold">{stats?.totalLikes?.likesCount}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-600">Total Videos</p>
                            <p className="text-lg font-semibold">{stats?.totalVideos?.videosCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* videos section */}
            <div className='flex flex-wrap justify-center items-center gap-4 mt-2 w-full'>
                {
                    videos.map((video) => (
                        <VideoCard key={video._id} thumbnail={video.thumbnail} title={video.title} fullName={user.fullName} />
                    ))
                }
            </div>
            </div>
        </Container>
    );
}

export default Profile;
