import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@material-ui/core";
import '../IT-Chat/rightside-ui.css';
import { auth, db } from '../../config/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import Message from '../Publicmessages/message';
import eceLogo from "../../assets/ece.jpg";


function ECEChat() {

    const [isECEMessage, setECEMessage] = useState("");
    const [messagesECE, setMessagesECE] = useState([]);

    const scrollRef = useRef();

    const sendMessageECE = async (e) => {
        e.preventDefault();
        
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, 'ECE-chat'), {
            text: isECEMessage,
            name: displayName,
            uid,
            photoURL,
            timestamp: serverTimestamp()
        });
        setECEMessage('');
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const q = query(collection(db, 'ECE-chat'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messagesArray = [];
            querySnapshot.forEach((doc) => {
                messagesArray.push({ ...doc.data(), id: doc.id });
            });
            setMessagesECE(messagesArray);
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="rightSide_chat">
            <div className="header_right">
                <div className="photo_chat">
                    <Avatar src={eceLogo} />
                </div>
                <div className="der_top">
                    <h3 id='nameofthechat'>Electronics & Communication Engineering</h3>
                    <p id='lastseenofthechat'>ECE'ians</p>
                </div>
            </div>
            <div className="message_body_chat">
                {messagesECE && messagesECE.map((message) => (
                    <Message key={message.id} message={message} scroll={scrollRef} />
                ))}
                <span ref={scrollRef}></span>
            </div>
            <div className="messageSender_section">
                <form id="form_send__cr-i" onSubmit={sendMessageECE}>
                    <input type="text"
                        id='sendMessageRight'
                        placeholder='Type a Message'
                        value={isECEMessage}
                        onChange={(e) => setECEMessage(e.target.value)} />
                </form>
            </div>
        </div>
    );
}

export default ECEChat;
