import React from 'react';
import { useHistory } from "react-router-dom";

const { Kakao } = window;

const SocialLogin = (props) => {

    const history = useHistory()
    const kakaoLoginClickHandler = () => {
        Kakao.Auth.login({
            success: function (authObj) {
                console.log('authObj');
                // fetch(`http://3.35.137.38/login`, {
                //     method: "POST",
                //     body: JSON.stringify({
                //         access_token: authObj.access_token,
                //     }),
                // })
                // .then(res => res.json())
                // .then(res => {
                //     localStorage.setItem("Kakao_token", res.access_token);
                //     if(res.access_token) {
                //         alert("OKU에 오신걸 환영합니다!")
                //         history.push("/");
                //     }
                // })
            },
            fail: function(err) {
                alert(JSON.stringify(err))
            },
        })
    }

    return (
        <React.Fragment>
            <button onClick={kakaoLoginClickHandler}>카카오 로그인
            </button>
        </React.Fragment>
    )
}

export default SocialLogin;