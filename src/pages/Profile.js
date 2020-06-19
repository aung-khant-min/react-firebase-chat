import React, { Component } from 'react'
import Layout from '../components/Layout'
import { auth } from '../services/firebase'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import PersonIcon from '@material-ui/icons/Person'
import MailIcon from '@material-ui/icons/Mail'
import EditIcon from '@material-ui/icons/Edit'

export default class Profile extends Component {
    
    render() {
        const {displayName,email} = auth().currentUser
        return (
            <Layout>
               <div className="appbar" style={{justifyContent:"start"}}>
                   <Button style={{padding:"10px",fontSize:"15px"}} startIcon={<ArrowBackIcon/>} onClick={e=>window.history.back()}>
                    &nbsp;&nbsp; Your Profile</Button>
               </div>
               <div className="profile">
                   <List>

                       <ListItem>
                           <ListItemAvatar>
                               <Avatar style={{backgroundColor:"rgb(63, 63, 212)"}}><PersonIcon/></Avatar>
                           </ListItemAvatar>
                           <ListItemText primary={displayName} secondary="username"/>
                       </ListItem>
                       <Divider component="li" />

                       <ListItem>
                           <ListItemAvatar>
                               <Avatar style={{backgroundColor:"rgb(63, 63, 212)"}}><MailIcon/></Avatar>
                           </ListItemAvatar>
                           <ListItemText primary={email} secondary="email address"/>
                       </ListItem>
                       <Divider component="li" />

                       <Link style={{color:"orange"}} to="/username change">
                       <ListItem>
                           <ListItemAvatar>
                               <Avatar style={{backgroundColor:"orange"}}><EditIcon/></Avatar>
                           </ListItemAvatar>
                           <ListItemText primary="Change Username"/>
                       </ListItem>
                       </Link>
                       <Divider component="li" />

                   </List>
               </div>
            </Layout>
        )
    }

}