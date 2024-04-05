import React, { useState, useEffect } from "react";
import { Resizable } from "react-resizable";
import Logout from "../Auth/Logout";
import SettingsButton from "./SettingButton";
import { saveAs } from "file-saver";
import FilterDropdown from "./FilterDropdown";
import './Inventory.css';
import SyncSwitch from "./SyncSwitch";
import InventoryMoveButton from "./InventoryMove";
import axios from "axios";
import apiUrl from '../../api.config';

const Inventory = ({ columns }) => {
    // State for managing visible columns and dropdown visibility
    const [visibleColumns, setVisibleColumns] = useState(columns.reduce((acc, column) => {
        acc[column] = true;
        return acc;
    }, {}));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchSKU, setSearchSKU] = useState("");
    const [sortColumn, setSortColumn] = useState("availableStock");
    const [sortDirection, setSortDirection] = useState("asc");
    const [filteredDataFromDropdown, setFilteredDataFromDropdown] = useState([]);
    const [columnWidths, setColumnWidths] = useState(columns.map(() => 150)); // Set initial width for each column
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            var res = await axios.get(`${apiUrl}/dish`)
            if(res.data){
                setData(res.data)
                setFilteredDataFromDropdown(res.data)
            }
        } catch (error) {
            console.error("Error occured : ",error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleFilter = (filterCriteria, isChecked) => {
        // Filter data based on the selected criteria
        
        if (isChecked) {
            setFilteredDataFromDropdown(data.filter((item) => {
                if (filterCriteria === "amazon") {
                    return item["availableStockInAmazon"] > 0 && item["availableStock"] > 0;
                } else if (filterCriteria === "flipkart") {
                    return item["availableStockInFlipkart"] > 0 && item["availableStock"] > 0;
                } else if (filterCriteria === "outOfStock") {
                    return item["availableStock"] === 0;
                }
                // Add additional filter conditions here if needed
                return true; // Return true for items that pass all filter conditions
            }));
        } else {
            setFilteredDataFromDropdown(data);
        }
    };

    const handleSearchSKU = (e) => {
        setSearchSKU(e.target.value);
    };
    const toggleColumn = (column) => {
        setVisibleColumns((prevColumns) => ({
            ...prevColumns,
            [column]: !prevColumns[column]
        }));
    };

    /**
     * Toggles the visibility of the dropdown menu.
     */
    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredColumns = columns.filter((column) =>
        column.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const handleDownload = () => {
        // Convert data to CSV format
        const csvData = [
            columns.join(","),
            ...data.map((row) => columns.map((column) => row[column.trimStart()]).join(","))
        ].join("\n");

        // Create a Blob with the CSV data
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

        // Save the Blob as a file using FileSaver.js
        saveAs(blob, "inventory.csv");
    };

    const handleResize = (index) => (e, { size }) => {
        const newWidths = [...columnWidths];
        newWidths[index] = size.width;
        setColumnWidths(newWidths);
    };

    function toCamelCase(str) {
        return str.toLowerCase().replace(/(?:[-_\s]+)([a-zA-Z0-9])/g, (_, char) => char.toUpperCase());
      }
    // Filtered and sorted data

    let filteredData = filteredDataFromDropdown;
    if (searchSKU) {
        filteredData = filteredData.filter((item) => {
            if (item["productSku"].trimStart().toLowerCase().includes(searchSKU.toLowerCase()))
                return true;
        }
        );
    }
    if (sortColumn) {
        filteredData = filteredData.sort((a, b) => {
            const aValue = parseFloat(a[sortColumn]);
            const bValue = parseFloat(b[sortColumn]);
            if (sortDirection === "asc") {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });
    }
    return (
        <div>
            {/* Header section */}
            <div className="flex items-center justify-between pb-3  border-b border-gray-300 px-4 pt-4">
                <div className="text-left text-gray-600 font-bold" style={{ fontSize: "1.2rem" }}>
                    Editing 50 items
                </div>
                <input
                    type="search"
                    placeholder="Search"
                    value={searchSKU}
                    onChange={handleSearchSKU}
                    className="w-1/2 px-4 py-2  border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                <div className="relative inline-block text-left z-50">
                    <div className="flex">
                        {/* Dropdown button */}
                        <SettingsButton />
                        <Logout />
                        <button
                            type="button"
                            onClick={toggleDropdown}
                            className="inline-flex justify-center w-full rounded-md border border-gray-400 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-100 "
                        >
                            Columns
                            <svg
                                className="-mr-1 ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <FilterDropdown handleFilter={handleFilter} />
                        <button className="ml-3" onClick={handleDownload}>Download</button>
                    </div>
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <input
                                    type="search"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full px-4 py-2 rounded-lg border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm("")}
                                        className="absolute top-0 right-0 mt-2 mr-4 text-gray-500 hover:text-gray-700"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                )}
                                {filteredColumns.map((column) => (
                                    <label key={column} className="flex items-center justify-between px-4 py-2 text-sm">
                                        <span>{column}</span>
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-indigo-600"
                                            checked={visibleColumns[column]}
                                            onChange={() => toggleColumn(column)}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Table section */}
            <table className="w-full border border-gray-400 bg-white mx-auto">
                <thead>
                    <tr>
                        {/* Render resizable columns */}
                        {columns.map((column, index) => (
                            visibleColumns[column] && (
                                <th
                                    key={column}
                                    className="border border-gray-400 p-2 bg-gray-200 text-left text-gray-500 cursor-pointer"
                                    style={{ width: `${columnWidths[index]}px` }} // Set column width
                                    onClick={column === "Available Stock" ? () => handleSort(toCamelCase(column)) : () => { }}
                                >
                                    <Resizable
                                        width={columnWidths[index]}
                                        height={0}
                                        onResize={handleResize(index)}
                                        draggableOpts={{ enableUserSelectHack: false }}
                                    >
                                        <div>
                                            {column} {sortColumn === column && (
                                                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                                            )}
                                        </div>
                                    </Resizable>
                                </th>
                            )
                        ))}
                        <th className="border border-gray-400 p-2 bg-gray-200 text-left text-gray-500 cursor-pointer">Sync</th>
                        <th className="border border-gray-400 p-2 bg-gray-200 text-left text-gray-500 cursor-pointer">Move</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Render table rows */}
                    {filteredData.map((row, index) => (
                        <tr key={index} className="bg-transparent hover:bg-gray-100">
                            {/* Render visible columns */}
                                {columns.map((column) => (
                                visibleColumns[column] && (
                                    <td key={column} className="p-3 border border-gray-400">
                                        {row[toCamelCase(column.trimStart())]+''}
                                    </td>

                                )
                            ))}
                            <td className="p-3 border border-gray-400">
                                <SyncSwitch sync={row.sync} />
                            </td>
                            <td className="p-3 border border-gray-400">
                                <InventoryMoveButton move={row.move} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;
