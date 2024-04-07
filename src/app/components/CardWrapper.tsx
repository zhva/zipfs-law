import styled from "styled-components";

interface CardWrapperProps {
    children: React.ReactNode;
    color: string;
    headline?: string;
}

export const CardWrapper = ({ children, color, headline }: CardWrapperProps) => {

    return (
        <Card $color={color}>
            {headline && <h2>{headline}</h2>}
            {children}
        </Card>
    );
};

const Card = styled.div<{ $color: string}>`
    padding: 30px;
    border-radius: var(--border-radius);
    background-color: ${(props) => props.$color};
    display: flex;
    flex-direction: column;
    gap: 30px;
`;
