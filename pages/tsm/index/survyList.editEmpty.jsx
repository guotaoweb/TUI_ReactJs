import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import { closeSidePage } from 'SidePage'

import addImg from "!url!./img/add.png"
import deleteImg from "!url!./img/delete.png"
import upImg from "!url!./img/up.png"
import downImg from "!url!./img/down.png"

class EditSurvy extends React.Component {
    render() {
        const {editInfo, survyData} = this.props

        let tabs = [{
            name: "创建空白问卷", id: "tabs1"
        }, {
            name: "问卷内容", id: "tabs2"
        }, {
            name: "预览", id: "tabs3"
        }]

        let _survys = []

        if (survyData.length == 0) {
            _survys.push(<SurvyEmpty key="survyEmpty" action={this} />)
        }
        else {
            _survys.push(<SurvyProblem key="survyProblem" data={survyData} action={this} />)
        }
        return (
            <Content2 tabs={tabs}>
                <div>
                    <FormControls label="问卷名称" ctrl="input" required="required" value="survyInfo.name" />
                    <FormControls label="问卷说明" ctrl="textarea" value="survyInfo.despInfo" />
                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" />
                        <Btn type="add" txt="确定" />
                    </div>
                </div>
                <div>
                    {_survys}
                    <br /><br />
                </div>
                <div>预览内容</div>
            </Content2>
        )
    }

    componentDidMount() {
        // this.props.updateSurvyOptions([{
        //     txt: "这是第一道题",
        //     sort: 0,
        //     type: "radio",
        //     options: [{
        //         txt: "选项一",
        //         sort: 0
        //     }, {
        //         txt: "选项二",
        //         sort: 1
        //     }, {
        //         txt: "选项三",
        //         sort: 2
        //     }, {
        //         txt: "选项四",
        //         sort: 3
        //     }]
        // }, {
        //     txt: "这是第二道题",
        //     sort: 1,
        //     type: "textarea",
        //     options: []
        // }, {
        //     txt: "这是第三道题",
        //     sort: 1,
        //     type: "checkbox",
        //     options: [{
        //         txt: "选项一",
        //         sort: 0
        //     }, {
        //         txt: "选项二",
        //         sort: 1
        //     }, {
        //         txt: "选项三",
        //         sort: 2
        //     }, {
        //         txt: "选项四",
        //         sort: 3
        //     }]
        // }, {
        //     txt: "这是第四道题",
        //     sort: 1,
        //     type: "checkbox",
        //     options: [{
        //         txt: "选项一",
        //         sort: 0
        //     }, {
        //         txt: "选项二",
        //         sort: 1
        //     }, {
        //         txt: "选项三",
        //         sort: 2
        //     }, {
        //         txt: "选项四",
        //         sort: 3
        //     }]
        // }])

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
}

export default TUI._connect({
    editInfo: "formControlInfo.data",
    survyData: "survyList.odata"
}, EditSurvy)


class SurvyProblem extends React.Component {
    render() {
        const {data, action} = this.props

        let _survyProblem = []
        for (var i = 0; i < data.length; i++) {
            var $s = data[i]
            _survyProblem.push(
                <div key={"survyProblem_" + i}>
                    <span style={{ float: "left", marginTop: "5px", marginRight: "10px" }}>{i + 1}、</span>
                    <div style={{ float: "left" }}><FormControls ctrl="input" value={"survyProblemInfo_" + i +"_"+ $s.Type+ "_"+ $s.Order+"_" + $s.ParentId + ".value"} style={{ width: "437px" }} /></div>
                    <ul className="optionbtns" ref="optionbtns">
                        <li onClick={this.addSubject.bind(this)} data-parent={i}><img src={addImg} /></li>
                        <li onClick={this.deleteSubject.bind(this)} data-parent={i}><img src={deleteImg} /></li>
                        <li onClick={this.upSubject.bind(this)} data-parent={i}><img src={upImg} /></li>
                        <li onClick={this.downSubject.bind(this)} data-parent={i}><img src={downImg} /></li>
                    </ul>
                    <br className="clear" />
                    <SurvyOptions data={$s.Options} i={i} action={action} type={$s.Type} parentId={$s.Id} />
                </div>
            )
        }
        return (
            <div>
                {_survyProblem}
                <div className="formControl-btn" style={{ marginLeft: "36px" }}>
                    <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                    <Btn type="add" txt="确定" href={this.ediSurvy.bind(this)} />
                </div>
            </div>
        )
    }

