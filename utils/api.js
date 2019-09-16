import axios from "axios";

export default axios.create({
  baseURL: `https://nameless-reaches-72074.herokuapp.com/`
  //baseURL: `http://192.168.0.14:3000`
});
