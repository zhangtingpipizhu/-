## 1.展开运算符（...）

### (1)数组拼接

```javascript
    //数组拼接
    let arr1=[1,2]
    let arr2=[3,4]
    let arr3=[...arr1,...arr2]
    console.log(arr3,'数组-----》')
```

输出结果

![](https://cdn.jsdelivr.net/gh/zhangtingpipizhu/imgs/img/20211111160336.png)

### (2)对象拼接

```javascript
  const obj1={name:'hh'}
    const obj2={age:12}
    const obj3={...obj1,...obj2}//当前拷贝为浅拷贝，深层次的对象或数组只是拷贝了指针
    console.log(obj3,'obj---->')
```
输出结果
![image-20211111161033325](/Users/zhangting/Library/Application Support/typora-user-images/image-20211111161033325.png)
## 2.浅拷贝
### （1）展开运算符
### （2）Object.assign()


## 3.实现深拷贝的方法
### （1）JSON.stringfy()

存在的弊端：
### （2）自己实现一个深拷贝



## 3.set
set 添加和删除（add，delete）,has(存在）
### （1）并集 
### （2）交集
### （3）差集

## 4.map (map是有key的不能重复放置)
set(key,value)


WeakMap()



