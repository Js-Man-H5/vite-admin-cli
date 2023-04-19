/*
 * @Author: jack.hai
 * @Date: 2022-12-12 14:39:17
 * @LastEditTime: 2023-04-19 15:53:20
 * @Description:
 */
/**
 * @description: 字符串截取,每三位加逗号
 * @return {*}
 */
export const thousands = function (num: number) {
    // console.log(num)
    const n = Number(num);
    if (!isNaN(n)) {
        num = Math.floor(num * 100) / 100;
        const str = num.toString();
        const reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
        return str.replace(reg, "$1,");
    } else {
        return num;
    }
};
/**
 * @description: 分页二次封装
 * @param {Number} pageNo
 * @param {Number} pageSize
 * @param {Number} total
 * @param {Function} handlerPage
 * @return {*}
 */
export const pagination = (pageNo: number, pageSize: number, total: number, handlerPage: (pageNo: number, pageSize: number) => void) => {
    const params = {
        showQuickJumper: true,
        total: Number(total),
        onChange: (num: number, val: number) => {
            handlerPage(num, val);
        },
        hideOnSinglePage: Number(total) < 11,
        current: pageNo,
        pageSize: pageSize,
        showSizeChanger: true,
    };
    return params;
};

export const quitLogin = () => {
    location.href = import.meta.env.VITE_APP_BASE_LOGIN;
};

/**
 * @description: 获取uuid
 * @return {*}
 */
export const uuid = () => {
    const temp_url = URL.createObjectURL(new Blob());
    const uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf("/") + 1);
};

//过滤对象空字段
export const filterObjectEmpty = <T>(obj: T) => {
    for (const i in obj) {
        if (obj[i] === null || obj[i] === undefined || obj[i] === "") {
            delete obj[i];
        }
    }
    return obj;
};

/**
 * @description: select模糊查询
 * @param {string} input
 * @param {object} option
 * @return {*}
 */
export const filterOption = (input: string, option: { label: string; value: number }) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

/**
 * @description: 文件下载
 * @param {object} param1 fileName 下载文件名  blobType 文件类型 fileData 流文件
 * @return {*}
 */
export const downloadFile = function ({ fileName = "excel.xlsx", blobType = "application/vnd.ms-excel", fileData }: { fileName: string; blobType?: string; fileData: BlobPart }) {
    const blob = new Blob([fileData], { type: blobType }); //处理文档流
    const elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
};

/**
 * @description: 获取前n天日期
 * @return {*}
 */
export const getBeforeDate = function (day: number) {
    const myDate = new Date();
    myDate.setTime(myDate.getTime() - 24 * 60 * 60 * 1000);
    const lw = new Date((myDate as unknown as number) - 1000 * 60 * 60 * 24 * (day - 1));
    const lastY = lw.getFullYear();
    const lastM = lw.getMonth() + 1;
    const lastD = lw.getDate();
    const start = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD);
    return start;
};

/**
 * @description: 小数转百分位
 * @param {number} num
 * @param {*} length
 * @return {*}
 */
export function toFixed(num: number, length = 1) {
    const n = Number(num);
    return (n * 100).toFixed(length) + "%";
}

/**
 * @description 数据表格删除后无数据自动跳上页
 * @param {number} ids 删除条数
 * @param {number} total 总页数
 * @param {number} page 当前页码
 * @param {number} limit 当前页条数
 * @returns {number} 最新页码
 */
export function newsPage(ids: number, total: number, page: number, limit: number) {
    const delNum = Array.isArray(ids) ? ids.length : 1; // 删除条数
    const totalPage = Math.ceil((total - delNum) / limit); // 总页数
    const currentPage = page > totalPage ? totalPage : page; // 最新页码
    return currentPage < 1 ? 1 : currentPage; // 防止删空
}
