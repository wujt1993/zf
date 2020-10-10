/**
 * buffer的大小是固定的
 * 以十六进制的方式存储数据
 * 每个元素的最大值为2 ^ 8 - 1 = 255
 * 超过255则256取模
 */

let buffer1 = Buffer.alloc(6);
buffer1[0] = 10;
buffer1[1] = 255;
buffer1[2] = 257;
buffer1[10] = 1;
console.log(buffer1) //<Buffer 0a ff 01 00 00 00>


/**
 * source.copy(target, position, start, end)
 * 
 */
let buffer2 = Buffer.from("珠峰");
let buffer3 = Buffer.from("培训");
let buffer4 = Buffer.alloc(12);
buffer2.copy(buffer4, 0, 0, 6);
buffer3.copy(buffer4, 6, 0, 6);
console.log(buffer4.toString())

/**
 * concat([buffer1, buffer2, ...], length)
 */
console.log(Buffer.concat([buffer2, buffer3], 9).toString())
