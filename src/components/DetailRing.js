import React, {useState} from "react";
import styled from "styled-components";

import {Badge} from "@material-ui/core";
import List from "images/list.png";


const DetailRing = (props) => {

    const [Ringshowing, setRingShowing] = useState(false);
    const RingDetailShowing = () => setRingShowing(!Ringshowing);

    const [is_read, setIsRead] = React.useState(true);



if (Ringshowing) {
    return (
    <div>
        {/* <Badge color="#" variant="dot" invisible={is_read}/> */}
        <NotiBadge onClick={RingDetailShowing}  src={List}></NotiBadge>
        
        <RingDetail>
            <p><span style={{color :"red"}}>3분전</span> 최용현님과 채팅이 연결되었습니다. <br/> <a href="#">채팅하러가기</a></p>
            <hr/>
            <p><span style={{color :"red"}}>5분전</span> 최용현님과 거래성사 되었습니다.</p>
        </RingDetail>
    </div>
    );
} 
else {
    return (
        <div>
            <img onClick={RingDetailShowing}  src={List}/>
        </div>
    );
}
}
const RingDetail = styled.div`
z-index: 10;
position : absolute;
width  : 300px;
box-sizing : border-box;
background-color : #eee;
text-align : left;
`;

const NotiBadge = styled.img`

`;


export default DetailRing;