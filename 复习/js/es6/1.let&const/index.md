## let与var

### 1.var 在for循环中有异步的执行情况

```javascript
    console.log('var验证')
    for(var j=0;j<10;j++){
      console.log('var',j)
        setTimeout(()=>{
          console.log(j)
        })
      }
      console.log(j,'jj--->')

```

运行结果

![](https://cdn.jsdelivr.net/gh/zhangtingpipizhu/imgs/img/20211110171500.png)

分析：代码会执行同步操作，而



###  const
const为常量，不会改变的量（地址不变即可）

