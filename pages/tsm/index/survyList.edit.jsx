import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import { closeSidePage } from 'SidePage'
import SurvyListPreView from './survyList.preview'

import addImg from "!url!./img/add.png"
import deleteImg from "!url!./img/delete.png"
import upImg from "!url!./img/up.png"
import downImg from "!url!./img/down.png"

class EditSurvy extends React.Component {
    render() {
        const {editInfo, survyData} = this.props
        let tabs = [{
            name: "基本信息", id: "tabs1"
        }, {
            name: "问卷内容", id: "tabs2"
        }, {
            name: "问卷预览", id: "tabs3"
        }]

        let _survys = []
        console.info(survyData)
        if (survyData.length == 0) {
            _survys.push(<SurvyEmpty key="survyEmpty" action={this} />)
        }
        else {
            _survys.push(<SurvyProblem key="survyProblem" survyData={survyData} action={this} />)
        }
        return (
            <Content2 tabs={tabs}>
                <div>
                    <FormControls label="问卷名称" ctrl="input" required="required" value="survyInfo.name" />
                    <FormControls label="问卷说明" ctrl="textarea" value="survyInfo.despInfo" />
                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} />
                        <Btn type="add" txt="确定" />
                    </div>
                </div>
                <div>
                    {_survys}
                    <br /><br />
                </div>
                <div><SurvyListPreView /></div>
            </Content2>
        )
    }

    goBack() {
        closeSidePage()
    }

    componentDidMount() {
        // this.props.updateSurvy([{
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
    survyData: "survyList.data"
}, EditSurvy)


