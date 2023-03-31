import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@material-ui/core";
import '../IT-Chat/rightside-ui.css';
import { auth, db } from '../../config/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import Message from '../Publicmessages/message';
import eeeLogo from "../../assets/eee.jpg";


function EEEChat() {

    const [isEEEMessage, setEEEMessage] = useState("");
    const [messagesEEE, setMessagesEEE] = useState([]);

    const scrollRef = useRef();

    const sendMessageEEE = async (e) => {
        e.preventDefault();
        
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, 'EEE-chat'), {
            text: isEEEMessage,
            name: displayName,
            uid,
            photoURL,
            timestamp: serverTimestamp()
        });
        setEEEMessage('');
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const q = query(collection(db, 'EEE-chat'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messagesArray = [];
            querySnapshot.forEach((doc) => {
                messagesArray.push({ ...doc.data(), id: doc.id });
            });
            setMessagesEEE(messagesArray);
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="rightSide_chat">
            <div className="header_right">
                <div className="photo_chat">
                    <Avatar src={eeeLogo} />
                </div>
                <div className="der_top">
                    <h3 id='nameofthechat'>Electrical & Electronics Engineering</h3>
                    <p id='lastseenofthechat'>EEE'ians</p>
                </div>
            </div>
            <div className="message_body_chat">
                {messagesEEE && messagesEEE.map((message) => (
                    <Message key={message.id} message={message} scroll={scrollRef} />
                ))}
                <span ref={scrollRef}></span>
            </div>
            <div className="messageSender_section">
                <form id="form_send__cr-i" onSubmit={sendMessageEEE}>
                    <input type="text"
                        id='sendMessageRight'
                        placeholder='Type a Message'
                        value={isEEEMessage}
                        onChange={(e) => setEEEMessage(e.target.value)} />
                </form>
            </div>
        </div>
    );
}

export default EEEChat;
