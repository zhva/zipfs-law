import styled from "styled-components";
import { CardWrapper } from "./CardWrapper";

interface TextCardProps {
    genre: string;
    color: string;
}

export const TextCard = ({ genre, color }: TextCardProps) => {
    return (
        <StyledCardWrapper color={color}>
            <Text>
                {"The correlation between the evaluated word frequency and the values calculated according to  Zipf's Law for "}
                <b>{genre.toUpperCase()}</b>
            </Text>
        </StyledCardWrapper>
    );
};

const StyledCardWrapper = styled(CardWrapper)`
    height: -webkit-fill-available;
`;

const Text = styled.p`
    font-size: 20px;
    padding: var(--spacing-s15);
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
