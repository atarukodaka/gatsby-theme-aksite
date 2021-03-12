import React from 'react'
import Alert from '@material-ui/lab/Alert'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const Spoiler = ({ warningText, children }) => {
  
    const title = warningText || "WARNING !!! SPOILER IS COMING !!! SURE TO OPEN ??"
    return (
        
            
            <Accordion>
                <AccordionSummary>
                    <Alert severity="warning"><strong>{title}</strong></Alert>
                </AccordionSummary>
                <AccordionDetails style={{display: "block"}}>
                <div style={{color: "white"}}>
                    {children}
                    </div>
                </AccordionDetails>
            </Accordion>

        
    )
}

export default Spoiler