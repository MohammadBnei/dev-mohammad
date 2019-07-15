/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { css } from "emotion"

import "./layout.css"

let cssStyle = `  
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 3em auto;
  grid-template-areas:
    ". . top top"
    "bottom bottom top top"
    "bottom bottom . .";
`

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
      let allPagesTemplated = data.allMarkdownRemark.nodes
        .reduce((acc, cur) => {
          let itemInArray = acc.find(element => element.page === cur.frontmatter.page)
          let item = itemInArray || { page: cur.frontmatter.page }

          if (cur.frontmatter.position === 'top') item.top = cur.html
          else item.bottom = cur.html

          if (!itemInArray) acc.push(item)

          return acc
        }, [])
        .sort((a, b) => a.page - b.page)
        .map(node => (
          <div
            className={css`${cssStyle}`}
            key={node.page}>
            <div
              className={css`
              grid-area: top;
            `}
              dangerouslySetInnerHTML={{ __html: node.top }}>
            </div>
            <div
              className={css`
              grid-area: bottom;
            `}
              dangerouslySetInnerHTML={{ __html: node.bottom }}>
            </div>
          </div>
        ))

      return <div className={css`
          height: 100%
          display: inline-grid;
          grid-gap: 10px;
          grid-template-columns: repeat(${allPagesTemplated.length}, 100%);
          grid-template-rows: 100%;
          grid-auto-flow: row;
          text-align: center;
      `}>{allPagesTemplated}</div>
    }}
  />
)

export default spaHolder
