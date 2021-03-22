import { useStaticQuery, graphql } from 'gatsby'

const useAksConfig= () => {
    
    const query = graphql`
    {
        aksConfig {
            basePath
            listPath
        }
    }
    `
    const { aksConfig } = useStaticQuery(query)
    return aksConfig
}

export default useAksConfig