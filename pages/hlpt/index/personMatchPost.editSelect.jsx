import Table from "Table"
import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Search from "Search"

import singleLeft from "!url!./img/singleLeft.png"

class PersonMatchPostEditSelect extends React.Component {
    render() {
        const {
            pageInfo, 
            waiteMsg, 
            successMsg, 
            errorMsg, 
            selectUserData, 
            sidePageInfo, 
            pushPersonMatchPostRole, 
            updatePersonMatchPostNumber,
            updatePageInfo
        } = this.props

        let _this = this

        let sidePageName
        if (sidePageInfo.status == "personMatchPostEdit_callin") {
            sidePageName = "调入"
        }
        else {
            sidePageName = "兼职"
        }

        let tblContent = {
            "thead": { "name1": "序号", "name2": "姓名", "name3": "用户名", "name4": "部门", "name5": "职位",  "name6": "内部编码","name7": "操作" },
            "tbody": []
        }
        for (var i = 0; i < selectUserData.length; i++) {
            let _d = selectUserData[i]
            let _personMatchPostEditPager = ""
            if (pageInfo.personMatchPostEditPager) {
                _personMatchPostEditPager = (pageInfo.personMatchPostEditPager.index - 1) * pageInfo.personMatchPostEditPager.size + (i + 1)
            }
            else {
                _personMatchPostEditPager = (i + 1)
            }
            tblContent.tbody.push({
                "value1": _personMatchPostEditPager,
                "value2": _d.cnName,
                "value3": _d.loginUid,
                "value4": _d.unitName,
                "value5": _d.positionName,
                "value6": _d.staffCode,
                "fns": [{
                    "name": sidePageName,
                    "fn": function () {

                        let _positionId = sidePageInfo.gateWay.positionId.split("-")[0]
                        let jsonParam = {
                            positionId: _positionId
                        }
                        if(sidePageName == "调入"){
                            jsonParam["poid"] = _d.poid
                            jsonParam["dutyType"] = "1"
                        }
                        else{
                            jsonParam["dutyType"] = "2"
                            jsonParam["staffId"] = _d.staffId
                        }

                        waiteMsg("数据提交中,请稍等...")
                        TUI.platform.post("/duty", jsonParam, function (result) {
                            if (result.code == 0) {
                                let _data = result.data

                                pushPersonMatchPostRole(_data)

                                updatePersonMatchPostNumber({
                                    positionId: _positionId,
                                    type: "add"
                                })
                                _this._closeSidePage()
                                successMsg("数据提交成功")

                                updatePageInfo({
                                    id: "personMatchPostEditPager",
                                    sum: parseInt(pageInfo.personMatchPostEditPager.sum) + 1
                                })
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
                    <Search placeholder="请输入关键字(姓名、用户名、内部编码)搜索" style={{
                        border: "none",
                        borderBottom: "1px solid #ebebeb",
                        width: "98%",
                        margin: "auto"
                    }} fn={this._searchPersonMachPostEditSelect.bind(this)} />
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,100,150,0,0,200,80" />
                </div>
            </div>
        )
    }

    _searchPersonMachPostEditSelect(val) {
        const {addPersonMatchPostSelectUserData, errorMsg, updatePageInfo} = this.props
        let _url = "/dutys?loginName=" + val + "&from={0}&limit=10"
        //positionId=" + this.props.sidePageInfo.gateWay.positionId + "
        TUI.platform.get(_url.replace("{0}", 0), function (result) {
            if (result.code == 0) {
                addPersonMatchPostSelectUserData(result.data)
            }
            else if (result.code == 404) {
                addPersonMatchPostSelectUserData([])
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
    selectUserData: "personMatchPost.selectUserData",
    pageInfo: "publicInfo.pageInfo",
}, PersonMatchPostEditSelect)
