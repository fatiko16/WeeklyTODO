export const errorMessageHandler = (errorMessage) => {
  switch (errorMessage) {
    case "EMAIL_EXISTS":
      return "Email already is being used by another account";
    case "OPERATION_NOT_ALLOWED":
      return "Password sign in is disabled for the project";
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "Too many attempts, cool a little then come later";
    case "EMAIL_NOT_FOUND":
      return "Email or password is not correct";
    case "INVALID_PASSWORD":
      return "Email or password is not correct";
    case "USER_DISABLED":
      return "This user is disabled";
    default:
      return "Something went wrong which we dont have enough details yet, please try later";
  }
};
