import React, { useEffect } from 'react';
import styled from 'styled-components';
// import InfinityScroll from 'shared/InfinityScroll';
import ProductCard from 'components/ProductCard';
// import { actionCreators as movieActions } from 'redux/modules/movie';
// import { actionCreators as productActions } from 'redux/modules/result';
import { useSelector, useDispatch } from 'react-redux';
import { input_priceComma } from 'shared/common';

const SearchResult = (props) => {
    const dispatch = useDispatch();
    const search_list = useSelector((state) => state.result.search);
    // const is_last = useSelector((state) => state.movie.search.last);
    
    const history = props.history;

    // const scroll = () => {
    //     dispatch(productActions.getMoiveScroll());
    // };

    useEffect(() => {
        console.log(search_list);
    }, [search_list]);

    return (
        <ProductList>
            {search_list.map((p, idx) => {
                let real = input_priceComma(`${p.lowBid}`);
                return(
                    <ProductCard key={idx} title={p.title} url={p.img[0]} lowBid={real}/>
                );
            })}
        </ProductList>
    );
};

const ProductList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
    gap: 65px;
`;

export default SearchResult;