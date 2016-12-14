//组件
import Content from "Content"
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import FormControls from "FormControls"
import { openLoading, closeLoading } from "Loading"
import SidePage, { openSidePage, closeSidePage } from "SidePage"

class EditGrade extends React.Component {
    render() {
        const {
            errorMsg,
            gradeList,
            pageInfo,
            sidePageInfo
        } = this.props

        return (
            <Content txt={sidePageInfo.status=="addGrade"?"新增年级":"编辑年级"}>
                <div className="t-content-padding">
                    <FormControls label="名称" ctrl="input" value="gradeInfo.Name" />
                    <FormControls label="短名" ctrl="input" value="gradeInfo.ShortName" />
                    <FormControls label="等级" ctrl="input" type="number" value="gradeInfo.Level" />
                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this._goBack.bind(this)} />
                        <Btn type="submit" txt="提交" href={this.editGrade.bind(this)} />
                    </div>
                </div>
            </Content>
        )
    }

    editGrade() {
        const {addGradeList,updateGradeList, sidePageInfo, errorMsg,editInfo,successMsg} = this.props
        let jsonParam = {
            Name: editInfo.gradeInfo.Name,
            ShortName: editInfo.gradeInfo.ShortName,
            Level: editInfo.gradeInfo.Level
        },
        _this = this
        if (sidePageInfo.status == "editGrade") {
            let _id = sidePageInfo.gateWay.Id
            jsonParam["Id"] = _id
            TUI.platform.put("/Grade/" + _id, jsonParam, function (result) {
                if (result.code == 0) {
                    updateGradeList(jsonParam)
                    setTimeout(function(){successMsg("编辑成功")},300)
                }
                else if (result.code == 1) {
                    updateGradeList([])
                }
                else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
                }
                _this._goBack()
            })


        }
        else {
            TUI.platform.post("/Grade", jsonParam, function (result) {
                if (result.code == 0) {
                    jsonParam["Id"] = result.datas
                    addGradeList(jsonParam)
                    setTimeout(function(){successMsg("新增成功")},300)
                }
                else if (result.code == 1) {
                    addGradeList([])
                }
                else {
                    errorMsg(TUI.ERROR_INFO[result.code]);
                }
                _this._goBack()
            })
        }
    }

    _goBack() {
        closeSidePage({
            id: "gradeEdit"
        })
        this.props.clearEditInfo({
            infoName:"gradeInfo"
        })
    }
}


export default TUI._connect({
    gradeList: "gradeList.list",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo",
    editInfo:"formControlInfo.data"
}, EditGrade)