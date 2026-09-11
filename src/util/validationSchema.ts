export const createUserValidationSchema = {
  username: {
    isLength: {
      option: { min: 3, max: 20 },
      errorMessage: "Username must be between 3 and 20 characters long",
    },
    notEmpty: {
      errorMessage: "Username is required",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Invalid email address",
    },
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
};
