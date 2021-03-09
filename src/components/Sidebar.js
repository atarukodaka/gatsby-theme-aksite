import React from "react"

import Card from './Card'
import Profile from './Profile'
import DirectoryTree from './DirectoryTree'
import RecentPosts from './RecentPosts'
import MonthlyArchives from './MonthlyArchives'
import Typography from '@material-ui/core/Typography'

const Sidebar = () => {
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
        </div>
    )
}

export default Sidebar