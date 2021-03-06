import React from 'react'
import { useStaticQuery, graphql, navigate } from "gatsby"
import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const ListToTree = require('list-to-tree')

const query = graphql`
{
    mdxPages: allMdx(filter: {frontmatter: {draft: {ne: true} }}){
        nodes {
            id
            fields { slug, directory }
        }
    }
    directories: allAksDirectory {
        nodes {
            id
            name, label, fullLabel, pagePath, numberOfPosts
        }
    }
}
`

const DirectoryTree = () => {
    const data = useStaticQuery(query)

    //const list = []

    const list = data.directories.nodes.map(node=>{
        const parts = node.name.split('/')
        parts.pop()
        const parent_dir = parts.join('/')
        
        
        return {id: node.name, parent: (parent_dir) ? parent_dir : 0,
            name: node.name, label: node.label,
            pagePath: node.pagePath,
            numberOfPosts: node.numberOfPosts}
    })

    const allNodeIds = list.map(v=> v.name)
    const tree = new ListToTree(list).GetTree() || []
 
    return (<TreeView style={{opacity: 0.8}}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultExpanded={allNodeIds}
        >
        {
         tree.map(item=> (<Tree item={item} key={item.id}/>))   
        }
        
    </TreeView>)

}

const Tree = ({item}) =>  {
    return(
    <TreeItem label={<>{item.label} ({item.numberOfPosts})</>} nodeId={item.name} 
        key={item.name}
        onClick={() => {}} 
        onLabelClick={(e) => {e.preventDefault(); navigate(item.pagePath)}}>
        { item.child && ( item.child.map(v => (<Tree item={v} key={v.id}/>)) ) }
    </TreeItem>
)
}

export default DirectoryTree