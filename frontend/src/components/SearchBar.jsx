import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { searchLaw } from "../services/api";

function SearchBar({ onResults }) {

    const [query, setQuery] = useState("");

    const handleSearch = async () => {

        if (!query.trim()) return;

        try {

            const data = await searchLaw(query);

            onResults(data);

        } catch (err) {

            console.error(err);

            alert("Search failed.");

        }

    };

    return (

        <div className="search-container">

            <div className="search-box">

                <FiSearch className="search-icon" />

                <input

                    value={query}

                    onChange={(e) => setQuery(e.target.value)}

                    onKeyDown={(e) => {

                        if (e.key === "Enter")
                            handleSearch();

                    }}

                    placeholder="Search IPC 302, BNS 103, Murder..."

                />

                <button

                    className="search-btn"

                    onClick={handleSearch}

                >
                    Search
                </button>

            </div>

        </div>

    );

}

export default SearchBar;