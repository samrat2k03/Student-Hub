import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@material-ui/core";
import '../IT-Chat/rightside-ui.css';
import { auth, db } from '../../config/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import Message from '../Publicmessages/message';
import mechLogo from "../../assets/mech.jpg";



function MECHChat() {

    const [isMECHMessage, setMECHMessage] = useState("");
    const [messagesMECH, setMessagesMECH] = useState([]);

    const scrollRef = useRef();

    const sendMessageMECH = async (e) => {
        e.preventDefault();
        
        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, 'MECH-chat'), {
            text: isMECHMessage,
            name: displayName,
            uid,
            photoURL,
            timestamp: serverTimestamp()
        });
        setMECHMessage('');
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const q = query(collection(db, 'MECH-chat'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messagesArray = [];
            querySnapshot.forEach((doc) => {
                messagesArray.push({ ...doc.data(), id: doc.id });
            });
            setMessagesMECH(messagesArray);
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="rightSide_chat">
            <div className="header_right">
                <div className="photo_chat">
                    <Avatar src={mechLogo} />
                </div>
                <div className="der_top">
                    <h3 id='nameofthechat'>Mechanical Engineering </h3>
                    <p id='lastseenofthechat'>Mechanical King's </p>
                </div>
            </div>
            <div className="message_body_chat">
                {messagesMECH && messagesMECH.map((message) => (
                    <Message key={message.id} message={message} scroll={scrollRef} />
                ))}
                <span ref={scrollRef}></span>
            </div>
            <div className="messageSender_section">
                <form id="form_send__cr-i" onSubmit={sendMessageMECH}>
                    <input type="text"
                        id='sendMessageRight'
                        placeholder='Type a Message'
                        value={isMECHMessage}
                        onChange={(e) => setMECHMessage(e.target.value)} />
                </form>
            </div>
        </div>
    );
}

export default MECHChat;
