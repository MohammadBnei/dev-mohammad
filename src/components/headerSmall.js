import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { css } from "@emotion/core"
import Logo from "./logoMABv1.svg"
import PropTypes from "prop-types"
//import { Link, animateScroll as scroll } from "react-scroll"

const HeaderSmall = ({ width }) => (
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

      return <Header pagesHTML={pagesHTML} width={width} />
    }}
  />
)

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
    }
    this.pagesHTML = props.pagesHTML
    this.showMenu = this.showMenu.bind(this)
  }

  showMenu(e) {
    e.preventDefault()

    let showMenu = this.state.showMenu
    showMenu ^= 1

    this.setState({
      showMenu,
    })
  }

  render() {
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
            grid-template-columns: 4em calc(${this.props.width}px - 4em);
            grid-template-rows: 5em;
            justify-items: center;
          `}
        >
          <Logo
            css={css`
              margin: 0 0.5em 0 0.5em;
              width: 3em;
              align-self: center;
              shape-rendering: geometricPrecision;
            `}
            onClick={this.showMenu}
          />
          <div>
            <h5>Mohammad-Amine BANAEI</h5>
            <h4>Developpeur Freelance</h4>
          </div>
          {this.state.showMenu ? <div css={css``}>{this.pagesHTML}</div> : null}
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  pagesHTML: PropTypes.array,
  width: PropTypes.number,
}

HeaderSmall.propTypes = {
  width: PropTypes.number,
}

export default HeaderSmall
