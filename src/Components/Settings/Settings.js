import React, { useState } from "react";
import ManualSync from "./ManualSync";
import PercentageSelection from "./Percentage";
import Switches from "./Switches";

const AutoSyncToggle = () => {
    const [autoSync, setAutoSync] = useState(false);
    const [syncInterval, setSyncInterval] = useState(2); 

    const handleToggle = () => {
        setAutoSync(!autoSync);
    };

    const handleIntervalChange = (e) => {
        const selectedInterval = parseInt(e.target.value);
        setSyncInterval(selectedInterval);
        console.log(`Selected auto-sync interval: ${selectedInterval} hours`);
    };

    const handleSubmit = () => {
        handleToggle()
        console.log(`Auto-sync status: ${autoSync ? 'ON' : 'OFF'}`);
        console.log(`Selected auto-sync interval: ${syncInterval} hours`);
        // Here you can send the auto-sync status and interval to the backend
    };

    return (
        <>
            <div className="flex items-center">
                <div>
                    <select
                        value={syncInterval}
                        onChange={handleIntervalChange}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    >
                        {[...Array(6).keys()].map((i) => (
                            <option key={i + 2} value={i + 2}>{i + 2} hours</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleSubmit} className=" inline-flex items-center ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {autoSync ? "Enable " : "Disable "}Auto Sync 
                </button>
            </div>
            <div className="mt-1 ml-1">Auto sync is {!autoSync ? "enabled " : "disabled "}* </div>
        </>
    );
};

const SettingsPage = () => {

    return (
        <div className="w-2/3 container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Percentage Selection</h2>
                    <PercentageSelection />
                </div>
                <div className="mb-6">
                    <ManualSync />
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Auto-sync Interval</h2>
                    <AutoSyncToggle />
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Switches</h2>
                    <Switches />
                </div>

            </div>
        </div>
    );
};

export default SettingsPage;