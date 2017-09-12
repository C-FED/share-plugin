// no-jq share-plugin
// init
;(function (w,d) {
    // common data
    var isCustomer=(typeof __config!="undefined")&&(__config instanceof Object);
    var COMMONDATA={
        "template":makeTemplate(["weibo","weixin","qq","qqzone","qqweibo","renren"])
    };
    if (isCustomer) {
        COMMONDATA["share"]=__config;
    }
    // make html
    function makeTemplate(arr) {
        // ["weibo","weixin"]
        var containerHTML='<div class="sharebox" id="shareBOX">';
        arr.forEach(function (item,index) {
            containerHTML+='<a href="javascript:void(0)" target="_blank" class="share-item '+item+'" data-type="'+item+'"></a>';
        });
        containerHTML+='</div>';
        return containerHTML;
    }
    // query dom  id
    function queryDOM(selector) {
        return d.getElementById(selector);
    }
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
    // 分发链接
    function setAnchorHref(anchorArr) {
        var urlData=makeShareURL(COMMONDATA["share"]);
        [].forEach.call(anchorArr,function (item,index) {
            if (item.dataset.type==="weixin") {
                item.onclick=function () {makeQcode(urlData["weixin"]);}; // todo
            } else {
                item.href=urlData[item.dataset.type];
            }
            console.log(item.href);
        });
    }
    // qcode 生成二维码
    function makeQcode(val) {
        // 导入qcode.js
        var script=d.createElement("script");
        var qcodeDIV=d.createElement("div");
        script.src="./js/qrcode.min.js";
        qcodeDIV.id="qrcode";
        d.body.appendChild(script);
        d.body.appendChild(qcodeDIV);
        // 生成qrcode

        //var qrcode=new QRCode(document.getElementById("qrcode"), val);
    }
    // 初始化插件
    function init() {
        // init default value
        if (!isCustomer) {
            COMMONDATA["share"]={
                "url":w.location.href,
                "title":d.getElementsByTagName("title")[0].innerHTML || "",
                "description":d.getElementsByName("description")[0].content || "",
                "pic":null,
                "appkey":null // temp
            };
        }
        // 初始化HTML结构和CSS样式
        var container=d.getElementById("shareArea") || d.body.appendChild(d.createElement("div"));
        container.innerHTML=COMMONDATA["template"];

        var shareBOX=d.getElementById("shareBOX");
        var shareItem=shareBOX.getElementsByClassName("share-item");
        // 初始化链接
        setAnchorHref(shareItem);

    }
    window.addEventListener("load",init,false);

}(window,document));