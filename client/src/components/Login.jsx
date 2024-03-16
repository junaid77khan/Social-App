// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'

// function Login() {

//   const navigate = useNavigate()

//     const [login, setLogin] = useState({
//       username: "",
//       password: "",
//     });

//     const handleInput = (e) => {
//       const{name, value} = e.target

//       setLogin(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     }

//     const handleSubmit = async (e) => {
//       e.preventDefault()

//       try {
//         const response = await fetch('http://localhost:8000/api/v1/users/login', {
//           method: "POST",
//           headers: {
//           "Content-Type": "application/json" // Set Content-Type to JSON
//         },
//          body: JSON.stringify(login) // Convert login object to JSON string
//       });

//         if (!response.ok) {
//           console.log('Network response was not ok');
//         }

//         if(response) {
//           navigate("/home")
//         }
      
//         const data = await response.json();
//         console.log(data); // Handle the response from the server as needed
//       } catch (error) {
//         console.log(error);
//         throw new Error("Credientials are wrong");
//       }
//     }

//     return (
//       <>
//         <div className='relative'>
//           <Link to="/register" className='fixed top-8 right-10 bg-red-500 px-4 py-2 rounded-lg'>Register</Link>
//         </div>
//         <div className='w-full h-screen flex flex-wrap flex-col justify-center items-center'>
//               <div className='flex flex-wrap justify-center items-center bg-gray-500 py-2 px-4 h-1/2 rounded-lg'>
                
//                 <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
                   
//                   <div className="flex flex-col">
                   
//                    <label htmlFor="username">
//                     Username
//                    </label>
//                    <input
//                     type="text"
//                     name="username"
//                     id="username"
//                     value={login.username}
//                     onChange={handleInput}
//                     className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
//                    />

//                   </div>

//                   <div className="flex flex-col">

//                    <label htmlFor="password">
//                      Password
//                    </label>

//                    <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     value={login.password}
//                     onChange={handleInput}
//                     className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
//                    />
//                    </div>

//                    <button
//                      type="submit"
//                      className="w-100 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
//                     >
//                      Submit
//                     </button>
//                 </form>

//               </div>
//         </div>
//       </>
//     )
// }

// export default Login


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeATLS } from '../store/accessTokenSlice';
import { login } from '../store/authSlice';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        console.log('Credentials are wrong');
      }

      const dataFromServer = await response.json();
      const accessToken = dataFromServer.data.accessToken
      dispatch(storeATLS(accessToken))
      dispatch(login(dataFromServer))
      navigate('/home');

    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong while login');
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-5">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={loginData.username}
              onChange={handleInput}
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={login.password}
              onChange={handleInput}
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        <div className="mt-5">
          <span className="text-gray-700">Don't have an account?</span>{' '}
          <Link to="/register" className="text-blue-500 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
