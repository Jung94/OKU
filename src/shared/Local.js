// local storage에서 가져오기
const getLocal = (name) => {
    localStorage.getItem(`${name}`);
}

// local storage에 저장하기
const setLocal = (name, value) => {
    localStorage.setItem(`${name}`, `${value}`);
}

// local storage에서 삭제하기
const deleteLocal = (name) => {
    localStorage.removeItem(`${name}`);
}

export {getLocal, setLocal, deleteLocal};