import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {auth,db} from '../services/firebase'
import Layout from '../components/Layout'

export default class Signup extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            name: '',
            email: '',
            password: ''
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ error: '' });
        try {
               const temp = {...this.state}
               const {user} = await auth().createUserWithEmailAndPassword(temp.email, temp.password);
               user && user.updateProfile({displayName:temp.name})
               user && db.ref("users/"+user.uid).set({
                   username: temp.name, email: temp.email, id: user.uid
               })
        } catch (err) {
            this.setState({ error: err.message });
        }
    }

    render() {
        return (
            <Layout>
                <div className="appbar" style={{justifyContent:"start"}}>
                   <Button style={{padding:"10px"}} startIcon={<ArrowBackIcon/>} onClick={e=>window.history.back()}/>
               </div>
                    <form className="form signup" onSubmit={this.handleSubmit}>

                    <h2 className="heading">Sign Up <span className="title">Chat</span></h2>

                        <TextField variant="outlined" required label="Nickname" name="name"
                            onChange={this.handleChange}/>

                        <TextField variant="outlined" required label="Create password" name="password" type="password"
                            onChange={this.handleChange} />

                        <TextField variant="outlined" required label="Email address" name="email" type="email"
                            onChange={this.handleChange} />

                        {this.state.error ? <p style={{color:"red",}}>{this.state.error}</p> : null}

                        <Button type="submit" variant="contained" color="primary">Submit</Button>

                        <h3><Link to="/login">Click to login</Link></h3>

                    </form>
              </Layout>
        )
    }

}