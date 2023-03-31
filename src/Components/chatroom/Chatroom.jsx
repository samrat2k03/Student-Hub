import React, { useState } from "react";
import "./chat-ui.css";
import Plc from "../../assets/placeHolder.jpg";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import itLogo from "../../assets/it.jpg";
import csLogo from "../../assets/cs.jpg";
import eeeLogo from "../../assets/eee.jpg";
import mechLogo from "../../assets/mech.jpg";
import eceLogo from "../../assets/ece.jpg";
import RightSide from "../IT-Chat/RightSide";
import { Link } from 'react-router-dom'
import CseChat from "../CSE-Chat/CseChat";
import EEEChat from "../EEE-Chat/EEEChat";
import ECEChat from "../ECE-Chat/ECEChat";
import MECHChat from "../MECH-Chat/MechChat";

function Chatroom() {
  const [userGoogle1] = useAuthState(auth);

  const [ showplaceHolder ,setplaceHolder ] = useState(true)
  const [ showRightSide , setShowRightSide ] = useState(false);
  const [ showCseChat , setCseChat ] = useState(false);
  const [ isECE, setECE ] = useState(false);
  const [ isEEE, setEEE ] = useState(false);
  const [ isMECH, setMECH ] = useState(false);



  const handleShowRightSide = () => {
    setplaceHolder(false);
    setShowRightSide(true);
    setCseChat(false);
    setECE(false);
    setEEE(false);
    setMECH(false);
  }

  const handleCSERightSide = () => {
    setplaceHolder(false);
    setShowRightSide(false);
    setCseChat(true);
    setECE(false);
    setEEE(false);
    setMECH(false);
  }

  const handleShowECE = () => {
    setplaceHolder(false);
    setShowRightSide(false);
    setCseChat(false);
    setECE(true);
    setEEE(false);
    setMECH(false);
  }


  const handleShowEEE = () => {
    setplaceHolder(false);
    setShowRightSide(false);
    setCseChat(false);
    setECE(false);
    setEEE(true);
    setMECH(false);
  }

  const handleShowMECH = () => {
    setplaceHolder(false);
    setShowRightSide(false);
    setCseChat(false);
    setECE(false);
    setEEE(false);
    setMECH(true);
  }


  return (
    <div className="chatRoom">
      <div className="leftside">
        <div>
          <Link to ='/profile' style={{ textDecoration: 'none', color: "#c4d9ee"}}>
          <div className="current_user">
            <Avatar
              src={userGoogle1.photoURL}
              sx={{ height: "40px", width: "40px" }}
            />
            <h3 id="nowUser">{userGoogle1.displayName}</h3>
          </div>
          </Link>
          <div className="search_user__">
            <input type="search" id="search_chat" placeholder="Search users" />
            <SearchIcon id="searchIcons" />
          </div>
          <div className="bottom_users" onClick={handleShowRightSide}>
            <Avatar src={itLogo} />
            <div className="chat_det">
              <h3>Information Technology</h3>
            </div>
          </div>
          <div className="bottom_users" onClick={handleCSERightSide}>
            <Avatar src={csLogo} />
            <div className="chat_det">
              <h3>Computer Science</h3>
            </div>
          </div>
          <div className="bottom_users" onClick={handleShowEEE}>
            <Avatar src={eeeLogo} />
            <div className="chat_det">
              <h3>Electrical and Electronics Engg</h3>
            </div>
          </div>
          <div className="bottom_users" onClick={handleShowMECH}>
            <Avatar src={mechLogo} />
            <div className="chat_det">
              <h3>Mechanical Engg</h3>
            </div>
          </div>
          <div className="bottom_users" onClick={handleShowECE}>
            <Avatar src={eceLogo} />
            <div className="chat_det">
              <h3>Electronics and Communication Engg</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="rightside">
        { showRightSide ? <RightSide /> : null}
        { showCseChat ? <CseChat /> : null}
        { isEEE ? <EEEChat /> : null}
        { isECE ? <ECEChat /> : null}
        { isMECH ? <MECHChat /> : null}

        {showplaceHolder ? 
        <div className="placeHolder">
          <img src={Plc} alt="PlaceHolder" id="plccc" />
          <h3 id="plaH1">Open Any Chat room and Chat With Your friends</h3>
        </div> : null}

      </div>
    </div>
  );
}

export default Chatroom;
