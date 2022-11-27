/*
 * @Author: jack.hai
 * @Date: 2022-11-26 17:53:12
 * @LastEditTime: 2022-11-26 18:23:01
 * @Description:
 */
const test = () => {
    onMounted(() => {
        console.log("userInfo ");
    });
    const userInfo = ref("我是hooks");
    return {
        userInfo,
    };
};
export default test;
