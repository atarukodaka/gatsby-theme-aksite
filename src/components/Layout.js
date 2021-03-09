import React from "react"

import HeaderPane from './HeaderPane'
import MainPane from './MainPane'
import FooterPane from './FooterPane'

const Layout = ( props ) => {
    return (
        <React.Fragment>
            <HeaderPane/>
            <MainPane {...props} />
            <FooterPane/>
        </React.Fragment>
    )
}
export default Layout
