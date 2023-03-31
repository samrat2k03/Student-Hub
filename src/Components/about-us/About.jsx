import React from 'react'
import '../about-us/about.css'
import wave from '../../assets/wave.svg'

function About() {
  return (
    <div className='about_us'>
      <div className="about_title">
        <h2 className="abt_t">About Us</h2>
      </div>
      <div className="about_content">
        <h3 id='abt_story'>
          This is our Mini Project, Under Domain name - <q>Student Information System</q>.<br /> 
        </h3>
        <h3 id='abt_story1'>
        This web App is <span id='advance'>Advanced version of Student Information System</span>,
        </h3>
        <h3 id='purpose'>
          The main purpose of this web app is, easily students can share their notes and knowledge ...   
        </h3>
      </div>
      <div className="about_creators">
        <h3 id="samrat">
        This WebApp is <span id='dev12'>developed</span> by <span id='samr'>Samrat</span>
        </h3>
      <div className="about_team">
        <h3 id='list'>Team Members :
          <ol className='ol-li'>
            <li>Akash</li>
            <li>Dinakaran</li>
            <li>Thennavan</li>
          </ol>
        </h3>
      </div>
      </div>
      <div className="wave">
        <img src={wave} alt="wave" />
      </div>
    </div>
  )
}

export default About