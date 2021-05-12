import React from 'react'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import Breadcrumb from '../components/Breadcrumb'
import SeriesList from '../components/SeriesList'

const SeriesListPage = ( { pageContext}) => {
    const { breadcrumb: { crumbs } } = pageContext
    return (
    <Layout>
        <PageTitle>Series</PageTitle>
        <Breadcrumb crumbs={crumbs} />
        <SeriesList/>
    </Layout>
)}

export default SeriesListPage
