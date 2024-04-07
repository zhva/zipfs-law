"use client";

import { ZipfLawPlotCardWithText } from "./components/ZipfLawPlotCardWithText";
import { useData } from '@/app/utils/DataContext';
import { ZipfLawOverview } from '@/app/components/ZipfLawOverview';
import styled from "styled-components";
import { LineDecoration } from "./components/LineDecoration";

export default function Home() {
    const wordCounts = useData();

  return (
    <Root>
        <ContentWrapper>
            <LineDecoration direction={"toRight"} length={60} color={'#A4845F'} />
            <ZipfLawOverview />
            <ZipfLawPlotCardWithText wordCounts={wordCounts} circleColor={"rgba(25, 25, 112, 0.5)"} borderColor={"rgb(8, 8, 44)"} />
        </ContentWrapper>
        <LineDecorationWrapper>
            <LineDecoration direction={"toBottom"} length={1000} color={'#795FA4'} />
        </LineDecorationWrapper>
    </Root>
  );
}

const Root = styled.div`
    position: relative;
`;

const ContentWrapper = styled.div`
    padding: var(--spacing-p90);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 30px;
`;

const LineDecorationWrapper = styled.div`
    position: absolute;
    top: 20%;
    left: 30px;
`;
