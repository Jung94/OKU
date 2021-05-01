import React from "react";
import styled from "styled-components";
import { Title, Image, Currentprice } from "components/Container";

import T_1 from "images/T_1.jpg";
import T_2 from "images/T_2.jpeg";
import T_3 from "images/T_3.jpg";
import T_4 from "images/T_4.jpg";
import T_5 from "images/T_5.jpeg";
import T_6 from "images/T_6.jpeg";
import T_7 from "images/T_7.jpg";

// 최신등록상품 리스트
const Card = (props) => {
  const { title, img, currentprice, desc } = props;

  return (
    <Box>
      <h2>실시간 등록상품</h2>
      <Grid>
        <Information>
          <Image width="300px" height="300px" margin="40px 10px;">
            <img src={img} />
          </Image>
          <Desc>
            <Title>{title}</Title>
            <Currentprice>{currentprice}</Currentprice>
          </Desc>
        </Information>
        <Information>
          <Image width="300px" height="300px" margin="40px 10px;">
            <img src={img} />
          </Image>
          <Desc>
            <Title>{title}</Title>
            <Currentprice>{currentprice}</Currentprice>
          </Desc>
        </Information>

        <Information>
          <Image width="300px" height="300px" margin="40px 10px;">
            <img src={img} />
          </Image>
          <Desc>
            <Title>{title}</Title>
            <Currentprice>{currentprice}</Currentprice>
          </Desc>
        </Information>
      </Grid>
    </Box>
  );
};

Card.defaultProps = {
  img: `${T_1}`,
  title: "프라이탁 아이패드 파우치",
  currentprice: "198,000원",
};

const Box = styled.div`
  margin: 30px auto;
  max-width: 1030px;
  background: #eee;
`;
const Information = styled.div`
  margin: auto;
`;

const Grid = styled.div`
  display: flex;
`;

const Desc = styled.div`
  margin: -30px 0 10px 10px;
`;

export default Card;
