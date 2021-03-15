import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { css } from '@emotion/react'
import theme from '../styles/theme'
import useSiteMetadata from '../hooks/useSiteMetadata'

const Profile = () => {
    const { author, social: { twitter, github }} = useSiteMetadata()
    const twitterUrl = `http://www.twitter.com/${twitter}`
    const gitHubUrl = `http://github.com/${github}`

    const cssProfile = css`
        a {
            text-decoration: none;
            color: ${theme.palette.primary.main};
            margin: 3px;
        }
        
        opacity: 0.8;
    `
    return (
        <div css={cssProfile}>
            <div>Author: {author}</div>
            <div>
                <a href={twitterUrl} target="_blank" rel="noreferrer"><TwitterIcon aria-label="button"/></a>
                <a href={gitHubUrl} target="_blank" rel="noreferrer"><GitHubIcon aria-label="button"/></a>
            </div>
        </div>
    )
}

export default Profile