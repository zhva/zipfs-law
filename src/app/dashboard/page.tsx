"use client";

import React, { useEffect, useState } from 'react';
import {GenreTabs} from '@/app/components/GenreTabs';
import {DataItem, useData} from '@/app/utils/DataContext';
import {ZipfLawPlot} from '@/app/components/ZipfLawPlot';
import {TextCard} from '@/app/components/TextCard';
import {CardWrapper} from '@/app/components/CardWrapper';
import { PieChart } from '../components/PieChart';
import styled from 'styled-components';
import {WordCloudCard} from '@/app/components/WordCloudCard';
import { colorPalette } from '../utils/colorPalete';

const Dashboard = () => {
    const data = useData();
    const [genres, setGenres] = useState<string[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | null>('hip hop');
    const [plotGenreData, setPlotGenreData] = useState<DataItem[]>([]);
    const [isActive, setIsActive] = useState<boolean[]>([]);
    const [selectedData, setSelectedData] = useState<DataItem[]>();
    const [wordCloudData, setWordCloudData] = useState<{ value: string; count: number; }[]>([]);

    // Initialize the selected data with the data for the initial genre
    useEffect(() => {
        if (data) {
            const uniqueGenres = Array.from(new Set(data.map(item => item.genre)));
            setGenres(uniqueGenres);
            setIsActive(uniqueGenres.map(genre => genre === selectedGenre));
        }

        if (data && selectedGenre) {
            const initialData = data.filter(item => item.genre === selectedGenre);
            setSelectedData(initialData);
            setPlotGenreData(initialData);
        }
    }, [data, selectedGenre]);

    useEffect(() => {
        if (plotGenreData.length > 0 && selectedData ) {
            // Extract the top 10 words with the highest frequency
            const topWords = selectedData
                .sort((a, b) => b.frequency - a.frequency) // Sort by frequency in descending order
                .slice(0, 10)
                .map(item => ({ value: item.word, count: item.frequency }));

            setWordCloudData(topWords);
        }
    }, [plotGenreData, selectedData]);

    const handleGenreClick = (genre: string, index: number) => {
        setSelectedGenre(genre);
        setIsActive(prevState => prevState.map((_, i) => i === index));
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <Root>
            <H1>{"Word Distribution by Genre"}</H1>
            <GenreTabs genres={genres} color={colorPalette[selectedGenre].accent} isActive={isActive} onClick={handleGenreClick} />
            {selectedGenre &&
                <ContentWrapper>
                    <LeftSideWrapper>
                        <LeftSideTopWrapper>
                            <PieChartWrrapper>
                                {selectedData &&
                                    <PieChart wordCounts={selectedData} color={colorPalette[selectedGenre].accent} genre={selectedGenre} />
                                }
                            </PieChartWrrapper>
                            <TextCardWrapper>
                                <TextCard genre={selectedGenre} color={colorPalette[selectedGenre].accent} />
                            </TextCardWrapper>
                        </LeftSideTopWrapper>

                            <CardWrapper>
                                <h2>{"Word frequency using Zipf's law"}</h2>
                                <ZipfLawPlot
                                    wordCounts={plotGenreData}
                                    circleColor={colorPalette[selectedGenre].circle}
                                    borderColor={colorPalette[selectedGenre].border}
                                    setSelectedData={setSelectedData} />
                            </CardWrapper>
                    </LeftSideWrapper>
                    <RightSideWrapper>
                        <RightSideTopWrapper>
                            {selectedData &&
                                <WordCloudCard
                                    data={wordCloudData}
                                    options={{
                                        luminosity: 'light',
                                        hue: colorPalette[selectedGenre].accent,
                                        colors: colorPalette[selectedGenre].palette.map(color => ({ hue: color }))
                                    }}
                                />
                            }
                        </RightSideTopWrapper>
                        <RightSideBottomWrapper></RightSideBottomWrapper>
                    </RightSideWrapper>
                </ContentWrapper>
            }
      </Root>
    );
};

export default Dashboard;

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const H1 = styled.h1`
    margin-top: var(--spacing-s30);
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: var(--spacing-s30);
    padding: var(--spacing-s30);
`;

const LeftSideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s30);
    flex-basis: 55%;
`;

const PieChartWrrapper = styled.div`
    flex-basis: 50%;
`;

const TextCardWrapper = styled.div`
    flex-basis: 50%;
    height: 100%;
    display: flex;
`;

const LeftSideTopWrapper = styled.div`
    display: flex;
    gap: var(--spacing-s30);
`;

const RightSideWrapper = styled.div`
    flex-basis: 45%;
    display: flex;
    flex-direction: column;
`;

const RightSideTopWrapper = styled.div`
    display: flex;
    height: 100%;
    flex-basis: 45%;
`;


const RightSideBottomWrapper = styled.div`
    display: flex;
    height: 100%;
    flex-basis: 55%;
`;
