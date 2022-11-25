/*
 * @Author: jack.hai
 * @Date: 2022-11-23 14:05:56
 * @LastEditTime: 2022-11-23 14:08:53
 * @Description:
 */
import axios from "axios";
const CancelToken = axios.CancelToken;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.timeout = 10 * 60 * 60;
// axios.defaults.baseURL = process.env.BASE_URL;
