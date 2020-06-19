import React, { Component } from 'react'

import { auth, db } from '../services/firebase'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'

export default class Signup extends Component {

    constructor() {
        super();
        this.state = {
            contacts: [],
            search:""
        }
    }

    componentDidMount() {
        let ids = [], contacts = [], chatRooms = []
        db.ref(`users/${auth().currentUser.uid}/contacts`).on("value", snapshot => {
            if (snapshot.exists()) {
                
                Object.values(snapshot.val()).forEach(contact =>{
                    ids.push(contact.id)
                    chatRooms.push(contact.chatroomID)
                })
                
                ids.forEach((id,i) => {
                    db.ref(`users/${id}/username`).on("value", snapshot => {
                        contacts.push({name:snapshot.val(),chatRoom:chatRooms[i]})
                        this.setState({ contacts })
                    })
                })

            }
        })
    }
    
    handleChange = e =>{
        e.preventDefault();
        this.setState({search:e.target.value.toLowerCase().trim()})
    }

    render() {
        return(
            <Layout>
                <div className="appbar">
                    <Button startIcon={<ExitToAppIcon />} onClick={e => auth().signOut()}>
                        Logout
                    </Button>
                    <Link to="/add contact">
                        <Fab color="secondary" className="add"><AddIcon /></Fab>
                    </Link>
                    <Link to="/profile">
                        <Button startIcon={<AccountCircleIcon />} style={{ height: "100%" }}>Profile</Button>
                    </Link>
                </div>
               
                <List className="chatList">
                    {this.state.contacts.length !== 0 ? (<div className="chatList-header">
                    <h3>Contacts</h3>
                    <TextField onChange={this.handleChange}
                     InputProps={{
                          startAdornment:(<InputAdornment position="start">
                                <SearchIcon/>
                          </InputAdornment>)
                     }}/>
                    </div>): <p>You have no contact right now!<br/> Click red add button to add contacts.</p>}
                    {
                        this.state.contacts
                        .filter(contact => contact.name.toLowerCase().includes(this.state.search))
                        .map((contact, i) =>{
                            let a = "/"+contact.chatRoom
                            return(<Link key={i} to={a}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: "rgb(63, 63, 212)" }}>{contact.name.charAt(0)}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={contact.name} />
                            </ListItem>
                            <Divider component="li"/>
                            </Link>)
                            })
                    }
                </List>
            </Layout>
        )
    }

}