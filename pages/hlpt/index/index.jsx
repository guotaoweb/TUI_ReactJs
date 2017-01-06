import '!style!css!postcss!sass!./style.scss'
import minus from "!url!../../../components/MultyMenu/img/minus.png"
import Side from "./side"
import Container from "./container"
import TipTool from "TipTool"
import Dialog, { openDialog } from "Dialog"
import ModalDialog from "ModalDialog"
import Loading from "Loading"
import SideContent from "SideContent"
import MultyMenu from "MultyMenu"
import { openContentLoading, closeContentLoading } from "Content"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import building from "!url!../../../components/ModalDialog/img/building.png"

class Index extends React.Component {
  render() {
    const {children, odata, router} = this.props
    let multMenuType = "nocheck"
    if (window.location.href.indexOf("orgnization") > -1) {
      multMenuType = "edit"
    }
    let allWidth = document.documentElement.clientWidth-120
    let allHeight = document.documentElement.clientHeight-300

    return (
      <div className="t-page">
        <Side />
        <SideContent>
          <MultyMenu
            data={odata}
            type={multMenuType}
            lastdeep="6"
            color="white"
            clickMenu={this.clickMenu.bind(this)}
            openSubMenu={this.openSubMenu.bind(this)}
            addMenu={this.addMenu.bind(this)}
            editMenu={this.editMenu.bind(this)}
            delMenu={this.delMenu.bind(this)}
            />
        </SideContent>
        <Container>
          {children}
        </Container>
        <TipTool />
        <Dialog />
        <ModalDialog id="help">
          <div className="t-modalDialog_building" style={{width:allWidth+"px",height:allHeight+"px"}}>
            <img src={building} />
            <p>==建设中==</p>
          </div>
        </ModalDialog>
        <ModalDialog id="quickKey" title="系统快捷键">
          <div style={{ width: "500px", padding: "10px" }}>
            <table className="qkeytbl" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <td>按键</td>
                  <td>功能说明</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SHIFT+A</td>
                  <td>用户信息维护</td>
                </tr>
                <tr>
                  <td>SHIFT+B</td>
                  <td>组织架构维护</td>
                </tr>
                <tr>
                  <td>SHIFT+D</td>
                  <td>职位维护</td>
                </tr>
                <tr>
                  <td>SHIFT+Q</td>
                  <td>人职维护</td>
                </tr>
                <tr>
                  <td>SHIFT+H</td>
                  <td>帮助说明</td>
                </tr>
                <tr>
                  <td>SHIFT+V</td>
                  <td>关于我们</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ModalDialog>
        <Loading />
      </div>
    )
  }

  componentDidUpdate(nextProps) {
    if (this.props.userInfo.id != nextProps.userInfo.id) {
      this.loadTree()
    }
  }

  loadTree() {
    const {
      addData,
      errorMsg,
      addSubList,
      updatePageInfo,
      updateSideContentInfo,
      userInfo
    } = this.props
    let _this = this

    //获取组织根节点,且默认展开第一个父节点
    TUI.platform.get("/units/tree/0", function (result) {
      if (result.code == 0) {
        let node = []
        for (let index = 0; index < result.data.length; index++) {
          let _d = result.data[index];
          node.push({
            id: _d.id,
            name: _d.name,
            type: _d.unitCode,
            isHadSub: _d.isleaf,
            ext1: _d.unitLevel,
            num: "",
            deep: 0,
            btns: "A/E"
          })
        }
        addData(node)


        let $clickMenu = document.getElementsByClassName("t-sidecontent")[0].getElementsByClassName("clickmenu")[0]
        $clickMenu.getElementsByTagName("a")[0].style.backgroundColor = "rgba(250,250,250,0.5)"
        $clickMenu.getElementsByTagName("a")[0].style.borderRadius = "3px"
        let firtNodeId = $clickMenu.getAttribute("data-id")
        let firstRelateId = $clickMenu.getAttribute("data-deep") ? $clickMenu.getAttribute("data-deep") : firtNodeId
        let firstUnitCode = $clickMenu.getAttribute("data-type")


        // _this.props.updateOrgnizationRelateId({
        //   relateId: firstRelateId,//级联的关系ID
        //   unitCode: firstUnitCode //上级的code
        // })

        updateSideContentInfo({
          "key": TUI.fn.newGuid(),
          "id": firtNodeId,
          "type": firstUnitCode
        })

        //展开第一个节点的一级子节点
        TUI.platform.get("/units/tree/" + firtNodeId, function (result) {
          if (result.code == 0) {

            for (var i = 0; i < _this.props.odata.length; i++) {
              var d = _this.props.odata[i]
              if (d.id == firtNodeId) {
                let children = []
                for (var j = 0; j < result.data.length; j++) {
                  var $s = result.data[j];
                  children.push({
                    id: $s.id,
                    name: $s.name,
                    type: $s.unitCode,
                    isHadSub: $s.isleaf,
                    num: "",
                    ext1: $s.unitLevel,
                    deep: 1
                  })
                }

                d.children = children
                addData(_this.props.odata)
                $clickMenu.nextSibling.style.display = "block"
                let $img = $clickMenu.getElementsByTagName("img")[1]
                $img.setAttribute("data-status", "show")
                $img.setAttribute("src", minus)
              }
            }

          }
        })
      }
      else if (result.code == 404) {
        addData("-1")
      }
      else {
        errorMsg(result.message);
      }
    })
  }

