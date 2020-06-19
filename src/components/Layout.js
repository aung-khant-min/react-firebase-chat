import React from 'react'
import Grid from '@material-ui/core/Grid'

const Layout = ({ children }) => (
    <Grid container>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={6} className="wrap">
            {children}
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
    </Grid>
)

export default Layout;