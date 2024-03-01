import React from 'react'
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        //Add code to logout user
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        navigate('/');
    }
    return (
        <>
            <button onClick={handleLogout}
            className=" mr-3 bg-none border border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Logout
            </button>
        </>
    )
}

export default Logout