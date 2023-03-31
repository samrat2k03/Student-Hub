import React from 'react'
import { auth } from '../../config/firebase';

function Message({ message }) {
  const style = {
    message: {
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      margin: '2rem 1rem 0 1rem',
      padding: '0.5rem 1rem',
      borderTopLeftRadius: '9999px',
      borderTopRightRadius: '9999px',
    },
    name: {
      position: 'absolute',
      marginTop: '-4rem',
      // color: '#718096',
      color: '#f0f0f0',
      fontSize: '0.75rem',
      fontWeight:'400',
    },
    sent: {
      backgroundColor: '#395dff',
      color: '#fff',
      flexDirection: 'row-reverse',
      textAlign: 'end',
      float: 'right',
      borderBottomLeftRadius: '9999px',
    },
    received: {
      backgroundColor: '#8BC34A',
      color: '#000',
      float: 'left',
      borderBottomRightRadius: '9999px',
    },
  };

  const messageClass =
    message.uid === auth.currentUser.uid ? style.sent : style.received;

  return (
    <div>
      <div style={{ ...style.message, ...messageClass }}>
        <p style={style.name}>{message.name}</p>
        <p>{message.text}</p>
      <span ref={scroll}></span>
      </div>
    </div>
  );
}

export default Message;

