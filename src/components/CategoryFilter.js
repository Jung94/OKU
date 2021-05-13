import React, { useEffect }  from 'react';
import styled from "styled-components";

import PostCard from 'components/PostCard'
import { history } from "redux/configureStore";

import { useSelector, useDispatch } from "react-redux";

const CategoryFilter = () => {
    const dispatch = useDispatch();
    // const main_list = useSelector((state) => state.post.main_category);
    const sub_list = useSelector((state) => state.post.sub_category);
    return (
        <CategoryList>
      {sub_list.map((p, idx) => {
        return <PostCard key={idx} {...p}/>;
      })}
    </CategoryList>
    )
};

const CategoryList = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
`;

export default CategoryFilter;
