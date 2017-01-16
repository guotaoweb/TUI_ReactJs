export const fn = {
    requestParam: function (_param) {
        var _this = window.location.href
        if (_this.indexOf("?") > -1) {
            var params = _this.substring(_this.indexOf("?") + 1)
            if (params.indexOf(_param) > -1) {
                var _params = params.substring(params.indexOf(_param) + _param.length + 1)
                if (_params.indexOf('&') > -1) {
                    return _params.substring(0, _params.indexOf('&'))
                }
                else {
                    return _params
                }
            }
            else {
                return ""
            }
        }
        else {
            return ""
        }
    },
    currentTime: function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    },
    siblingsElem: function (className) {
        let elem = document.querySelector("." + className)

        let nodes = []
        while (elem.previousSibling) {
            elem = elem.previousSibling
            if (elem.parentNode == elem) {
                break
            }
            nodes.push(elem)
        }

        let _elem = document.querySelector("." + className)
        while (_elem.nextSibling) {
            _elem = _elem.nextSibling
            nodes.push(_elem)
        }

        return nodes
    },
    updateData: function (data, deep, newData, fn) {
        //deep的格式是1-2-3,拆成数组
        //如果deep的length==1的话,就说明已经钻到底层了
        if (deep.length == 1) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == deep) {
                    fn(data, newData)
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < data.length; index++) {
            let d = data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.updateData(d.children, deep, newData, fn)
            }
        }
    },
    newGuid: function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    needCLodop:function(){
        try{
        var ua=navigator.userAgent;
        if (ua.match(/Windows\sPhone/i) !=null) return true;
        if (ua.match(/iPhone|iPod/i) != null) return true;
        if (ua.match(/Android/i) != null) return true;
        if (ua.match(/Edge\D?\d+/i) != null) return true;
        
        var verTrident=ua.match(/Trident\D?\d+/i);
        var verIE=ua.match(/MSIE\D?\d+/i);
        var verOPR=ua.match(/OPR\D?\d+/i);
        var verFF=ua.match(/Firefox\D?\d+/i);
        var x64=ua.match(/x64/i);
        if ((verTrident==null)&&(verIE==null)&&(x64!==null)) 
            return true; else
        if ( verFF !== null) {
            verFF = verFF[0].match(/\d+/);
            if ((verFF[0]>= 42)||(x64!==null)) return true;
        } else 
        if ( verOPR !== null) {
            verOPR = verOPR[0].match(/\d+/);
            if ( verOPR[0] >= 32 ) return true;
        } else 
        if ((verTrident==null)&&(verIE==null)) {
            var verChrome=ua.match(/Chrome\D?\d+/i);		
            if ( verChrome !== null ) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0]>=42) return true;
            };
        };
            return false;
        } catch(err) {return true;};
    },
    getLodop:function(oOBJECT,oEMBED){
        var strHtmInstall="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
        var strHtmUpdate="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
        var strHtm64_Install="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
        var strHtm64_Update="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
        var strHtmFireFox="<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
        var strHtmChrome="<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
        var strCLodopInstall="<br><font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>";
        var strCLodopUpdate="<br><font color='#FF00FF'>CLodop云打印服务需升级!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>";
        var LODOP;
        try{
            var isIE = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
            if (this.needCLodop()) {
                try{ LODOP=getCLodop();} catch(err) {};
            if (!LODOP && document.readyState!=="complete") {alert("C-Lodop没准备好，请稍后再试！"); return;};
                if (!LODOP) {
            if (isIE) document.write(strCLodopInstall); else
            document.documentElement.innerHTML=strCLodopInstall+document.documentElement.innerHTML;
                    return;
                } else {

                if (CLODOP.CVERSION<"2.0.9.0") { 
                if (isIE) document.write(strCLodopUpdate); else
                document.documentElement.innerHTML=strCLodopUpdate+document.documentElement.innerHTML;
            };
            if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
            if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);	
            };
            } else {
                var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
                //=====如果页面有Lodop就直接使用，没有则新建:==========
                if (oOBJECT!=undefined || oEMBED!=undefined) {
                    if (isIE) LODOP=oOBJECT; else  LODOP=oEMBED;
                } else if (CreatedOKLodop7766==null){
                    LODOP=document.createElement("object");
                    LODOP.setAttribute("width",0);
                    LODOP.setAttribute("height",0);
                    LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                    if (isIE) LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                    else LODOP.setAttribute("type","application/x-print-lodop");
                    document.documentElement.appendChild(LODOP);
                    CreatedOKLodop7766=LODOP;
                } else LODOP=CreatedOKLodop7766;
                //=====Lodop插件未安装时提示下载地址:==========
                if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
                    if (navigator.userAgent.indexOf('Chrome')>=0)
                        document.documentElement.innerHTML=strHtmChrome+document.documentElement.innerHTML;
                    if (navigator.userAgent.indexOf('Firefox')>=0)
                        document.documentElement.innerHTML=strHtmFireFox+document.documentElement.innerHTML;
                    if (is64IE) document.write(strHtm64_Install); else
                    if (isIE)   document.write(strHtmInstall);    else
                        document.documentElement.innerHTML=strHtmInstall+document.documentElement.innerHTML;
                    return LODOP;
                };
            };
            if (LODOP.VERSION<"6.2.1.5") {
                if (this.needCLodop())
                document.documentElement.innerHTML=strCLodopUpdate+document.documentElement.innerHTML; else
                if (is64IE) document.write(strHtm64_Update); else
                if (isIE) document.write(strHtmUpdate); else
                document.documentElement.innerHTML=strHtmUpdate+document.documentElement.innerHTML;
                return LODOP;
            };
            //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===

            //===========================================================
            return LODOP;
        } catch(err) {alert("getLodop出错:"+err);};
    }
}