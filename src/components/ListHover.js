import React, {useState} from 'react';
import List from "images/list.png";
import styled from "styled-components";

// 호버식
const ListHover = (props) => {

    const [Boxshowing, setBoxShowing] = useState(false);
    // 보이게
    const ShowBox = () => setBoxShowing(true);
    // 안보이게
    const HideBox = () => setBoxShowing(false);


    return (
        <Wrapper onClick={ShowBox} onClick={HideBox}> 
            <img src={List}/>
            { Boxshowing && 
            <CategoryBox>
            <_Left>
            <_Main>
                2D
            </_Main>
            <_Sub>
                3D
            </_Sub>
            </_Left>
            <_Right>
            <D_2>
                2D
            <ListBox>
                <Listing>
                    <p>피규어</p>
                    <p >피규어</p>
                    <p>피규어</p>
                </Listing>
            </ListBox>
            </D_2>
            <D_3>
                3D
            <ListBox>
            <Listing>
                <p>피규어</p> 
                <p style={{margin: "0 50px"}}>피규어</p> 
                <p>피규어</p> 
            </Listing>
            </ListBox>
            </D_3>
            </_Right>
        </CategoryBox>
        }
    </Wrapper>
    );
}

const Wrapper  = styled.div`
position : absolute;
z-index: 100;
border : 1px solid black;
`;
const CategoryBox = styled.div`
display :flex;
width  : 200px;
height : 100%;
box-sizing : border-box;
background-color : #eee;
`;
const _Left= styled.div`
`;
const _Right = styled.div`
width : 100%;
`;

const _Main = styled.div`
margin : 60px;
cursor : pointer;
`;

const _Sub = styled.div`
margin : 60px;
cursor : pointer;
`;
const D_2 = styled.div`
margin : 10px;
width : 100%;
`;
const D_3 = styled.div`
margin : 10px;
width : 100%;
`;
const ListBox = styled.div`
`;
const Listing = styled.div`
display : flex;
`;


export default ListHover;
