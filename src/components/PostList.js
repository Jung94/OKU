import React from 'react;
import styled from 'styled-components';


import Post from 'components/Post'

const PostList = ()=> {
    return(
        <ListGrid>
            {/* {data.map((i, idx) => {
            return <Post {...i} key={idx} />;
        })}      */}
        </ListGrid>
    )
}

const ListGrid = styled.div`
display : flex;

`;

export default PostList;