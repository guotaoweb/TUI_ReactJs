//图片
import singleLeft from "!url!./img/singleLeft.png"

//组件
import Content from "Content"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, {clearCheckBox, updateCheckBoxStatus} from "MultyMenu"
import SidePage, {openSidePage, closeSidePage} from "SidePage"
import {openDialog, closeDialog} from "Dialog"
import Pager, {pageLoadCompelte} from "Pager"
import EditSurvy from "./survyList.editEmpty"



class SurvyList extends React.Component {
    render() {
        const {survyList, errorMsg, userId, history, sidePageInfo, pageInfo} = this.props
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "名称", "name3": "创建时间", "name4": "操作" },
            "tbody": []
        }
        for (var i = 0; i < survyList.length; i++) {
            let _d = survyList[i]

            tblContent.tbody.push({
                "value1": (pageInfo.index - 1) * pageInfo.size + (i + 1),
                "value2": _d.Name,
                "value3": _d.UpdateTime,
                "fns": [{
                    "name": "编辑",
                    "fn": function () {
                        openSidePage(_this, {
                            status: "editAdmin",
                            type: 1
                        })
                        // TUI.platform.get("/projectteam/team/" + _d.team_id, function (result) {
                        //   if (result.code == 0) {
                        //     var _d = result.datas[0]
                        //     updateVTeamInfo({
                        //       id: _d.team_id,
                        //       code: _d.team_code,
                        //       name: _d.team_name,
                        //       note: _d.team_note
                        //     })

                        //     openSidePage()
                        //   }
                        //   else {
                        //     errorMsg(config.ERROR_INFO[result.code]);
                        //   }
                        // })
                    }
                }, {
                    "name": "权限",
                    "fn": function () {
                        updateSidePageInfo({
                            status: "vteamUserList",
                            width: "400"
                        })
                        openSidePage()

                        TUI.platform.get("/projectteam/permission/getpersons/" + _d.team_id, function (result) {
                            if (result.code == 0) {
                                let selectedArry = []
                                for (let i = 0; i < result.datas.length; i++) {
                                    let d = result.datas[i];
                                    selectedArry.push(d.power_value)
                                }
                                updateVTeamId(_d.team_id)
                                addOSData(selectedArry)
                            }
                            else {
                                //errorMsg(TUI.ERROR_INFO[result.code]);
                            }
                        })

                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        var delFetch = function () {
                            TUI.platform.post("/projectteam/team", {
                                "uid": userId,
                                "team_id": _d.team_id,
                                "upper_team_id": "-1",
                                "del_flag": "y",
                                "opertype": "U"
                            }, function (result) {
                                if (result.code == 0) {
                                    delTeamList(_d.team_id)
                                }
                                else {
                                    errorMsg(TUI.ERROR_INFO[result.code]);
                                }
                            })
                        }

                        openDialog(_this, "是否确定删除【" + _d.team_name + "】", delFetch)
                    }
                }]
            })
        }

        return (
            <div>
                <Content txt="问卷列表" addHref={this.addSurvy.bind(this)}>
                    <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,0,220,180" />
                    <Pager fn={this.pageFn.bind(this)} />
                </Content>
                <SidePage>
            
                    <EditSurvy key="survyedit" />
                </SidePage>
            </div>
        )
    }

    pageFn(index) {
        openDialog()
        const {pageInfo, updateSurvy, updatePageInfo} = this.props
        TUI.platform.get(pageInfo.url.replace("{0}", index), function (result) {
            if (result.code == 0) {
                updateSurvy(result.datas)
                updatePageInfo({
                    index: index,
                    size: 7,
                    sum: 10,
                    url: pageInfo.url
                })
            }
            else {
                updateSurvy([])
            }
        })
    }

    componentDidMount() {
        const {addSurvy, errorMsg, updatePageInfo} = this.props
        let _this = this
        setTimeout(function () {
            openSidePage(_this, {
                status: "editAdmin"
            })

            // openDialog(_this, { placeholder: "请输入数字", value: "这是内容" }, function () {
            //     alert("a")
            // })
            // let _test = function(){
            //     _this.test()
            // }
            // openDialog(_this,{title:"创建问题",data:[{name:"第一个",fn:_test},{name:"第二个",url:"2"},{name:"第三个",url:"3"},{name:"第三个",url:"3"},{name:"第三个",url:"3"}]})
        }, 500)
        //获取虚拟组织列表
        //if (!vteamList) {
        TUI.platform.get("/Vote", function (result) {
            if (result.code == 0) {
                addSurvy(result.datas)
                updatePageInfo({
                    index: 1,
                    size: 7,
                    sum: 10,
                    url: ""
                })
            }
            else if (result.code == 9) {
                addSurvy([])
            }
            else {
                errorMsg(TUI.ERROR_INFO[result.code]);
            }
        })
    }

    addSurvy() {
        openSidePage(this, {
            status: "addSurvy",
            width: ""
        })
    }

    test(){
        alert("test")
    }
}


export default TUI._connect({
    survyList: "survyList.data",
    userId: "publicInfo.userInfo.userId",
    sidePageInfo: "publicInfo.sidePageInfo",
    pageInfo: "publicInfo.pageInfo"
}, SurvyList)