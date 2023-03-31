import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import "./si.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function StudentInfo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "student-information"),
        where("name", "==", searchQuery)
      );
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setSearchResults(results);
    };
    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className="student_info_total">
      <div className="search_section_si">
        <div className="search_si">
          <input
            type="search"
            id="search_si"
            placeholder="Search User/Students"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton id="iconbtn_search">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div className="fullList">
        <Link to="/all-student-information-list">
          <button className="cta">
            <span>Show All Student Data</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </Link>
      </div>
      <div className="outputFromTheFirestore">
        {searchResults.length === 0 ? (
          <div id="errM">
            <h1 id="errMessage__">User data is Not found</h1>
            <p id="errMessage__2">Please check spelling of username 😉</p>
          </div>
        ) : (
          <div className="search_result_section_si">
            {searchResults.map((result, index) => (
              <div key={index}>
                <h3 className="label_si">
                  <span className="result_name">Name :</span> {result.name}
                </h3>
                <h3 className="label_si">
                  <span className="result_label">Email Address :</span>
                  {result.email}
                </h3>
                <h3 className="label_si">
                  <span className="result_label">Department :</span>{" "}
                  {result.department}
                </h3>
                <h3 className="label_si">
                  <span className="result_label">Now Studying Year :</span>
                  {result.year}
                </h3>
                <h3 className="label_si">
                  <span className="result_label">College Name:</span>{" "}
                  {result.college}
                </h3>
                <h3 className="label_si">
                  <span className="result_label">Bio :</span> {result.bio}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentInfo;
