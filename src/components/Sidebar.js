import React from "react"
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
//import { css } from '@emotion/react'

//import Card from './Card'
import Profile from './Profile'
import DirectoryTree from './DirectoryTree'
import RecentPosts from './RecentPosts'
import MonthlyArchives from './MonthlyArchives'
import SeriesList from './SeriesList'
import GoogleSearch from './GoogleSearch'
//import TagList from './TagList'

const Sidebar = (props) => {
    const gcse_cx = process.env.GCSE_CX
    
    //console.log(allMdx.group.map(v=>1))

    return (
        <div props>
            <Typography variant="h4">Profile</Typography>
            <Profile />
            <Divider />

            <Typography variant="h4">Directories</Typography>
            <DirectoryTree />
            <Divider />

            <Typography variant="h4">Recently Posted</Typography>
            <RecentPosts />
            <Divider />

            <Typography variant="h4">Monthly Archives</Typography>
            <MonthlyArchives />
            <Divider />

            <Typography variant="h3">Series</Typography>
            <SeriesList/>
            <Divider />
            <Typography variant="h4">Search</Typography>
            <GoogleSearch cx={gcse_cx} />

        </div>
    )
}

export default Sidebar