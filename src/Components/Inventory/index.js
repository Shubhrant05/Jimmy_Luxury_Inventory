import React, { useState, useEffect }  from "react";
import Inventory from "./Inventory";

const App = () => {
      

    const columns = [
        "Product Sku", "Product Title", "Unavailable Stock", "Committed Stock", "Available Stock", "Onhand Stock", "Available Stock in Amazon", "Available Stock in Flipkart", "Amazon", "Flipkart", "Tags"]

    return (
        <>
            <div >
                <Inventory columns={columns} />
            </div>
        </>
    );
};

export default App;
