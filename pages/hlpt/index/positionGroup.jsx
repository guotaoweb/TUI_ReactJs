import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'

//图片
import minus from "!url!../../../components/MultyMenu/img/minus.png"

//组件
import Content2 from "Content2"
import Content3 from "Content3"
import Btn from "Btn"
import Table from "Table"
import MultyMenu, { editFn } from "MultyMenu"
import SidePage, { openSidePage, closeSidePage } from "SidePage"
import Pager from "Pager"
import { openDialog, closeDialog } from "Dialog"
import PositionTypeEdit from "./positionGroup.positionType"
import PositionFamilyEdit from "./positionGroup.positionFamily"
import JobFamilyEdit from "./positionGroup.jobFamily"
import { openLoading, closeLoading } from "Loading"


class PositionGroup extends React.Component {
  render() {
    const { type, errorMsg, msg, updateSidePageInfo, sidePageInfo, data, pageInfo, updateDialog, updatePageInfo, hasVerticalScroll} = this.props

    let _this = this
    let editContent
    let editTxt
    if (type == "2") {
      editTxt = "职位序列管理"
      editContent = <JobFamilyEdit />
    }
    else if (type == "1") {
      editTxt = "职位族管理"
      editContent = <PositionFamilyEdit />
    }
    else {
      editTxt = "职位类别管理"
      editContent = <PositionTypeEdit />
    }
    return (
      <div>
        <Content3>
          <ReactIScroll iScroll={iScroll} options={{
            mouseWheel: true,
            scrollbars: hasVerticalScroll
          }} onRefresh={this.onScrollRefresh.bind(this)}>
            <div>
              <MultyMenu data={data} type="edit" lastdeep="2" color="white" addMenu={this.addMenu.bind(this)} delMenu={this.delMenu.bind(this)} openSubMenu={this.openSubMenu.bind(this)} clickMenu={this.clickSubMenu.bind(this)} style={{ marginTop: "20px" }} />
              <br />
            </div>
          </ReactIScroll>
          <div></div>
          <div className="t-content_t">
            <span>{editTxt}</span>
          </div>
          <div>
            {editContent}
          </div>
        </Content3>
      </div>
    )
  }

  onScrollRefresh(iScrollInstance, $this) {
    this.props.setCanVerticallyScroll(iScrollInstance.hasVerticalScroll)
  }

  componentDidMount() {
    const {addPositionGroup, params, errorMsg, updateSearchInfo} = this.props
    const _this = this

    openLoading()
    TUI.platform.get("/positionTypes", function (result) {
      if (result.code == 0) {
        let main = []
        for (var i = 0; i < result.data.length; i++) {
          var $e = result.data[i];
          main.push({
            id: $e.typeCode,
            name: $e.typeName,
            isHadSub: "0",
            type: "0",
            deep: 1,
            btns: "A",
            ext1: $e.typeName
          })
        }

        addPositionGroup(main)
      }
      else {
        errorMsg(Config.ERROR_INFO[obj.code]);
      }
    })

    //更新搜索信息
    updateSearchInfo({
      key: "",
      name: "positionGroup",
      info: "请输入关键字"
    })

    closeLoading()

    let _didMount = function () {
      //默认展开一个sub
      document.querySelector(".t-multyMenu_list_li").querySelector(".sub").style.display = "block"
      let $img = document.querySelector(".t-multyMenu_list_main").getElementsByTagName("img")[1]
      let $sub = $img.parentNode.parentNode.parentNode
      $sub.style.backgroundColor = "rgba(250,250,250,0.5)"
      $sub.style.borderRadius = "3px"

      let id = $sub.getAttribute("data-id")
      TUI.platform.get("/positionType/" + id, function (result) {
        if (result.code == 0) {
          let _editInfo = result.data
          _editInfo["infoName"] = "positionTypeInfo"
          _this.props.addEditInfo(_editInfo)
        }
        else {
          _this.props.errorMsg(Config.ERROR_INFO[result.code]);
        }
      })
    }
    setTimeout(_didMount, 250)
  }

  clickSubMenu($m) {
    let _this = this
    let type = $m.getAttribute("data-type")
    let code = $m.getAttribute("data-id")
    this.props.updatePositionType(type)
    let url
    if (type == "0") {
      url = "/positionType/" + code
    }
    else if (type == "1") {
      url = "/positionFamily/" + code
    }
    else {
      url = "/jobfamily/" + code
    }

    _this.props.updatePositionDeep($m.getAttribute("data-deep") ? $m.getAttribute("data-deep") : $m.getAttribute("data-id"))

    TUI.platform.get(url, function (result) {
      if (result.code == 0) {
        if (type == "0") {
          let _editInfo = result.data
          _editInfo["infoName"] = "positionTypeInfo"
          _this.props.addEditInfo(_editInfo)
        }
        else if (type == "1") {
          let _editInfo = result.data
          _editInfo["infoName"] = "positionFamilyInfo"
          _this.props.addEditInfo(_editInfo)

        }
        else {
          let _editInfo = result.data
          _editInfo["infoName"] = "jobFamilyInfo"
          _this.props.addEditInfo(_editInfo)
        }
      }
      else {
        _this.props.errorMsg(Config.ERROR_INFO[result.code]);
      }
    })
  }

