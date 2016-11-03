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
    updateData:function(data, deep, newData,fn) {
        //deep的格式是1-2-3,拆成数组
        //如果deep的length==1的话,就说明已经钻到底层了
        if (deep.length == 1) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == deep) {
                    fn(data,newData)
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < data.length; index++) {
            let d = data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.updateData(d.children, deep, newData,fn)
            }
        }
    }
}