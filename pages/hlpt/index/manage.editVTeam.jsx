import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { closeSidePage } from "SidePage"

class ManageEditVTeam extends React.Component {
    render() {
        const {detail, sidePageInfo} = this.props
        let tabs = [{ name: (sidePageInfo.status == "addMenu" ? "新增" : "编辑") + "虚拟组织" }]

        return (
            <Content2 tabs={tabs} key="content2_userEdit">
                <div>
                    <FormControls label="组织编码" ctrl="input" ref="input1" value="editVTeamInfo.code"/>
                    <FormControls label="组织名称" ctrl="input" ref="input2" value="editVTeamInfo.name"/>
                    <FormControls label="组织简介" ctrl="textarea" ref="input3" value="editVTeamInfo.note"/>
                    <div className="formControl-btn">
                        <Btn type="cancel" txt="取消" href={this.goBack.bind(this)} style={{ float: "left", marginRight: "10px" }} />
                        <Btn type="check" txt="确定" href={this.editVTeamInfo.bind(this)} style={{ float: "left" }} />
                    </div>
                </div>
            </Content2>
        )
    }

    goBack() {
        closeSidePage();
        this.props.backBreadNav()
    }

    editVTeamInfo() {
        const {sidePageInfo, userId, editInfo, data, successMsg, errorMsg, teamId, addSubVTeamData, preventSubmit} = this.props

        let _this = this
        let operType,
            _teamId = "",
            //Ids = teamId.split("-"),
            upperId = sidePageInfo.gateWay.deep.length > 1 ? sidePageInfo.gateWay.deep[sidePageInfo.gateWay.deep.length - 2] : Ids[0]
        if (sidePageInfo.status == "editMenu") {
            operType = "U"
            _teamId = sidePageInfo.gateWay.id
            //Ids.length > 1 ? Ids[Ids.length - 1] : Ids[0]
        }
        else {
            operType = "A"
        }

        // this.updateData(xnsubdata, TEAM_ID.split("-"), this.props.updateXNSubData, 0, {
        //   id: teamId,
        //   code: detail.code,
        //   name: detail.name,
        //   note: detail.note
        // }, operType)
        // closeSidePage()

        TUI.platform.post("/projectteam/team", {
            "uid": userId,
            "team_id": _teamId,
            "upper_team_id": upperId,
            "team_code": editInfo.editVTeamInfo.code,
            "team_name": editInfo.editVTeamInfo.name,
            "team_note": editInfo.editVTeamInfo.note,
            "team_icon": "",
            "sort": "999",
            "state": "1",
            "del_flag": "n",
            "opertype": operType
        }, function (result) {
            if (result.code == 0) {
                _this.updateData(data, sidePageInfo.gateWay.deep.split("-"), addSubVTeamData, 0, {
                    id: operType == "A" ? result.datas[0] : editInfo.editVTeamInfo.id,
                    code: editInfo.editVTeamInfo.code,
                    name: editInfo.editVTeamInfo.name,
                    note: editInfo.editVTeamInfo.note,
                    num: operType == "A" ? "0" : editInfo.editVTeamInfo.num
                }, operType)
                _this.goBack()
                successMsg("虚拟组" + (operType == "A" ? "新增" : "编辑") + "成功")
            }
            else {
                errorMsg(result.message)
            }
        })

    }

    updateData(data, deep, fn, _deep, addData, action) {
        //deep的格式是1-2-3,拆成数组
        //如果deep的length==1的话,就说明已经钻到底层了
        if (deep.length == 1) {
            for (let index = 0; index < data.length; index++) {
                let d = data[index]
                if (d.id == deep[0]) {
                    if (action == "A") {
                        d.deep = parseInt(_deep) + 1

                        if (typeof d.children == "undefined") {
                            d.children = []
                        }

                        d.children.push(addData)
                    }
                    else {
                        d.id = addData.id
                        d.name = addData.name
                        d.code = addData.code
                        d.note = addData.note
                        d.num = addData.num
                    }
                    fn(this.props.data)
                }
            }
            return false
        }

        //钻到最底层
        for (var index = 0; index < data.length; index++) {
            let d = data[index]
            if (d.id == deep[0] && deep.length > 1) {
                deep.splice(0, 1)
                this.updateData(d.children, deep, fn, _deep + 1, addData, action)
            }
        }
    }

    onChangeByCode(e) {
        const {detail, updateSubVTeamInfo} = this.props
        updateSubVTeamInfo({
            id: detail.id,
            num: detail.num,
            code: e.currentTarget.value,
            name: detail.name,
            note: detail.note
        })
    }
    onChangeByName(e) {
        const {detail, updateSubVTeamInfo} = this.props
        updateSubVTeamInfo({
            num: detail.num,
            code: detail.code,
            name: e.currentTarget.value,
            note: detail.note
        })
    }
    onChangeByNote(e) {
        const {detail, updateSubVTeamInfo} = this.props
        updateSubVTeamInfo({
            num: detail.num,
            code: detail.code,
            name: detail.name,
            note: e.currentTarget.value
        })
    }
}


export default TUI._connect({
    detail: "manages.detail",
    sidePageInfo: "publicInfo.sidePageInfo",
    userId: "publicInfo.userInfo.userId",
    teamId: "manages.detail.relateId",
    data: "manages.data",
    editInfo:"formControlInfo.data"
}, ManageEditVTeam)