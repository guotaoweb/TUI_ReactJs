import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"

import addImg from "!url!./img/add.png"
import deleteImg from "!url!./img/delete.png"
import upImg from "!url!./img/up.png"
import downImg from "!url!./img/down.png"

class SurvyOption extends React.Component {
    render() {
        const {survyOptionsData, i, type, parentId,survyId} = this.props
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
                        width: "340px"
                    }

                if (type != "textarea") {
                    optionNo.push(<span key={"survy-no-" + i} style={{ float: "left", marginTop: "5px", marginRight: "10px" }}>{this.NumSwitchChar(j + 1)}、</span>)
                    optionBtns.push(
                        <ul key={"survy-o-" + j} className="optionbtns">
                            <li onClick={this.addOption.bind(this)} data-type={type} data-parent={parentId} data-order={$o.Order} data-survyId={survyId}><img src={addImg} /></li>
                            <li onClick={this.deleteOption.bind(this)} data-type={type} data-parent={parentId} data-order={$o.Order} data-Id={$o.Id}  data-survyId={survyId}><img src={deleteImg} /></li>
                            <li onClick={this.upOption.bind(this)} data-type={type} data-parent={parentId} data-order={$o.Order}  data-survyId={survyId}><img src={upImg} /></li>
                            <li onClick={this.downOption.bind(this)} data-type={type} data-parent={parentId} data-order={$o.Order}  data-survyId={survyId}><img src={downImg} /></li> 
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
                        <div style={{ float: "left" }}>
                            <FormControls ctrl={_type} bind={_bind} value={"survyOptionInfo_" + $o.Id + ".Name"} placeholder="选项内容" style={_width} />
                        </div>
                        <div style={{ float: "left", marginLeft: "10px" }}>
                            <FormControls ctrl="input" bind={_bind} value={"survyOptionInfo_" + $o.Id + ".Score"} placeholder="分值" style={{ width: "50px" }} />
                        </div>
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
        const {survyData, updateSurvy} = this.props

        let $elem = e.target.parentNode,
            parent = $elem.getAttribute("data-parent"),
            order = $elem.getAttribute("data-order"),
            type = $elem.getAttribute("data-type"),
            survyId = $elem.getAttribute("data-survyId"),
            _options = [],
            _this = this

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


                let newSurvyOption = {
                    Type: type,
                    ParentId: parent,
                    Name: "",
                    SurvyId: survyId,
                    Order: parseInt(order) + 1
                }



                TUI.platform.post("/SurvyContent", newSurvyOption, function (result) {
                    if (result.code == 0) {
                        var _d = result.datas[0]
                        newSurvyOption["Id"] = _d
                        _options[parseInt(order) + 1] = newSurvyOption
                        $m.Datas = _options

                        updateSurvy(survyData)
                    }
                    else if (result.code == 1) {

                    }
                    else {
                        errorMsg(Config.ERROR_INFO[result.code]);
                    }
                })

                break
            }

        }
    }

    //删除题目项
    deleteOption(e) {
        const {survyData, updateSurvy} = this.props
        let $elem = e.target.parentNode,
            Id = $elem.getAttribute("data-Id"),
            parentId = $elem.getAttribute("data-parent"),
            sub = $elem.getAttribute("data-sub")

        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            if ($m.Id == parentId) {
                for (let j = 0; j < $m.Datas.length; j++) {
                    let $s = $m.Datas[j]
                    if ($s.Id == Id) {
                        TUI.platform.delete("/SurvyContentById/" + $s.Id, function (result) {
                            if (result.code == 0) {
                                var _d = result.datas
                                $m.Datas.splice(j, 1)
                                updateSurvy(survyData)
                            }
                            else {
                                errorMsg(Config.ERROR_INFO[result.code]);
                            }
                        })

                    }
                }
            }
        }

    }

    //题目升序
    upOption(e) {
        const {survyData, updateSurvy} = this.props
        let $elem = e.target.parentNode,
            parent = $elem.getAttribute("data-parent"),
            order = $elem.getAttribute("data-order"),
            _this = this
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
        const {survyData, updateSurvy} = this.props
        let $elem = e.target.parentNode,
            parent = $elem.getAttribute("data-parent"),
            order = $elem.getAttribute("data-order"),
            _this = this

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

export default TUI._connect({
    editInfo: "formControlInfo.data",
    survyData: "survyList.data"
}, SurvyOption)