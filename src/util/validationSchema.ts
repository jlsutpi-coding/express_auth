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
  displayName: {
    isLength: {
      option: { min: 2, max: 100 },
      errorMessage: "Display name must be between 2 and 100 characters long",
    },
    isString: {
      errorMessage: "Display name must be a string",
    },
  },
  password: {
    isLength: {
      option: { min: 6, max: 100 },
      errorMessage: "Password must be between 6 and 100 characters long",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
    isString: {
      errorMessage: "Password must be a string",
    },
  },
};
