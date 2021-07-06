import axios from "axios";
export const baseUrl = "http://localhost:8000/stories";
//export const baseUrl = "http://18.116.8.86:8000/stories/";

export const GetMyStackCall = async (token) => {
  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  let tempArr = [];

  const result = await axios.get(baseUrl, headers).then(({ data }) => data);
  let count = 0;
  const limit = Object.keys(result).length;

  while (count < limit) {
    tempArr.push([]);
    tempArr[count].push(result[count].row_to_json.id);
    tempArr[count].push(result[count].row_to_json.email);
    tempArr[count].push(result[count].row_to_json.picture);
    tempArr[count].push(result[count].row_to_json.title);
    tempArr[count].push(result[count].row_to_json.story);
    tempArr[count].push(result[count].row_to_json.date);
    count++;
  }

  return tempArr;
};
export default GetMyStackCall;
