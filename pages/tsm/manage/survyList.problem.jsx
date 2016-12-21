import Content2, { getContentIndex } from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import { closeSidePage } from 'SidePage'
import SurvyListOptions from './survyList.options'

import addImg from "!url!./img/add.png"
import deleteImg from "!url!./img/delete.png"
import upImg from "!url!./img/up.png"
import downImg from "!url!./img/down.png"

class SurvyProblem extends React.Component {
    render() {
        const {survyData, addEditInfo, editInfo} = this.props

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
                    <div style={{ float: "left" }}><FormControls ctrl="input" bind={_bind} value={"survyProblemInfo_" + $s.Id + ".Name"} style={{ width: "437px" }} /></div>
                    <ul className="optionbtns" ref="optionbtns">
                        <li onClick={this.addSubject.bind(this)} data-order={$s.Order}><img src={addImg} /></li>
                        <li onClick={this.deleteSubject.bind(this)} data-id={$s.Id} data-order={$s.Order}><img src={deleteImg} /></li>
                        <li onClick={this.upSubject.bind(this)} data-order={$s.Order}><img src={upImg} /></li>
                        <li onClick={this.downSubject.bind(this)} data-order={$s.Order}><img src={downImg} /></li>
                    </ul>
                    <br className="clear" />
                    <SurvyListOptions survyOptionsData={$s.Datas} i={i} type={$s.Type} parentId={$s.Id} />
                </div>
            )
        }
        //<SurvyOptions survyOptionsData={$s.Datas} i={i} action={action} type={$s.Type} parentId={$s.Id} />
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

    componentDidMount() {
        const {updateSurvy, editInfo, addEditInfo} = this.props
        TUI.platform.get("/SurvyContent/" + editInfo.survyInfo.Id, function(result) {
            if (result.code == 0) {
                var _d = result.datas
                updateSurvy(_d)
                for (let i = 0; i < _d.length; i++) {
                    addEditInfo({
                        infoName: "survyProblemInfo_" + _d[i].Id,
                        Id: _d[i].Id,
                        Name: _d[i].Name,
                        Order: _d[i].Order,
                        ParentId: _d[i].ParentId,
                        Type: _d[i].Type
                    })
                    for (var j = 0; j < _d[i].Datas.length; j++) {
                        var _d_ = _d[i].Datas[j];
                        addEditInfo({
                            infoName: "survyOptionInfo_" + _d_.Id,
                            Id: _d_.Id,
                            Name: _d_.Name,
                            Order: _d_.Order,
                            ParentId: _d_.ParentId,
                            Type: _d_.Type,
                            Score: _d_.Score
                        })
                    }
                }
            }
            else if (result.code == 1) {
                updateSurvy([])
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }

    ediSurvy() {
        const {editInfo, survyData} = this.props

        let _survy = []

        //survyData循环的主要目的是替换editInfo中Order
        //因为升序和降序不会改变editInfo中的Order
        for (let i = 0; i < survyData.length; i++) {
            let $s = survyData[i]
            for (let key in editInfo) {
                if ((key.indexOf("survyOptionInfo") > -1 || key.indexOf("survyProblemInfo") > -1) && $s.Id == editInfo[key].Id) {
                    _survy.push({
                        Id: editInfo[key].Id,
                        ParentId: editInfo[key].ParentId,
                        Name: editInfo[key].Name,
                        Order: $s.Order,
                        Type: editInfo[key].Type,
                        Score:editInfo[key].Score
                    })
                }
            }
            for (var j = 0; j < $s.Datas.length; j++) {
                var $d = $s.Datas[j];
                for (let key in editInfo) {
                    if ((key.indexOf("survyOptionInfo") > -1 || key.indexOf("survyProblemInfo") > -1) && $d.Id == editInfo[key].Id) {
                        _survy.push({
                            Id: editInfo[key].Id,
                            ParentId: editInfo[key].ParentId,
                            Name: editInfo[key].Name,
                            Order: $d.Order,
                            Type: editInfo[key].Type,
                            Score:editInfo[key].Score
                        })
                    }
                }
            }
        }

        console.info("提交的JSON")
        console.info(_survy)
        console.info(JSON.stringify(_survy))
    }

    goBack() {
        closeSidePage()
        getContentIndex(0)
        this.props.backBreadNav()
        this.props.clearAllEditInfo()
        console.info(this.props.editInfo)
    }

    //新增题目
    addSubject(e) {
        const {survyData, updateSurvy} = this.props
        let $elem = e.target.parentNode,
            order = $elem.getAttribute("data-order"),
            _this = this


        openDialog(_this, {
            title: "选择题型", data: [{
                name: "单选题", fn: function() {
                    _this._addSubject(_this, order, "radio")
                }
            }, {
                name: "多选题", fn: function() {
                    _this._addSubject(_this, order, "checkbox")
                }
            }, {
                name: "填空题", fn: function() {
                    _this._addSubject(_this, order, "textarea")
                }
            }]
        })
    }

    _addSubject(_this, order, type) {
        const {survyData, updateSurvy, editInfo} = _this.props

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

        let newSurvy = {
            Order: parseInt(order) + 1,
            Type: type,
            SurvyId: editInfo.survyInfo.Id,
            Datas: [{
                Order: 0,
                Type: type,
                SurvyId: editInfo.survyInfo.Id
            }]
        }


        TUI.platform.post("/SurvyContentInit", newSurvy, function(result) {
            if (result.code == 0) {
                var _d = result.datas[0]
                _odata[parseInt(order) + 1] = _d
                updateSurvy(_odata)
            }
            else if (result.code == 1) {

            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }

    //删除题目
    deleteSubject(e) {
        const {survyData, updateSurvy, errorMsg} = this.props
        let $elem = e.target.parentNode,
            id = $elem.getAttribute("data-id"),
            order = $elem.getAttribute("data-order")

        for (let i = 0; i < survyData.length; i++) {
            let $m = survyData[i]
            if ($m.Id == id) {
                survyData.splice(i, 1)

                TUI.platform.delete("/SurvyContentById/" + $m.Id, function(result) {
                    if (result.code == 0) {
                        var _d = result.datas
                    }
                    else {
                        errorMsg(Config.ERROR_INFO[result.code]);
                    }
                })
            }
            if (i > order) {
                $m.Order = parseInt($m.Order) - 1
            }
        }
        updateSurvy(survyData)
    }

    //题目升序
    upSubject(e) {
        const {survyData, updateSurvy} = this.props

        let $elem = e.target.parentNode,
            order = $elem.getAttribute("data-order"),
            _this = this
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
        updateSurvy(survyData)
    }
    //题目降序
    downSubject(e) {
        const {survyData, updateSurvy} = this.props

        let $elem = e.target.parentNode,
            order = $elem.getAttribute("data-order"),
            _this = this
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

export default TUI._connect({
    editInfo: "formControlInfo.data",
    survyData: "survyList.data"
}, SurvyProblem)


