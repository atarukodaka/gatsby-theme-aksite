import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const MonthlyArchives = ( props ) => {
    const query = graphql`
    {
        allAksMonthly {
            nodes {
                id, year, month, yearMonth, pagePath, numberOfPosts
            }
        }
    }
    `
    const data = useStaticQuery(query)
    const list = data.allAksMonthly.nodes

    const years = [...new Set(list.map(v=>v.year))].sort((a, b) => b-a)
    
    const defaultExpanded = [(new Date()).getFullYear().toString()] // TODO
    
    return (
        <TreeView style={{opacity: 0.8}}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultExpanded={defaultExpanded}
        {...props}
    >
            {
                years.map(year=>{
                    const items = list.filter(v=> v.year === year)
                    const countTotal = items.reduce((prev, curr) => prev + curr.numberOfPosts, 0)
                    
                    return (<TreeItem key={year} nodeId={year.toString()} label={ <>{year} ({countTotal})</>}>
                        {
                            items.sort((a, b)=> { return b.month - a.month}).map(item=>(
                                <TreeItem key={item.id} nodeId={item.id} 
                                 label={<>{item.year}/{item.month} ({item.numberOfPosts})</>}
                                 onLabelClick={() => { navigate(item.pagePath) }}/>
                            ))
                        }
                    </TreeItem>

                )})
            }
        </TreeView>
    )
}

export default MonthlyArchives
