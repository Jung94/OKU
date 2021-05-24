import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import CategoryFilter from 'components/CategoryFilter'

const CategoryResult = (props) => {
    const mainCategory = useSelector((state) => state.post.mainKeyword);
    const subCategory = useSelector((state) => state.post.subKeyword);

    return (
        <CategorySelect>
            <ResultText>
                <span>{`"${mainCategory},  ${subCategory}"`} 필터링 결과</span>
            </ResultText>
            <CategoryFilter/>
            {/* <CategorySelect/> */}
        </CategorySelect>
    );
};

const CategorySelect = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 1030px;
    height: 100%;
    gap: 10px;
    margin: 170px auto 100px;

    @media only screen and (max-width : 767px) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 100%;
        width: 100%;
        height: 100%;
        gap: 10px;
        margin: 100px auto 100px;
    }

    @media only screen and (min-width : 1824px) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 1030px;
        height: 100%;
        gap: 50px;
        margin: 200px auto 100px;
    }
`;

const ResultText = styled.div`
    text-align: center;
    margin: 3rem 0;

    & span {
        font-size: 1.25rem;
        font-weight: 700;
    }

    @media only screen and (max-width : 767px) {
        text-align: center;
        margin: 3rem 0 1.4rem;

        & span {
        font-size: 14px;
        font-weight: 500;
        }
    }
`;


export default CategoryResult;