import React, { useState, useEffect, useRef } from 'react'
import { Avatar } from "@material-ui/core";
import './rightside-ui.css'
import { auth, db } from '../../config/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import Message from '../Publicmessages/message';
import itLogo from '../../assets/it.jpg'


function RightSide() {

    const [messageCR, setMessageCR] = useState("");
    const [messages, setMessages] = useState([]);

    const scrollRef = useRef();


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, 'Information-Technology-chat'), {
            text: messageCR,
            name: displayName,
            uid,
            photoURL,
            timestamp: serverTimestamp()
        });
        setMessageCR('');
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const q = query(collection(db, 'Information-Technology-chat'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messagesArray = [];
            querySnapshot.forEach((doc) => {
                messagesArray.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messagesArray);
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        });
        return () => unsubscribe();
    }, []);


    return (
        <div className="rightSide_chat">
            <div className="header_right">
                <div className="photo_chat">
                    <Avatar src={itLogo} />
                </div>
                <div className="der_top">
                    <h3 id='nameofthechat'>Information Technology</h3>
                    <p id='lastseenofthechat'>IT'ans</p>
                </div>
            </div>
                {/* render message and show in page */}
            <div className="message_body_chat">
                {messages && messages.map((message) => (
                    <Message key={message.id} message={message} scroll={scroll}/>
                ))}
                <span ref={scrollRef}></span>
            </div>
            <div className="messageSender_section">
                <form id="form_send__cr-i" onSubmit={sendMessage}>
                    <input type="text"
                        id='sendMessageRight'
                        placeholder='Type a Message'
                        value={messageCR}
                        onChange={(e) => setMessageCR(e.target.value)} />
                </form>
            </div>
        </div>
    );
}

export default RightSide;
