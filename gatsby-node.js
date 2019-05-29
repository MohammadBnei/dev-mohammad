/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: node.frontmatter.page,
        })
    }
}

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions

    const homeTemplate = path.resolve(`src/templates/home.js`)

    return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
            fields {
                # Slug field created in the last section
                slug
            }
          }
        }
      }
    }
  `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: homeTemplate,
                context: {
                    nodeId: node.id
                }, // additional data can be passed via context
            })
        })
    })
}