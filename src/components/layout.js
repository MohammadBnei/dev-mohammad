/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"

import HeaderLarge from "./headerLarge"
import HeaderSmall from "./headerSmall"
import "./layout.css"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0 }
    this.children = props.children
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  render() {
    return (
      <div
        css={css`
          width: 100vw;
          overflow-x: hidden;
          min-height: 100vh;
          margin: 0px;
          display: grid;
          grid-template-rows: minmax(5em, 10vh) auto;
          grid-template-columns: auto;
          align-content: stretch;
          grid-template-areas:
            " header"
            "main";
        `}
      >
        {this.state.width <= 420 ? (
          <HeaderSmall width={this.state.width} />
        ) : (
          <HeaderLarge />
        )}
        <main>{this.children}</main>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
