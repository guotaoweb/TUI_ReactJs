import Table from "Table"
import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import SidePage, { openSidePage, closeSidePage } from "SidePage"

import singleLeft from "!url!./img/singleLeft.png"

class PersonMatchPostEditSetRole extends React.Component {
    render() {
        const {setRoleData, sidePageInfo,updatePersonMatchPostRole} = this.props
        let _this = this


        let tblContent = {
            "thead": { "name1": "序号", "name2": "角色", "name3": "职位名","name4": "操作" },
            "tbody": []
        }
        for (var i = 0; i < setRoleData.length; i++) {
            let _d = setRoleData[i]
            tblContent.tbody.push({
                "value1": i + 1,
                "value2": _d.roleName,
                "value3": _d.jobNames,
                "fns": [{
                    "name": "选择",
                    "fn": function () {
                        let _poId = sidePageInfo.gateWay.poId
                        let jsonParma = {
                            roleId: _d.roleId,
                            poid: _poId
                        }
                        TUI.platform.put("/duty/role", jsonParma, function (result) {
                            if (result.code == 0) {
                                let _data = result.data
                                let setRole = {
                                    "poId": _poId,
                                    "roleName": _d.roleName
                                }

                                updatePersonMatchPostRole(setRole)
                                 _this._closeSidePage()
                            }
                            else{
                                errorMsg(result.message)
                            }
                        })

                    }
                }]
            })
        }

        return (
            <div>
                <div className="t-content_t">
                    <span><img src={singleLeft} onClick={this._closeSidePage.bind(this)} />角色列表</span>
                </div>
                <div>
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,150,0,80" />
                </div>
            </div>
        )
    }

    _closeSidePage() {
        closeSidePage({
            id: "PersonMatchPostEditSelect"
        })
    }


    checkboxClick(action, params) {
        if (action == "open") {
            let _param = []
            _param.push(params)
            this.props.pushTip(_param)
            this.props.selectedPositionMaintainJobs(params)
        }
        else {
            let selectedId = params.id
            this.props.deleteTip(selectedId)
            this.props.deleteSelectedPositionMaintainJobs(selectedId)
        }

    }
}


export default TUI._connect({
    sidePageInfo: "publicInfo.sidePageInfo",
    setRoleData: "personMatchPost.setRoleData"

}, PersonMatchPostEditSetRole)
