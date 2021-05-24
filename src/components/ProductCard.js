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
                <span>{title}</span>
                <div>
                    <Img></Img>
                    <div>
                        <Price>{lowBid}</Price>
                        <Won>원</Won>
                    </div>
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
    width: 179px;
    height: 242px;
    padding: 0 1px 0 0;
    background-color: #eee;
    cursor: pointer;
    border-radius: 15px;

    @media only screen and (min-width : 1824px) {
        width: 299px;
        height: 404px;
    }
`;

const Poster = styled.div`
    width: 180px;
    height: 179px;

    background: url(${(props) => (props.url)}) no-repeat center;
    background-size: cover;
    border-top: 0.5px solid rgba(0, 0, 0, 0.05);
    border-left: 0.5px solid rgba(0, 0, 0, 0.05);
    border-right: 0.5px solid rgba(0, 0, 0, 0.05);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    @media only screen and (min-width : 1824px) {
        width: 299px;
        height: 300px;
    }
`;

const Img = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 15px;
    background: #ae27ff;
    margin: 0 8px 0 0

    @media only screen and (min-width : 1824px) {
        width: 27px;
        height: 27px;
    }
`;

const Price = styled.div`
    // border: 1px solid red;
    // display: inline-block;
    height: 14px;
    background-color: transparent;
    margin: 0 2px 7px 0;
    padding: 0 0 2px;
    font-size: 14px;
    font-weight: bold;

    @media only screen and (min-width : 1824px) {
        font-size: 22px;
        height: 28px;
    }
`;

const Won = styled.div`
    // border: 1px solid red;
    width: 10px;
    height: 15px;
    padding: 1px 0 0;
    background-color: transparent;
    font-size: 12px;
    font-weight: bold;

    @media only screen and (min-width : 1824px) {
        width: 20px;
        height: 30px;
        font-size: 19px;
    }
`;

const Desc = styled.div`
    // border: 1px solid red;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    color: #2e2e2e;
    margin: 8px 0 0;
    padding: 2px 14px 0;
    
    & > span {
        // border: 1px solid black;
        display: block;
        font-size: 14px;
        font-weight: 500;
        width: 149px;
        height: 20px;
        // padding: 0 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    & > div {
        display: flex;
        gap: 8px;
        align-items: center;
        // border: 1px solid black;

        & > div {
            display: flex;
            alignItems: center;
            padding: 4px 0 0;
            // border: 1px solid red;
        }
    }

    @media only screen and (min-width : 1824px) {
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
    }
`;

export default ProductCard;