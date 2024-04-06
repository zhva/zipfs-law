import styled from "styled-components";

interface ButtonProps {
    text: string;
    link?: string;
}

export const Button = ({ text, link }: ButtonProps) => {

    return (
        <>
            <StyledButton onClick={() => {window.location.href=`${link}`}}>{text}</StyledButton>
        </>
    );
};


const StyledButton = styled.button`
    padding: 13px 60px;
    color: black;
    background-color: var(--primary);
    border-radius: var(--border-radius);
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        filter: brightness(75%)
    }
`;
