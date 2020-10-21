Function.prototype.my_bind = function() {
    var self = this, // 保存原函数
      context = Array.prototype.shift.call(arguments), // 保存需要绑定的this上下文
      // 上一行等价于 context = [].shift.call(arguments);
      args = Array.prototype.slice.call(arguments); // 剩余的参数转为数组
    return function() { // 返回一个新函数
      self.apply(context, Array.prototype.concat.call(args, Array.prototype.slice.call(arguments)));
    }
  }

function a(...values) {
  console.log(this.name + ':' + values);
}

var b = {
  name: 'demo'
};

a.my_bind(b, 2, 3)(5,7); // demo 2 3 5