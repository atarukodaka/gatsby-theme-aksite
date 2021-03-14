import { useStaticQuery, graphql } from 'gatsby'

const useAllPosts = () => {
    console.log("useAllPosts")
    const query = graphql`
    {
        allMdx(filter: {frontmatter: {draft: {ne: true} } },
            sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
            ...postFields
            }
        }
    }
    `
    const { allMdx } = useStaticQuery(query)
    return allMdx
}

export default useAllPosts