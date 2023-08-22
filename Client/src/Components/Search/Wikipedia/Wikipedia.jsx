import React from 'react';
import { BsChatSquareText, BsFilePdf } from 'react-icons/bs';
import { VscPreview } from 'react-icons/vsc';
import { SiWikipedia } from 'react-icons/si';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';

const Wikipedia = () => {
    const IsWikipediaInformationLoading = useSelector((State) => State.Search.IsWikipediaInformationLoading);
    const {
        Thumbnail,
        Title,
        Description,
        Content,
        PDF,
        AdditionalURLs,
        Related
    } = useSelector((State) => State.Search.WikipediaData);

    return (
        ((!IsWikipediaInformationLoading && Title)) && (
            <article id='Wikipedia-Box'>
                <div id='Wikipedia-Header-Box'>
                    <div>
                        <img src={Thumbnail.Source} alt={Title} />
                        <div>
                            <h3>{Title}</h3>
                            <p>{Description}</p>
                        </div>
                    </div>
                    <p>{Content}</p>
                </div>
                <div id='Wikipedia-Icon-Box'>
                    {[
                        [AdditionalURLs.Edit, <FiEdit />, 'Edit the content present on the Wikipedia page.'], 
                        [PDF, <BsFilePdf />, 'Download the content of the Wikipedia page as a PDF.'],
                        [AdditionalURLs.Page, <SiWikipedia />, 'Visit the Wikipedia page that presents the content.'], 
                        [AdditionalURLs.Revisions, <VscPreview />, 'Visit the revisions made to this Wikipedia section.'], 
                        [AdditionalURLs.Talk, <BsChatSquareText />, 'Visit the talks made in this Wikipedia section.']
                    ].map(([ Link, Icon, TooltipTitle ], Index) => (
                        <Tooltip title={TooltipTitle} key={Index}>
                            <IconButton size='medium' onClick={() => window.open(Link, '_blank')}>
                                {Icon}
                            </IconButton>
                        </Tooltip>
                    ))}
                </div>
                <div id='Wikipedia-Related-Box' className='Colored-Scrollbar'>
                    {Related.map(({ Title, Description, Content }, Index) => (
                        <div key={Index}>
                            <div>
                                <h3>{Title}</h3>
                            </div>
                            <p>{Description}</p>
                            <p>{Content}</p>
                        </div>
                    ))}
                </div>
                <div id='Wikipedia-Footer-Box'>
                    <p>From Wikipedia, Powered by CodexDrake.</p>
                </div>
            </article>
        )
    );
};

export default Wikipedia;