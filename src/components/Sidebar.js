import React from "react"
import Typography from '@material-ui/core/Typography'

import Card from './Card'
import Profile from './Profile'
import DirectoryTree from './DirectoryTree'
import RecentPosts from './RecentPosts'
import MonthlyArchives from './MonthlyArchives'
import GoogleSearch from './GoogleSearch'
//import TagList from './TagList'


const Sidebar = () => {
    const gcse_cx = process.env.GCSE_CX

    return (
        <div>
            <Card>
                <Typography variant="h3">Profile</Typography>
                <Profile/>
            </Card>

            <Card>
                <Typography variant="h3">Directories</Typography>
                <DirectoryTree />
            </Card>
            
            <Card>
                <Typography variant="h3">Recently Posted</Typography>
                <RecentPosts />
            </Card>
                       
            <Card>
                <Typography variant="h3">Monthly Archives</Typography>
                <MonthlyArchives />
            </Card>
            
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