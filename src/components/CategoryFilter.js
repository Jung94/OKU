import React, { useEffect }  from 'react';
import styled from "styled-components";

import PostCard from 'components/PostCard'
import { history } from "redux/configureStore";

import { useSelector, useDispatch } from "react-redux";

const CategoryFilter = () => {
    const dispatch = useDispatch();
    // const main_list = useSelector((state) => state.post.main_category);
    const sub_list = useSelector((state) => state.post.sub_category);
    console.log("❤❤❤",sub_list)
    return (
        <CategoryList>
      {sub_list.map((p, idx) => {
        return <PostCard key={idx} {...p} _onClick={() => {history.push(`product/detail/${p._id}`)}}/>;
      })}
    </CategoryList>
    )
};

const CategoryList = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
margin-top : 45px 0 ;
`;

export default CategoryFilter;