  clickMenu(params) {
    let $menuLi = document.getElementsByClassName("t-sidecontent")[0].getElementsByClassName("clickmenu")
    for (let j = 0; j < $menuLi.length; j++) {
      let $m1 = $menuLi[j];
      $m1.getElementsByTagName("a")[0].style.backgroundColor = ""
    }

    let $a = $menuLi[0].getElementsByTagName("a")[0]
    $a.style.backgroundColor = "rgba(250,250,250,0.5)"
    $a.style.borderRadius = "3px"


    this.props.updateSideContentInfo({
      "key": TUI.fn.newGuid(),
      "id": params.id,
      "type": params.type,
      "name": params.name
    })

    this.props.updateOrgnizationRelateId({
      relateId: params.deep ? params.deep : id,//级联的关系ID
      unitCode: params.type //上级的code
    })
  }

  openSubMenu(_data, id, deep, loadComplete) {
    const {addData, odata} = this.props
    for (let index = 0; index < _data.length; index++) {
      let d = _data[index]

      if (d.id == id) {
        TUI.platform.get("/units/tree/" + id, function (result) {
          if (result.code == 0) {
            let children = []
            let _deep = parseInt(deep) + 1
            for (var j = 0; j < result.data.length; j++) {
              var $s = result.data[j];
              children.push({
                id: $s.id,
                name: $s.name,
                type: $s.unitCode,
                isHadSub: $s.isleaf,
                ext1: $s.unitLevel,
                num: "",
                deep: _deep
              })
            }
            d.children = children
            addData(odata)
            setTimeout(function () { loadComplete() }, 500)
          }
        })
        break
      }
    }
  }

  addMenu(params) {
    const {updateTeamInfo, clearEditInfo, detail} = this.props
    let _this = this

    closeSidePage()

    clearEditInfo({
      infoName: "orgnizationInfo"
    })

    setTimeout(function () {
      openSidePage(_this, {
        id:"orgnizationEdit",
        status: "addOrgnization",
        gateWay: params
      })
    }, 300)
  }


  editMenu(params) {
    let _this = this
    const {addEditInfo} = _this.props

    closeSidePage()
    setTimeout(function () {
      openSidePage(_this, {
        id:"orgnizationEdit",
        status: "editOrgnization",
        gateWay: params
      })
    }, 300)

    let ids = params.deep.split("-")

    _this.props.updateOrgnizationRelateId({
      relateId: _this.props.relateId + "-" + ids[ids.length - 1],//级联的关系ID
    })

    TUI.platform.get("/unit/" + ids[ids.length - 1], function (result) {
      if (result.code == 0) {
        var _d = result.data
        addEditInfo({
          infoName: "orgnizationInfo",
          id: _d.unitId,
          code: _d.unitCode,
          who: _d.unitName,
          upper: _d.superExt2,
          level: _d.unitLevel,
          unitName: _d.unitName,
          ext2: _d.ext2,
          bizType: _d.bizType,
          kind: _d.kind,
          status: _d.status,
          areaCode: _d.areaCode,
          email: _d.email,
          sort: _d.sort,
          remark: _d.remark,
          permission: _d.unitCode,
          globalCode: _d.globalCode,
          staffing: _d.staffing,
          statusName: _d.statusName
        })
      }
      _this.props.pushBreadNav({ name: _d.unitName })
      closeContentLoading()
    })
  }

  delMenu(params) {
    let _this = this

    let delFetch = function () {
      TUI.platform.patch("/unit/" + params.id, function (result) {
        if (result.code == 0) {
          _this.props.successMsg("组织删除成功")
          _this.props.delSubList({
            unitId: params.id
          })

          _this.deleteData(_this.props.odata, params.deep.split("-"))
        }
        else {
          _this.props.errorMsg(result.errors)
        }
      })
    }

    openDialog(_this, "是否确定删除此项？", delFetch)
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
          }
          fn(this.props.xnsubdata)
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

  deleteData(data, deep) {
    //deep的格式是1-2-3,拆成数组
    //如果deep的length==1的话,就说明已经钻到底层了
    if (deep.length == 1) {
      for (let index = 0; index < data.length; index++) {
        let d = data[index]
        if (d.id == deep[0]) {
          data.splice(index, 1)
          this.props.addData(this.props.odata)
        }
      }
      return false
    }



    //钻到最底层
    for (var index = 0; index < data.length; index++) {
      let d = data[index]
      if (d.id == deep[0] && deep.length > 1) {
        deep.splice(0, 1)
        this.deleteData(d.children, deep)
      }
    }
  }
}

export default TUI._connect({
  odata: "orgnizationManage.data",
  pageStatus: "manages.pageStatus",
  userInfo: "publicInfo.userInfo"
}, Index)

// {this.props.children}
// <ReactCSSTransitionGroup component="div"  transitionName={pageStatus}  transitionEnterTimeout={config.ANIMATE_TIME}  transitionLeaveTimeout={config.ANIMATE_TIME}>
//   {React.cloneElement(this.props.children, {
//     key: this.props.location.pathname
//   }) }
// </ReactCSSTransitionGroup>


