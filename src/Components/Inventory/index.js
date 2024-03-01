import React from "react";
import Inventory from "./Inventory";
const App = () => {
    //Use data from Shopify-API 
    const data = [
        {
          "Product SKU": "SKU001",
          "Product Title": "Product 1",
          "Unavailable Stock": 10,
          "Committed Stock": 5,
          "Available Stock": 15,
          "Onhand stock": 20,
          "Available Stock on Amazon": 8,
          "Available Stock on Flipkart": 7,
          "Amazon": "true",
          "Flipkart": "false",
          "Tags": ["tag1", "tag2"]
        },
        {
          "Product SKU": "SKU002",
          "Product Title": "Product 2",
          "Unavailable Stock": 5,
          "Committed Stock": 2,
          "Available Stock": 7,
          "Onhand stock": 10,
          "Available Stock on Amazon": 3,
          "Available Stock on Flipkart": 4,
          "Amazon": "true",
          "Flipkart": "true",
          "Tags": ["tag2", "tag3"]
        },
        // Add more objects as needed
      ];
      

    const columns = [
        " Product SKU", "Product Title", "Unavailable Stock", "Committed Stock", "Available Stock", "Onhand stock", "Available Stock on Amazon", "Available Stock on Flipkart", "Amazon", "Flipkart", "Tags"]

    return (
        <>
            <div >
                <Inventory data={data} columns={columns} />
            </div>
        </>
    );
};

export default App;
