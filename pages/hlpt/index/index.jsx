import '!style!css!postcss!sass!./style.scss'
import minus from "!url!../../../components/MultyMenu/img/minus.png"
import Side from "./side"
import Container from "./container"
import TipTool from "TipTool"
import Dialog from "Dialog"
import ModalDialog from "ModalDialog"
import Loading from "Loading"
import SideContent from "SideContent"
import MultyMenu from "MultyMenu"
import { openContentLoading, closeContentLoading } from "Content"
class Index extends React.Component {
  render() {
    const {children, odata} = this.props

    return (
      <div className="t-page">
        <Side />
        <SideContent>
          <MultyMenu
            data={odata}
            type="nocheck"
            lastdeep="6"
            color="white"
            clickMenu={this.clickMenu.bind(this)}
            openSubMenu={this.openSubMenu.bind(this)}
            />
        </SideContent>
        <Container>
          {children}
        </Container>
        <TipTool />
        <Dialog />
        <ModalDialog />
        <Loading />
      </div>
    )
  }

  componentDidMount() {
    let _this = this;

    const {
      addData,
      errorMsg,
      addSubList,
      updatePageInfo,
      updateSideContentInfo
    } = this.props

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


        let $clickMenu = document.getElementsByClassName("clickmenu")[0]
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
          "key":TUI.fn.newGuid(),
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
      else {
        errorMsg(result.message);
      }
    })
  }

  clickMenu(params) {
    this.props.updateSideContentInfo({
      "key":TUI.fn.newGuid(),
      "id": params.id,
      "type": params.type
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
}

export default TUI._connect({
  odata: "orgnizationManage.data",
  pageStatus: "manages.pageStatus"
}, Index)

// {this.props.children}
// <ReactCSSTransitionGroup component="div"  transitionName={pageStatus}  transitionEnterTimeout={config.ANIMATE_TIME}  transitionLeaveTimeout={config.ANIMATE_TIME}>
//   {React.cloneElement(this.props.children, {
//     key: this.props.location.pathname
//   }) }
// </ReactCSSTransitionGroup>


