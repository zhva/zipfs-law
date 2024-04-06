import styled, { css } from "styled-components";

interface LineDecorationProps {
    direction: "toTop" | "toBottom" | "toLeft" | "toRight";
    length: number;
    color: string;
}

export const LineDecoration = ({ direction, length, color }: LineDecorationProps) => {
    const validatedLength = Math.min(100, Math.max(0, length));

    return (
        <Line $direction={direction} $length={(direction === "toRight" || direction === "toLeft") ? validatedLength : length } $color={color} />
    );
};

interface LineProps {
    $direction: LineDecorationProps["direction"];
    $length: LineDecorationProps["length"];
    $color: LineDecorationProps["color"];
}

const Line = styled.div<LineProps>`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: ${(props) => props.$length}%;
    height: 2px;


    ${({ $direction, $length }) => $direction === "toBottom" && css`
        margin: 0 30px 40px 30px;
        width: 2px !important;
        height: ${$length}px;
        align-items: flex-start;
        justify-content: center;

        &:after {
            width: 2px !important;
            height: ${$length}px !important;
        }
    `};

    ${({ $direction, $length }) => $direction === "toTop" && css`
        margin: 0 30px 40px 30px;
        width: 2px !important;
        height: ${$length}px;
        align-items: flex-end;
        justify-content: center;

        &:after {
            width: 2px !important;
            height: ${$length}px !important;
        }
    `};

    ${({ $direction }) => $direction === "toLeft" && css`
        justify-content: flex-end;
    `};

    &:before {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: ${(props) => props.$color};
    }

    &:after {
        content: "";
        position: absolute;
        height: 2px;
        top: 0;
        width: 100%;
        background-color: ${(props) => props.$color};
    }
`;

