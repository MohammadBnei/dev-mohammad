import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";

export default function Template({ html,
}) {
  return (
    <div className="markdown"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}