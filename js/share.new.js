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

    // class
    function Share(config) {
        this.config=config;
        this.init();
        return this;
    }

    Share.prototype.init=function () {
        // 生成HTML结构
        var html=makeTemplate(this.config.bounds,this.config.info);
        // 插入到DOM中
        document.getElementById(this.config.el).innerHTML=html;
        // 回调
        if (typeof this.config.callback === "function") {
            var node=this.config.callback(this.config.info.url);
            weixinHover(node.weixin,node.qrcode);
        }
        
    };

    return Share;
}(window));