class SurvyProblem extends React.Component {
    render() {
        const {survyData, action} = this.props

        let _survyProblem = []
        for (var i = 0; i < survyData.length; i++) {
            var $s = survyData[i]
            let _bind = {
                Id: $s.Id,
                ParentId: $s.ParentId,
                Type: $s.Type,
                Order: $s.Order
            }
            _survyProblem.push(
                <div key={"survyProblem_" + i}>
                    <span style={{ float: "left", marginTop: "5px", marginRight: "10px" }}>{i + 1}、</span>
                    <div style={{ float: "left" }}><FormControls ctrl="input" bind={_bind} value={"survyProblemInfo_" + $s.Id + ".value"} style={{ width: "437px" }} /></div>
                    <ul className="optionbtns" ref="optionbtns">
                        <li onClick={this.addSubject.bind(this)} data-order={$s.Order}><img src={addImg} /></li>
                        <li onClick={this.deleteSubject.bind(this)} data-order={$s.Order}><img src={deleteImg} /></li>
                        <li onClick={this.upSubject.bind(this)} data-order={$s.Order}><img src={upImg} /></li>
                        <li onClick={this.downSubject.bind(this)} data-order={$s.Order}><img src={downImg} /></li>
                    </ul>
                    <br className="clear" />
                    <SurvyOptions survyOptionsData={$s.Datas} i={i} action={action} type={$s.Type} parentId={$s.Id} />
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

        let _survy = []

        for (let key in _editInfo) {
            _survy.push({
                Id: _editInfo[key].Id,
                ParentId: _editInfo[key].ParentId,
                Name: _editInfo[key].value,
                Order: _editInfo[key].Order,
                Type: _editInfo[key].Type
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
        const {survyData, updateSurvy} = _this.props
        let $elem = e.target.parentNode,
            order = $elem.getAttribute("data-order"),
            _props = this


        openDialog(_this, {
            title: "选择题型", data: [{
                name: "单选题", fn: function () {
                    _props._addSubject(_this, order, "radio")
                }
            }, {
                name: "多选题", fn: function () {
                    _props._addSubject(_this, order, "checkbox")
                }
            }, {
                name: "填空题", fn: function () {
                    _props._addSubject(_this, order, "textarea")
                }
            }]
        })
    }

    _addSubject(_this, order, type) {
        const {survyData, updateSurvy} = _this.props

        survyData.push({
            Name: survyData[survyData.length - 1].Name,
            Order: survyData[survyData.length - 1].Order,
            Type: survyData[survyData.length - 1].Type,
            Datas: survyData[survyData.length - 1].Datas
        })

        let _odata = eval(JSON.stringify(survyData))
        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]

            if (i > order && i < (survyData.length - 1)) {
                _odata[i + 1] = survyData[i]
                _odata[i + 1].Order = parseInt(i) + 1
            }
            else {
                if (i > order) {
                    _odata.Order = parseInt(i) + 1
                }
            }

        }
        _odata[parseInt(order) + 1] = {
            Id: TUI.fn.newGuid(),
            ParentId: "0",
            Name: "",
            Order: parseInt(order) + 1,
            Type: type,
            Datas: [{
                Id: TUI.fn.newGuid(),
                Name: "",
                Order: 0
            }]
        }

        updateSurvy(_odata)
    }

    //删除题目
    deleteSubject(e) {
        let _this = this.props.action
        const {survyData, updateSurvy} = _this.props
        let $elem = e.target.parentNode,
            order = $elem.getAttribute("data-order")

        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            if (i == order) {
                survyData.splice(i, 1)
            }
            if (i > order) {
                $m.Order = parseInt($m.Order) - 1
            }
        }
        updateSurvy(survyData)
    }

    //题目升序
    upSubject(e) {
        let _this = this.props.action
        const {survyData, updateSurvy} = _this.props
        let $elem = e.target.parentNode,
            order = $elem.getAttribute("data-order")
        if (order == 0) {
            openDialog(_this, "此项无法进行升序操作")
            return false
        }
        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            let temp = eval(JSON.stringify(survyData))
            if (i == order) {
                survyData[i - 1] = temp[i]
                survyData[i - 1].Order = parseInt(order) - 1
                survyData[i] = temp[i - 1]
                survyData[i].Order = parseInt(order)
            }
            else {
                $m.Order = parseInt(i)
            }
        }
    }
    //题目降序
    downSubject(e) {
        let _this = this.props.action
        const {survyData, updateSurvy} = _this.props
        let $elem = e.target.parentNode,
            order = $elem.getAttribute("data-order")
        if (order == survyData.length - 1) {
            openDialog(_this, "此项无法进行降序操作")
            return false
        }
        for (let i = 0; i < survyData.length; i++) {
            let temp = eval(JSON.stringify(survyData))
            if (i == order) {
                survyData[i + 1] = temp[i]
                survyData[i + 1].Order = parseInt(order) + 1
                survyData[i] = temp[i + 1]
                survyData[i].Order = parseInt(order)
            }
        }
        updateSurvy(survyData)
    }
}


class SurvyOptions extends React.Component {
    render() {
        const {survyOptionsData, i, action, type, parentId} = this.props
        let _survy = []
        if (survyOptionsData) {
            for (let j = 0; j < survyOptionsData.length; j++) {
                let $o = survyOptionsData[j]
                let _bind = {
                    Id: $o.Id,
                    ParentId: parentId,
                    Type: type,
                    Order: $o.Order
                }

                let optionNo = [],
                    optionBtns = [],
                    _type = "input",
                    _width = {
                        width: "400px"
                    }

                if (type != "textarea") {
                    optionNo.push(<span key={"survy-no-" + i} style={{ float: "left", marginTop: "5px", marginRight: "10px" }}>{this.NumSwitchChar(j + 1)}、</span>)
                    optionBtns.push(
                        <ul key={"survy-o-" + j} className="optionbtns">
                            <li onClick={this.addOption.bind(this)} data-type={type} data-parent={parentId} data-order={$o.Order}><img src={addImg} /></li>
                            <li onClick={this.deleteOption.bind(this)} data-type={type} data-parent={parentId} data-order={$o.Order}><img src={deleteImg} /></li>
                            <li onClick={this.upOption.bind(this)} data-type={type} data-parent={parentId} data-order={$o.Order}><img src={upImg} /></li>
                            <li onClick={this.downOption.bind(this)} data-type={type} data-parent={parentId} data-order={$o.Order}><img src={downImg} /></li>
                        </ul>
                    )
                }
                else {
                    _width = {
                        width: "435px"
                    }
                    _type = "textarea"
                }

                _survy.push(
                    <div key={"survy_s_" + i + "_" + j} style={{ marginLeft: "35px" }}>
                        {optionNo}
                        <div style={{ float: "left" }}><FormControls ctrl={_type} bind={_bind} value={"survyOptionInfo_" + $o.Id + ".value"} style={_width} /></div>
                        {optionBtns}
                        <br className="clear" />
                    </div>
                )
            }
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
        const {survyData, updateSurvy} = _this.props

        let $elem = e.target.parentNode,
            parent = $elem.getAttribute("data-parent"),
            order = $elem.getAttribute("data-order"),
            type = $elem.getAttribute("data-type"),
            _options = []


        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]

            if ($m.Id == parent) {
                if ($m.Datas.length > 13) {
                    openDialog(_this, "超过最大选项数量限制")
                    break
                }

                $m.Datas.push({
                    Id: $m.Datas[$m.Datas.length - 1].Id,
                    ParentId: $m.Datas[$m.Datas.length - 1].ParentId,
                    Name: $m.Datas[$m.Datas.length - 1].Name,
                    Order: $m.Datas[$m.Datas.length - 1].Order,
                    Type: $m.Datas[$m.Datas.length - 1].Type
                })
                _options = eval(JSON.stringify(survyData[i].Datas))
                for (let j = 0; j < _options.length; j++) {

                    if (j > order && j < _options.length - 1) {
                        _options[j + 1] = $m.Datas[j]
                        _options[j + 1].Order = parseInt(j) + 1
                    }
                    else {
                        if (i > order) {
                            _options.Order = parseInt(j) + 1
                        }
                    }
                }
                _options[parseInt(order) + 1] = {
                    Id: TUI.fn.newGuid(),
                    Type: type,
                    ParentId: parent,
                    Name: "",
                    Order: parseInt(order) + 1
                }
                $m.Datas = _options
                break
            }
        }
    }

