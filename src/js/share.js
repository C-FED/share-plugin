/**
 * @author: Yangfan2016
 * @ctime: 2017-09-12
 * @utime: 2017-09-13
 * @depend: qrcode.js
 * @version: 1.0.2
 * [share-plugin]
 * @return {[Share]} [description]
 */
;(function () {
    var QRCode=window.QRCode;
    // 生成分享URL
    function makeShareURL(shareData) {
        var URL=encodeURIComponent(shareData.url);
        var TITLE=encodeURIComponent(shareData.title);
        var PIC=encodeURIComponent(shareData.pic);
        var DESCRIPTION=encodeURIComponent(shareData.description) || "";

        return {
            "weibo":"http://v.t.sina.com.cn/share/share.php?url="+URL+"&title="+TITLE+"   "+DESCRIPTION+"&pic="+PIC,
            "weixin":shareData.url, // temp
            "qq":"http://connect.qq.com/widget/shareqq/index.html?url="+URL+"&title="+TITLE+"&pics="+PIC,
            "qqzone":"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+URL+"&title="+TITLE+"&pics="+PIC+"&summary="+DESCRIPTION,
            "renren":"http://widget.renren.com/dialog/share?resourceUrl="+URL+"&srcUrl="+URL+"&title="+TITLE+"&pic="+PIC+"&description="+DESCRIPTION,
            "qqweibo":"http://share.v.t.qq.com/index.php?c=share&a=index&title="+TITLE+"   "+DESCRIPTION+"&url="+URL+"&appkey=ce15e084124446b9a612a5c29f82f080&site=www.jiathis.com&pic="+PIC,
            "douban":"https://www.douban.com/share/service?image="+PIC+"&href="+URL+"&name="+TITLE+"&text="+DESCRIPTION,
            "googleplus":"https://plus.google.com/share?url="+URL+"&t="+TITLE,
            "facebook":"https://www.facebook.com/sharer.php?s=100&p[title]="+TITLE+"&p[summary]="+DESCRIPTION+"&p[url]="+URL+"&p[images]="+PIC
        };
    }
    // make html
    function makeTemplate(arr,shareData) {
        // ["weibo","weixin"]
        var urlData=makeShareURL(shareData);
        var containerHTML='<div class="sharebox">';
        arr.forEach(function (item,index) {
            if (item==="weixin") {
                containerHTML+='<a onclick="return false;" href="javascript:void(0);" target="_blank" class="share-item '+item+'" data-type="'+item+'"></a>';        
            } else {
                containerHTML+='<a href="'+urlData[item]+'" target="_blank" class="share-item '+item+'" data-type="'+item+'"></a>';        
            }
        });
        containerHTML+='</div>';
        return containerHTML;
    }
    // hover weixin qrcode  show or hide
    function weixinHover(weixin,qrcode) {
        weixin.addEventListener("click",function () {
            qrcode.style.display="block";
        },false);
        qrcode.addEventListener("click",function () {
            qrcode.style.display="none";
        },false);
    }
    // makeQRCode
    function makeQRCode(that) {
        var qrNode=that.el.querySelectorAll(".qrcode")[0];
        var weixinNode=that.el.querySelectorAll(".weixin")[0];
        qrNode.innerHTML='<p class="title">微信扫一扫 | 点击关闭</p>';
        var qr=new QRCode(qrNode,that.config.info.url); 
        weixinHover(weixinNode,qrNode);
    }
    
    // class
    function Share(config) {
        var that=this;
        this.config=config;
        this.el=this.config.el;
        // 加入qrcode结构
        var div=document.createElement("div");
        div.className="qrcode";
        div.style.cssText="display:none";
        this.el.appendChild(div);
        // init
        this.init();
        return this;
    }

    Share.prototype.init=function () {
        var that=this;
        var html='';
        var info={};
        // 生成HTML结构
        // 判断是否有分享信息
        if (typeof that.config.info==="object") {
            html=makeTemplate(that.config.bounds,that.config.info);
        } else {
            // 默认用页面的head信息
            info={
                url:window.location.href,
                title:document.title,
                description:document.getElementsByName("description")[0]["content"]
            };
            html=makeTemplate(that.config.bounds,info);
            // 存储到类
            that.config.info=info;
        }
        // 插入到DOM中
        that.el.querySelectorAll(".sharebox")[0] && that.el.removeChild(that.el.querySelectorAll(".sharebox")[0]);
        that.el.innerHTML+=html;
        // 判断是否需要qrcode
        if (that.config.bounds.indexOf("weixin")!=-1) {
            makeQRCode(that);
        }
    };
    Share.prototype.makeShare=function (info) {
        var that=this;
        // 替换原来的信息
        that.config.info=info;
        // 刷新
        that.init();
    };
    window.Share=Share;
}(window));