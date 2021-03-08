import React from "react"

import HeaderPane from './HeaderPane'
import MainPane from './MainPane'
import FooterPane from './FooterPane'

////////////////////////////////////////////////////////////////
// Top

////////////////////////////////////////////////////////////////
// Middle
////////////////////////////////////////////////////////////////
// Bottom

////////////////////////////////////////////////////////////////
// Layout
const Layout = ({ children, tableOfContents }) => {
    return (
        <React.Fragment>
            <HeaderPane/>
            <MainPane tableOfContents={tableOfContents}>{children}</MainPane>
            <FooterPane/>
        </React.Fragment>
    )
}
export default Layout
