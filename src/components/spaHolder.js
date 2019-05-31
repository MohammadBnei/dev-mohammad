/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import HomeTemplate from "../templates/home"
import "./layout.css"

const spaHolder = () => (
    <StaticQuery
        query={graphql`
     query {
    allMarkdownRemark {
        nodes {
            frontmatter {
                path
                page
            }
            html
        }
    }
  }
`}
        render={data => {
            let allPagesTemplated = data.allMarkdownRemark.nodes
                .sort((nodeA, nodeB) => nodeA.frontmatter.page - nodeB.frontmatter.page)
                .map(node => (
                    <div className="markdown" key={node.frontmatter.page}
                        dangerouslySetInnerHTML={{ __html: node.html }}
                    />
                ))

            return (<>
                {allPagesTemplated}
            </>
            )
        }}
    />
)

export default spaHolder
