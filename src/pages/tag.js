import React from 'react'

import Layout from '../components/Layout'
import TagList from '../components/TagList'
import PageTitle from '../components/PageTitle'
import Breadcrumb from '../components/Breadcrumb'

const TagListPage = ( { pageContext}) => {
    const { breadcrumb: { crumbs } } = pageContext
    return (
    <Layout>
        <PageTitle>Tag List</PageTitle>
        <Breadcrumb crumbs={crumbs} />
        <TagList style={{margin: "1rem"}}/>
    </Layout>
)}

export default TagListPage
