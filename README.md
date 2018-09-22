## share-plugin
This is share plugin

![share-plugin-icons](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/share-plugin-icons%200.png)

![share-plugin-weibo.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/share-plugin-weibo.JPG)
![share-plugin-douban.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/share-plugin-douban.JPG)
![share-plugin-qqzone.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/share-plugin-qqzone.JPG)
![share-plugin-renren.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/share-plugin-renren.JPG)
![share-plugin-weixin.JPG](https://raw.githubusercontent.com/Yangfan2016/PicBed/master/Blog/share-plugin-weixin.JPG)

### Example

check this file `index.html`

### Run

```html
<!-- 引入css样式 -->
<link rel="stylesheet" href="./src/css/share.min.css" />
<!-- 可选 （需要微信分享时，需要引入此文件） -->
<script type="text/javascript" src="./src/libs/qrcode.min.js"></script>
<!-- 引入share脚本 -->
<script type="text/javascript" src="./dist/Share.min.js"></script>
```
```js
// 初始化
var share = new Share("#shareArea", {
            bounds: ["weibo", "weixin", "douban", "googleplus"],
        });

// 更新信息
share.makeShare({
    url:"http://www.baidu.com",
    title:"你好标题",
    description:"我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述",
    pic:"https://www.baidu.com/img/bd_logo1.png"
});

```


### API


#### Arguments 

<table style="width:100%">
    <thead>
        <tr>
            <th>参数</th>
            <th>类型</th>
            <th>说明</th>
        </tr>            
    </thead>
    <tbody>
        <tr>
            <td>selector</td>
            <td>string</td>
            <td>css选择器</td>
        </tr>
        <tr>
            <td>config</td>
            <td>object</td>
            <td>配置选项，具体看下表</td>
        </tr>
    </tbody>
</table>


#### config

<table style="width:100%">
    <thead>
        <tr>
            <th>参数</th>
            <th>类型</th>
            <th>说明</th>
        </tr>            
    </thead>
    <tbody>
        <tr>
            <td>bounds</td>
            <td>string[]</td>
            <td>分享列表 目前支持9种方式 ["weibo","weixin","qq","qqzone","renren","qqweibo","douban","googleplus","facebook"]</td>
        </tr>
        <tr>
            <td>info</td>
            <td>object</td>
            <td>参见下面表格</td>
        </tr>
    </tbody>
</table>

#### info

<table style="width:100%">
    <thead>
        <tr>
            <th>参数</th>
            <th>类型</th>
            <th>说明</th>
        </tr>            
    </thead>
    <tbody>
        <tr>
            <td>url</td>
            <td>string</td>
            <td>分享网址，默认取当前网页的地址</td>
        </tr>
        <tr>
            <td>title</td>
            <td>string</td>
            <td>分享标题，默认取当前网页的标题</td>
        </tr>
        <tr>
            <td>description</td>
            <td>string</td>
            <td>分享描述，默认取当前网页的meta description</td>
        </tr>
        <tr>
            <td>pic</td>
            <td>string</td>
            <td>分享图片链接</td>
        </tr>
    </tbody>
</table>



### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT license
Copyright (c) 2018 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
![docor]()
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0
