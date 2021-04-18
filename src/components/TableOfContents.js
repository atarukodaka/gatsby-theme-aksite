import React from 'react'
import { Link } from 'gatsby'
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/react'

const cssToc = css`
    a {
        text-decoration: none;
        color: black;
    }

    ol,ul {
        padding-left: 0;
        margin-left: 1rem;
        list-style: none;
    }

    li {
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 0.5rem;
        a {
            color: #777;
        }
        a:hover {

            background-color: #eee;
        }
    }
    
    
`

const Tree = ({ items }) => (
    <ul>
        {
            items.map(v => (
                <li key={v.url}>
                    <Typography>
                        <Link to={v.url}>{v.title}</Link>
                    </Typography>
                    {v.items && (<Tree items={v.items} />)}
                </li>
            ))
        }
    </ul>
)

const TableOfContents = ({ contents}) =>(
    (contents?.items) ? (
        <div css={cssToc}>
            <Tree items={contents.items || []} />
        </div>
    ) : ""
)

export default TableOfContents