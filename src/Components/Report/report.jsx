import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import "./reportDesign.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import emailjs from "emailjs-com";

function Report() {
  const [repName, setrepName] = useState("");
  const [repEmail, setrepEmail] = useState("");
  const [isReport, setReport] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await auth.currentUser;
      setrepName(user.displayName);
      setrepEmail(user.email);
    };
    fetchUserData();
  }, []);

  const activeEmailFunction = (e) => {
    e.preventDefault();
    if (isReport === "") {
      alert("Please provide a valid report");
    } else {
      emailjs
        .sendForm("Gmail", "template_vea6gpo", e.target, "91asW8Vv0qP-ZRCSI")
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
    setrepName("");
    setrepEmail("");
    setReport("");
  };

  return (
    <div className="report_container">
      <div className="report_content">
        <div className="report_title">
          <h2>Shout A Problem To Us</h2>
        </div>
        <div className="report_body">
          <form onSubmit={activeEmailFunction}>
            <label htmlFor="nameOftheUser">Name</label>
            <input
              type="text"
              name="displayName"
              id="nameOftheUser"
              placeholder="Enter the name "
              className="textBoxReport"
              value={repName}
              onChange={(e) => setrepName(e.target.value)}
            />
            <br />
            <label htmlFor="emailOftheUser">Email Address</label>
            <input
              type="email"
              placeholder="Please Enter Email address"
              id="emailOftheUser"
              name="email"
              className="textBoxReport"
              value={repEmail}
              onChange={(e) => setrepEmail(e.target.value)}
            />
            <br />
            <label htmlFor="report_box">What's Your Problem?</label>
            <br />
            <textarea
              name="Report"
              id="report_box"
              cols="30"
              rows="10"
              value={isReport}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Tell us about your problem ..."
            />
            <div className="button_for_report">
              <Button variant="contained" endIcon={<SendIcon />} type="submit">
                Send
              </Button>
            </div>
          </form>
        </div>
        <div className="footer_report">
          <p>
            Got questions? I've got answers! Email me at{" "}
            <span id="email4me"> samratapr40@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Report;
