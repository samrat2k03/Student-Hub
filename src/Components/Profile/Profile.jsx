import React, { useState, useEffect } from "react";
import "../Profile/profile.css";
import Button from "@mui/material/Button";
import { collection, addDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@mui/material";

function Profile() {
  const [isName, setName] = useState("");
  const [isEmail, setEmail] = useState("");
  const [isCollege, setCollege] = useState("");
  const [isYear, setYear] = useState("");
  const [isBio, setBio] = useState("");
  const [isDepartment, setDepartment] = useState("");
  const [isRegistered, setRegistered] = useState(false);

  //student informations
  const [isInformation, setInformation] = useState([]);

  const studentInformationRef = collection(db, "student-information");

  // create student information
  const onSubmit = async () => {
    const { uid } = auth.currentUser;
    try {
      const docRef = doc(studentInformationRef, uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRegistered(true);
      } else {
        await addDoc(studentInformationRef, {
          name: isName,
          email: isEmail,
          college: isCollege,
          year: isYear,
          bio: isBio,
          department: isDepartment,
          uid: auth.currentUser.uid,
        });
        setRegistered(true);
      }
      setName("");
      setEmail("");
      setCollege("");
      setYear("");
      setBio("");
      setDepartment("");
    } catch (err) {
      console.error(err);
    }
  };

  // get the information from the firestore database from firebase
  useEffect(() => {
    const showInformation = async () => {
      try {
        const studentData = await getDocs(studentInformationRef);
        const filterData = studentData.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((doc) => doc.uid === auth.currentUser.uid);
        if (filterData.length > 0) {
          setRegistered(true);
        }
        setInformation(filterData);
      } catch (err) {
        console.error(err);
      }
    };
    showInformation();
  }, []);

  const [userProfile] = useAuthState(auth);

  return (
    <div className="profile_container">
      {isRegistered ? (
        <div className="real_content_profile">
            <Avatar
              src={userProfile.photoURL}
              className="photo_profile"
              sx={{ width: 200, height: 200 }}
            />
          <div className="content_profile">
            {/* <h1 id="details_content">Details</h1> */}
            {isInformation.map((info) => (
              <div id='card' key={info.id}>
                <h3 className="top_det">Name:</h3>
                <p className="bottom_det">{info.name}</p>
                <h3 className="top_det">Email Address:</h3>
                <p className="bottom_det">{info.email}</p>
                <h3 className="top_det">College Name:</h3>
                <p className="bottom_det">{info.college}</p>
                <h3 className="top_det">Now Studying Year:</h3>
                <p className="bottom_det">{info.year}</p>
                <h3 className="top_det">Bio:</h3>
                <p className="bottom_det"> {info.bio}</p>
                <h3 className="top_det">Department:</h3>
                <p className="bottom_det">{info.department}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="title">Registration</div>
          <div className="user-details">
            <form>
              <div className="input-box">
                <label htmlFor="name_profile" className="details">
                  Enter name
                </label>
                <input
                  type="text"
                  id="name_profile"
                  value={isName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="email_profile" className="details">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email_profile"
                  value={isEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="college_profile" className="details">
                  College Name
                </label>
                <input
                  type="text"
                  id="college_profile"
                  value={isCollege}
                  onChange={(e) => setCollege(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="year_profile" className="details12">
                  Which year your now :
                </label>
                <select
                  className="year_profile"
                  value={isYear}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
              <div className="input-box">
                <label htmlFor="bio_profile" className="details12">
                  Bio
                </label>
                <textarea
                  id="bio_profile"
                  cols="50"
                  rows="4"
                  placeholder="Tell about Yourself"
                  value={isBio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="department_profile" className="details12">
                  Which Department
                </label>
                <select
                  className="year_profile"
                  value={isDepartment}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">
                    Select Your Department
                  </option>
                  <option value="B.Tech Information Technology">
                    B.Tech Information Technology
                  </option>
                  <option value="B.E Computer Science">
                    B.E Computer Science
                  </option>
                  <option value="B.E Electronics and Communication Engineering">
                    B.E Electronics and Communication Engineering
                  </option>
                  <option value="B.E Mechanical Engineering">
                    B.E Mechanical Engineering
                  </option>
                  <option value="B.E Electrical and Electronics Engineering">
                    B.E Electrical and Electronics Engineering
                  </option>
                  <option value="B.E Civil Engineering">
                    B.E Civil Engineering
                  </option>
                </select>
              </div>
              <div id="button_profile__">
                <Button variant="contained" onClick={onSubmit}>
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
