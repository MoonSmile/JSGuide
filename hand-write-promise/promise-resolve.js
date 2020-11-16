/*
    https://blog.csdn.net/u010982507/article/details/103806145
    Promise.resolve()方法实际上调用的是new Promise()并调用resolve方法。
    参考Promise源码：https://github.com/then/promise/tree/master/src
*/

Promise.resolve = function (value) {
    if (value instanceof Promise) return value;
    if (value === null) return null;
    // 判断如果是promise
    if (typeof value === 'object' || typeof value === 'function') {
        try {
            // 判断是否有then方法
            let then = value.then;
            if (typeof then === 'function') {
                return new Promise(then.call(value)); // 执行value方法
            }
        } catch (e) {
            return new Promise( (resolve, reject) =>{
                reject(e);
            });
        }
    }
    return value;
};