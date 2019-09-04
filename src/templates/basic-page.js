import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default class basicPage extends Component {
  constructor(props) {
    super(props)
    // eslint-disable-next-line react/prop-types
    this.html = props.data.markdownRemark.html
    // eslint-disable-next-line react/prop-types
    this.title = props.data.markdownRemark.frontmatter.title
  }

  render() {
    return (
      <Layout>
        <h1>{this.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.html }} />
      </Layout>
    )
  }
}

export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        title
      }
      html
    }
  }
`
