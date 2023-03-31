import React,{ useState, useEffect, useRef } from 'react'
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from '@mui/material';
import './discussions.css'
import Message from '../Publicmessages/message';
import { addDoc, query, collection, orderBy, onSnapshot, serverTimestamp} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { async } from '@firebase/util';
import {  getDocs, deleteDoc } from "firebase/firestore";
//storage
import { storage } from '../../config/firebase'
import { getDownloadURL, listAll, ref,uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'


export const Discussions = () => {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // upload images 
  const [imageUpload , setImageUpload ] = useState(null);
  //uploaded image list
  const [ imageList, setImageList ] = useState([]);

  const imagesListRef = ref(storage, "images/");


  const scroll = useRef();

  const sendMessage = async (e) => {
    e.preventDefault()
    if(input === ''){
      alert('Send a Valid Message 😁' );

    }
    const {uid, displayName, photoURL} = auth.currentUser;
    await addDoc(collection(db, 'messages'), {
      text: input,
      name: displayName,
      uid,
      photoURL,
      timestamp: serverTimestamp()
    })
    setInput('')
    scroll.current.scrollIntoView({behavior: 'smooth'})
  }

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id });
      });
      setMessages(messages);
      scroll.current.scrollIntoView({behavior: 'smooth'});
    });
    return () => unsubscribe();
  }, []);

  // console.log(messages);

  // delete the messages from db 
  const deleteAllMessages = async () => {
    const messagesRef = collection(db, "messages");
    const snapshot = await getDocs(messagesRef);
    snapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }

  // code for upload its triggered by a send button 
  const uploadImage = () => {
    if(imageUpload == null ) return ;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes( imageRef ,imageUpload ).then((snapshot) => {
      alert("image was uploaded successfully")
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    })
  }

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [ ...prev,url]);
        });
      });
    });
  }, [])
  

  return (
    <div className="discussion_container">
      <div className="discussions_chat_body">
      {imageList.map((url) => {
        return <img src={url} id='image_stg' />;
      })}
      {messages && messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      <span ref={scroll}></span>
      </div>
      <div className="bottom">
      <div className="chat_footer__discussions">
        <form id="form_send__discussions" onSubmit={sendMessage}>
          <input type="text"
           id="send1__discussions"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)} />
          <input
            type="file"
            id="send2__discussions"
            style={{ display: "none" }}
            onChange ={(e) => setImageUpload(e.target.files[0])}
          />
          <IconButton color="primary">
            <label htmlFor="send2__discussions">
              <AttachFileIcon />
            </label>
          </IconButton>
          <Button variant="contained" endIcon={<SendIcon />} onClick={uploadImage}> 
            Send
          </Button>
          {/* delete button dont make a public  */}
          {/* <Button onClick={deleteAllMessages}>
            Delete
          </Button> */}
        </form>
      </div>
      </div>
    </div>
  )
}