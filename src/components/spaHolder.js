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
              position
            }
            html
          }
        }
      }
    `}
    render={data => {
      let formattedArray = [],
        allPagesTemplated = data.allMarkdownRemark.nodes
          .flat()
          .sort((nodeA, nodeB) => nodeA.page - nodeB.page)
          .factorizeArray()
          .map(node => (
            <div
              className={node.position}
              key={node.page}
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          ))

      return <>{allPagesTemplated}</>
    }}
  />
)

const factorizeArray = array => {
  let pagesDealtWith,
    resultArray = []
  for (let i = 0; i < array.length; i++) {}
}

export default spaHolder
