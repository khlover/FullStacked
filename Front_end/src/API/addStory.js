import axios from "axios";
export const baseUrl = "http://localhost:8000/stories/";
//export const baseUrl = "http://18.116.8.86:8000/stories/";

export const AddStory = async (title, story, token) => {
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = {
    story: story,
    title: title,
  };

  const result = await axios.post(baseUrl, data, headers);
  return result.status;
};

export default AddStory;

//Currently there is no way to upload an image to the server so we are ommiting them for now.
