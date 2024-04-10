"use client";

import styled from 'styled-components';
import { LineDecoration } from './LineDecoration';
import { ZipfLawPlotProps } from './ZipfLawPlot';
import {ZipfLawPlot} from '@/app/components/ZipfLawPlot';


export const ZipfLawPlotCardWithText = ({ wordCounts, circleColor, borderColor }: ZipfLawPlotProps) => {

    return (
        <Root>
            <LineDecorationWrapper>
                <LineDecoration direction={"toBottom"} length={500} color={'#9A5FA4'} />
            </LineDecorationWrapper>
            <RootInner>
                <H2>{"Word Frequency vs. Zipf’s Law"}</H2>
                <ContentWrapper>
                    <ZipfLawPlot wordCounts={wordCounts} circleColor={circleColor} borderColor={borderColor} />
                    <TextWrapper>
                        <Text>
                            {"This chart compares the actual word usage in song lyrics to what we'd expect based on Zipf's Law, a rule suggesting that a few words are used very often while most are used rarely. On the chart, the 'Actual' line shows how often words really appear in lyrics, from most to least common, and the 'Expected by Zipf's Law' line shows how often they would appear if the lyrics perfectly followed this law. When these lines are close together, it means the words in songs follow a common pattern seen in everyday language, where some words are super common and others are hardly used at all. This simple comparison helps us see how song lyrics reflect natural language patterns."}
                        </Text>
                        <TextLineDecorationWrapper>
                            <LineDecoration direction={"toLeft"} length={40} color={'#A45F5F'} />
                        </TextLineDecorationWrapper>
                    </TextWrapper>
                </ContentWrapper>
            </RootInner>
        </Root>
    );
};

const Root = styled.div`
    padding: var(--spacing-p75) 0;
    position: relative;
    display: flex;

    &:before {
        content: "";
        position: absolute;
        width: calc(100% + var(--spacing-p90) * 2);
        height: 100%;
        top: 0;
        left: calc(var(--spacing-p90) * -1);
        background-color: var(--accent-blue);
        z-index: -1;
        opacity: 0.7;
    }
`;

const LineDecorationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const RootInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s15);
    align-items: center;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 11px solid var(--acent-violet);
    background-color: var(--acent-violet);
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    width: 100%;
`;

const TextLineDecorationWrapper = styled.div`
    margin-right: 30px;
    display: flex;
    justify-content: flex-end;
`;

const Text = styled.p`
    flex-basis: 40%;
    padding: 35px;

`;

const H2 = styled.h2`
    margin-bottom: var(--spacing-s15);
    font-size: 48px;
    font-family: 'New Rocker';
`;
