"use client";

import Plot from 'react-plotly.js';
import { useData } from '../utils/DataContext';
import { memo, useEffect, useState } from 'react';
import { AxisType, Data, Layout } from 'plotly.js';
import styled from 'styled-components';
import { LineDecoration } from './LineDecoration';

export const ZipfLawPlot = () => {
    const [plotlyLoaded, setPlotlyLoaded] = useState(false);
    const wordCounts = useData();

    useEffect(() => {
        // Dynamically import Plotly.js only in the client-side code
        import('react-plotly.js').then(() => {
            setPlotlyLoaded(true);
        });
    }, []);

    if (!plotlyLoaded) {
        return <div>Loading...</div>;
    }

    // Sort the word counts by frequency in descending order
    const sortedWordCounts = wordCounts
        .sort((a, b) => b.frequency - a.frequency)
        .slice(0, 1000); // take only 1000 for better perfomance

    // Calculate rank
    const ranks = sortedWordCounts.map((_, index) => index + 1);

    // Calculate expected frequency using Zipf's Law
    const maxFrequency = sortedWordCounts.length > 0 ? sortedWordCounts[0].frequency : 0;
    const expectedCounts = ranks.map(rank => maxFrequency / rank);

    // Create hover text containing rank, word, and frequency for each data point
    const hoverText = sortedWordCounts.map((item, index) => {
        return `Rank: ${ranks[index]}<br>Word: ${item.word}<br>Frequency: ${item.frequency}`;
    });

    const data: Data[] = [
        {
            type: 'scatter',
            x: ranks,
            y: expectedCounts,
            mode: 'lines',
            name: "Expected by Zipf's Law",
            line: { color: "orange", width: 2 }
        },
        {
            type: 'scatter',
            x: ranks,
            y: sortedWordCounts.map(item => item.frequency),
            mode: 'markers',
            name: 'Actual word frequencies',
            marker: {
                color: "rgba(25, 25, 112, 0.3)",
                size: 12,
                line: {
                    color: 'rgb(8, 8, 44)',
                    width: 1,
                },
            },
            text: hoverText,
            hoverinfo: 'text'
        }
    ];

    const layout: Partial<Layout> = {
        title: "Word Frequency vs. Zipf's Law",
        xaxis: {
            title: 'Rank',
            type: 'log' as AxisType,
            gridcolor: 'rgb(120, 120, 120)'
        },
        yaxis: {
            title: 'Frequency',
            type: 'log' as AxisType,
            gridcolor: 'rgb(120, 120, 120)'
        },
        autosize: true,
        paper_bgcolor: 'rgb(255,255,255)',
        plot_bgcolor: 'rgb(255,255,255)',
        font: { color: 'black' },
        legend: {
            x: 1,
            y: 1,
            xanchor: 'right',
            yanchor: 'top',
        },
    };

    const MemoizedPlot = memo(Plot);

    return (
        <Root>
            <LineDecorationWrapper>
                <LineDecoration direction={"toBottom"} length={500} color={'#9A5FA4'} />
            </LineDecorationWrapper>
            <RootInner>
                <H2>{"Word Frequency vs. Zipf’s Law"}</H2>
                <ContentWrapper>
                    {plotlyLoaded  && data && <MemoizedPlot
                        data={data}
                        layout={layout}
                        config={{ displayModeBar: true }}
                        useResizeHandler={true}
                        style={{ width: '100%', height: '100%' }}
                        className="demo-plot" />
                    }
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
    padding: var(--block-padding) 0;
    position: relative;
    display: flex;

    &:before {
        content: "";
        position: absolute;
        width: calc(100% + var(--main-indentation) * 2);
        height: 100%;
        top: 0;
        left: calc(var(--main-indentation) * -1);
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
    gap: 15px;
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
    margin-bottom: 15px;
    font-size: 48px;
    font-family: 'New Rocker';
`;
