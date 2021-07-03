import axios from "axios";
export const baseUrl = "http://localhost:8000/stories/";
//export const baseUrl = "http://18.116.8.86:8000/stories/";

export const EditStory = async (title, story, img, id, token) => {
  console.log("the wrong trowswea");
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = {
    story: story,
    title: title,
    img: img,
  };

  const fullUrl = baseUrl.concat(id);

  const result = await axios.put(fullUrl, data, headers);
  console.log(result);
  return 0;
};

export default EditStory;
