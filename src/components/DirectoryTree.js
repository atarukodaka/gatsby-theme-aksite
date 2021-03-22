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
    //console.log("directory list", list)

    /*
    data.mdxPages.nodes.filter(v => v.fields.directory !== "").forEach(node => {
        const directory = node.fields.directory
        const item = list.find(v => v.name === directory)
        if (item === undefined) {
            const parts = directory.split('/')
            const label = node.fields.directoryLabel || node.fields.directory.toString().split('/').pop()
            parts.pop()

            const parent_dir = parts.join('/')
            const parent = list.find(v => v.name === parent_dir)
            const parent_id = (parent) ? parent.id : 0
            const re = new RegExp(`^${directory}`)

            list.push({ id: directory, parent: parent_id, name: directory, label: label, 
                totalCount: data.mdxPages.nodes.filter(v => re.test(v.fields.directory)).length })
        }
    })
    */

    const allNodeIds = list.map(v=> v.name)
    const tree = new ListToTree(list).GetTree() || []
 
    return (<TreeView style={{opacity: 0.8}}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultExpanded={allNodeIds}
        >
        {
         tree.map(item=> (<Tree item={item}/>))   
        }
        
    </TreeView>)

}

const Tree = ({item}) =>  {
    return(
    <TreeItem label={<>{item.label} ({item.numberOfPosts})</>} nodeId={item.name} 
        key={item.name}
        onClick={() => {}} 
        onLabelClick={(e) => {e.preventDefault(); navigate(item.pagePath)}}>
        { item.child && ( item.child.map(v => (<Tree item={v}/>)) ) }
    </TreeItem>
)
}

export default DirectoryTree