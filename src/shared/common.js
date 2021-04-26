//아이디 체크 정규식
export const idCheck = (id) => {
  const _reg =/^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){6,}$/
  return _reg.test(id);
}

//패스워드 체크 정규식
export const pwMacth = (pw) => {
  const _reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return  _reg.test(pw) && pw.search(/\s/) === -1 ?true:false;

}

//이메일 체크 정규식
export const emailCheck = (email) => {
  let _reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return _reg.test(email);

}