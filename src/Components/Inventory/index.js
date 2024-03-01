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
            "Available Stock on Amazon": 0,
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
            "Available Stock on Flipkart": 3,
            "Amazon": "true",
            "Flipkart": "true",
            "Tags": ["tag2", "tag3"]
        },
        {
            "Product SKU": "SKU003",
            "Product Title": "Product 3",
            "Unavailable Stock": 8,
            "Committed Stock": 3,
            "Available Stock": 11,
            "Onhand stock": 15,
            "Available Stock on Amazon": 5,
            "Available Stock on Flipkart": 6,
            "Amazon": "true",
            "Flipkart": "true",
            "Tags": ["tag1", "tag3"]
        },
        {
            "Product SKU": "SKU004",
            "Product Title": "Product 4",
            "Unavailable Stock": 12,
            "Committed Stock": 8,
            "Available Stock": 20,
            "Onhand stock": 25,
            "Available Stock on Amazon": 10,
            "Available Stock on Flipkart": 7,
            "Amazon": "true",
            "Flipkart": "false",
            "Tags": ["tag1", "tag2", "tag3"]
        },
        {
            "Product SKU": "SKU005",
            "Product Title": "Product 5",
            "Unavailable Stock": 0,
            "Committed Stock": 0,
            "Available Stock": 0,
            "Onhand stock": 5,
            "Available Stock on Amazon": 0,
            "Available Stock on Flipkart": 0,
            "Amazon": "false",
            "Flipkart": "false",
            "Tags": ["tag3", "tag4"]
        },
        {
            "Product SKU": "SKU006",
            "Product Title": "Product 6",
            "Unavailable Stock": 3,
            "Committed Stock": 1,
            "Available Stock": 4,
            "Onhand stock": 8,
            "Available Stock on Amazon": 2,
            "Available Stock on Flipkart": 2,
            "Amazon": "false",
            "Flipkart": "true",
            "Tags": ["tag1", "tag4"]
        },
        {
            "Product SKU": "SKU007",
            "Product Title": "Product 7",
            "Unavailable Stock": 6,
            "Committed Stock": 4,
            "Available Stock": 10,
            "Onhand stock": 15,
            "Available Stock on Amazon": 7,
            "Available Stock on Flipkart": 3,
            "Amazon": "true",
            "Flipkart": "true",
            "Tags": ["tag2", "tag4"]
        },
        {
            "Product SKU": "SKU008",
            "Product Title": "Product 8",
            "Unavailable Stock": 4,
            "Committed Stock": 2,
            "Available Stock": 6,
            "Onhand stock": 10,
            "Available Stock on Amazon": 4,
            "Available Stock on Flipkart": 2,
            "Amazon": "true",
            "Flipkart": "true",
            "Tags": ["tag1", "tag2", "tag3"]
        },
        {
            "Product SKU": "SKU009",
            "Product Title": "Product 9",
            "Unavailable Stock": 9,
            "Committed Stock": 6,
            "Available Stock": 15,
            "Onhand stock": 20,
            "Available Stock on Amazon": 8,
            "Available Stock on Flipkart": 7,
            "Amazon": "true",
            "Flipkart": "true",
            "Tags": ["tag1", "tag3", "tag4"]
        },
        {
            "Product SKU": "SKU010",
            "Product Title": "Product 10",
            "Unavailable Stock": 15,
            "Committed Stock": 10,
            "Available Stock": 25,
            "Onhand stock": 30,
            "Available Stock on Amazon": 12,
            "Available Stock on Flipkart": 13,
            "Amazon": "true",
            "Flipkart": "true",
            "Tags": ["tag2", "tag3", "tag4"]
        }
    ];
    
      

    const columns = [
        "Product SKU", "Product Title", "Unavailable Stock", "Committed Stock", "Available Stock", "Onhand stock", "Available Stock on Amazon", "Available Stock on Flipkart", "Amazon", "Flipkart", "Tags"]

    return (
        <>
            <div >
                <Inventory data={data} columns={columns} />
            </div>
        </>
    );
};

export default App;
