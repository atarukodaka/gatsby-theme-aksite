import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

import 'prismjs/themes/prism-okaidia.css'
//require("prismjs/themes/prism-okaidia.css")
//require("prismjs/themes/prism-solarizedlight.css")
//require("prismjs/themes/prism.css")

import "./src/styles/syntax_hilight.css"
import './src/styles/global.css'
import React from 'react'
import TopLayout from './src/components/TopLayout'

export const wrapRootElement = ({ element }) => {
    return (<TopLayout>{element}</TopLayout>);
};
  
