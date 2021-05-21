//패스워드 체크 정규식  https://beagle-dev.tistory.com/114
export const pwMacth = (pw) => {
  const _reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const __reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
  return reg.test(pw) && pw.search(/\s/) === -1 ? true : false;
};

//이메일 체크 정규식
export const emailCheck = (email) => {
  let _reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return _reg.test(email);
};

//닉네임 체크 정규식  https://rubberduck-debug.tistory.com/82
export const nicknameCheck = (nickname) => {
  const _reg = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
  const reg = /^[a-z0-9_-]{2,10}$/;
  return reg.test(nickname);
};

//가격 콤마 정규식(input)
export const input_priceComma = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
};

// https://blog.naver.com/crazyb/220743863861
export const comma = (str) => { 
    str = String(str); 
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'); 
};

// https://blog.naver.com/crazyb/220743863861
export const uncomma = (str) => { 
    str = String(str); 
    return str.replace(/[^\d]+/g, ''); 
};


