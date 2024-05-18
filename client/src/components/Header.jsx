import React,{ useContext } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import TokenContext from '../context/TokenContext.js';
import '../styles/header-footer.css'

function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);
    console.log("user", user);
    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }

    return (
        <div>
            <nav className="header bg-[#dfcfb69e] border-solid border-0 border-b border-zinc-500 mb-3 flex justify-between items-center">
                <div className="w-2/4 text-center flex items-center justify-center lg:-ml-3">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    
                    <h1><Link to={"/"} className="text-fuchsia-700 text-4xl font-amaticSC font-bold tracking-wide">To-Do List</Link></h1>
                    
                </div>
                <div className="flex justify-between">
                    {
                        token ? (
                            <div className="flex w-4/4 items-center text-lg justify-end pr-3 lg:pr-24 xl:pr-24">
                                <p className="ml-20 lg:mr-3 xl:mr-3 leading-tight">Welcome <span className="text-indigo-700 capitalize">{user.name}</span></p>
                                <button onClick={logout} className="logout">Logout</button>
                            </div>
                        ) : (
                            <ul className="flex gap-3 text-lg w-3/4 pr-3 lg:pr-24 xl:pr-24">
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;