import React from "react";
import { RiSettings3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const SettingsButton = () => {
    const navigate = useNavigate();
    const handleSettingsClick = () => {
        navigate('/settings')
    }
    return (
        <button
            onClick={handleSettingsClick}
            className="bg-none border border-blue-500 text-blue-500 mr-2 flex hover:bg-blue-600 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            <RiSettings3Line className="inline-block mr-2 mt-1 " />
            Settings
        </button>
    );
};

export default SettingsButton;
