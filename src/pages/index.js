import React from "react"

import Layout from "../components/layout"
import ThreeD from "../components/ThreeD"
import SEO from "../components/seo"
import SpaHolder from "../components/spaHolder"

const IndexPage = () => (
  <Layout>
    <ThreeD />
    <SEO title="Heys" />
    <SpaHolder />
  </Layout>
)

export default IndexPage
