import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import "./fullList.css";

function FullList() {
    // it can fetch the data from the databse
  const [fullStudentData, setStudentData] = useState([]);

  const studentDataRef = collection(db, "student-information");

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const sData = await getDocs(studentDataRef);
        const filterSData = sData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStudentData(filterSData);
        // console.log(filterSData);
      } catch (err) {
        console.error(err);
      }
    };
    getStudentData();
  }, []);

  return (
    <div className="fullListContainer">
      <div className="header_student_data">
        <h1>All Student Informations</h1>
      </div>
      <div className="table_for_data">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Address</th>
              <th>Year</th>
              <th>Department</th>
              <th>College</th>
            </tr>
          </thead>
          <tbody>
            {fullStudentData.map((studentData) => (
              <tr key={studentData.id}>
                <td>{studentData.name}</td>
                <td>{studentData.email}</td>
                <td>{studentData.year}</td>
                <td>{studentData.department}</td>
                <td>{studentData.college}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FullList;
