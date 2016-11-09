import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"

import addImg from "!url!./img/add.png"
import deleteImg from "!url!./img/delete.png"
import upImg from "!url!./img/up.png"
import downImg from "!url!./img/down.png"

class EditSurvy extends React.Component {
    render() {
        const {editInfo, odata} = this.props
        let tabs = [{ name: "创建空白问卷", id: "tabs1" }, { name: "问卷内容", id: "tabs2" }, { name: "预览", id: "tabs3" }]

        let _survys = []
        if (odata.length == 0) {
            _survys.push(<div key={"survy_empty"} style={{ padding: "10px", color: "#999", width: "100%", textAlign: "center", marginTop: "15%", fontSize: "20px" }}>请通过左侧的问卷工具来添加题目</div>)
        }
        else {
            for (var i = 0; i < odata.length; i++) {
                var $s = odata[i]
                _survys.push(
                    <div key={"survy_m" + i}>
                        <span style={{ float: "left", marginTop: "5px", marginRight: "10px" }}>{i + 1}、</span>
                        <div style={{ float: "left" }}><FormControls ctrl="input" txt={$s.txt} style={{ width: "437px" }} onChange={this.onChangeBySurvy.bind(this)} /></div>
                        <ul className="optionbtns" ref="optionbtns">
                            <li onClick={this.addSubject.bind(this)} data-parent={i}><img src={addImg} /></li>
                            <li onClick={this.deleteSubject.bind(this)} data-parent={i}><img src={deleteImg} /></li>
                            <li onClick={this.upSubject.bind(this)} data-parent={i}><img src={upImg} /></li>
                            <li onClick={this.downSubject.bind(this)} data-parent={i}><img src={downImg} /></li>
                        </ul>
                        <br className="clear" />
                    </div>
                )
                if ($s.options.length > 0) {
                    for (let j = 0; j < $s.options.length; j++) {
                        let $o = $s.options[j]

                        _survys.push(
                            <div key={"survy_s_" + i + "_" + j} style={{ marginLeft: "35px" }}>
                                <span style={{ float: "left", marginTop: "5px", marginRight: "10px" }}>{this.NumSwitchChar(j + 1)}、</span>
                                <div style={{ float: "left" }}><FormControls ctrl="input" txt={$o.txt} style={{ width: "400px" }} onChange={this.onChangeBySurvy.bind(this)} /></div>
                                <ul className="optionbtns">
                                    <li onClick={this.addOption.bind(this)} data-parent={i} data-sub={j}><img src={addImg} /></li>
                                    <li onClick={this.deleteOption.bind(this)} data-parent={i} data-sub={j}><img src={deleteImg} /></li>
                                    <li onClick={this.upOption.bind(this)} data-parent={i} data-sub={j}><img src={upImg} /></li>
                                    <li onClick={this.downOption.bind(this)} data-parent={i} data-sub={j}><img src={downImg} /></li>
                                </ul>
                                <br className="clear" />
                            </div>
                        )
                    }
                }
                else {

                    let optionNo = [],
                        optionBtns = [],
                        _marginLeft = "35px",
                        _width = "400px"
                    if ($s.type != "textarea") {
                        optionNo.push(<span key={"survy-no-" + i}>{this.NumSwitchChar(1)}、</span>)
                        optionBtns.push(
                            <ul key={"survy-o-" + i} className="optionbtns">
                                <li onClick={this.addOption.bind(this)} data-parent={i} data-sub={0}><img src={addImg} /></li>
                                <li onClick={this.deleteOption.bind(this)} data-parent={i} data-sub={0}><img src={deleteImg} /></li>
                                <li onClick={this.upOption.bind(this)} data-parent={i} data-sub={0}><img src={upImg} /></li>
                                <li onClick={this.downOption.bind(this)} data-parent={i} data-sub={0}><img src={downImg} /></li>
                            </ul>
                        )
                    }
                    else {
                        _marginLeft = "25px"
                        _width = "437px"
                    }
                    _survys.push(
                        <div key={"survy_s_" + i + "_0"} style={{ marginLeft: _marginLeft }}>
                            <span style={{ float: "left", marginTop: "5px", marginRight: "10px" }}>{optionNo}</span>
                            <div style={{ float: "left" }}><FormControls ctrl={$s.type == "textarea" ? "textarea" : "input"} txt="" style={{ width: _width }} onChange={this.onChangeBySurvy.bind(this)} /></div>
                            {optionBtns}
                            <br className="clear" />
                        </div>
                    )
                }
            }

        }
        return (
            <Content2 tabs={tabs}>
                <div>
                    <FormControls label="问卷名称" ctrl="input" required="required" txt={editInfo.name} style={{ marginRight: "5px" }} onChange={this.onChangeBySurvyName.bind(this)} />
                    <FormControls label="问卷说明" ctrl="textarea" txt={editInfo.name} style={{ marginRight: "5px" }} onChange={this.onChangeBySurvyDesp.bind(this)} />
                </div>
                <div>
                    {_survys}
                    <Btn type="back" txt="返回" />
                </div>
                <div>预览内容</div>
            </Content2>
        )
    }
    onChangeBySurvy() {

    }
    onChangeBySurvyName() {

    }
    onChangeBySurvyDesp() {

    }
    componentDidMount() {
        this.props.updateSurvyOptions([{
            txt: "这是第一道题",
            sort: 0,
            type: "radio",
            options: [{
                txt: "选项一",
                sort: 0
            }, {
                txt: "选项二",
                sort: 1
            }, {
                txt: "选项三",
                sort: 2
            }, {
                txt: "选项四",
                sort: 3
            }]
        }, {
            txt: "这是第二道题",
            sort: 1,
            type: "textarea",
            options: []
        }, {
            txt: "这是第三道题",
            sort: 1,
            type: "checkbox",
            options: [{
                txt: "选项一",
                sort: 0
            }, {
                txt: "选项二",
                sort: 1
            }, {
                txt: "选项三",
                sort: 2
            }, {
                txt: "选项四",
                sort: 3
            }]
        }, {
            txt: "这是第四道题",
            sort: 1,
            type: "checkbox",
            options: [{
                txt: "选项一",
                sort: 0
            }, {
                txt: "选项二",
                sort: 1
            }, {
                txt: "选项三",
                sort: 2
            }, {
                txt: "选项四",
                sort: 3
            }]
        }])

        let _this = this
        //鼠标经过操作按钮的时候,提示正在操作哪个题目/选项
        setTimeout(function () {
            let $optionbtns = document.getElementsByClassName("optionbtns")
            for (let i = 0; i < $optionbtns.length; i++) {
                $optionbtns[i].addEventListener("mouseenter", function () {
                    this.previousSibling.getElementsByTagName("input")[0].style.borderColor = "red"
                })
                $optionbtns[i].addEventListener("mouseleave", function () {
                    this.previousSibling.getElementsByTagName("input")[0].style.borderColor = "#ebebeb"
                })
            }
        }, 200)

    }

