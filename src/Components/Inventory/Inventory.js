import React, { useState } from "react";
import Logout from "../Auth/Logout";
import SettingsButton from "./SettingButton";
import { saveAs } from "file-saver";

const Inventory = ({ data, columns }) => {
    // State for managing visible columns and dropdown visibility
    const [visibleColumns, setVisibleColumns] = useState(columns.reduce((acc, column) => {
        acc[column] = true;
        return acc;
    }, {}));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchSKU, setSearchSKU] = useState("");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

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

    // Filtered and sorted data
    let filteredData = data;
    if (searchSKU) {
        filteredData = filteredData.filter((item) =>
            item["Product SKU"].trimStart().toLowerCase().includes(searchSKU.toLowerCase())
        );
    }
    if (sortColumn) {
        filteredData = filteredData.sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];
            if (sortDirection === "asc") {
                return aValue.toString()?.localeCompare(bValue.toString());
            } else {
                return bValue.toString()?.localeCompare(aValue.toString());
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
                <div className="relative inline-block text-left">
                    <div className="flex">
                        {/* Dropdown button */}
                        <SettingsButton />
                        <Logout />
                        <button
                            type="button"
                            onClick={toggleDropdown}
                            className="inline-flex justify-center w-full rounded-md border border-gray-400 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-100"
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
                        {/* Render visible columns */}
                        {columns.map((column) => (
                            visibleColumns[column] && (
                                <th
                                    key={column}
                                    className="border border-gray-400 p-2 bg-gray-200 text-left text-gray-500 cursor-pointer"
                                    onClick={column === "Available Stock" ? () => handleSort(column) : () =>{}}
                                >
                                    {column} {sortColumn === column && (
                                        <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                                    )}

                                </th>
                            )
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Render table rows */}
                    {filteredData.map((row, index) => (
                        <tr key={index} className="bg-transparent hover:bg-gray-100">
                            {/* Render visible columns */}
                            
                            {columns.map((column) => (
                                console.log("row[column]", row),
                                visibleColumns[column] && (
                                    <td key={column} className="p-3 border border-gray-400">
                                        {row[column.trimStart()]}
                                    </td>
                                )
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;
