import { css } from "emotion"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className={css`
    grid-area: header;
    background-color: #D13242;
  `}>
    <h1>
      {siteTitle}
    </h1>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
