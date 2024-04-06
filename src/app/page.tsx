"use client";

import { ZipfLawPlot } from "./components/ZipfLawPlot";
import {DataProvider} from '@/app/utils/DataContext';
import {ZipfLawOverview} from '@/app/components/ZipfLawOverview';
import styled from "styled-components";
import { LineDecoration } from "./components/LineDecoration";

export default function Home() {
  return (
    <Root>
        <DataProvider>
            <ContentWrapper>
                <LineDecoration direction={"toRight"} length={60} color={'#A4845F'} />
                <ZipfLawOverview />
                <ZipfLawPlot />
            </ContentWrapper>
            <LineDecorationWrapper>
                <LineDecoration direction={"toBottom"} length={1000} color={'#795FA4'} />
            </LineDecorationWrapper>
        </DataProvider>
    </Root>
  );
}

const Root = styled.div`
    position: relative;
`;

const ContentWrapper = styled.div`
    padding: var(--main-indentation);
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
