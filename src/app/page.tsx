"use client";

import { ZipfLawPlot } from "./components/ZipfLawPlot";
import {DataProvider} from '@/app/utils/DataContext';
import {ZipfLawOverview} from '@/app/components/ZipfLawOverview';
import styled from "styled-components";

export default function Home() {
  return (
    <DataProvider>
        <ContentWrapper>
            <ZipfLawOverview />
            <ZipfLawPlot />
        </ContentWrapper>
    </DataProvider>
  );
}

const ContentWrapper = styled.div`
    padding: var(--main-indentation);
`;
