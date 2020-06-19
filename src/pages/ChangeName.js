import React, { Component } from 'react'
import Layout from '../components/Layout'
import { auth, db } from '../services/firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

export default class ChangeName extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            username: auth().currentUser.displayName,
            success: ''
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ error: '' });
        let temp = { ...this.state };
        let user = auth().currentUser;
        user.updateProfile({ displayName: temp.username }).then(() => {
            db.ref("users/" + user.uid).update({ username: temp.username })
        }).catch((err) => {
            this.setState({ error: err.message });
        }).finally(() => {
            !this.state.error && this.setState({ success: 'Your username changed successfully!' })
        })
    }

    render() {
        return (
            <Layout>
                <div className="appbar" style={{ justifyContent: "start" }}>
                    <Button style={{ padding: "10px" }} startIcon={<ArrowBackIcon />} onClick={e => window.history.back()} />
                </div>
                <form className="form changename" onSubmit={this.handleSubmit}>

                    <TextField variant="outlined" required label="Edit username and submit" name="username"
                        onChange={this.handleChange} defaultValue={auth().currentUser.displayName} />

                    {this.state.error ? <p style={{ color: "red" }}>{this.state.error}</p> : null}

                    {this.state.success ? <p style={{ color: "green" }}>{this.state.success}</p> : null}

                    <Button type="submit" variant="contained" color="primary">Submit</Button>

                </form>
            </Layout>
        )
    }
}