import axios from "axios";

export const baseUrl = "http://localhost:8000/login";
//export const baseUrl = "http://18.116.8.86:8000/login/";

export const logincall = async (email, password) => {
  let data = {
    email: email,
    password: password,
  };

  const results = axios
    .post(baseUrl, data)
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error);
    });
  return results;
};

export default logincall;