    //新增题目项
    addOption(e) {
        const {odata, updateSurvyOptions} = this.props
        console.info("+新增选项+")

        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            sub = $elem.getAttribute("data-sub"),
            _options = []


        for (let i = 0; i < odata.length; i++) {
            let $m = odata[i]

            if (i == main) {
                if ($m.options.length > 13) {
                    openDialog(this, "超过最大选项数量限制")
                    break
                }

                $m.options.push({
                    txt: $m.options[$m.options.length - 1].txt,
                    sort: $m.options[$m.options.length - 1].sort
                })
                _options = eval(JSON.stringify(odata[i].options))
                for (let j = 0; j < _options.length; j++) {

                    if (j >= sub && j < _options.length - 1) {
                        _options[j + 1] = $m.options[j]
                    }

                }
                _options[sub] = {
                    txt: "",
                    sort: 0
                }
                $m.options = _options
                break
            }
        }
        updateSurvyOptions(odata)
    }
    //删除题目项
    deleteOption(e) {
        const {odata, updateSurvyOptions} = this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            sub = $elem.getAttribute("data-sub")

        for (let i = 0; i < odata.length; i++) {
            let $m = odata[i]
            if (i == main) {
                for (let j = 0; j < $m.options.length; j++) {
                    let $s = $m.options[j]
                    if (j == sub) {
                        $m.options.splice(j, 1)
                    }
                }
            }
        }
        updateSurvyOptions(odata)
    }
    //题目升序
    upOption(e) {
        const {odata, updateSurvyOptions} = this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            sub = $elem.getAttribute("data-sub")
        if (sub == 0) {
            openDialog(this, "此项无法进行升序操作")
            return false
        }
        for (let i = 0; i < odata.length; i++) {
            let $m = odata[i]
            if (i == main) {
                for (let j = 0; j < $m.options.length; j++) {
                    let temp = eval(JSON.stringify($m.options))
                    if (j == sub) {
                        $m.options[j - 1] = temp[j]
                        $m.options[j] = temp[j - 1]
                    }
                }
            }
        }
        updateSurvyOptions(odata)
    }
    //题目降序
    downOption(e) {
        const {odata, updateSurvyOptions} = this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            sub = $elem.getAttribute("data-sub")

        for (let i = 0; i < odata.length; i++) {
            let $m = odata[i]
            if (i == main) {
                for (let j = 0; j < $m.options.length; j++) {
                    if (sub == $m.options.length - 1) {
                        openDialog(this, "此项无法进行降序操作")
                        break
                    }
                    let $s = $m.options[j]
                    let temp = eval(JSON.stringify($m.options))
                    if (j == sub) {
                        $m.options[j + 1] = temp[j]
                        $m.options[j] = temp[j + 1]
                    }
                }
            }
        }
        updateSurvyOptions(odata)
    }
    //新增题目
    addSubject(e) {
        const {odata, updateSurvyOptions} = this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            _this = this
        openDialog(this, {
            title: "选择题型", data: [{
                name: "单选题", fn: function () {
                    odata.push({
                        txt: "",
                        sort: 1,
                        type: "checkbox",
                        options: []
                    })

                    updateSurvyOptions(odata)
                }
            }, {
                name: "多选题", fn: function () {

                    _this._addSubject(_this, main, "checkbox")
                    //updateSurvyOptions(odata)
                }
            }, {
                name: "填空题", fn: function () {
                    odata.push({
                        txt: "",
                        sort: 1,
                        type: "textarea",
                        options: []
                    })
                    updateSurvyOptions(odata)
                }
            }]
        })
        //updateSurvyOptions(odata)
    }

