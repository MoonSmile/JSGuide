function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}

function throttle(func, wait) {
    let previous = 0;
    return function() {
        let now = Date.now();
        console.log(previous, now, now - previous)
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

function test() {
    console.log(6666)
}
const demo = throttle(test,500)
for(let i = 0; i < 5; i ++)
{
    setTimeout(() => {
        demo()
    }, 200 * i);
    
}
