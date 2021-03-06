import React from 'react'
import Box from '@material-ui/core/Box'
import { Pagination } from '@material-ui/lab'
import LinkPost from '../components/LinkPost'
import Layout from "../components/Layout"
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'
import PageTitle from '../components/PageTitle'

const ArchiveTemplate = ( {title, nodes, crumbs, pagination_parameters} ) => (
    <Layout title={title}>
      <SEO title={title}/>
      <Breadcrumb crumbs={crumbs} />
      <PageTitle>{title}</PageTitle>
      {
        nodes.map(node => (
          <LinkPost node={node} key={node.id} display='card'/>
        ))
      }

      {pagination_parameters &&
      (<Box display="flex" justifyContent="center" m={3}>
        <Pagination count={pagination_parameters.numberOfPages} page={pagination_parameters.humanPageNumber} 
          onChange={pagination_parameters.onChangeHandler} />
      </Box>)}
    </Layout>
  )

export default ArchiveTemplate  
