import Side from 'Side'
import { browserHistory } from 'react-router'
import { openLoading, closeLoading } from "Loading"
import { Link } from 'react-router'
//图片
import other from "!url!./img/other.png" //虚拟组织
import others from "!url!./img/other-s.png" //虚拟组织
import zzjg from "!url!./img/zzjg.png"
import zzjgs from "!url!./img/zzjg-s.png"
import position from "!url!./img/position.png"
import positions from "!url!./img/position-s.png"
import rote from "!url!./img/rote.png"
import rotes from "!url!./img/rote-s.png"
import yhwf from "!url!./img/yhwf.png"
import yhwfs from "!url!./img/yhwf-s.png"
import common from "!url!./img/common.png"
import commons from "!url!./img/common-s.png"

class _Side extends React.Component {
    render() {
        const {data, sideStatus, userId} = this.props

        let list = []

        for (let i = 0; i < data.length; i++) {
            let $d = data[i]
            let $s = []

            if ($d.children) {
                for (var j = 0; j < $d.children.length; j++) {
                    var $c = $d.children[j];
                    $s.push({
                        id: $c.id,
                        name: $c.name,
                        url: Config.ROOTPATH + $c.ext1
                    })
                }
            }
            list.push({
                id: $d.id,
                name: $d.name,
                url: $d.ext1 ? $d.ext1 : "#",
                icon: this._getImg($d.name),
                sicon: this._getImg($d.name + "s"),
                sub: $s
            })
        }




        return (
            <Side list={list} openSideUrlList={["orgnization","userMaintain", "positionMaintain", "personMatchPost"]} title="" addFn={this.addFn} />
        )
    }


    componentDidUpdate(nextProps) {
        if (this.props.userInfo.id != nextProps.userInfo.id) {
            this.loadMenuTree()
        }
        let commonList0 = this.props.commonList,
            commonList1 = nextProps.commonList
        if (commonList0.length > 0) {
            if (commonList0.length != commonList1.length) {
                this.loadCommonList()
            }
            else {
                if (commonList0[0].url != commonList1[0].url) {
                    this.loadCommonList()
                }
            }
            return true
        }
        else {
            false
        }
    }

    loadCommonList() {
        const {commonList, data, addSide} = this.props
        let children = []
        for (var i = 0; i < commonList.length; i++) {
            var $c = commonList[i];
            children.push({
                ext1: $c.url.substring($c.url.lastIndexOf("/")+1),
                name: $c.name
            })
        }
        for (var j = 0; j < data.length; j++) {
            var $s = data[j]

            if ($s.id == "45890800-48a8-00ff-dc76-25792b7f18d5") {
                $s.children = children
                addSide(data)
            }
        }

    }

    loadMenuTree() {
        const {addSide, errorMsg} = this.props

        TUI.platform.get("/menu/tree", function (result) {
            if (result.code == 0) {
                let list = [],
                    url = ""
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
                        if (!url) {
                            url = $c.url
                        }
                    }

                }
                let USER_ID = TUI.fn.requestParam("uId")
                if (USER_ID) {
                    browserHistory.push(Config.ROOTPATH + url)
                }
                closeLoading()

                if (list.length > 1) {
                    //常用功能的ID是固定的
                    list.push({
                        id: "45890800-48a8-00ff-dc76-25792b7f18d5",
                        name: "常用功能",
                        ext1: "#",
                        children: []
                    })
                }

                addSide(list)
            }
            else {
                errorMsg(Config.ERROR_INFO[result.code]);
            }
        }, this)
    }

    getImg(src) {
        switch (src) {
            case "other":
                return other
            case "others":
                return others
            case "zzjg":
                return zzjg
            case "zzjgs":
                return zzjgs
            case "position":
                return position
            case "positions":
                return positions
            case "rote":
                return rote
            case "rotes":
                return rotes
            case "yhwf":
                return yhwf
            case "yhwfs":
                return yhwfs
            default:
                return other
        }
    }
    _getImg(src) {
        switch (src) {
            case "其他":
                return other
            case "其他s":
                return others
            case "组织管理":
                return zzjg
            case "组织管理s":
                return zzjgs
            case "职位管理":
                return position
            case "职位管理s":
                return positions
            case "权限管理":
                return rote
            case "权限管理s":
                return rotes
            case "常用功能":
                return common
            case "常用功能s":
                return commons
            case "yhwf":
                return yhwf
            case "yhwfs":
                return yhwfs
            default:
                return other
        }
    }
}

export default TUI._connect({
    data: "sideList.data",
    sideStatus: "publicInfo.sideStatus",
    userId: "publicInfo.userInfo.id",
    userInfo: "publicInfo.userInfo",
    commonList: "publicInfo.commonMenu"
}, _Side)