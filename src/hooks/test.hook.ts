/*
 * @Author: jack.hai
 * @Date: 2022-11-26 17:53:12
 * @LastEditTime: 2022-11-26 18:06:09
 * @Description:
 */
const test = () => {
    onMounted(() => {
        console.log("test测试 ");
    });
    const name = ref("我是hooks");
    return {
        name,
    };
};
export default test;
