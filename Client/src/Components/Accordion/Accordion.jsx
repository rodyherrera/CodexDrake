import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import './Accordion.css';
import {
    Accordion as MUIAccordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@mui/material';

const Accordion = ({
    Title,
    Content,
    Expanded = false,
    Icon = <MdExpandMore />,
    Identifier = ''
}) => {
    return (
        <MUIAccordion defaultExpanded={Expanded} className="Generic-Accordion" id={Identifier}>
            <AccordionSummary expandIcon={Icon}>
                <Typography>{Title}</Typography>
            </AccordionSummary>
            <AccordionDetails className='Gray-Text'>{Content}</AccordionDetails>
        </MUIAccordion>
    );
};

export default Accordion;