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
        <CategorySelect/>
    </CategorySelect>
    );
};

const CategorySelect = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
max-width: 1030px;
height: 100%;
margin: 117px auto;
barder: 1px solid #000;
`;

const ResultText = styled.div`
text-align: center;
margin 3rem 0;

& span {
    font-size: 1.25rem;
    font-weight: 700;
}
`;


export default CategoryResult;