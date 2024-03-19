import React, { useState } from 'react';

const InventoryMoveButton = (props) => {
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [moveToAmazon, setMoveToAmazon] = useState(false); 
    const [moveToFlipkart, setMoveToFlipkart] = useState(false); 

    const handleMoveInventory = () => {
        // Check the values of moveToAmazon and moveToFlipkart states to determine where to move the inventory
        if (moveToAmazon) {
            // Logic to move inventory to Amazon
            console.log('Inventory moved to Amazon successfully!');
        }
        if (moveToFlipkart) {
            // Logic to move inventory to Flipkart
            console.log('Inventory moved to Flipkart successfully!');
        }
        // Reset states and close confirmation dialog
        setMoveToAmazon(false);
        setMoveToFlipkart(false);
        setConfirmationOpen(false);
    };

    return (
        <div>
            <button
                onClick={() => setConfirmationOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled = {props.move !== "not moved"}
            >
                {props.move === "not moved" ? "Move Inventory" : "Inventory Moved"}
            </button>
            {confirmationOpen && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow">
                        <p>Do you want to move inventory?</p>
                        <div>
                            <label className="inline-flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    checked={moveToAmazon}
                                    onChange={() => setMoveToAmazon(!moveToAmazon)}
                                    className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                <span className="ml-2">Move to Amazon</span>
                            </label>
                        </div>
                        <div>
                            <label className="inline-flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    checked={moveToFlipkart}
                                    onChange={() => setMoveToFlipkart(!moveToFlipkart)}
                                    className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                <span className="ml-2">Move to Flipkart</span>
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleMoveInventory}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
                            >
                                Move
                            </button>
                            <button
                                onClick={() => setConfirmationOpen(false)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryMoveButton;
