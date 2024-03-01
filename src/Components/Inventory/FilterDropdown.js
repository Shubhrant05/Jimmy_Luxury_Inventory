import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FilterDropdown = ({ handleFilter }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    // Prevent dropdown closing when clicking on a checkbox
    const handleCheckboxClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="relative inline-block text-left z-50">
            <button
                type="button"
                onClick={toggleDropdown}
                className="mx-2 inline-flex justify-center w-full rounded-md border border-gray-400 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-100"
            >
                Filter
                <IoIosArrowDown className="-mr-1 ml-2 h-5 w-5" />
            </button>
            {/* Dropdown menu */}
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {/* Filter options */}
                        <label className="flex items-center px-4 py-2 text-sm">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-indigo-600"
                                onChange={(event) => {
                                    handleFilter("amazon", event.target.checked);
                                }}
                                onClick={handleCheckboxClick}
                            />
                            <span className="ml-2">Available on Amazon</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-indigo-600"
                                onChange={(event) => {
                                    handleFilter("flipkart", event.target.checked);
                                }}
                                onClick={handleCheckboxClick}
                            />
                            <span className="ml-2">Available on Flipkart</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-indigo-600"
                                onChange={(event) => {
                                    handleFilter("outOfStock", event.target.checked);
                                }}
                                onClick={handleCheckboxClick}
                            />
                            <span className="ml-2">Out of Stock</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
