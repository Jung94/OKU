import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SearchResult from "components/SearchResult";

const Result = (props) => {
  const keyword = useSelector((state) => state.result.keyword);

  return (
    <ResultContainer>
      <ResultText>
        <span>{keyword === "" ? "전체" : `"${keyword}"`} 검색 결과</span>
      </ResultText>
      <SearchResult history={props.history} />
    </ResultContainer>
  );
};

const ResultContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 1030px;
  height: 100%;
  gap: 10px;
  margin: 160px auto 20px auto;

  @media only screen and (max-width: 767px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 100%;
    width: 100%;
    height: 100%;
    gap: 10px;
    margin: 100px auto 100px;
  }

  @media only screen and (min-width: 1824px) {
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
  margin: 20px auto;
  text-align: center;

  & span {
    font-size: 1.25rem;
    font-weight: 700;
  }

  @media only screen and (max-width: 767px) {
    text-align: center;
    margin: 3rem 0 1.4rem;

    & span {
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

export default Result;
