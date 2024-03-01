import React from 'react'

const ManualSync = () => {
    const handleManualSync = () => {
        // Logic for manual sync
        console.log('Manual sync triggered');
    };

    return (
        <button
            onClick={handleManualSync}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Manual Sync
        </button>
    );
};

export default ManualSync