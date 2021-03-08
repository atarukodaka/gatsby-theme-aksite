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
            color: ${theme.palette.text.primary};
        }
    `
    return (
        <div css={cssProfile}>
            <div>Author: {author}</div>
            <div>
                <a href={twitterUrl}><TwitterIcon aria-label="button" /></a>
                <a href={gitHubUrl}><GitHubIcon aria-label="button" /></a>
            </div>
        </div>
    )
}

export default Profile