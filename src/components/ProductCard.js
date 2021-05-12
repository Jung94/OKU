import React from 'react';
import styled from 'styled-components';
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProductCard = (props) => {
    const { title, url, lowBid, _onClick } = props;

    const styles = {
        // margin : margin,
    };


    return(
        <Product {...styles} onClick={_onClick} >
            {/* <Detail>
                <FontAwesomeIcon icon={faSearch} />
            </Detail> */}
            <Poster url={url} />
            <Desc>
                <span style={{ padding: "0 25px" }}>{title}</span>
                <div style={{ display: "flex", alignItems: "center", padding: "0 25px", margin: "8px 0 0" }}>
                    <Img></Img>
                    <Price>{lowBid}</Price>
                    <Won>원</Won>
                </div>
            </Desc>
        </Product>
    );
};

ProductCard.defaultProps = {
    title : '',
    url : '',
};


const Product = styled.div`
    position: relative;
    width: 299px;
    height: 404px;
    background-color: #eee;
    cursor: pointer;
    // ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
    // margin: 0 44px 0 0;
    border-radius: 15px;
`;

const Poster = styled.div`
    width: 299px;
    height: 300px;

    background: url(${(props) => (props.url)}) no-repeat center;
    background-size: cover;
    border-top: 0.5px solid rgba(0, 0, 0, 0.05);
    border-left: 0.5px solid rgba(0, 0, 0, 0.05);
    border-right: 0.5px solid rgba(0, 0, 0, 0.05);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
`;

const Img = styled.div`
    width: 27px;
    height: 27px;
    border-radius: 15px;
    background: #ae27ff;
    margin: 0 6px 0 0
`;

const Price = styled.div`
    // width: 200px;
    display: inline-block;
    height: 28px;
    background-color: transparent;
    // border: 1px solid red;
    margin: 0 2px 7px 0;
    font-size: 22px;
    font-weight: bold;
`;

const Won = styled.div`
    width: 20px;
    height: 30px;
    background-color: transparent;
    font-size: 19px;
    font-weight: bold;
`;

const Desc = styled.div`
    width: 299px;
    height: 80px;
    display: flex;
    flex-direction: column;
    color: #2e2e2e;
    // border: 1px solid red;
    margin: 16px 0 0;
    
    & span {
        display: block;
        font-size: 20px;
        font-weight: bold;
        width: 299px;
        height: 30px;
        // border: 1px solid black;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

// const Detail = styled.div`
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 162, 199, 0.3);
//     border-radius: 10px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     opacity: 0;
//     transition: 0.3s;

//     & svg {
//         font-size: 2rem;
//     }

//     :hover {
//         opacity: 1;
//     }
// `;

export default ProductCard;