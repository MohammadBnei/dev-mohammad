/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { css } from "emotion"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className={css`
       width: 100vw;
        min-height: 94vh;
        margin: 0px;
        display: grid;
        grid-template-rows: 10vh auto 10vh;
        grid-template-columns: auto;
        align-content: stretch;
        grid-template-areas:
       " header"
        "main"
        "footer";
      `}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>
          {children}
        </main>
        <footer className={css`
        grid-area: footer;
        background-color: #648ca6;
        `}>
          © {new Date().getFullYear()}, Built with
            {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
