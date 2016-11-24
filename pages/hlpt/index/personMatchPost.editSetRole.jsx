import Table from "Table"
import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Search from "Search"

import singleLeft from "!url!./img/singleLeft.png"

class PersonMatchPostEditSetRole extends React.Component {
    render() {
        const {setRoleData, sidePageInfo, updatePersonMatchPostRole} = this.props

        let _this = this


        let tblContent = {
            "thead": { "name1": "序号", "name2": "角色", "name3": "职位名", "name4": "操作" },
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
                        let _poId = _this.props.sidePageInfo.gateWay.poId
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
                                _this.props.refreshTable()
                            }
                            else {
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
                    <Search placeholder="请输入关键字(角色)搜索" style={{
                        border: "none",
                        borderBottom: "1px solid #ebebeb",
                        width: "98%",
                        margin: "auto"
                    }} fn={this._searchPersonMachPostSetRole.bind(this)} />
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,150,0,80" />
                </div>
            </div>
        )
    }

    _searchPersonMachPostSetRole(val) {
        const {addPersonMatchPostSetRoleData, errorMsg,updatePageInfo,searchInfo} =this.props
        TUI.platform.get("/roles?positionId=" + searchInfo.key.positionId + "&roleName=" + val, function (result) {
            if (result.code == 0) {
                let _data = result.data
                addPersonMatchPostSetRoleData(_data)
            }
            else if (result.code == 404) {
                addPersonMatchPostSetRoleData([])
            }
            else {
                errorMsg(result.message)
            }
        })
    }

    _closeSidePage() {
        closeSidePage({
            id: "PersonMatchPostEditSelect"
        })
        this.props.backBreadNav()
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
    setRoleData: "personMatchPost.setRoleData",
    searchInfo: "publicInfo.searchInfo"
}, PersonMatchPostEditSetRole)
