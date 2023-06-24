/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/CodeWithRodi/CodexDrake/
 *
 * CodexDrake<Front> - A self-hosted optimized search engine built in JavaScript, safe 
 * and private, who is Google?, Bing?, Yahoo?, Qwant?, shut up and drink water :).
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 ****/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientRoutes } from '../../Infrastructure';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { BsLightning, BsGithub } from 'react-icons/bs';
import { IconButton } from '@mui/material';
import { scroller, Element } from 'react-scroll';
import SecurityConcept from '../../Assets/Images/Home/Security-Concept.png';
import SearchBar from '../../Components/SearchBar';
import Accordion from '../../Components/Accordion';
import './Home.css';

const Home = () => {
    const [GetQuery, SetQuery] = useState('');
    const Navigate = useNavigate();
    const Features = [
        [<MdOutlinePrivacyTip />, 'Your privacity', 'At no time do we capture information from your browser while you browse the internet, we do not collect it, when using our service you browse anonymously and safely.'],
        [<BsGithub />, 'Open Source', 'CodexDrake has its own philosophy, faithfully governed by the pillars of open source, the software is on GitHub under the MIT license, allowing contributions and use of the source code in third-party applications.'],
        [<BsLightning />, 'Ridiculously fast', 'You are facing a relatively robust engine which tries to collect information from various search engines at the time of making a request, built on modern technology with which we actively seek to give you the best experience you can get.'],
    ]

    const HandleOnSubmit = (Event = undefined) => {
        (Event) && (Event.preventDefault());
        if(!GetQuery)
            return;
        Navigate({
            pathname: ClientRoutes.Search,
            search: `?Query=${GetQuery}` 
        });
    };

    useEffect(() => {
        document.title = 'CodexDrake - Secure Open Source Search Engine Written In JavaScript.';
        return () => {
            SetQuery('');
        };
    }, []);

    return (
        <main id='Home-Main'>
            <section id='Search-Container'>
                <h1 className='Animated-Text-Background'>CodexDrake</h1>
                <SearchBar 
                    GetQuery={GetQuery}
                    SetQuery={SetQuery}
                    OnSubmit={HandleOnSubmit}
                />
                <i
                    id='Arrow-Bounce-Box'
                    onClick={() => scroller.scrollTo('About-Box', { duration: 300, delay: 0, offset: 100, smooth: true })}>
                    <IoIosArrowDown />
                </i>
            </section>

            <Element name='About-Box' id='About-Box'>
                <article id='Choose-Box'>
                    <h3>Why CodexDrake?</h3>
                    <div>
                        {Features.map(([ Icon, Title, Content ], Index) => (
                            <div className='Feature-Box' key={Index}>
                                <IconButton size='big'>
                                    {Icon}
                                </IconButton>
                                <h3>{Title}</h3>
                                <p>{Content}</p>
                            </div>
                        ))}
                    </div>
                </article>

                <figure id='Our-Principles'>
                    <img src={SecurityConcept} alt='Security Concept Img' />
                    <figcaption>
                        <Accordion
                            Title='The ingenuity and elaborate origin of its name...'
                            Expanded={true}
                            Content={`"Codex" - greed for its translation from Latin, while "Drake" - name of the mathematical equation that allows finding the number of civilizations within our galaxy, the Milky Way; CodexDrake does not seek to be interpreted as "Greed for Civilizations", but as "Greed for Results".`}
                        />
                        <Accordion
                            Title='From a corner: Hello world from Chile, Talca.'
                            Expanded={true}
                            Content='Lines of code written from one of the corners of South America, emerging ideas directed towards developers from all over the world. This is your open source search engine under MIT license, written with doses of modafinil and caffeine.'
                        />
                    </figcaption>
                </figure>
            </Element>
        </main>
    );
};

export default Home;
