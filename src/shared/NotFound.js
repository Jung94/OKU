import React from "react";
import styled from 'styled-components';

const NotFound = (props) => {
    return (
        <Container>
            <h1>그런 페이지는 없습니다..</h1>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default NotFound;