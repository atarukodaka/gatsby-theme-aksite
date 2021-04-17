import React from 'react'
import { Link } from 'gatsby'
import Typography from '@material-ui/core/Typography'
import { css } from '@emotion/react'

const cssToc = css`
    a {
        text-decoration: none;
        color: black;
    }

    ol {
        padding-left: 0;
        margin-left: 1rem;
    }

    li {
        font-size: 0.9rem;
        line-height: 3rem;
    }
    
    
`

const Tree = ({ items }) => (
    <ol>
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
    </ol>
)

const TableOfContents = ({ contents}) =>(
    contents?.items && (
        <div css={cssToc}>
            <Tree items={contents.items || []} />
        </div>
    )
)

export default TableOfContents