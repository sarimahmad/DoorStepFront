const checkEmail = email => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.length == 0 || reg.test(email) === false) {
    return false;
  } else {
    return true;
  }
};
const checkPassword = password => {
  if (password.length == 0 || password.length < 3) {
    return false;
  } else {
    return true;
  }
};
const checkrequired = username => {
  if (username.length == 0 || username.length < 3) {
    return false;
  } else {
    return true;
  }
};

const check_Country_Code = code =>{
  if(code.length === 3 && code[0]=="+"){
    return true
  }
  else{
    return false
  }
}
const check_Phone_Required = number => {
  if (number.length === 13 || number.length === 11) {
    return true;
  } else {
    return false;
  }
};

export default {checkEmail, check_Phone_Required,checkPassword, checkrequired, check_Country_Code};
