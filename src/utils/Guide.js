import axios from "axios";
import Config from "../Config";

console.log("son", Config.baseUrl);
export default axios.create({
    baseURL: Config.baseUrl
});