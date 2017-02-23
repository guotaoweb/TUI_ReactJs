import Content2, { getContentIndex } from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import { closeSidePage } from 'SidePage'
import SurvyListPreView from './survyList.preview'
import SurvyListProblem from './survyList.problem'



class EditSurvy extends React.Component {
    render() {
        const {editInfo, survyData, updateSurvy, addEditInfo} = this.props
        let _this = this
        let tabs = [{
            name: "基本信息", id: "tabs1"
        }, {
            name: "问卷内容", id: "tabs2", fn: function () {

                if (editInfo.survyInfo) {
                    console.info(editInfo)
                    console.info("++++>" + _this.props.editInfo.survyInfo.Id)
                    TUI.platform.get("/SurvyContent/" + _this.props.editInfo.survyInfo.Id, function (result) {
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
                else {
                    updateSurvy([])
                }
            }
        }, {
            name: "问卷预览", id: "tabs3"
        }]

        let _survys = []

        if (survyData.length == 0) {
            let _txt = ""
            if (editInfo.survyInfo) {
                if (editInfo.survyInfo.Id) {
                    _txt =
                        <div>
                            <span>单击 </span>
                            <Btn txt="编辑" style={{ display: "inline-block" }} href={this.addSurvy.bind(this)} />
                            <span> 题目</span>
                        </div>
                }
                else {
                    _txt = <span>请先填写问卷的基本信息</span>
                }
            }
            else {
                _txt = <span>请先填写问卷的基本信息</span>
            }
            _survys.push(
                <div key={"survy_empty"} style={{
                    padding: "10px",
                    color: "#999",
                    width: "100%",
                    textAlign: "center",
                    marginTop: "15%",
                    fontSize: "20px"
                }}>
                    {_txt}
                </div>
            )
        }
        else {
            _survys.push(<SurvyListProblem key="survyProblem" />)
        }
        return (
            <Content2 tabs={tabs} goBackHref={this.goBack.bind(this)}>
                <div>
                    <FormControls label="问卷名称" ctrl="input" required="required" value="survyInfo.Name" />
                    <FormControls label="问卷说明" ctrl="textarea" value="survyInfo.Desp" />
                    <div className="formControl-btn">
                        <Btn type="add" txt="确定" href={this.addSurvyBseInfo.bind(this)} />
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
        this.props.backBreadNav()
        this.props.clearAllEditInfo()
    }

    addSurvyBseInfo() {
        const {addSurvyList, editInfo, successMsg, errorMsg, updateEditInfo,updatePageInfo,pageInfo} = this.props
        let jsonParam = {
            Name: editInfo.survyInfo.Name,
            Desp: editInfo.survyInfo.Desp
        }
        TUI.platform.post("/Survy", jsonParam, function (result) {
            if (result.code == 0) {
                jsonParam["Id"] = result.datas[0]
                updateEditInfo({
                    infoName: "survyInfo",
                    Id: result.datas[0],
                })
                jsonParam["UpdateTime"] = TUI.fn.currentTime();
                addSurvyList(jsonParam)

                updatePageInfo({
                    sum: parseInt(pageInfo.index.sum) + 1,
                })
                successMsg("提交成功")
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }

    addSurvy() {
        const {addSurvy, editInfo} = this.props
        let id = TUI.fn.newGuid()

        let jsonParam = {
            Order: 0,
            Type: "radio",
            SurvyId: editInfo.survyInfo.Id,
            Datas: [{
                Order: 0,
                Type: "radio",
                SurvyId: editInfo.survyInfo.Id
            }]
        }
        //this.props.addSurvy()
        var _this = this

        console.info(_this.props.survyData)

        TUI.platform.post("/SurvyContentInit", jsonParam, function (result) {
            if (result.code == 0) {
                addSurvy(jsonParam)
                //successMsg("提交成功")
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        })
    }

    componentDidMount() {

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
    survyData: "survyList.data",
    pageInfo:"publicInfo.pageInfo"
}, EditSurvy)