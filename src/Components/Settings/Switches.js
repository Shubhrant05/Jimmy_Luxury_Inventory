import React, { useState } from 'react'

const Switches = () => {
    const [amazonSync, setAmazonSync] = useState(true);
    const [flipkartSync, setFlipkartSync] = useState(true);

    // use the states here to sync with Amazon and Flipkart
    return (
        <div className="flex flex-col mb-4">
            <label className="text-lg font-medium mb-2">Amazon Sync:</label>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={amazonSync}
                    onChange={() => {
                        const newValue = !amazonSync;
                        setAmazonSync(newValue);
                        console.log(`Amazon Sync switched ${newValue ? 'on' : 'off'}`);
                    }}
                />
                <span className="slider"></span>
            </label>
            <label className="text-lg font-medium mb-2">Flipkart Sync:</label>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={flipkartSync}
                    onChange={() => {
                        const newValue = !flipkartSync;
                        setFlipkartSync(newValue);
                        console.log(`Flipkart Sync switched ${newValue ? 'on' : 'off'}`);
                    }}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default Switches