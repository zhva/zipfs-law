import {ImageComponent} from '@/app/components/ImageComponent';
import styled from 'styled-components';
import { LineDecoration } from './LineDecoration';

export const AuthorCard = () => {

    return (
        <Root>
            <CardWrapper>
                <TextWrapper>
                    <Headline>
                        <H2>{"George Kingsley Zipf"}</H2>
                        <LineDecoration direction={"toRight"} length={30} color={'#615FA4'} />
                    </Headline>
                    <p>{"George Kingsley Zipf (January 7, 1902 – September 25, 1950), was an American linguist and philologist who studied statistical occurrences in different languages. Zipf earned his bachelors, masters, and doctoral degrees from Harvard University, although he also studied at the University of Bonn and the University of Berlin. He was chairman of the German department and university lecturer (meaning he could teach any subject he chose) at Harvard University. He worked with Chinese and demographics, and much of his effort can explain properties of the Internet, distribution of income within nations, and many other collections of data."}</p>
                </TextWrapper>
                <ImageWrapper>
                    <ImageComponent src={"/images/George_Kingsley_Zipf.png"} alt={"Mini stage with music instruments"} />
                </ImageWrapper>
            </CardWrapper>
            <LineDecoration direction={"toLeft"} length={70} color={'#A4845F'} />
        </Root>
    );
};

const Root = styled.div`
    position: absolute;
    padding: 35px;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, calc(-50% - var(--spacing-p90)));
    background-color: var(--background);
    border-radius: var(--border-radius);
    z-index: 5;
    filter: drop-shadow(0 0 2em black);
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: end;

`;

const CardWrapper = styled.div`
    display: flex;
    gap: 15px;
`;

const TextWrapper = styled.div`
    flex-basis: 75%;
`;

const Headline = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: top;
`;

const H2 = styled.h2`
    font-family: 'New Rocker';
    font-size: 32px;
    margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
    flex-basis: 25%;
`;
