let p = new Promise((resolve, reject) => {
    resolve(1000);
})
p.then(data => {
    console.log("success:" + data)
}).finally(() => {
    console.log("finally")
})

/*
    Promise.finally原理实现
    在Promise实例上挂载finally 方法
    p.finally(() => {})本质是一个then方法，所以在实现方法中要调用then方法
    入参f是一个函数，需要在then方法中执行这个函数
    使用Promise.resolve会等f()的函数执行完再返回结果，并将上一个then的value返回
    reject方法中需要抛出错误信息
*/
Promise.prototype.finally = function (f) {
    return this.then((value) => {
        // f(); return value;
        // Promise.resolve会等f()的函数执行完再返回结果
        return Promise.resolve(f()).then(() => value);
    }, (err) => {
        return Promise.resolve(f()).then(() => {
            throw err;
        });
    });
};