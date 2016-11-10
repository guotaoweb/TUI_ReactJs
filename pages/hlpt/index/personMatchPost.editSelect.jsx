import Table from "Table"
import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import SidePage, { openSidePage, closeSidePage } from "SidePage"

import singleLeft from "!url!./img/singleLeft.png"

class PersonMatchPostEditSelect extends React.Component {
    render() {
        const {pageInfo,waiteMsg,successMsg,errorMsg, selectUserData, sidePageInfo, pushPersonMatchPostRole, updatePersonMatchPostNumber} = this.props
        let _this = this

        let sidePageName
        if (sidePageInfo.status == "personMatchPostEdit_callin") {
            sidePageName = "调入"
        }
        else {
            sidePageName = "兼职"
        }

        let tblContent = {
            "thead": { "name1": "序号", "name2": "姓名", "name3": "用户名", "name4": "部门", "name5": "职位", "name6": "操作" },
            "tbody": []
        }
        for (var i = 0; i < selectUserData.length; i++) {
            let _d = selectUserData[i]
            tblContent.tbody.push({
                "value1": (pageInfo.personMatchPostEditPager.index - 1) * pageInfo.personMatchPostEditPager.size + (i + 1),
                "value2": _d.cnName,
                "value3": _d.loginUid,
                "value4": _d.unitName,
                "value5": _d.positionNames,
                "fns": [{
                    "name": sidePageName,
                    "fn": function () {

                        let _positionId = sidePageInfo.gateWay.positionId.split("-")[0]
                        let jsonParma = {
                            staffId: _d.staffId,
                            positionId: _positionId,
                            dutyType: sidePageName == "调入" ? 1 : 2
                        }
                        waiteMsg("数据提交中,请稍等...")
                        TUI.platform.post("/duty", jsonParma, function (result) {
                            if (result.code == 0) {
                                let _data = result.data
                                if(pageInfo.personMatchPostEditPager.sum+1>pageInfo.personMatchPostEditPager.size){
                                    //要更新sum
                                }
                                else{
                                    pushPersonMatchPostRole(_data)
                                }
                                updatePersonMatchPostNumber({
                                    positionId: _positionId,
                                    type: "add"
                                })
                                _this._closeSidePage()
                                successMsg("数据提交成功")
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
                    <span><img src={singleLeft} onClick={this._closeSidePage.bind(this)} />{sidePageName}列表</span>
                </div>
                <div>
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,100,150,150,0,80" />
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
    selectUserData: "personMatchPost.selectUserData",
    pageInfo: "publicInfo.pageInfo",
}, PersonMatchPostEditSelect)
