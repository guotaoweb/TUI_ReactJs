//组件
import Content, { openContentLoading, closeContentLoading } from "Content"
import Btn from "Btn"
import Table from "Table"
import Pager from "Pager"
import { openLoading, closeLoading } from "Loading"

class ReportList extends React.Component {
  render() {
    const {
      reportList,
      errorMsg,
      sidePageInfo,
      pageInfo
    } = this.props

    let tblContent = {
      "thead": { "name1": "序号", "name2": "名称", "name3": "更新时间", "name4": "操作" },
      "tbody": []
    }

    for (var i = 0; i < reportList.length; i++) {
      let _d = reportList[i]

      tblContent.tbody.push({
        "value1": (pageInfo.index.index - 1) * pageInfo.index.size + (i + 1),
        "value2": _d.Name,
        "value3": _d.UpdateTime,
        "fns": [{
          "name": "下载",
          "fn": function () {
            var iframe = document.createElement("iframe");
            document.body.appendChild(iframe);
            iframe.src = "/Reports/download/" + _d.Name+"-"+_d.Id+".xls";
            iframe.style.display = "none";
            iframe.setAttribute("key","downloadfile")
          }
        }]
      })
    }

    return (
      <div>
        <Content txt="报表列表">
          <Table num="10" pageIndex="1" pageSize="2" tblContent={tblContent} width="50,0,200,80" />
          <Pager fn={this.pageFn.bind(this)} />
        </Content>
      </div>
    )
  }

  pageFn(index) {
    const {pageInfo, updateCourseData, updatePageInfo} = this.props
    TUI.platform.get(pageInfo.index.url.replace("{0}", index), function (result) {
      if (result.code == 0) {
        updateCourseData(result.datas)
        updatePageInfo({
          index: index,
          size: 7,
          sum: result.total,
          url: pageInfo.index.url
        })
      }
      else {
        updateCourseData([])
      }
    })
  }

  componentDidMount() {
    const {loadReportList, updatePageInfo, addBreadNav, errorMsg} = this.props
    addBreadNav({ name: "报表列表" })
    openLoading()

    //获取科目列表
    let _url = "/Report?pageIndex={0}&pageSize=10"
    TUI.platform.get(_url.replace("{0}", 1), function (result) {
      if (result.code == 0) {
        loadReportList(result.datas)
      }
      else if (result.code == 1) {
        loadReportList([])
      }
      else {
        errorMsg(Config.ERROR_INFO[result.code]);
      }
      updatePageInfo({
        index: 1,
        size: 10,
        sum: result.total,
        url: _url
      })
      closeLoading()
    })
  }
}


export default TUI._connect({
  sidePageInfo: "publicInfo.sidePageInfo",
  pageInfo: "publicInfo.pageInfo",
  reportList: "reportList.list"
}, ReportList) 