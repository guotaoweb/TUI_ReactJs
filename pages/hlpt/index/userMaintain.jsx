
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'

//图片
import minus from "!url!../../../components/MultyMenu/img/minus.png"
import singleLeft from "!url!./img/singleLeft.png"
//组件
import UserMaintainEdit from "./userMaintain.edit"
import FormControls from "FormControls"
import Content3, { openContent3Loading, closeContent3Loading } from "Content3"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, { editFn } from "MultyMenu"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import { openLoading, closeLoading } from "Loading"

class UserMaintain extends React.Component {

  render() {
    const {odata, pageInfo, sidePageStatus, hasVerticalScroll, data, addEditInfo} = this.props
    let _this = this
    let tblContent = {
      "thead": { "name1": "序号", "name2": "姓名", "name3": "用户名", "name4": "默认组织", "name5": "职位", "name6": "手机", "name7": "排序号", "name9": "操作" },
      "tbody": []
    }
    for (var i = 0; i < data.length; i++) {
      let _d = data[i]
      tblContent.tbody.push({
        "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
        "value2": _d.cnName,
        "value3": _d.loginUid,
        "value4": _d.unitName,
        "value5": _d.positionNames,
        "value6": _d.mobilePhone,
        "value7": _d.sort,

        "fns": [{
          "name": "编辑",
          "fn": function () {

            openSidePage(_this, {
              status: "editUserMaintain"
            })

            TUI.platform.get("/staff/" + _d.staffId, function (result) {
              if (result.code == 0) {
                let _data = result.data

                addEditInfo({
                  infoName: "userMaintainInfo",
                  uId: _data.staffId,//用户ID
                  user: _data.loginUid,//用户名
                  name: _data.cnName,//中文名
                  status: _data.status,//账户状态
                  mobile: _data.mobilePhone,//常用手机
                  shortNumber: _data.shortPhone,//短号码
                  fax: _data.fax,//传真
                  companyPhone: _data.telephone,//办公电话
                  companyAddress: _data.officeAddress,//办公地址
                  idCard: _data.userNumber,//身份证
                  orgnization: _data.unitId,//默认组织
                  wx: "",//微信号
                  sort: _data.sort,//排序号
                  isShow: _data.ext2,//是否显示
                  kind:_data.kind,
                  staffCode:_data.staffCode
                })
              }
              else if (result.code == 404) {
                addEditInfo({})
              }
              else {
                errorMsg(result.message)
              }
            })

          }
        }, {
          "name": "删除",
          "fn": function () {
            let delFetch = function () {
              TUI.platform.patch("/staff/" + _d.staffId, function (result) {
                if (result.code == 0) {
                  _this.props.successMsg("用户删除成功")
                  _this.props.deleteUserMaintain(_d.staffId)
                }
                else {
                  errorMsg(result.errors)
                }
              })
            }

            openDialog(_this, "是否确定删除该用户信息?", delFetch)
          }
        }]
      })
    }

    let addBtn
    if (this.props.orgnizationId) {
      addBtn = <Btn type="add" txt="新增" href={this.addUserMaintainBtn.bind(this)} style={{ float: "right" }} />
    }

    return (
      <div>
        <Content3>
          <ReactIScroll iScroll={iScroll} options={{
            mouseWheel: true,
            scrollbars: hasVerticalScroll
          }} onRefresh={this.onScrollRefresh.bind(this)}>
            <div>
              <MultyMenu data={odata} type="nocheck" lastdeep="6" color="white" clickMenu={this.clickMenu.bind(this)} openSubMenu={this.openSubMenu.bind(this)} style={{ marginTop: "20px" }} />
              <br />
            </div>
          </ReactIScroll>

          <div></div>
          <div className="t-content_t">
            <span>用户信息维护列表</span>
            {addBtn}
          </div>
          <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,100,100,0,0,120,70,80" />
          <Pager fn={this.pageFn.bind(this)} style={{ float: "right", marginRight: "5px" }} />
        </Content3>
        <SidePage>
          <UserMaintainEdit key="userMaintain_edit" />
        </SidePage>
      </div >
    )
  }

  onScrollRefresh(iScrollInstance, $this) {
    this.props.setCanVerticallyScroll(iScrollInstance.hasVerticalScroll)
  }

