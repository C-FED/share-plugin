
interface iShareData {
    url: string,
    title: string,
    pic?: string,
    description?: string
}

interface iShareUrl {
    [propName: string]: string
}

interface iShareConfig {
    bounds: Array<string>,
    info: iShareData
}


// helpers
function serialize(options: any): string {
    let list: any[] = [];
    for (let key in options) {
        list.push(`${key}=${options[key]}`);
    }
    return list.join("&");
}

// class
export class Share {
    el: any;
    config: iShareConfig;
    info: iShareData;
    QRCode: any;
    constructor(selector:string, config: iShareConfig) {
        this.el = document.querySelector(selector);
        this.config = config;
        this.info = Object.assign({}, config.info);
        this.QRCode =(window as any).QRCode;
        // 加入qrcode结构
        let div = document.createElement("div");
        div.className = "qrcode";
        div.style.cssText = "display:none";
        this.el.appendChild(div);
        // init
        this.init();
        return this;
    }
    init(options?: iShareData) {
        let html = '';
        let tempEle = document.createElement("div");
        let info: iShareData;

        if (options) {
            info = Object.assign({}, options);
        } else {
            let headMetaDescription: HTMLElement = document.getElementsByName("description")[0];
            info = Object.assign({
                url: window.location.href,
                title: document.title,
                description: (headMetaDescription === void 0) ? "" : (headMetaDescription as any).content,
            }, this.config.info);
        }

        this.info = Object.assign({}, info);

        // 生成HTML结构
        html = this.makeTemplate(this.config.bounds, info);
        tempEle.className = "sharebox";
        tempEle.innerHTML = html;
        // 插入到DOM中
        this.el.querySelectorAll(".sharebox")[0] && this.el.querySelectorAll(".sharebox")[0].remove();
        this.el.appendChild(tempEle);
        // 判断是否需要qrcode
        if (this.config.bounds.includes("weixin")) {
            this.makeQRCode();
        }
    }
    makeShare(info: iShareData) {
        // 刷新
        this.init(info);
    }
    // makeQRCode
    makeQRCode() {
        let QRCode = this.QRCode;
        if (!QRCode) {
            console.error('This method need qrcode.js');
            return;
        }
        let qrNode = this.el.querySelector(".qrcode");
        let weixinNode = this.el.querySelector(".weixin");
        if (!qrNode || !weixinNode) return;
        qrNode.innerHTML = '<p class="title">微信扫一扫 | 点击关闭</p>';
        new QRCode(qrNode, this.info.url);
        this.weixinHover(<HTMLElement>weixinNode, <HTMLElement>qrNode);
    }
    // make url of share
    makeShareURL({ url, title, pic, description }: iShareData): iShareUrl {
        let URL = encodeURIComponent(url);
        let TITLE = encodeURIComponent(title);
        let PIC = pic ? encodeURIComponent(pic) : '';
        let DESCRIPTION = description ? encodeURIComponent(description) : '';

        return {
            "weibo": "http://v.t.sina.com.cn/share/share.php?" + serialize({
                'url': URL,
                'title': TITLE + "   " + DESCRIPTION,
                'pic': PIC,
            }),
            "weixin": url, // temp
            "qq": "http://connect.qq.com/widget/shareqq/index.html?" + serialize({
                'url': URL,
                'title': TITLE,
                'pics': PIC,
            }),
            "qqzone": "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + serialize({
                'url': URL,
                'title': TITLE,
                'pics': PIC,
                'summary': DESCRIPTION,
            }),
            "renren": "http://widget.renren.com/dialog/share?" + serialize({
                'resourceUrl': URL,
                'srcUrl': URL,
                'title': TITLE,
                'pic': PIC,
                'description': DESCRIPTION,
            }),
            "qqweibo": "http://share.v.t.qq.com/index.php?" + serialize({
                'c': 'share',
                'a': 'index',
                'appkey': 'ce15e084124446b9a612a5c29f82f080',
                'site': 'www.jiathis.com',
                'url': URL,
                'title': TITLE + "   " + DESCRIPTION,
                'pic': PIC,
            }),
            "douban": "https://www.douban.com/share/service?" + serialize({
                'href': URL,
                'name': TITLE,
                'text': DESCRIPTION,
                'image': PIC,
            }),
            "googleplus": "https://plus.google.com/share?" + serialize({
                'url': URL,
                't': TITLE,
            }),
            "facebook": "https://www.facebook.com/sharer.php?" + serialize({
                's': '100',
                'p[url]': URL,
                'p[title]': TITLE,
                'p[summary]': DESCRIPTION,
                'p[images]': PIC,
            }),
        };
    }
    // make html
    makeTemplate(arr: Array<string>, shareData: iShareData): string {
        // ["weibo","weixin"]
        let urlData = this.makeShareURL(shareData);
        let containerHTML = '';
        arr.forEach(function (item) {
            if (item === "weixin") {
                containerHTML += `<a onclick="return false;" href="javascript:void(0);" target="_blank" class="share-item ${item}" data-type="${item}"></a>`;
            } else {
                containerHTML += `<a href="${urlData[item]}" target="_blank" class="share-item ${item}" data-type="${item}"></a>`;
            }
        });
        return containerHTML;
    }
    // hover weixin qrcode  show or hide
    weixinHover(weixin: HTMLElement, qrcode: HTMLElement) {
        weixin.addEventListener("click", function () {
            qrcode.style.display = "block";
        }, false);
        qrcode.addEventListener("click", function () {
            qrcode.style.display = "none";
        }, false);
    }
}
