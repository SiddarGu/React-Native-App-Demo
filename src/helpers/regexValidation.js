const isEmailValid = email => {
  const isValid =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      email,
    );
  return isValid;
};

// 3-10 characters / dash / underscore
const isDisplayNameValid = displayName => {
  return  /^[a-zA-z0-9_-]{3,10}$/.test(displayName);
};

// at least 6 characters
const isPasswordValid = password => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
};

// Must be 5 digits
const isZipcodeValid = zipcode => {
  return /^[0-9]{5}$/.test(zipcode);
};

// Must be 10 digits
const isPhoneValid = phone => {
  return /^[0-9]{10}$/.test(phone);
};

export {
  isEmailValid,
  isDisplayNameValid,
  isPasswordValid,
  isZipcodeValid,
  isPhoneValid,
};
