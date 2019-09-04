/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            path
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.nodes.forEach(({ frontmatter }) => {
    createPage({
      path: frontmatter.path,
      component: path.resolve(`./src/templates/basic-page.js`),
      context: {
        slug: frontmatter.path,
      },
    })
  })
}
