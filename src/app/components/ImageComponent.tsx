import Image from "next/image";
import styled from 'styled-components';

interface HeroImageProps {
    src: string;
    alt: string;
    priority?: boolean;
}

export const ImageComponent = ({ src, alt, priority = false }: HeroImageProps) => (
    <>
        <ImageWrapper >
            <StyledImage src={src} alt={alt} fill priority={priority} sizes="30%"/>
        </ImageWrapper>
    </>
);

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
`;

const StyledImage = styled(Image)`
    object-fit: cover;
`;
