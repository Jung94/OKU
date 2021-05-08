//아이디 체크 정규식
export const idCheck = (id) => {
  const _reg = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){6,}$/;
  return _reg.test(id);
};

//패스워드 체크 정규식
export const pwMacth = (pw) => {
  const _reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return _reg.test(pw) && pw.search(/\s/) === -1 ? true : false;
};

//이메일 체크 정규식
export const emailCheck = (email) => {
  let _reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return _reg.test(email);
};

//가격 콤마 정규식
export const priceComma = (price) => {
  return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

//가격 콤마 정규식(input)
export const input_priceComma = (price) => {
  return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//가격 콤마 정규식(input)
export const stringTo = (price) => {
  return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const KAKAO_JS_ID = "a6634d55e2a844f3e6e440e3d6fca337";
