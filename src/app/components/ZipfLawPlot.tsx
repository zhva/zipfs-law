"use client";

import Plot from 'react-plotly.js';
import { DataItem } from '../utils/DataContext';
import { memo, useEffect, useState } from 'react';
import { AxisType, Color, Data, Layout } from 'plotly.js';
import styled from 'styled-components';

export interface ZipfLawPlotProps {
    wordCounts: DataItem[];
    circleColor: Color;
    borderColor: Color;
}

export const ZipfLawPlot = ({ wordCounts, circleColor, borderColor }: ZipfLawPlotProps) => {
    const [plotlyLoaded, setPlotlyLoaded] = useState(false);
    const [maxPlotRankNumber, setMaxPlotRankNumber] = useState<number>(1000);

    useEffect(() => {
        // Dynamically import Plotly.js
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
        .slice(0, maxPlotRankNumber);

    // Calculate rank
    const ranks = sortedWordCounts.map((_, index) => index + 1);

    // Calculate expected frequency using Zipf's Law
    const maxFrequency = sortedWordCounts.length > 0 ? sortedWordCounts[0].frequency : 0;
    const expectedCounts = ranks.map(rank => maxFrequency / rank);

    // Create hover text containing rank, word, and frequency for each data point
    const hoverText = sortedWordCounts.map((item, index) => {
        return `Rank: ${ranks[index]}<br>Word: ${item.word}<br>Frequency: ${item.frequency}`;
    });

    const markerSizes = sortedWordCounts.map(item => 8 + 30 * (item.frequency / maxFrequency));

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
                color: circleColor,
                size: markerSizes,
                line: {
                    color: borderColor,
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

    const handleMaxPlotRankNumberChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMaxPlotRankNumber(parseInt(event.target.value));
    };

    return (
        <Root>
            <MaxRankSelect>
                <select
                    value={maxPlotRankNumber}
                    onChange={handleMaxPlotRankNumberChange}
                >
                    <option value={100}>10²</option>
                    <option value={1000}>10³</option>
                    <option value={10000}>10⁴</option>
                    <option value={100000}>10⁵</option>
                </select>
            </MaxRankSelect>
            {plotlyLoaded  && data && <MemoizedPlot
                data={data}
                layout={layout}
                config={{ displayModeBar: true }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
                className="demo-plot" />
            }
        </Root>
    );
};


const Root = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const MaxRankSelect = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    select {
        outline: none;
        padding: 5px;
        border: 1px solid rgb(120, 120, 120);
        border-radius: 0;
    }
`;
