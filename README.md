# share-plugin  

Author:Yangfan2016  
Theme:share-plugin    
PS:IE9+   

------------------------

## 引入文件  

1. 引入css文件  
  

```html

<link rel="stylesheet" href="./css/share.min.css" />

```


2. 引入js文件（** 注意js的引用顺序 **） 

    1. 不使用微信分享  

    ```html  

    <script type="text/javascript" src="./js/share.min.js"></script>

    ```

    2. 使用微信分享  

    ```html  

    <script type="text/javascript" src="./js/qrcode.min.js"></script>
    <script type="text/javascript" src="./js/share.js"></script>

    ```



3. 使用

    1. 初始化

    ```js

    // 不传info参数时，默认取页面meta title location 作为分享信息
    var share=new Share({
        el:document.getElementById("shareArea"),
        bounds:["weibo","weixin","douban","qqweibo","googleplus"],
    });


    // 或者完整配置好参数
    var share2=new Share({
        el:document.getElementById("shareArea2"),  // 分享容器 DOM
        bounds:["weibo","qq","douban","facebook","googleplus"], // 分享的平台范围
        info:{ // 分享的信息
            url:"http://www.taobao.com",
            title:"taobao",
            description:"我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述",
            pic:"https://www.baidu.com/img/bd_logo1.png"
        }
    });

    ```

    2. 动态修改分享信息

    ```js

    share.makeShare({
        url:"http://www.baidu.com",
        title:"你好标题",
        description:"我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述",
        pic:"https://www.baidu.com/img/bd_logo1.png"
    });

    ```
4. 参数

<table>
        <thead>
            <tr>
                <td>参数</td>
                <td>类型</td>
                <td>注释</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>el</td>
                <td>DOM</td>
                <td>分享插件的容器</td>
            </tr>
            <tr>
                <td>bounds</td>
                <td>Array</td>
                <td>分享平台的范围 ["weibo","weixin","qq","qqzone","qqweibo","renren","douban","facebook","googleplus"]</td>
            </tr>
            <tr>
                <td>info</td>
                <td>Object</td>
                <td>分享的信息 {url,title,description,pic}</td>
            </tr>
        </tbody>
    </table>

5. 声明

LISCENCE:MIT   

DEPEND: QRCode [https://davidshimjs.github.io/qrcodejs/](https://davidshimjs.github.io/qrcodejs/)  
