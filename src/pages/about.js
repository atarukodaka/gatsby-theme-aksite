import React from "react"

import Breadcrumb from '../components/Breadcrumb'
import Layout from "../components/Layout"
import PageTitle from '../components/PageTitle'
import SEO from '../components/SEO'
import useSiteMetadata from "../hooks/useSiteMetadata";

const AboutPage = ({ pageContext }) => {
  const { breadcrumb: { crumbs } } = pageContext

  const { title, author, description } = useSiteMetadata()

  return (
    <Layout title="about">
      <SEO title="about"/>
      <Breadcrumb crumbs={crumbs} crumbLabel='About' />
      <PageTitle>About</PageTitle>
      <p>title: {title} </p>
      <p>author: {author} </p>
      <p>description: {description} </p>
    </Layout>
  )
}

export default AboutPage