    //删除题目项
    deleteOption(e) {
        let _this = this.props.action
        const {survyData, updateSurvy} = _this.props
        let $elem = e.target.parentNode,
            main = $elem.getAttribute("data-parent"),
            sub = $elem.getAttribute("data-sub")

        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            if (i == main) {
                for (let j = 0; j < $m.Datas.length; j++) {
                    let $s = $m.Datas[j]
                    if (j == sub) {
                        $m.Datas.splice(j, 1)
                    }
                }
            }
        }
        updateSurvy(survyData)
    }

    //题目升序
    upOption(e) {
        let _this = this.props.action
        const {survyData, updateSurvy} = _this.props
        let $elem = e.target.parentNode,
            parent = $elem.getAttribute("data-parent"),
            order = $elem.getAttribute("data-order")
        if (order == 0) {
            openDialog(_this, "此项无法进行升序操作")
            return false
        }
        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            if ($m.Id == parent) {
                for (let j = 0; j < $m.Datas.length; j++) {
                    let temp = eval(JSON.stringify($m.Datas))
                    if (j == order) {

                        $m.Datas[j - 1] = temp[j]
                        $m.Datas[j - 1].Order = parseInt(order) - 1
                        $m.Datas[j] = temp[j - 1]
                        $m.Datas[j].Order = parseInt(order)
                    }
                    else {
                        $m.Datas[j].Order = parseInt(j)
                    }
                }
            }
        }
        updateSurvy(survyData)
    }

    //题目降序
    downOption(e) {
        let _this = this.props.action
        const {survyData, updateSurvy} = _this.props
        let $elem = e.target.parentNode,
            parent = $elem.getAttribute("data-parent"),
            order = $elem.getAttribute("data-order")

        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            if ($m.Id == parent) {
                for (let j = 0; j < $m.Datas.length; j++) {
                    if (order == $m.Datas.length - 1) {
                        openDialog(_this, "此项无法进行降序操作")
                        break
                    }
                    let $s = $m.Datas[j]
                    let temp = eval(JSON.stringify($m.Datas))
                    if (j == order) {
                        $m.Datas[j + 1] = temp[j]
                        $m.Datas[j + 1].Order = parseInt(order) + 1
                        $m.Datas[j] = temp[j + 1]
                        $m.Datas[j].Order = parseInt(order)
                    }
                }
            }
        }
        updateSurvy(survyData)
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
        this.props.action.props.updateSurvy([{
            Id: TUI.fn.newGuid(),
            ParentId: "0",
            Name: "",
            Order: 0,
            Type: "radio",
            Datas: [{
                Id: TUI.fn.newGuid(),
                Name: "",
                Order: 0
            }]
        }])
    }
}