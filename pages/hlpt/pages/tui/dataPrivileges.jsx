import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content from "../../components/Layout/content"
import Btn from "../../components/Btn/index"
import Table from "../../components/Table/index"
import MultyMenu, { clearCheckBox, updateCheckBoxStatus } from "../../components/MultyMenu/index"
import SidePage, { openSidePage, closeSidePage } from "../../components/SidePage/index"
import { openDialog, closeDialog } from "../../components/Dialog/index"
import DataPrivilegesMenu from "./dataPrivileges.selectedMenu"
import Pager, { pageLoadCompelte } from "../../components/Pager/index"
import { openLoading, closeLoading } from "../../components/Loading/index"

class DataPrivileges extends Component {
    render() {
        const {
            dataPrivileges,
            errorMsg,
            userId,
            history,
            sidePageInfo,
            pageInfo,
            addSelectedData,
            addOSData
        } = this.props

        let _this = this
        let SidePageContent
        if (sidePageInfo.status == "getDataPrivileges") {
            SidePageContent = <DataPrivilegesMenu key="dataPrivilegesMenu" />
        }


        let tblContent = {
            "thead": { "name1": "序号", "name2": "姓名", "name3": "用户", "name4": "部门", "name5": "操作" },
            "tbody": []
        }

        for (var i = 0; i < dataPrivileges.length; i++) {
            let _d = dataPrivileges[i]

            //   let _admins = []
            //   for (var j = 0; j < _d.admins.length; j++) {
            //     _admins.push(_d.admins[j].username)
            //   }
            tblContent.tbody.push({
                "value1": (pageInfo.index - 1) * pageInfo.size + (i + 1),
                "value2": _d.cnName,
                "value3": _d.loginUid,
                "value4": _d.unitName,
                "fns": [{
                    "name": "权限",
                    "fn": function () {
                        openSidePage(_this, {
                            status: "getDataPrivileges",
                            width: "500",
                            gateWay: _d.loginUid
                        })

                        TUI.platform.get("/dataprivileges/" + _d.loginUid, function (result) {
                            if (result.code == 0) {
                                let selectedIds = []
                                for (let i = 0; i < result.data.length; i++) {
                                    let $d = result.data[i]
                                    selectedIds.push($d.id)
                                }
                                addOSData(selectedIds)
                            }
                            else if (result.code == 9) {
                                addOSData("")
                            }
                            else {
                                errorMsg(TUI.ERROR_INFO[result.code]);
                            }
                        }, this)


                    }
                }]
            })
        }

        return (
            <div>
                <Content txt="人员列表">
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,150,150,0,80" />
                    <Pager fn={this.pageFn.bind(this)} />
                </Content>
                <SidePage>
                    <div>
                        {SidePageContent}
                    </div>
                </SidePage>
            </div>
        )
    }

    pageFn(index, loadComplete) {
        const {pageInfo, addDataPrivileges, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.url.replace("{0}", index * pageInfo.size), function (result) {
            if (result.code == 0) {
                addDataPrivileges(result.data)
                updatePageInfo({
                    index: index,
                    size: 10,
                    sum: result._page.total,
                    url: pageInfo.url
                })
                loadComplete()
            }
            else {
                addDataPrivileges([])
            }
        })
    }

    componentDidMount() {
        const {addDataPrivileges, updateOData, orgnization, updatePageInfo, updateSearchInfo, userId, errorMsg} = this.props

        //获取数据权限列表
        openLoading()
        TUI.platform.get("/staffs/?isData=1&from=0&limit=10", function (result) {
            if (result.code == 0) {
                addDataPrivileges(result.data)
                updatePageInfo({
                    index: 1,
                    size: 10,
                    sum: result._page.total,
                    url: "/staffs/?isData=1&from={0}&limit=10"
                })
                //更新搜索信息
                updateSearchInfo({
                    key: "",
                    name: "dataPrivileges",
                    info: "请输入关键字(用户名)"
                })

                closeLoading()
            }
            else if (result.code == 9) {
                addDataPrivileges([])
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        }, this)

        //获取组织机构
        TUI.platform.get("/units/tree/0", function (result) {
            if (result.code == 0) {
                let _d = []
                for (var i = 0; i < result.data.length; i++) {
                    var $d = result.data[i];
                    _d.push({
                        id: $d.id,
                        name: $d.name,
                        type: $d.unitCode,
                        isHadSub: $d.isleaf,
                        deep: "1",
                        sId: $d.unitCode
                    })
                }
                updateOData(_d)
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })

    }
}


export default TUI._connect({
    dataPrivileges: "dataPrivileges.data",
    orgnization: "orgnizations.odata",
    userId: "publicInfo.userInfo.userId",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, DataPrivileges)