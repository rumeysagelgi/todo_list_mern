import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from '../axios/axios.js';
import TokenContext from '../context/TokenContext.js';

function Login() {
    const [formData, setFormData] = useState({});
    const {userToken, tokenDispatch, userDispatch} = useContext(TokenContext);
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/login", formData)
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token })
            userDispatch({ type: "SET_USER", payload: result.data.user })
            localStorage.setItem("authToken",JSON.stringify(result.data.token))
        } catch (error) {
            console.log(error);
            setError({ message: error.response.data.message })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    
    return (
        <div>
            {userToken && <Navigate to="/" />}
            <section className="login-container">
                <div className="container px-6 py-28 h-full text-gray-800">
                    <div className="flex justify-center items-center flex-wrap h-full g-6">
                        <div className="xl:w-4/12 lg:w-4/12 md:w-7/12 md:ml-10 items-center">
                            <form method='POST' onSubmit={handleSubmit}>
                                <div>
                                    {error && (
                                        <div className="italic text-red-600 mb-3">
                                            {error.message}!
                                        </div>
                                    )
                                    }
                                </div>
                                
                                {/* User e-mail input */}
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        name='email'
                                        onChange={handleChange}
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-white bg-neutral-600 bg-clip-padding border-solid border-2 border-black rounded transition ease-in-out m-0 outline-none"
                                        id="emailInput"
                                        placeholder="E-mail address" />
                                </div>
                                {/* User password input */}
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        name='password'
                                        onChange={handleChange}
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-white bg-neutral-600 bg-clip-padding border-solid border-2 border-black rounded transition ease-in-out m-0 outline-none"
                                        id="passInput"
                                        placeholder="Password" />
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input checkbox appearance-none h-4 w-4 border border-gray-300 rounded-xl bg-white checked:bg-zinc-600 checked:border-zinc-900 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="formCheckbox" />
                                        <label className="form-check-label inline-block text-gray-800" htmlFor="formCheckbox">Remember me</label>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="">
                                        <div className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                                            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                            <span className="relative text-white text-xl">Login</span>
                                        </div>
                                    </button>
                                    <p className="text-sm text-neutral-600 text-left font-semibold mt-8 pt-1">
                                        Don't have an account?&nbsp;
                                        <Link
                                            to={"/register"}
                                            className="text-indigo-700 hover:underline focus:underline"
                                        >Register</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Login;