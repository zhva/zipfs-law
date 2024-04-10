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
import WordTreeMapCard from '../components/WordTreeMapCard';
import { LineDecoration } from '../components/LineDecoration';

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
            <HeadlineWrapper>
                <HeadlineLinesWrapper>
                    <LineDecoration direction={"toLeft"} length={30} color={colorPalette[selectedGenre].palette[3]} />
                    <LineDecoration direction={"toRight"} length={20} color={colorPalette[selectedGenre].palette[0]} />
                </HeadlineLinesWrapper>
                <h1>{"Word Distribution by Genre"}</h1>
                <HeadlineLineBottomWrapper>
                    <LineDecoration direction={"toRight"} length={70} color={colorPalette[selectedGenre].palette[1]} />
                </HeadlineLineBottomWrapper>
            </HeadlineWrapper>
            <GenreTabs genres={genres} color={colorPalette[selectedGenre].accent} isActive={isActive} onClick={handleGenreClick} />
            {selectedGenre &&
                <ContentWrapper>
                    <LineDecoration direction={"toTop"} length={500} color={colorPalette[selectedGenre].palette[4]} />
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
                        <LeftSideLinesWrapper>
                            <LineDecoration direction={"toLeft"} length={10} color={colorPalette[selectedGenre].palette[2]} />
                            <LineDecoration direction={"toLeft"} length={30} color={colorPalette[selectedGenre].palette[0]} />
                        </LeftSideLinesWrapper>
                        <LeftSideBottomWrapper>
                            <CardWrapper>
                                <h2>{"Word frequency using Zipf's law"}</h2>
                                <ZipfLawPlot
                                    wordCounts={plotGenreData}
                                    circleColor={colorPalette[selectedGenre].circle}
                                    borderColor={colorPalette[selectedGenre].border}
                                    setSelectedData={setSelectedData} />
                            </CardWrapper>
                            <LineDecoration direction={"toRight"} length={60} color={colorPalette[selectedGenre].palette[0]} />
                        </LeftSideBottomWrapper>
                    </LeftSideWrapper>
                    <ContentLineWrapper>
                        <LineDecoration direction={"toTop"} length={200} color={colorPalette[selectedGenre].palette[4]} />
                    </ContentLineWrapper>
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
                        <RightSideneWrapper>
                            <LineDecoration direction={"toRight"} length={20} color={colorPalette[selectedGenre].palette[3]} />
                        </RightSideneWrapper>
                        <RightSideBottomWrapper>
                            <WordTreeMapCard data={wordCloudData} genre={selectedGenre} />
                        </RightSideBottomWrapper>
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

const HeadlineWrapper = styled.div`
    margin-top: var(--spacing-s30);
    text-align: center;
`;

const HeadlineLinesWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: var(--spacing-s15);
    margin-bottom: var(--spacing-s15);
    transform: translateX(60%);
`;

const HeadlineLineBottomWrapper = styled.div`
    transform: translateX(-10%);
`;

const ContentWrapper = styled.div`
    display: flex;
    padding: var(--spacing-s30);
`;

const ContentLineWrapper = styled.div`
    align-self: flex-end;
    transform: translateY(-30%);
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

const LeftSideBottomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s30);
`;

const RightSideWrapper = styled.div`
    flex-basis: 45%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s30);
`;

const LeftSideLinesWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    div:first-of-type {
        transform: translateX(400%);
    }
`;

const RightSideneWrapper = styled.div`
    transform: translateX(80%);
`

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
