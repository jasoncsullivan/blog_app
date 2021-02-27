import axios from "axios";
import { NGROK_SERVER } from "@env";

export default axios.create({
  baseURL: NGROK_SERVER,
});
