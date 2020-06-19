import React, { useEffect, useState,useRef, useCallback } from 'react'
import { auth, db } from '../services/firebase'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'

export default function ChatRoom() {

    const { id } = useParams();
    let uid = auth().currentUser.uid
    let index = id.indexOf(uid)
    let receiver = ""
    let ref = useRef(null)
    let limit = 8;
    const [count,setCount] = useState(30)
    const [name, setName] = useState("")
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    
  useEffect(() => {
        const chatArea = ref.current;
        if (index === 0) {
            receiver = id.substring(uid.length, id.length)
            db.ref(`users/${receiver}/username`).on("value", snapshot => setName(snapshot.val()))
        } else {
            receiver = id.substring(0, uid.length)
            db.ref(`users/${receiver}/username`).on("value", snapshot => setName(snapshot.val()))
        }
        
        db.ref(`chats/${id}`).orderByKey().limitToLast(limit).on("value", snapshot => {
            setMessages(Object.values(snapshot.val()))
            chatArea.scrollBy(0, chatArea.scrollHeight)
        })
        chatArea.scrollBy(0, chatArea.scrollHeight)
    }, [])

    const formatTime = timestamp => {
        const date = new Date(timestamp)
        const time = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        return time;
    }
    
    const sendMessage = () =>{
        const chatArea = ref.current;
        if(message.trim().length === 0){
            setMessage("")
        }else{
        db.ref(`chats/${id}`).push({text:message,senderID:uid,timestamp:Date.now()})
        .then(()=>setMessage("")).then(()=> chatArea.scrollBy(0,chatArea.scrollHeight))
        }
    }

    const handleLoadMore = () =>{
        const chatArea = ref.current;
        db.ref(`chats/${id}`).orderByKey().limitToLast(count).on("value", snapshot => {
            setMessages(Object.values(snapshot.val()))
            setCount(count+10)
        })
    }

    return (
        <Layout className="chatroom">
            <div className="chattitle">
                <Button style={{ padding: "10px", fontSize: "18px" }} startIcon={<ArrowBackIcon />} onClick={e => window.history.back()} />
                <h3 style={{ color: "white" }}>{name}</h3>
            </div>
            <div className="box" ref={ref}>
             {messages.length >=limit && <Button onClick={e => handleLoadMore()} variant="outlined" color="primary">Load More</Button>} 
                {
                    messages.map((mes, i) => {

                        return (<div key={i} className={"message " + (mes.senderID === uid ? "float-right" : "")}>
                            {mes.senderID !== uid && <Avatar style={{ backgroundColor: "rgb(63, 63, 212)" }}>{name.charAt(0)}</Avatar>}
                            <p className={mes.senderID === uid ? "send" : "receive"}>
                                {mes.text}
                                <span className="time">{formatTime(mes.timestamp)}</span>
                            </p>
                        </div>)
                    })
                }
             </div>
            <form className="typeMes">
                <TextField variant="outlined" multiline rowsMax={5} className="messageInput" value={message} onChange={e => setMessage(e.target.value)}/>
                <Button color="primary" onClick={e => sendMessage()}>
                    <SendIcon/>
                </Button>
            </form>
        </Layout>
    )

}