  openSubMenu(_data, id, deep, loadComplete) {

    let _this = this
    const {data, updatePageInfo, updateSearchInfo} = this.props

    for (let index = 0; index < _data.length; index++) {
      let d = _data[index]
      if (d.id == id) {
        let type = d.type
        //0 职位类别
        //1 职位族
        let url = ""
        if (type == "0") {
          url = "/positionFamilys/" + id
        }
        else if (type == "1") {
          url = "/jobfamilys/" + id
        }

        TUI.platform.get(url, function (result) {
          if (result.code == 0) {
            let children = []
            let $r = result.data
            for (let i = 0; i < $r.length; i++) {
              let $d = $r[i];
              let id = type == "0" ? $d.familyCode : $d.poid
              let name = type == "0" ? $d.familyName : $d.seqName
              let _btns = type == "1" ? "D" : "A/D"

              children.push({
                id: id,
                name: name,
                isHadSub: "0",
                type: parseInt(type) + 1,
                deep: parseInt(deep) + 1,
                btns: _btns,
                ext1: name
              })
            }
            d.children = children
            _this.props.updatePositionGroup(data)
            loadComplete()
          }
        })
        break
      }
    }
  }

  delMenu(params) {
    const {data, deldata, updateDialog} = this.props
    let _this = this
    let name = "该职位"
    if (params.type == "0") {
      name += "类别"
    }
    else if (params.type == "1") {
      name += "族"
    }
    else {
      name += "序列"
    }
    var delFn = function () {
      let url
      if (params.type == "0") {
        url = "/positionType/" + params.id
      }
      else if (params.type == "1") {
        url = "/positionFamily/" + params.id
      }
      else {
        url = "/jobfamily/" + params.id
      }
      if (params.type == "1") {
        TUI.platform.delete(url, function (result) {
          console.info(result)
          if (result.code == 0) {

            _this.delData(data, params.deep.split("-"))
            _this.props.successMsg(name + "删除成功")
          }
          else {
            _this.props.errorMsg(Config.ERROR_INFO[result.code]);
          }
        })
      }
      else {
        TUI.platform.patch(url, function (result) {
          console.info(result)
          if (result.code == 0) {

            _this.delData(data, params.deep.split("-"))
            _this.props.successMsg(name + "删除成功")
          }
          else {
            _this.props.errorMsg(Config.ERROR_INFO[result.code]);
          }
        })
      }
    }

    openDialog(_this, "是否确定删除" + name, delFn)
  }

  addMenu(params) {
    const {clearEditInfo,updatePositionType} = this.props
    let _type = parseInt(params.type) + 1

    if (_type == 0) {
      clearEditInfo({
        infoName:"positionTypeInfo"
      })
    }
    else if (_type == 1) {
      clearEditInfo({
        infoName:"positionFamilyInfo"
      })
    }
    else {
      clearEditInfo({
        infoName:"jobFamilyInfo"
      })
    }
    setTimeout(function () { updatePositionType(_type) }, 200)
  }

  delData(_data, deep) {
    //deep的格式是1-2-3,拆成数组
    //如果deep的length==1的话,就说明已经钻到底层了
    if (deep.length == 1) {
      for (let index = 0; index < _data.length; index++) {
        let d = _data[index]
        if (d.id == deep[0]) {
          _data.splice(index, 1)
          this.props.updatePositionGroup(this.props.data)
        }
      }
      return false
    }

    //钻到最底层
    for (var index = 0; index < _data.length; index++) {
      let d = _data[index]
      if (d.id == deep[0] && deep.length > 1) {
        deep.splice(0, 1)
        this.delData(d.children, deep)
      }
    }
  }
}

export default TUI._connect({
  pageInfo: "publicInfo.pageInfo",
  msg: "publicInfo.msgInfo.txt",
  sidePageInfo: "publicInfo.sidePageInfo",
  data: "positionGroup.data",
  type: "positionGroup.type",
  hasVerticalScroll: "orgnizationManage.hasVerticalScroll",
  editInfo:"formControlInfo.data"
}, PositionGroup)