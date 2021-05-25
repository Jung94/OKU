import React from 'react';
import _ from 'lodash'

const InfinityScroll = (props) => {
    const {callNext, is_next, loading} = props;

    const HandleScroll = _.throttle (() => {
        // 사이트 내부 height
        const {innerHeight} = window;
        // 스크롤 전체 height
        const {scrollHeight} = document.body
        // 스크롤 내린부분 윗 스크롤 부분 전체
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if (scrollHeight - innerHeight - scrollTop < 200){
            callNext();
        }
    }, 300);


    React.useEffect(() => {
        if (!is_next){
            window.addEventListener("scroll", HandleScroll);
        } else {
            window.addEventListener("scroll", HandleScroll);
        }

        return () => window.removeEventListener('scroll', HandleScroll);
    }, [is_next]);

    return (
        <>
            {props.children}
        </>
    );
};

export default InfinityScroll