import React from "react"

import Card from './Card'
import Profile from './Profile'
import DirectoryTree from './DirectoryTree'
import RecentPosts from './RecentPosts'
import MonthlyArchives from './MonthlyArchives'

const Sidebar = () => {
    return (
        <div>
            <Card>
                <h3>Profile</h3>
                <Profile/>
            </Card>

            <Card>
                <h3>Directories</h3>
                <DirectoryTree />
            </Card>
            
            <Card>
                <h3>Recent Posts</h3>
                <RecentPosts />
            </Card>
            
            <Card>
                <h3>Monthly Archives</h3>
                <MonthlyArchives />
            </Card>
        </div>
    )
}

export default Sidebar