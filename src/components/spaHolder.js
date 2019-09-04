/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"

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
      let content = data.allMarkdownRemark.nodes
        /**
         * Reducing the content by page and position
         */
        .reduce((acc, cur) => {
          let itemInArray = acc.find(
            element => element.page === cur.frontmatter.page
          )
          let item = itemInArray || { page: cur.frontmatter.page }

          if (cur.frontmatter.position === "top") item.top = cur.html
          else item.bottom = cur.html

          if (!itemInArray) acc.push(item)

          return acc
        }, [])
        /**
         * Sorting by page ASC
         */
        .sort((a, b) => a.page - b.page)
        /**
         * Transforming the content into styled and imbricated HTML
         * HTML Architecture :
         * . . Top Top
         * Bottom Bottom . .
         */
        .map(node => (
          <div
            css={css`
              ${cssStyle}
              ${cssLargeStyle}
              @media (max-width: 420px) {
                ${cssSmallStyle}
              }
            `}
            id={"page" + node.page}
            key={node.page}
          >
            <div
              css={css`
                align-self: center;
                grid-area: top;
              `}
              dangerouslySetInnerHTML={{ __html: node.top }}
            />
            <div
              css={css`
                grid-area: bottom;
              `}
              dangerouslySetInnerHTML={{ __html: node.bottom }}
            />
          </div>
        ))

      return (
        <div
          css={css`
            overflow-x: auto;
            width: 100%;
            height: 100%;
            display: grid;
            grid-gap: 10px;
            grid-template-columns: repeat(${content.length}, 100%);
            grid-template-rows: 100%;

            ::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          {content}
        </div>
      )
    }}
  />
)

export default spaHolder

let cssStyle = `
  color: black;
  display: grid;
  heigth: 100%;
  justify-items: center;
`

let cssLargeStyle = `
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 3em auto;
  grid-template-areas:
    ". . top top"
    "bottom bottom top top"
    "bottom bottom . .";
`

let cssSmallStyle = `
  grid-template-rows: auto auto;
  grid-template-areas:
    "top"
    "bottom";
`
