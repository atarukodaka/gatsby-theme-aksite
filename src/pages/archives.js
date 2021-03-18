import React from 'react'

import Layout from '../components/Layout'
import MonthlyArchives from '../components/MonthlyArchives'
import PageTitle from '../components/PageTitle'
import Breadcrumb from '../components/Breadcrumb'

const MonthlyArchivePage = ( { pageContext}) => {
    const { breadcrumb: { crumbs } } = pageContext
    return (
    <Layout>
        <PageTitle>Monthly Archives</PageTitle>
        <Breadcrumb crumbs={crumbs} />
        <MonthlyArchives style={{margin: "1rem"}}/>
    </Layout>
)}

export default MonthlyArchivePage