    ediSurvy() {
        let _editInfo = this.props.action.props.editInfo
        console.info(_editInfo)

        let _survy = []

        for (let key in _editInfo) {
            let array = key.split("_"),
            _parentId = array[array.length - 1],
            _order = array[array.length - 2],
            _type = array[array.length - 3]

            _survy.push({
                ParentId: _parentId,
                Name: _editInfo[key].value,
                Order: 0,
                Type: "radio"
            })

        }

        console.info("提交的JSON")
        console.info(_survy)
    }

    goBack() {
        closeSidePage()
    }

    //新增题目
    addSubject(e) {
        let _this = this.props.action
        const {survyData, updateSurvyOptions} = _this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            _props = this


        openDialog(_this, {
            title: "选择题型", data: [{
                name: "单选题", fn: function () {
                    survyData.push({
                        Id:"b0",
                        ParentId: "0",
                        Name: "",
                        Order: 1,
                        Type: "checkbox",
                        Options: [{
                            Name: "",
                            Order: 0
                        }]
                    })

                    updateSurvyOptions(survyData)
                }
            }, {
                name: "多选题", fn: function () {

                    _props._addSubject(_this, main, "checkbox")
                    //updateSurvyOptions(odata)
                }
            }, {
                name: "填空题", fn: function () {
                    survyData.push({
                        Id:"c0",
                        ParentId: "",
                        Name: "",
                        Order: 1,
                        Type: "checkbox",
                        Options: [{
                            Name: "",
                            Order: 0
                        }]
                    })
                    updateSurvyOptions(survyData)
                }
            }]
        })
        //updateSurvyOptions(odata)
    }

    _addSubject(_this, main, type) {
        const {survyData, updateSurvyOptions} = _this.props

        survyData.push({
            Name: survyData[survyData.length - 1].Name,
            Order: survyData[survyData.length - 1].Order,
            Type: survyData[survyData.length - 1].Type,
            Options: survyData[survyData.length - 1].Options
        })

        let _odata = eval(JSON.stringify(survyData))
        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]

            if (i > main && i < (survyData.length - 1)) {
                _odata[i + 1] = survyData[i]
            }

        }
        _odata[parseInt(main) + 1] = {
            Id:"d0",
            ParentId: "",
            Name: "",
            Order: 1,
            Type: "checkbox",
            Options: [{
                Name: "",
                Order: 1
            }]
        }

        updateSurvyOptions(_odata)
    }

    //删除题目
    deleteSubject(e) {
        let _this = this.props.action
        const {survyData, updateSurvyOptions} = _this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent")

        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            if (i == main) {
                survyData.splice(i, 1)
            }
        }
        updateSurvyOptions(survyData)
    }
    //题目升序
    upSubject(e) {
        let _this = this.props.action
        const {survyData, updateSurvyOptions} = _this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent")
        if (main == 0) {
            openDialog(_this, "此项无法进行升序操作")
            return false
        }
        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            let temp = eval(JSON.stringify(survyData))
            if (i == main) {
                survyData[i - 1] = temp[i]
                $m.Options[i] = temp[i - 1]
            }
        }
        updateSurvyOptions(survyData)
    }
    //题目降序
    downSubject(e) {
        let _this = this.props.action
        const {survyData, updateSurvyOptions} = _this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent")
        if (main == survyData.length - 1) {
            openDialog(_this, "此项无法进行降序操作")
            return false
        }
        for (let i = 0; i < survyData.length; i++) {
            let temp = eval(JSON.stringify(survyData))
            if (i == main) {
                survyData[i + 1] = temp[i]
                survyData[i] = temp[i + 1]
            }
        }
        updateSurvyOptions(survyData)
    }
}


