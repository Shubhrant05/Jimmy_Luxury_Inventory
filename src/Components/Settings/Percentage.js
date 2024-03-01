import React, { useState } from 'react';

const PercentageSelection = () => {
    const [amazonPercentage, setAmazonPercentage] = useState(50);
    const [flipkartPercentage, setFlipkartPercentage] = useState(50);

    //use the Amazon and Flipkart percentages to calculate the inventory split and send it to the server
    const handleAmazonPercentageChange = (value) => {
        setAmazonPercentage(value);
        console.log(`Amazon percentage set to: ${value}`);
    };

    const handleFlipkartPercentageChange = (value) => {
        setFlipkartPercentage(value);
        console.log(`Flipkart percentage set to: ${value}`);
    };

    return (
        <div className="flex flex-col mb-4">
            <label className="text-lg font-medium mb-2">Percentage of Inventory on Amazon:</label>
            <input
                type="range"
                min="0"
                max="100"
                value={amazonPercentage}
                onChange={(e) => handleAmazonPercentageChange(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md mb-2"
            />
            <span>{amazonPercentage}%</span>
            <label className="text-lg font-medium mb-2">Percentage of Inventory on Flipkart:</label>
            <input
                type="range"
                min="0"
                max="100"
                value={flipkartPercentage}
                onChange={(e) => handleFlipkartPercentageChange(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md mb-2"
            />
            <span>{flipkartPercentage}%</span>
        </div>
    );
};

export default PercentageSelection;