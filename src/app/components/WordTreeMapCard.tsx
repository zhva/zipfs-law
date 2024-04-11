import React from 'react';
import { TreeMapComponent } from '@syncfusion/ej2-react-treemap';
import { colorPalette } from '../utils/colorPalete';
import styled from 'styled-components';
import {CardWrapper} from '@/app/components/CardWrapper';

interface WordTreeMapCardProps {
    data: {value: string, count: number}[];
    genre: string;
}

const WordTreeMapCard = ({data, genre}: WordTreeMapCardProps) => {
    const treeMapData = React.useMemo(() => {
        return data.map((wordObj) => ({
            label: `${wordObj.value}`,
            value: wordObj.count,
        }));
    }, [data]);

    const palette = colorPalette[genre]?.palette || [];

    return (
        <StyledCardWrapper>
            <h2>{"A Treemap of top 10 Words with frequencies"}</h2>
            <TreeMapComponent
                dataSource={treeMapData}
                weightValuePath='value'
                leafItemSettings={{
                    labelPath: 'value',
                    labelStyle: {
                        color: "rgba(255, 255, 255, 0.5)",
                    },
                    labelPosition: "BottomRight",
                    labelTemplate: '<span style="font-size: 26px;">${label}</span>',
                }}
                palette={palette}
                style={{ width: '100%', height: '380px' }}
            />
        </StyledCardWrapper>
    );
};

export default WordTreeMapCard;

const StyledCardWrapper = styled(CardWrapper)`
    width: 100%;
    height: 380px;

    svg {
            width: 100%;
            object-fit: fill;
        }
`;
