import React from "react"
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { css } from '@emotion/react'

import Card from './Card'
import Profile from './Profile'
import DirectoryTree from './DirectoryTree'
import RecentPosts from './RecentPosts'
import MonthlyArchives from './MonthlyArchives'
import GoogleSearch from './GoogleSearch'
//import TagList from './TagList'

const Sidebar = (props) => {
    const gcse_cx = process.env.GCSE_CX

    return (
        <div props>
            <Typography variant="h3">Profile</Typography>
            <Profile />
            <Divider />

            <Typography variant="h3">Directories</Typography>
            <DirectoryTree />
            <Divider />

            <Typography variant="h3">Recently Posted</Typography>
            <RecentPosts />
            <Divider />

            <Typography variant="h3">Monthly Archives</Typography>
            <MonthlyArchives />
            <Divider />

            {/*
            <Card>
                <Typography variant="h3">Tags</Typography>
                <TagList />
            </Card>
            */}
            <Card>
                <Typography variant="h3">Search</Typography>
                <GoogleSearch cx={gcse_cx} />
            </Card>

        </div>
    )
}

export default Sidebar