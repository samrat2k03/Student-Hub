import React from "react";
import { Link } from 'react-router-dom'
import "../Body/body.css";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'

function Body() {

  const [userGoogle] = useAuthState(auth)
 

  return (
    <div className="body_container">
      <div className="body_content">
        <h1 id="welcome1">Welcome<span id="render_name">{userGoogle.displayName}</span>!</h1>
        <p id='quotes_student'>
          <q>Connect with other students and share your knowledge</q>
        </p>
      </div>
      <div className="report">
        <Link to="/helpToSamrat" >
        <button id="rep_btn">
          Help 😍
        </button>
        </Link>
      </div>
      <div className="page_cards">
        {/* chat card */}
        <div className="chat">
          <h3 id="cr">Chat Room</h3>
          <p  id="chat_">
            <q>
            Connect with <br/> other students <br/> and<br/> share your knowledge
            </q> 
          </p>
          <button className="button-50">
            <span>
            <Link to="/chatroom" style={{ textDecoration: 'none', color: "#FFFFFF" }}>
              Go to Chat Room
              </Link>
            </span>
          </button>
          {/* discussion card */}
        </div>
        <div className="discussions">
          <h3 id="discs">Discussion</h3>
          <p id="discussions_">
            <q>
              Discover a new level of learning and engagement with our student Discussion.
            </q>
            <br />
            (Public ChatRoom)
          </p>
          <button className="button-51">
            <span>
            <Link to="/discussions" style={{ textDecoration: 'none', color: "#000000"}} >
              Join Discussions !
            </Link>
            </span>
          </button>
        </div>
        {/* profile */}
        <div className="profile">
          <h3 id="pr">
            Profile 
          </h3>
          <p id="profile_">
            <q>
              Build Your Profile <br /> So , other's can identify .
            </q>
          </p>
          <button className="button-79">
            <span>
            <Link to="/profile" style={{ textDecoration: 'none', color: "#fff"}}>
              Build Profile
              </Link>
            </span>
          </button>
        </div>
        {/* student_information */}
        <div className="all_student">
          <h3 id="si">
            Student Information
          </h3>
          <p id="si_">
            <q>
              Student Informations 
            </q>
          </p>
          <button className="button-24">
            <span>
            <Link to="/student-info" style={{ textDecoration: 'none', color: "#FFF"}}>
              Access Student Information Data
              </Link>
            </span>
          </button>
        </div>
      </div>
      <div className="about">
        <h3 id="abt">
          To Know About Us 👉
        </h3>
          <button className="button-54">
            <span>
            <Link to="/about-us" style={{ textDecoration: 'none', color: "#000"}}>
              About Us 
              </Link>
            </span>
          </button>
        </div>
    </div>
  );
}

export default Body;
