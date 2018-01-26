class Calc<T>{
	a:T;
	b:T;
}

let obj = new Calc<number>();   // 这个 number 回去替换 T，相当于传参


obj.a = 10;    // OK


