import React from 'react'
import { Link } from 'gatsby'
import HoverBox from './HoverBox'
import Card from './Card'

const NavigateCard = ({ to, children, ...props }) => (
    <HoverBox {...props}>
        <Link to={to}>
            <Card>
                {children}
            </Card>
        </Link>
    </HoverBox>
)

export default NavigateCard