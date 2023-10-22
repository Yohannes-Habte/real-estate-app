// Validate Email
export const validateEmail = (email) => {
  const validEmail = email.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return validEmail;
};

// Validate password
export const validatePassword = (password) => {
  const validPassword = password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  return validPassword;
};

// Cloudnary
export const cloud_name = process.env.REACT_APP_CLOUD_NAME;
export const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
export const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

// Backend URL
export const url = process.env.REACT_APP_BACKEND_URL;

