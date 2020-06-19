import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { Link } from 'react-router-dom'

export default class Signup extends Component {

    render() {
        return (
            <Grid container className="face-page">
                
                <Grid className="face-heading" xs={12}>
                    <h2> <span>"Chat"</span> <br /> with your friends.</h2>
                    <Link to="/signup">
                        <Button variant="outlined" color="primary">Create account</Button>
                    </Link>
                    OR
                    <Link to="/login">
                        <Button variant="contained" color="primary">Signin account</Button>
                    </Link>
                    <a href="#technology">
                        <IconButton>
                            <ArrowDownwardIcon />
                        </IconButton>
                    </a>
                </Grid>

                <Grid className="images" container >
                    <Grid sm={3} xs={6}>
                        <img src="images/chat.png" />
                    </Grid>
                    <Grid sm={3} xs={6}>
                        <img src="images/chatroom.png" />
                    </Grid>
                    <Grid sm={3} xs={6}>
                        <img src="images/login.png" />
                    </Grid>
                    <Grid sm={3} xs={6}>
                        <img src="images/signup.png" />
                    </Grid>
                </Grid>

                <Grid className="technology" id="technology" xs={12}>
                    <h3>Using Technologies</h3>
                    <p>
                        <a href="https://reactjs.org/">ReactJS</a>
                        <a href="https://firebase.google.com">Firebase</a>
                        <a href="https://material-ui.com/">MaterialUI</a>
                    </p>
                </Grid>

            </Grid>
        )
    }

}