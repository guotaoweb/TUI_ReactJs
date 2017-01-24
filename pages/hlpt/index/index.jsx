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
import help1 from "!url!./img/help/1.png"
import help2 from "!url!./img/help/2.jpg"
import help3 from "!url!./img/help/3.jpg"
import help4 from "!url!./img/help/4.jpg"
import help5 from "!url!./img/help/5.png"
import help6 from "!url!./img/help/6.png"
import help7 from "!url!./img/help/7.png"
import help8 from "!url!./img/help/8.png"
import help9 from "!url!./img/help/9.png"
import help10 from "!url!./img/help/10.png"
import help11 from "!url!./img/help/11.png"

class Index extends React.Component {
  render() {
    const {children, odata, router} = this.props
    let multMenuType = "nocheck"
    if (window.location.href.indexOf("orgnization") > -1) {
      multMenuType = "edit"
    }
    let allWidth = document.documentElement.clientWidth - 120
    let allHeight = document.documentElement.clientHeight - 300
    //style={{width:allWidth+"px",height:allHeight+"px"}}
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
        <ModalDialog id="help" title="帮助说明">
          <div className="t-modalDialog_building1" style={{ width: allWidth + "px" }}>
            <ul className="helpdoc">
              <li>
                <p>1.进入组织职位人员管理</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>如果用户有组织职位人员管理模块权限，可通过桌面端主菜单进入组织职位人员管理模块。</p>
                  <img src={help1} />
                </div>
              </li>
              <li>
                <p>2.组织职位人员管理介绍</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>组织职位人员管理模块包括功能菜单区、导航栏和功能操作区。功能菜单会根据用户权限显示相应的功能项，点击功能菜单可在功能操作区进行相应的功能操作。导航栏显示当前用户信息以及正在使用的功能项。</p>
                  <img src={help2} />
                </div>
              </li>
              <li>
                <p>3.组织架构维护</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>维护人员可以查看组织架构树，并可搜索、新增、删除、编辑组织；</p>
                  <img src={help3} />
                </div>
              </li>
              <li>
                <p>4.人员信息维护</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>维护人员可以根据组织架构树查看组织下的人员列表，可查看人员详细信息，可新增、编辑、删除人员；</p>
                  <img src={help4} />
                </div>
              </li>
              <li>
                <p>5.人员信息维护-职位信息</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>选择用户列表【操作】列的【编辑】进入用户编辑界面，在【职位信息】页可以查看到该用户的所有部门及职位信息列表，可在【操作】的【设为主职】设置该用户的主职。</p>
                  <img src={help5} />
                </div>
              </li>
              <li>
                <p>6.职位维护</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>职位维护会以组织架构的方式显示各个组织下的职位列表，可新增、编辑、删除职位。</p>
                  <img src={help6} />
                </div>
              </li>
              <li>
                <p>7.职位维护-设置角色</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>在职位列表中点击【编辑】进入职位设置界面，再选择【角色设置】选项卡，可以看到该职位的角色列表，可以对角色进行新增、编辑和删除操作。</p>
                  <img src={help7} />
                </div>
              </li>
              <li>
                <p>8.人职匹配</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>人职匹配可以进行人员与职位相关操作，可通过兼职、调入等调整人员职位以及设置人员角色。点击设置可查看该职位下的所有员工以及他们的角色。</p>
                  <img src={help8} />
                </div>
              </li>
              <li>
                <p>9.人职匹配-调入/兼职</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>在指定职位的列表选择【设置】进入职位的人员列表，点击上面的【兼职】或【调入】进入调入/兼职列表。在搜索栏输入要调入用户的姓名或用户名并搜索，会列出搜索到的用户，点击操作栏的【兼职】/【调入】则会将该用户兼职或调入到该职位。</p>
                  <img src={help9} />
                </div>
              </li>
              <li>
                <p>10.人职匹配-设置角色</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>点击人员列表操作栏的【设置角色】进入设置角色界面，在角色列表【选择】要设置的角色即完成了角色设置。</p>
                  <img src={help10} />
                </div>
              </li>
              <li>
                <p>11.权限管理</p>
                <div className="showcontent" style={{ display: "none" }}>
                  <p>权限管理一般给超级管理员使用，用以设置用户使用该系统的权限。权限管理包括【数据权限】和【功能权限】，数据权限是为用户指定能维护哪些数据，功能权限是为用户指定能使用哪些功能。</p>
                  <img src={help11} />
                </div>
              </li>
            </ul>
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
        id: "orgnizationEdit",
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
        id: "orgnizationEdit",
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

  componentDidMount() {
    let $helpLi = document.getElementsByClassName("helpdoc")[0].getElementsByTagName("li")
    for (var i = 0; i < $helpLi.length; i++) {
      var $h = $helpLi[i]

      $h.addEventListener("click", function () {
        let $c = this.getElementsByClassName("showcontent")[0]
        if ($c.style.display == "none") {
          $c.style.display = "block"
        }
        else {
          $c.style.display = "none"
        }
      })

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


            // <img src={building} />
            // <p>==建设中==</p>