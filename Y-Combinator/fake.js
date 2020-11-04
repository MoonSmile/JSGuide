function Y(F){
    var fGen=function(uglySelf){
        return function(n){
            return F(uglySelf(uglySelf),n);
        }
    }
    return fGen(fGen);
}
function fakeFactorial(self,n){
        if(n==2)return 2;
        else return n*self(n-1);Ô
}
var factorial = Y(fakeFactorial);
console.log(factorial(5));