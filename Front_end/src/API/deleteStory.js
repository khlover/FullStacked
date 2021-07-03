import axios from "axios";
export const baseUrl = "http://localhost:8000/stories/";
//export const baseUrl = "http://18.116.8.86:8000/stories/";

export const DeleteStory = async (id, token) => {
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fullUrl = baseUrl.concat(id);

  await axios.delete(fullUrl, headers);

  return 0;
};

export default DeleteStory;
