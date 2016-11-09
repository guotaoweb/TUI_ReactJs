import Side from 'Side'
import * as config from "config"

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

class _Side extends React.Component {
    render() {
        const {data, sideStatus, userId} = this.props

        // let list = [{
        //   name: "组织管理",
        //   url: "#",
        //   icon: zzjg,
        //   sicon: zzjgs,
        //   sub: [{
        //     name: "组织架构维护",
        //     url: config.ROOTPATH + "orgnization"
        //   }, {
        //     name: "用户信息维护",
        //     url: config.ROOTPATH + "userMaintain"
        //   }]
        // }, {
        //   name: "职位管理",
        //   url: "#",
        //   icon: position,
        //   sicon: positions,
        //   sub: [{
        //     name: "职位族维护",
        //     url: config.ROOTPATH + "positionGroup"
        //   }, {
        //     name: "职位维护",
        //     url: config.ROOTPATH + "positionMaintain"
        //   }, {
        //     name: "人职匹配",
        //     url: config.ROOTPATH + "personMatchPost"
        //   }]
        // }, {
        //   name: "权限管理",
        //   url: "#",
        //   icon: rote,
        //   sicon: rotes,
        //   sub: [{
        //     name: "数据权限管理",
        //     url: config.ROOTPATH + "dataPrivileges"
        //   }]
        // }, {
        //   name: "其它",
        //   url: "#",
        //   icon: other,
        //   sicon: others,
        //   sub: [{
        //     name: "虚拟组织管理",
        //     url: config.ROOTPATH + "vteam"
        //   }]
        // }]

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
                        url: config.ROOTPATH + $c.ext1
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
            <Side list={list} title="" addFn={this.addFn} />
        )
    }

    addFn(_this, id) {
        // const {data, addSide, errorMsg} = _this.props
        // TUI.platform.get("/menu/tree/" + id, function(result) {
        //     if (result.code == 0) {
        //         let children = []

        //         for (var j = 0; j < result.data.length; j++) {
        //             var $s = result.data[j];
        //             children.push({
        //                 id: $s.id,
        //                 name: $s.name,
        //                 isHadSub: $s.isleaf,
        //                 type: $s.id,
        //                 ext1: $s.url,
        //                 deep: 2,
        //                 sId: id
        //             })
        //         }

        //         for (var i = 0; i < data.length; i++) {
        //             var $d = data[i]
        //             console.info($d.id + "," + id)
        //             if ($d.id == id) {
        //                 $d.children = children
        //             }
        //         }

        //         addSide(data)
        //     }
        //     else {
        //         errorMsg(Config.ERROR_INFO[result.code]);
        //     }
        // }, _this)
    }

    componentDidMount() {
        const {addSide, errorMsg} = this.props
        TUI.platform.get("/menu/tree", function(result) {
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
    userId: "publicInfo.userInfo.id"
}, _Side)