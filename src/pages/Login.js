import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { auth } from '../services/firebase'
import Layout from '../components/Layout'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            email: '',
            password: ''
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ error: '' });
        try {
            const temp = { ...this.state }
            await auth().signInWithEmailAndPassword(temp.email, temp.password);
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
                    <form className="form login" onSubmit={this.handleSubmit}>

                    <h2 className="heading">Login to <span className="title">Chat</span></h2>

                        <TextField variant="outlined" required label="Email address" name="email" type="email"
                            onChange={this.handleChange} />

                        <TextField variant="outlined" required label="Password" name="password" type="password"
                            onChange={this.handleChange} />

                        {this.state.error ? <p style={{ color: "red", }}>{this.state.error}</p> : null}

                        <Button type="submit" variant="contained" color="primary">Submit</Button>

                        <h3><Link to="/signup">Click to signup</Link></h3>

                    </form>
              </Layout>
        )
    }

}