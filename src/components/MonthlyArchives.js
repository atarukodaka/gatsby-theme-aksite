import React from "react"
import { navigate } from "gatsby"
import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PropTypes from 'prop-types'

import { monthlyArchivePath } from '../utils/archive_path'
import useAllPosts from '../hooks/useAllPosts'


const createMonthlyArchiveList = (  nodes  ) => {
    const list = []
    nodes.forEach(node=>{
        const date = new Date(node.frontmatter.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const yyyymm = year.toString() + (month).toString().padStart(2,0)
    
        let item = list.find(v=>v.id === yyyymm)
        if (item === undefined){
            item = {id: yyyymm, year: year, month: month, date: date, 
                path: monthlyArchivePath(year, month),
                nodes: []} // , countTotal: 1}
            list.push(item)
        }
        item.nodes.push(node)
    })
    return list
}

const MonthlyArchives = ( props ) => {
    const allMdx = useAllPosts()
    const list = createMonthlyArchiveList(allMdx.nodes)
    const years = [...new Set(list.map(v=>v.year))].sort((a, b) => b-a)
    
    //const defaultExpanded = ( expandAll) ? years : []
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
                    const countTotal = items.reduce((prev, curr) => prev + curr.nodes.length, 0)
                    
                    return (<TreeItem key={year} nodeId={year.toString()} label={ <>{year} ({countTotal})</>}>
                        {
                            items.sort((a, b)=> { return b.month - a.month}).map(item=>(
                                <TreeItem key={item.id} nodeId={item.id} 
                                 label={<>{item.year}/{item.month} ({item.nodes.length})</>}
                                 onLabelClick={() => { navigate(item.path) }}/>
                            ))
                        }
                    </TreeItem>

                )})
            }
        </TreeView>
    )
}

export default MonthlyArchives
