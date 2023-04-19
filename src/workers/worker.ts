/*
 * @Author: jack.hai
 * @Date: 2023-04-10 14:47:36
 * @LastEditTime: 2023-04-19 16:16:40
 * @Description:
 */
import fs from "fs";
import path from "path";

// 创建文件
export const getVersion = () => {
    const createPath = path.resolve(__dirname, "../../public/version.txt");
    const version = new Date().getTime().toString();
    const data = fs.writeFileSync(createPath, version);
    if (data === undefined) {
        console.log("The version number is updated!");
    }
    return version;
};