class SurvyOptions extends React.Component {
    render() {
        const {data, i, action, type, parentId} = this.props

        let _survy = []
        if (data.length > 0) {
            for (let j = 0; j < data.length; j++) {
                let $o = data[j]

                _survy.push(
                    <div key={"survy_s_" + i + "_" + j} style={{ marginLeft: "35px" }}>
                        <span style={{ float: "left", marginTop: "5px", marginRight: "10px" }}>{this.NumSwitchChar(j + 1)}、</span>
                        <div style={{ float: "left" }}><FormControls ctrl="input" value={"survyOptionInfo_" + j + "_" + $o.Type+ "_"+ $o.Order+"_" +  parentId + ".value"} style={{ width: "400px" }} /></div>
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
            if (type != "textarea") {
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
            _survy.push(
                <div key={"survy_s_" + i + "_0"} style={{ marginLeft: _marginLeft }}>
                    <span style={{ float: "left", marginTop: "5px", marginRight: "10px" }}>{optionNo}</span>
                    <div style={{ float: "left" }}><FormControls ctrl={type == "textarea" ? "textarea" : "input"} value={"survyOptionInfo_" + j + "_" + parentId + ".value"} style={{ width: _width }} /></div>
                    {optionBtns}
                    <br className="clear" />
                </div>
            )
        }

        return (
            <div>
                {_survy}
            </div>
        )
    }


    //新增题目项
    addOption(e) {
        let _this = this.props.action
        const {survyData, updateSurvyOptions} = _this.props
        console.info("+新增选项+")

        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            sub = $elem.getAttribute("data-sub"),
            _options = []


        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]

            if (i == main) {
                if ($m.Options.length > 13) {
                    openDialog(_this, "超过最大选项数量限制")
                    break
                }

                $m.Options.push({
                    Name: $m.Options[$m.Options.length - 1].Name,
                    Order: $m.Options[$m.Options.length - 1].Order
                })
                _options = eval(JSON.stringify(survyData[i].Options))
                for (let j = 0; j < _options.length; j++) {

                    if (j >= sub && j < _options.length - 1) {
                        _options[j + 1] = $m.Options[j]
                    }

                }
                _options[sub] = {
                    Name: "",
                    Order: 0
                }
                $m.Options = _options
                break
            }
        }
        updateSurvyOptions(survyData)
    }

    //删除题目项
    deleteOption(e) {
        let _this = this.props.action
        const {survyData, updateSurvyOptions} = _this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            sub = $elem.getAttribute("data-sub")

        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            if (i == main) {
                for (let j = 0; j < $m.Options.length; j++) {
                    let $s = $m.Options[j]
                    if (j == sub) {
                        $m.Options.splice(j, 1)
                    }
                }
            }
        }
        updateSurvyOptions(survyData)
    }

    //题目升序
    upOption(e) {
        let _this = this.props.action
        const {survyData, updateSurvyOptions} = _this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            sub = $elem.getAttribute("data-sub")
        if (sub == 0) {
            openDialog(_this, "此项无法进行升序操作")
            return false
        }
        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            if (i == main) {
                for (let j = 0; j < $m.Options.length; j++) {
                    let temp = eval(JSON.stringify($m.Options))
                    if (j == sub) {
                        $m.Options[j - 1] = temp[j]
                        $m.Options[j] = temp[j - 1]
                    }
                }
            }
        }
        updateSurvyOptions(survyData)
    }

    //题目降序
    downOption(e) {
        let _this = this.props.action
        const {survyData, updateSurvyOptions} = _this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            sub = $elem.getAttribute("data-sub")

        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            if (i == main) {
                for (let j = 0; j < $m.Options.length; j++) {
                    if (sub == $m.Options.length - 1) {
                        openDialog(_this, "此项无法进行降序操作")
                        break
                    }
                    let $s = $m.Options[j]
                    let temp = eval(JSON.stringify($m.Options))
                    if (j == sub) {
                        $m.Options[j + 1] = temp[j]
                        $m.Options[j] = temp[j + 1]
                    }
                }
            }
        }
        updateSurvyOptions(survyData)
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

class SurvyEmpty extends React.Component {
    render() {
        return (
            <div key={"survy_empty"} style={{
                padding: "10px",
                color: "#999",
                width: "100%",
                textAlign: "center",
                marginTop: "15%",
                fontSize: "20px"
            }}>
                <span>单击 </span>
                <Btn type="add" txt="编辑" style={{ display: "inline-block" }} href={this.addSurvy.bind(this)} />
                <span> 题目</span>
            </div>
        )
    }

    addSurvy() {
        this.props.action.props.updateSurvyOptions([{
            Id:"a0",
            ParentId: "0",
            Name: "",
            Order: 0,
            Type: "radio",
            Options: [{
                Name: "",
                Order: 0
            }]
        }])
    }
}