  componentDidMount() {
    let _this = this;

    const {addData, errorMsg, updatePageInfo, } = this.props
    this.props.refreshTable()
    openLoading()
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
            deep: 1,
            btns: "A/E"
          })
        }
        addData(node)


        let $clickMenu = document.getElementsByClassName("clickmenu")[0]
        let firtNodeId = $clickMenu.getAttribute("data-id")

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
                    deep: 2
                  })
                }

                d.children = children
                addData(_this.props.odata)
                $clickMenu.nextSibling.style.display = "block"
                let $img = $clickMenu.getElementsByTagName("img")[1]
                $img.setAttribute("data-status", "show")
                $img.setAttribute("src", minus)

                closeLoading()
              }
            }

          }
          else {
            _this.props.odata
          }
        })
      }
      else if (result.code == 404) {
        addData([])
      }
      else {
        errorMsg(result.message)
      }
    })


    //获取用户列表
    this.loadUser();
  }

  clickMenu($m) {
    let _this = this
    let $menuLi = document.getElementsByClassName("clickmenu")
    for (let j = 0; j < $menuLi.length; j++) {
      let $m1 = $menuLi[j];
      $m1.style.backgroundColor = ""
    }
    $m.style.backgroundColor = "rgba(250,250,250,0.5)"
    $m.style.borderRadius = "3px"

    let id = $m.getAttribute("data-id")
    let code = $m.getAttribute("data-type")
    _this.props.updateUserMaintainOrgnizationId(code)

    this.props.clearEditInfo({
      infoName: "userMaintainInfo"
    })
    openContent3Loading()
    this.loadUser(id)
    closeSidePage()
  }

  addPositionMaintainBtn() {
    openSidePage(this, {
      status: "addUserMaintain",
    })

    this.props.clearEditInfo({
      infoName: "userMaintainInfo"
    })
  }

  loadUser(id) {
    const {errorMsg,addUserMaintain, updatePageInfo, clearPageInfo, updateSearchInfo} = this.props
    let url = id ? "/staffs?unitId=" + id + "&from={0}&limit=10" : "/staffs?from={0}&limit=10"
    TUI.platform.get(url.replace("{0}", "0"), function (result) {
      if (result.code == 0) {
        addUserMaintain(result.data)
        updatePageInfo({
          index: 1,
          size: 10,
          sum: result._page.total,
          url: url
        })
        //更新搜索信息
        updateSearchInfo({
          key: id,
          name: "userMaintain",
          info: "输入关键字(用户名称或账号)"
        })
      }
      else if(result.code==404){
        addUserMaintain([])
        clearPageInfo()
      }
      else{
        errorMsg(result.message)
      }
      closeContent3Loading()
    })
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

  delData(data, deep, fn, _deep) {
    //deep的格式是1-2-3,拆成数组
    //如果deep的length==1的话,就说明已经钻到底层了
    if (deep.length == 1) {
      for (let index = 0; index < data.length; index++) {
        let d = data[index]
        if (d.id == deep[0]) {
          data.splice(index, 1)
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
        this.delData(d.children, deep, fn, _deep + 1)
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
            setTimeout(function () { loadComplete() }, 1000)
          }
        })
        break
      }
    }
  }


  pageFn(index, loadComplete) {
    const {pageInfo, addUserMaintain, updatePageInfo} = this.props
    TUI.platform.get(pageInfo.index.url.replace("{0}", pageInfo.index.size * (index - 1)), function (result) {
      if (result.code == 0) {
        addUserMaintain(result.data)
        updatePageInfo({
          index: index
        })
        loadComplete()
      }
      else {
        addUserMaintain([])
      }
    })

  }

  addUserMaintainBtn() {
    openSidePage(this, {
      status: "addUserMaintain",

    })
  }
}

export default TUI._connect({
  odata: "orgnizationManage.data",
  data: "userMaintain.data",
  sidePageInfo: "publicInfo.sidePageInfo",
  pageInfo: "publicInfo.pageInfo",
  hasVerticalScroll: "orgnizationManage.hasVerticalScroll",
  searchInfo: "publicInfo.searchInfo",
  orgnizationId: "userMaintain.orgnizationId"
}, UserMaintain)