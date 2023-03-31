import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@material-ui/core";
import '../IT-Chat/rightside-ui.css';
import { auth, db } from '../../config/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import Message from '../Publicmessages/message';
import csLogo from "../../assets/cs.jpg";

function CseChat() {

    const [isCSEMessage, setCSEMessage] = useState("");
    const [messagesCSE, setMessagesCSE] = useState([]);

    const scrollRef = useRef();

    const sendMessageCSE = async (e) => {
        e.preventDefault();
        
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, 'Computer-science-chat'), {
            text: isCSEMessage,
            name: displayName,
            uid,
            photoURL,
            timestamp: serverTimestamp()
        });
        setCSEMessage('');
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const q = query(collection(db, 'Computer-science-chat'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messagesArray = [];
            querySnapshot.forEach((doc) => {
                messagesArray.push({ ...doc.data(), id: doc.id });
            });
            setMessagesCSE(messagesArray);
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="rightSide_chat">
            <div className="header_right">
                <div className="photo_chat">
                    <Avatar src={csLogo} />
                </div>
                <div className="der_top">
                    <h3 id='nameofthechat'>Computer Science</h3>
                    <p id='lastseenofthechat'>CSE'ians</p>
                </div>
            </div>
            <div className="message_body_chat">
                {messagesCSE && messagesCSE.map((message) => (
                    <Message key={message.id} message={message} scroll={scrollRef} />
                ))}
                <span ref={scrollRef}></span>
            </div>
            <div className="messageSender_section">
                <form id="form_send__cr-i" onSubmit={sendMessageCSE}>
                    <input type="text"
                        id='sendMessageRight'
                        placeholder='Type a Message'
                        value={isCSEMessage}
                        onChange={(e) => setCSEMessage(e.target.value)} />
                </form>
            </div>
        </div>
    );
}

export default CseChat;
