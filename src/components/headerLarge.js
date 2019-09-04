import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { css } from "@emotion/core"
import Logo from "./logoMABv1.svg"
//import { Link, animateScroll as scroll } from "react-scroll"

const HeaderLarge = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { order: ASC, fields: frontmatter___page }) {
          nodes {
            frontmatter {
              page
              title
            }
          }
        }
      }
    `}
    render={data => {
      let pagesHTML = data.allMarkdownRemark.nodes
        /**
         * Removing duplicate (top and bottom are distinct elements, while remaining on the same page)
         */
        .filter(
          (elem, pos, arr) =>
            arr.findIndex(e => e.frontmatter.page === elem.frontmatter.page) ===
            pos
        )
        .map(item => (
          <Link to={`/${item.frontmatter.title}/`} key={item.frontmatter.page}>
            {item.frontmatter.title}
          </Link>
        ))

      return (
        <header
          css={css`
            grid-area: header;
            background-color: #f4f4f4;
          `}
        >
          <div
            css={css`
              display: grid;
              grid-template-columns: auto repeat(${pagesHTML.length + 1}, 1fr);
              grid-template-rows: 5em;
              justify-items: center;
            `}
          >
            <Logo
              css={css`
                margin: 0 1em 0 1em;
                width: 7em;
                @media (max-width: 420px) {
                  width: 3em;
                }
                align-self: center;
                shape-rendering: geometricPrecision;
              `}
            />
            <div>
              <h5>Mohammad-Amine BANAEI</h5>
              <h4>Developpeur Freelance</h4>
            </div>
            {pagesHTML}
          </div>
        </header>
      )
    }}
  />
)

export default HeaderLarge
