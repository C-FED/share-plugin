;(function () {
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
        var containerHTML='<div class="sharebox" id="shareBOX">';
        arr.forEach(function (item,index) {
            if (item==="weixin") {
                containerHTML+='<a href="javascript:void(0);" target="_blank" class="share-item '+item+'" data-type="'+item+'"></a>';        
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
    var __isNeed=true;
    var QRS=null;

    // class
    function Share(config) {
        this.config=config;
        this.el=document.getElementById(this.config.el);
        this.init();
        return this;
    }

    Share.prototype.init=function () {
        var that=this;
        // 生成HTML结构
        var html=makeTemplate(that.config.bounds,that.config.info);
        // 插入到DOM中
        that.el.innerHTML+=html;
        // 判断是否需要qrcode
        if (that.config.bounds.indexOf("weixin")!=-1) {
            // 加入QRcode结构
            var div=document.createElement("div");
            div.className="qrcode";
            div.style.cssText="display:none";
            div.innerHTML='<p class="title">微信扫一扫 | 点击关闭</p>';
            that.el.appendChild(div);
            // 防止重复引入js
            if (__isNeed) {
                QRS=document.createElement("script");
                QRS.src="./js/qrcode.min.js";
                QRS.id="QRS";
                document.head.appendChild(QRS);
                __isNeed=false;
            }
            // js loaded
            QRS.addEventListener("load",function () {
                var qrNode=that.el.querySelectorAll(".qrcode")[0];
                var weixinNode=that.el.querySelectorAll(".weixin")[0];
                new QRCode(qrNode,that.config.info.url);    
                weixinHover(weixinNode,qrNode);
            },false);
        }
    };
    window.Share=Share;
}(window));