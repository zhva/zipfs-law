"use client";

//import Plot from 'react-plotly.js';
import React, { useEffect, useState } from 'react';
import { CardWrapper } from './CardWrapper';
import { DataItem } from '../utils/DataContext';
import styled from 'styled-components';
import { Layout, Data } from 'plotly.js';
import dynamic from "next/dynamic";

interface PieChartProps {
    wordCounts: DataItem[];
    color: string;
    genre: string;
}

// calculate Pearson correlation coefficient
function calculateCorrelation(x: number[], y: number[]): number {
    if (x.length !== y.length || x.length === 0) {
        return NaN; // Return NaN if arrays are of different lengths or empty
    }

    const n = x.length;
    const sumX = x.reduce((acc, val) => acc + val, 0);
    const sumY = y.reduce((acc, val) => acc + val, 0);
    const sumXSquare = x.reduce((acc, val) => acc + val ** 2, 0);
    const sumYSquare = y.reduce((acc, val) => acc + val ** 2, 0);
    const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumXSquare - sumX ** 2) * (n * sumYSquare - sumY ** 2));

    if (denominator === 0) {
        return NaN; // Return NaN if denominator is zero
    }

    return numerator / denominator;
}

export const PieChart = ({ wordCounts, color, genre }: PieChartProps) => {
    const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, });
    const [correlation, setCorrelation] = useState<number>(0);

    useEffect(() => {
        if (!wordCounts || wordCounts.length === 0) {
            return; // Return early if wordCounts is undefined or empty
        }

        // Calculate the correlation of the actual word frequency distribution with Zipf's Law
        const sortedCounts = wordCounts.map(item => item.frequency).sort((a, b) => b - a);
        const ranks = Array.from({ length: sortedCounts.length }, (_, i) => i + 1); // Generate ranks
        const expectedFreqs = sortedCounts.map((count, index) => count / ranks[index]); // Calculate expected frequencies
        const actualFreqs = sortedCounts;
        const correlation = calculateCorrelation(actualFreqs, expectedFreqs); // Calculate correlation

        setCorrelation(correlation * 100);
    }, [wordCounts]);

    const data: Data[] = React.useMemo(
        () => [
            {
                values: [100 - correlation, correlation],
                labels: ['Remaining', 'Correlation'],
                type: 'pie',
                marker: { colors: ['lightgray', color] },
                hole: 0.6,
                textinfo: "none",
                hoverinfo: "label+percent",
                textposition: "inside",
                automargin: true,
            },
        ], [color, correlation]);

    const layout: Partial<Layout> = React.useMemo(
        () => ({
            title: {
                text: `${correlation.toFixed(1)}%<br><b>${genre.toUpperCase()}</b>`,
                y: 0.5,
                x: 0.5,
                xanchor: 'center',
                yanchor: 'middle',
                font: { color: 'white' },
            },
            width: 250,
            height: 250,
            margin: {
                l: 0,
                r: 0,
                t: 0,
                b: 0,
            },
            showlegend: false,
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            font: { color: 'white' },
        }),
    [correlation, genre]);

    if (!Plot) {
        return <div>Loading...</div>;
    }

    return (
        <Root>
            <CardWrapper>
                <div>
                    {wordCounts && <Plot
                        data={data}
                        layout={layout}
                        className="pie-chart"
                    />
                    }
                </div>
            </CardWrapper>
        </Root>
    );
};

const Root = styled.div`
    position: relative;
    width: 100%;
    height: 315px;

    > div {
        width: inherit;
        height: inherit;
    }

    .pie-chart {
        .svg-container {
            width: inherit !important;
            aspect-ratio: 1/1;
        }

        svg {
            width: 100%;
            object-fit: fill;
        }
    }
`;
