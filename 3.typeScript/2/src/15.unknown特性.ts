//一、unknown类型
//1、不能访问unknown类型上的属性，不能作为函数、类来使用
let a:unknown;
a = 1;

//2、联合类型中的unknown
type unionUnknown = string | unknown; //type unionUnknown = unknown

//3、交叉类型与unknown都是其他类型
type inter = string & unknown; //type inter = string


//二.unknown特性

//1、never是unknown的子类

type isNever = never extends unknown ? true : false //type isNever = true

//2、keyof unknown 是never
type key = keyof unknown; //type key = never

//3、unknown类型不能被遍历
type IMap<T> = {
    [P in keyof T]:number
}
type t = IMap<unknown>; //type t = {}
let p:t = {
    
}
export {}