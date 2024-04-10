import styled from "styled-components";
import { CardWrapper } from "./CardWrapper";
import { TagCloud } from 'react-tagcloud';
import { memo } from 'react';

interface ColorObject {
    hue: string;
}
interface WordCloudCardProps {
    data: {value: string, count: number}[];
    options: {luminosity: string, hue: string, colors: ColorObject[] };
}

const WordCloud = ({data, options}: WordCloudCardProps) => {
    const customRenderer = (tag, size) => {
        // Find the corresponding color from the palette based on tag value
        const paletteIndex = data.findIndex(item => item.value === tag.value);
        const paletteColor = paletteIndex !== -1 ? options.colors[paletteIndex % options.colors.length].hue : '#000000';

        const randomMargin = Math.floor(Math.random() * 15) + 5;
        const randomLineHeight = Math.random() * 0.7 + 0.3;

        const getRandomAlignSelf = () => {
            const alignOptions = ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'];
            const randomIndex = Math.floor(Math.random() * alignOptions.length);
            return alignOptions[randomIndex];
        };

        return (
            <Word
                key={tag.value}
                $color={paletteColor}
                $size={size}
                $margin={randomMargin}
                $lineHeight={randomLineHeight}
                $alignSelf={ getRandomAlignSelf()}
            >
                {tag.value}
            </Word>
        );
    };

    return (
        <StyledCardWrapper>
            <h2>{"WordCloud of top 10 Words"}</h2>
            <StyledTagCloud
                minSize={36}
                maxSize={106}
                tags={data}
                shuffle={true}
                randomSeed={Date.now()}
                renderer={customRenderer}/>
        </StyledCardWrapper>
    );
};

export const WordCloudCard = memo(WordCloud);

const StyledCardWrapper = styled(CardWrapper)`
    height: -webkit-fill-available;
`;

interface WordProps {
    $size: number,
    $color: string,
    $margin: number,
    $lineHeight: number,
    $alignSelf: string
}

const Word = styled.span<WordProps>`
    font-size: ${(props) => props.$size}px;
    color: ${(props) => props.$color};
    padding: 3px;
    cursor: pointer;
    margin: ${(props) => props.$margin}px;
    line-height: ${(props) => props.$lineHeight};
    align-self: ${(props) => props.$alignSelf};
    transition: all 0.2s ease-in-out;
`;


const StyledTagCloud = styled(TagCloud)`
    display: flex;
    padding: 5px;
    flex-wrap: wrap;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: white;
`;

