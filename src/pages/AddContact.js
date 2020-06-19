import React, { Component } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { auth, db } from '../services/firebase'
import Layout from '../components/Layout'


export default class AddContact extends Component {
    constructor() {
        super();
        this.state = {
            error: '',
            success: '',
            email: '',
            ids: [],
            emails: [],
            text: ''
        }
    }

    componentDidMount() {

        var contacts = []

        db.ref(`users/${auth().currentUser.uid}/contacts`).on("value", snapshot => {
            if (snapshot.exists()) {
                Object.values(snapshot.val()).forEach(contact => contacts.push(contact.email))
            }
        })

        db.ref("users").on("value", snapshot => {
            let users = [], emails = [], ids = []
            Object.values(snapshot.val()).forEach(user => users.push(user));
            users.forEach(user => {
                if (user.email !== auth().currentUser.email && !contacts.includes(user.email)) {
                    emails.push(user.email)
                    ids.push(user.id)
                }
            })
            this.setState({
                ids, emails
            })
        })
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({ error: '', success: '' })
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault();
        let { emails, email, ids, text } = this.state;
        if (emails.includes(email)) {
            let currentUserID = auth().currentUser.uid;
            let id = ids[emails.indexOf(email)];
            let chatroomID = this.getChatroomID(currentUserID, id);
            db.ref(`users/${currentUserID}/contacts`).push({ chatroomID, email, id })
            db.ref(`users/${id}/contacts`).push({ chatroomID, email:auth().currentUser.email, id:currentUserID })
            db.ref(`chats/${chatroomID}`).push({text, senderID:currentUserID, timestamp:Date.now()})
            this.setState({ success: 'Contact is successfully added.',text: '', email: '' })
        } else {
            this.setState({ error: 'There is no user with such email OR may be this person is already in your contacts' })
        }
    }

    getChatroomID = (a, b) => a < b ? a + b : b + a;

    render() {
        return (
            <Layout>
                <div className="appbar" style={{ justifyContent: "start" }}>
                    <Button style={{ padding: "10px" }} startIcon={<ArrowBackIcon />} onClick={e => window.history.back()} />
                </div>
                <form className="form addcontact" onSubmit={this.handleSubmit}>

                    <p>Test mail: test1@gmail.com </p>

                    <TextField variant="outlined" required label="Please type your friend's email address" name="email" type="email"
                        onChange={this.handleChange} value={this.state.email}/>

                    {this.state.success ? <p style={{color: "green"}}>{this.state.success}</p> : ''}

                    {this.state.error ? <p style={{ color: "red", }}>{this.state.error}</p> : ''}

                    <TextField variant="outlined" required label="Text some messages" name="text" onChange={this.handleChange}
                    value={this.state.text}/>

                    <Button type="submit" variant="contained" color="primary">SEND</Button>

                </form>
            </Layout>
        )
    }

}