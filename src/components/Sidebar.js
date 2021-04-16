import React from "react"
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/react'

import Card from './Card'
import Profile from './Profile'
import DirectoryTree from './DirectoryTree'
import RecentPosts from './RecentPosts'
import MonthlyArchives from './MonthlyArchives'
import SeriesList from './SeriesList'
import GoogleSearch from './GoogleSearch'
//import TagList from './TagList'

const cssSidebar = css`
    div {
        font-size: 0.9rem;
    }
    
`

const Sidebar = () => {
    const gcse_cx = process.env.GCSE_CX
    
    //console.log(allMdx.group.map(v=>1))

    return (
        <div css={cssSidebar}>
           
            <Card>
            <Typography variant="h3">Profile</Typography>
                <Profile />
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
                <Typography variant="h3">Series</Typography>
                <SeriesList/>
            </Card>


            <Card>
                <Typography variant="h3">Search</Typography>
                <GoogleSearch cx={gcse_cx} />
            </Card>

        </div>
    )
}

export default Sidebar