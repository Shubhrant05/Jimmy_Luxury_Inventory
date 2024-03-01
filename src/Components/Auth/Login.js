import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = (props) => {
    // State variables to hold form data
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');


    const submitData = async () => {
        try {
            if (localStorage.getItem('username') === formData.username && localStorage.getItem('password') === formData.password && error === '') {
                toast.success("User signed-in successfully")
                console.log("User signed-in successfully");
            }
            else {
                toast.error("User could not be signed-in")
                console.log("User could not be signed-in");
            }
        } catch (error) {
            toast.error("User could not be signed-in")
        }
    }
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        submitData();
        if (formData.username === '' || formData.password === '' || formData.confirmPassword === '') {
            setError('Please fill in all fields');
            toast.error('Please fill in all fields');
            return;
        }
        // LOGGED DATA TO BE SHOWN IN CONSOLE FOR DEBUGGING PURPOSES
        console.log(formData);
    };

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className=" w-1/3 mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            User Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-none hover:bg-blue-700 hover:text-white border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <h4 className='text-center my-2'>Don't have an account. Please <Link to='/signup' className='underline'>Sign-up</Link></h4>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
