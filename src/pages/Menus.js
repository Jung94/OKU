import React from 'react';
import styled from "styled-components";
import Myshop from 'components/mypage/Myshop';
import Mystore from 'components/mypage/Mystore';
import Myalert from 'components/mypage/Myalert';
import Myinfo from 'components/mypage/Myinfo';

//사용할 데이터.
const mydata = {
    shopping: {
        name: 'shopping',
        description:'마이 쇼핑'
    },
    store: {
        name: 'store',
        description: '내 상점'
    },
    alert: {
        name: 'alert',
        description:'알림'
    },
    info: {
        name: 'info',
        description: '회원 정보'
    },
};

const Menus = ({ match }) => {
    //match안에 들어있는 params 값 참조
    const { menu } = match.params;
    
    const profiledata = mydata[menu];
    if (!profiledata){
        //mydata에 있는 외의 값을 입력하면 존재하지 않는 유저입니다 출력.
        return <div>존재하지 않는 유저입니다.</div>
    }

    if (profiledata.name === 'shopping') {
        return (
            <Myshop />
        );
    }

    if (profiledata.name === 'store') {
        return (
            <Mystore />
        );
    }

    if (profiledata.name === 'alert') {
        return (
            <Myalert />
        );
    }

    if (profiledata.name === 'info') {
        return (
            <Myinfo />
        );
    }
};

export default Menus;