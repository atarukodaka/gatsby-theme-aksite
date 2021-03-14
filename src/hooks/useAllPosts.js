import { useStaticQuery, graphql } from 'gatsby'

const useAllPosts = () => {
    const query = graphql`
    {
        allMdx(sort: {fields: frontmatter___date, order: ASC}) {
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