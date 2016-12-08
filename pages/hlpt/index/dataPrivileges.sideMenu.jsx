import Btn from "Btn"
import { closeSidePage } from "SidePage"
import MultyMenu from "MultyMenu"

import singleLeft from "!url!./img/singleLeft.png"

class DataPrivilegesSideMenu extends React.Component {
    render() {
        const {data, sdata, updateOData, hasVerticalScroll} = this.props

        return (
            <div key="content2_userList" >
                <div className="t-content_t">
                    <span><img src={singleLeft} onClick={this._closeSidePage.bind(this)} />菜单</span>
                    <Btn style={{ float: "right" }} txt="保存" href={this.saveSideSelected.bind(this)} />
                </div>
                <div>
                    <MultyMenu data={data} sdata={sdata} openSubMenu={this.openSubMenu.bind(this)} type="allcheck" lastdeep="5" color="dark" style={{ marginTop: "10px" }} />
                </div>
            </div>
        )
    }

    componentDidMount() {
        const {addSideData,errorMsg} = this.props

        TUI.platform.get("/menu/qxTree", function (result) {
            if (result.code == 0) {
                let list = []
                for (var i = 0; i < result.data.length; i++) {
                    var $s = result.data[i];
                    list.push({
                        id: $s.id,
                        name: $s.name,
                        isHadSub: $s.isleaf,
                        type: $s.id,
                        num: "",
                        ext1: $s.url,
                        deep: 1,
                        sId: $s.id
                    })
                    list[i]["children"] = []
                    for (var j = 0; j < $s.children.length; j++) {
                        var $c = $s.children[j];
                        list[i].children.push({
                            id: $c.id,
                            name: $c.name,
                            isHadSub: $c.isleaf,
                            type: $c.id,
                            num: "",
                            ext1: $c.url,
                            deep: 2,
                            sId: $c.id
                        })
                    }

                }
                addSideData(list)
            }
            else if (result.code == 404) {
                addSideData("")
            }
            else {
                errorMsg(result.message)
            }
        }, this)
    }

    _closeSidePage() {
        const {clearOSData} = this.props
        clearOSData()
        closeSidePage()
    }


    saveSideSelected() {
        const {errorMsg, successMsg, userId, cUserId} = this.props

        let $checkbox = document.getElementsByClassName("menu_checkbox"),
            additem = [],
            _this = this

        for (let index = 0; index < $checkbox.length; index++) {
            let c = $checkbox[index];
            if (c.getAttribute("data-status") == "check") {

                let mid = c.getAttribute("data-mid")
                additem.push(mid)
            }

        }

        if (additem.length > 0) {

            TUI.platform.post("/menustaffs", {
                "loginUid": cUserId,
                "menustaffs": additem.join(",")
            }, function (result) {
                if (result.code == 0) {
                    successMsg("权限分配成功")
                    _this._closeSidePage()
                }
                else {
                    errorMsg(result.message)
                }
            })

        }
        else {
            _this._closeSidePage()
        }

    }

    openSubMenu(_data, id, deep, loadComplete) {
        const {data, addSide} = this.props
        for (let index = 0; index < _data.length; index++) {
            let d = _data[index]

            if (d.id == id) {
                TUI.platform.get("/menu/qxtree/" + id, function (result) {
                    if (result.code == 0) {
                        let children = []
                        let _deep = parseInt(deep) + 1
                        for (var j = 0; j < result.data.length; j++) {
                            var $s = result.data[j];
                            children.push({
                                id: $s.id,
                                name: $s.name,
                                isHadSub: $s.isleaf,
                                ext1: $s.url,
                                deep: _deep,
                                sId: id
                            })
                        }
                        d.children = children
                        loadComplete()
                        addSide(data)
                    }
                })
                break
            }
        }
    }
}

export default TUI._connect({
    data: "dataPrivileges.sideList",
    sdata: "sideList.sdata",
    userId: "publicInfo.userInfo.id",
    cUserId: "publicInfo.sidePageInfo.gateWay"
}, DataPrivilegesSideMenu)
