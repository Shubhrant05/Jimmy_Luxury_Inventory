import React, { useState } from 'react';

const SyncSwitch = (props) => {
  const [syncEnabled, setSyncEnabled] = useState(false);
    const toggleSync = () => {
        setSyncEnabled(!syncEnabled);
        !syncEnabled ? console.log("Syncing with Amazon and Flipkart") : console.log("Syncing disabled");
    // Add logic to handle syncing with Amazon and Flipkart
  };

  return (
    <div className="flex items-center">
      <label htmlFor="syncToggle" className="mr-2">Sync with Amazon and Flipkart:</label>
      <input
        type="checkbox"
        id="syncToggle"
        // checked={syncEnabled}
        onChange={toggleSync}
        className="form-checkbox h-5 w-5 text-indigo-600"
        
        checked = {props.sync === "synchronized"}
      />
    </div>
  );
};

export default SyncSwitch;