    _addSubject(_this, main, type) {
        const {odata, updateSurvyOptions} = _this.props
        console.info("====>")
        odata.push({
            txt: odata[odata.length - 1].txt,
            sort: odata[odata.length - 1].sort,
            type: odata[odata.length - 1].type,
            options: odata[odata.length - 1].options
        })

        let _odata = eval(JSON.stringify(odata))
        for (let i = 0; i < odata.length; i++) {
            let $m = odata[i]

            if (i > main && i < (odata.length - 1)) {
                console.info("====" + i)
                _odata[i + 1] = odata[i]

            }

        }
        _odata[parseInt(main) + 1] = {
            txt: "",
            sort: 1,
            type: type,
            options: [{
                txt: "",
                sort: 1,
            }]
        }

        updateSurvyOptions(_odata)
    }



    //删除题目
    deleteSubject(e) {
        const {odata, updateSurvyOptions} = this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent")

        for (let i = 0; i < odata.length; i++) {
            let $m = odata[i]
            if (i == main) {
                odata.splice(i, 1)
            }
        }
        updateSurvyOptions(odata)
    }
    //题目升序
    upSubject(e) {
        const {odata, updateSurvyOptions} = this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent")
        if (main == 0) {
            openDialog(this, "此项无法进行升序操作")
            return false
        }
        for (let i = 0; i < odata.length; i++) {
            let $m = odata[i]
            let temp = eval(JSON.stringify(odata))
            if (i == main) {
                odata[i - 1] = temp[i]
                $m.options[i] = temp[i - 1]
            }
        }
        updateSurvyOptions(odata)
    }
    //题目降序
    downSubject(e) {
        const {odata, updateSurvyOptions} = this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent")
        if (main == odata.length - 1) {
            openDialog(this, "此项无法进行降序操作")
            return false
        }
        for (let i = 0; i < odata.length; i++) {
            let temp = eval(JSON.stringify(odata))
            if (i == main) {
                odata[i + 1] = temp[i]
                odata[i] = temp[i + 1]
            }
        }
        updateSurvyOptions(odata)
    }



    NumSwitchChar(num) {
        switch (num) {
            case 1: return "A"
            case 2: return "B"
            case 3: return "C"
            case 4: return "D"
            case 5: return "E"
            case 6: return "F"
            case 7: return "G"
            case 8: return "H"
            case 9: return "I"
            case 10: return "J"
            case 11: return "K"
            case 12: return "L"
            case 13: return "M"
            default: return "N"
        }
    }
}

export default TUI._connect({
    editInfo: "survyList.editInfo",
    odata: "survyList.odata"
}, EditSurvy)