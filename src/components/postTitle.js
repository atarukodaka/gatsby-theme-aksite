

const postTitle = ( node ) => {
    const series = node.frontmatter.series

    return (series) ? 
        `${series.title}[${series.number}] ${node.frontmatter.title}` : 
        node.frontmatter.title
}

export default postTitle
