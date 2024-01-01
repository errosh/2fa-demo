import axios from "axios";

//const baseURL = "http://localhost:8000/api";
const baseURL = "https://innovativear.tech/api";


async function HttpRequest(url, method='GET',data = [],headers = {}) {
  try {
    const response = await axios({
      method,
      baseURL,
      url: url,
      headers,
      data
    });
  
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export { HttpRequest };
