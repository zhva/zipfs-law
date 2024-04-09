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

        const randomMargin = Math.floor(Math.random() * 20) + 5;
        const randomLineHeight = Math.random() * (0 - 1) + 1;

        return (
            <Word
                key={tag.value}
                $color={paletteColor}
                $size={size}
                $margin={randomMargin}
                $lineHeight={randomLineHeight}
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
                maxSize={96}
                tags={data}
                renderer={customRenderer}/>
        </StyledCardWrapper>
    );
};

export const WordCloudCard = memo(WordCloud);

const StyledCardWrapper = styled(CardWrapper)`
    height: -webkit-fill-available;
`;

const Word = styled.span<{$size: number, $color: string, $margin: number, $lineHeight: number}>`
    font-size: ${(props) => props.$size}px;
    color: ${(props) => props.$color};
    padding: 3px;
    cursor: pointer;
    margin: ${(props) => props.$margin}px;
    line-height: ${(props) => props.$lineHeight};
    transition: all 0.2s ease-in-out;
`;


const StyledTagCloud = styled(TagCloud)`
    display: flex;
    padding: var(--spacing-s30);
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
`;

