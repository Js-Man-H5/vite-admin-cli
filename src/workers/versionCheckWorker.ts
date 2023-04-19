/*
 * @Author: jack.hai
 * @Date: 2023-04-10 16:26:20
 * @LastEditTime: 2023-04-11 09:46:48
 * @Description:
 */
if (self) {
    self.onmessage = (e) => {
        self.postMessage(e.data);
    };
    self.onmessageerror = (e) => {
        self.close();
        console.error("worker异常", e);
    };
}
