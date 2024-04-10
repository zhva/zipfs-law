import styled, { css } from "styled-components";

interface GenreTabs {
    genres: string[];
    color: string;
    isActive: boolean[];
    onClick: (genre: string, index: number) => void;
}

export const GenreTabs = ({ genres, color, isActive, onClick }: GenreTabs) => {

    return (
        <Root>
            {genres && genres.map((genre, index) => (
                <Tab key={index} $color={color} $isActive={isActive[index]} $genresNumber={genres.length} onClick={() => onClick(genre, index)}>{genre}</Tab>
            ))}
        </Root>
    );
}

const Root = styled.div`
    margin: var(--spacing-s30) var(--spacing-s30) 0 var(--spacing-s30);
    padding: var(--spacing-s15);
    width: calc(100% - var(--spacing-s30) * 2);
    border-radius: var(--border-radius);
    background-color: var(--card);
    display: flex;
    justify-content: space-around;
`;

interface TabProps {
    $color: string;
    $isActive: boolean;
    $genresNumber: number;
}

const Tab = styled.div<TabProps>`
    padding: var(--spacing-s15) 0;
    border-radius: var(--border-radius);
    color: var(--text-color);
    font-size: 26px;
    cursor: pointer;
    position: relative;
    text-align: center;
    text-transform: capitalize;

    ${({ $genresNumber }) => $genresNumber &&
        css`
            width: calc(100% / ${$genresNumber} - 12px);
    `}


    ${({$isActive, $color}) => $isActive &&
        css`
            background-color: var(--background);
            color: ${$color};
    `}

    &:not(:last-child):after {
        content: "";
        position: absolute;
        width: 2px;
        height: 80%;
        top: 10%;
        right: -7px;
        background-color: var(--background);
    }
`;
