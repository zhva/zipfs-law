"use client";

import styled from "styled-components";
import {ImageComponent} from '@/app/components/ImageComponent';
import { Button } from "./Button";
import { useState } from "react";
import {AuthorCard} from '@/app/components/AuthorCard';
import {LineDecoration} from '@/app/components/LineDecoration';

export const ZipfLawOverview = () => {
    const [showCard, setShowCard] = useState<boolean>(false);

    return (
        <Root>
            <TextContentWrapper>
                <Headline>
                    <H1>{"Zipf's law \nin Music"}</H1>
                    <LineDecoration direction={"toLeft"} length={25} color={'#A4645F'} />
                </Headline>
                <TextWrapper>
                    <LineDecoration direction={"toTop"} length={200} color={'#A45F88'} />
                    <div>
                        <Text>
                            <HoverText onMouseEnter={() => setShowCard(true)} onMouseLeave={() => setShowCard(false)}>
                                {"Zipf"}
                            </HoverText>
                            {"'s Law  states that the frequency of any word is inversely proportional to its rank in the frequency table. More simply, the second most common word in a language or text corpus appears about half as often as the most common word, the third most common word appears about one-third as often as the most common word, and so on."}</Text>
                        <H2>{"Zipf's law"}</H2>
                        <Text>{"Zipf's law (/zɪf/, German: [ts͡ɪpf]) is an empirical law that often holds, approximately, when a list of measured values is sorted in decreasing order. It states that the value of the nth entry is inversely proportional to n. The best known instance of Zipf's law applies to the frequency table of words in a text or corpus of natural language. It is usually found that the most common word occurs approximately twice as often as the next common one, three times as often as the third most common, and so on. "}</Text>
                    </div>
                </TextWrapper>
                <ButtonWrapper>
                    <Button text={"Read more..."} link={"https://en.wikipedia.org/wiki/Zipf%27s_law#"} />
                </ButtonWrapper>
            </TextContentWrapper>
            <ImageWrapper>
                <ImageComponent src={"/images/mini-stage.png"} alt={"Mini stage with music instruments"} priority={true}/>
                <LineDecoration direction={"toLeft"} length={50} color={'#A45F95'} />
            </ImageWrapper>
            {showCard && <AuthorCard />}
        </Root>
    );
};

const Root = styled.div`
    display: flex;
    gap: var(--spacing-p90);
    padding-bottom: var(--spacing-p75);
    position: relative;
`;

const TextContentWrapper = styled.div`
    flex-basis: 65%;
    display: flex;
    flex-direction: column;
`;

const Headline = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 30px;
`;

const H1 = styled.h1`
    white-space: pre-line;
    margin-bottom: 30px;
`;

const ImageWrapper = styled.div`
    flex-basis: 35%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: flex-end;
`;

const TextWrapper = styled.div`
    display: flex;
    justify-items: center;
    align-items: flex-end;
`;

const ButtonWrapper = styled.div`
    align-self: center;
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
    margin-bottom: var(--spacing-s15);
`;

