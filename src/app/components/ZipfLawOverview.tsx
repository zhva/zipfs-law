"use client";

import styled from "styled-components";
import {ImageComponent} from '@/app/components/ImageComponent';
import { Button } from "./Button";
import { useState } from "react";
import {AuthorCard} from '@/app/components/AuthorCard';

export const ZipfLawOverview = () => {
    const [showCard, setShowCard] = useState<boolean>(false);

    return (
        <Root>
            <TextContentWrapper>
                <Headline>{"Zipf's law \nin Music"}</Headline>
                <TextWrapper>
                    <Text>
                        <HoverText onMouseEnter={() => setShowCard(true)} onMouseLeave={() => setShowCard(false)}>
                            {"Zipf"}
                        </HoverText>
                        {"'s Law  states that the frequency of any word is inversely proportional to its rank in the frequency table. More simply, the second most common word in a language or text corpus appears about half as often as the most common word, the third most common word appears about one-third as often as the most common word, and so on."}</Text>
                    <H2>{"Zipf's law"}</H2>
                    <Text>{"Zipf's law (/zɪf/, German: [ts͡ɪpf]) is an empirical law that often holds, approximately, when a list of measured values is sorted in decreasing order. It states that the value of the nth entry is inversely proportional to n. The best known instance of Zipf's law applies to the frequency table of words in a text or corpus of natural language. It is usually found that the most common word occurs approximately twice as often as the next common one, three times as often as the third most common, and so on. "}</Text>
                </TextWrapper>
                <Button text={"Read more..."} link={"https://en.wikipedia.org/wiki/Zipf%27s_law#"} />
            </TextContentWrapper>
            <ImageWrapper>
                <ImageComponent src={"/images/mini-stage.png"} alt={"Mini stage with music instruments"} priority={true}/>
            </ImageWrapper>
            {showCard && <AuthorCard />}
        </Root>
    );
};

const Root = styled.div`
    display: flex;
    gap: var(--main-indentation);
    padding-bottom: var(--block-padding);
    position: relative;
`;

const TextContentWrapper = styled.div`
    flex-basis: 65%;
`;

const Headline = styled.h1`
    white-space: pre-line;
`;

const ImageWrapper = styled.div`
    flex-basis: 35%;
`;

const TextWrapper = styled.div`
`;


const HoverText = styled.span`
    color: var(--primary);
    text-decoration: underline;
    cursor: pointer;
`;

const Text = styled.p`
    margin-bottom: 40px;
`;

const H2 = styled.h2`
    margin-bottom: 15px;
`;

