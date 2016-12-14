import '!style!css!postcss!sass!./style.scss'
import sortDesc from "!url!./img/sort-desc.png"
import sortAsc from "!url!./img/sort-asc.png"

class Table extends React.Component {
  render() {
    const {tblContent, width, num, bindPager, pageInfo} = this.props
    let tbl_thead = [],
      tbl_tbody = []

    let w = ""
    for (let thead in tblContent.thead) {
      let _thead = tblContent.thead[thead].split("-")
      if (_thead.length > 1) {
        tbl_thead.push(
          <td key={"tbl_thead_tr" + thead} style={{ cursor: "pointer" }} data-sort={_thead[1]} data-filter={_thead[2]} onClick={this.tblSort.bind(this)}>
            {_thead[0]}
            <img src={sortDesc} style={{
              width: "20px",
              verticalAlign: "middle"
            }} />
          </td>
        )
      }
      else {
        tbl_thead.push(<td key={"tbl_thead_tr" + thead}>{_thead[0]}</td>)
      }
      if (w) {
        w += ",0"
      }
      else {
        w = "0"
      }
    }

    let _width = width ? width : w

    let tbodyLength = tblContent.tbody.length
    let pagerNumber = pageInfo[bindPager] ? pageInfo[bindPager].size : pageInfo["index"].size

    let _length = 0
    if (num) {
      if (pagerNumber > num) {
        _length = pagerNumber
      }
      else {
        _length = num
      }
    }
    else {
      _length = pagerNumber
    }

    for (let i = 0; i < _length; i++) {
      let _td = tblContent.tbody[i]

      let _tds = []
      let j = 0
      for (let key in _td) {
        if (key != "fns") {
          //文字区域的td
          if (_width.split(",")[j] == "0") {
            _tds.push(<td key={i + "_" + key}><a className="autoTblWidth" href="javascript:void(0);" title={_td[key]} style={{ color: "#333" }}>{_td[key]}</a></td>)
          }
          else {
            _tds.push(<td width={_width.split(",")[j]} key={i + "_" + key}>{_td[key]}</td>)
          }
        }
        else {
          //操作按钮的td
          let _fns = []
          for (var k = 0; k < _td["fns"].length; k++) {
            let f = _td["fns"][k]
            _fns.push(<a key={i + "_" + key + "a_" + k} href="javascript:void(0);" onClick={f.fn}>{f.name}</a>)
          }
          _tds.push(<td width={_width.split(",")[j] == "0" ? "" : _width.split(",")[j]} key={i + "_" + key}>{_fns}</td>)
        }
        j++
      }

      tbl_tbody.push(React.createElement('tr', { key: i }, _tds));
    }

    if (tblContent.tbody.length == 0) {
      tbl_tbody.push(<tr key="tbl_nodata"><td colSpan={tbl_thead.length} style={{ textAlign: "center", color: "#999" }}>没有任何数据</td></tr>)
    }
    return (
      <table ref={"t-tbl"} className="t-tbl" style={this.props.style}>
        <thead>
          <tr>
            {tbl_thead}
          </tr>
        </thead>
        <tbody>
          {tbl_tbody}
        </tbody>
      </table>
    )
  }

  tblSort(e) {
    const {sort} = this.props
    let $elem = e.currentTarget
    let params = {
      sort: $elem.getAttribute("data-sort"),
      filter: $elem.getAttribute("data-filter")
    }


    if (sort) {
      sort(params)
      if (params.sort == "desc") {
        $elem.setAttribute("data-sort", "asc")
        let $elemImg = $elem.getElementsByTagName("img")[0]
        $elemImg.setAttribute("src",sortAsc)
        $elemImg.style.marginTop="8px"
        $elemImg.style.width="14px"
      }
      else{
        $elem.setAttribute("data-sort", "desc")
        let $elemImg = $elem.getElementsByTagName("img")[0]
        $elemImg.setAttribute("src",sortDesc)
        $elemImg.style.marginTop="0px"
        $elemImg.style.width="20px"
      }
    }
  }


shouldComponentUpdate(nextProps) {
  // console.info(nextProps.isRefreshTable)
  // if (nextProps.tblContent.tbody.length == this.props.tblContent.tbody.length && nextProps.isRefreshTable==0) {
  //   console.info("不刷新")
  //   return false
  // }
  // else {
  //   console.clear()
  //   console.info("刷新")
  //   console.info(nextProps.tblContent)
  //   return true
  // }
  return true
}

componentDidUpdate() {
  let _this = this
  const {width, id} = _this.props
  let $tlb = _this.refs["t-tbl"]

  setTimeout(function () {
    let styleWidth = $tlb.parentNode.style.width
    let tblWidth = styleWidth ? styleWidth.substring(0, styleWidth.length - 2) : $tlb.parentNode.offsetWidth,
      $autoTblWidth = $tlb.getElementsByClassName("autoTblWidth"),
      autoLength = 0

    let _width = width.split(",")
    for (let i = 0; i < _width.length; i++) {
      let $w = _width[i]
      tblWidth -= $w
      if ($w == 0) {
        autoLength++
      }
    }

    for (let j = 0; j < $autoTblWidth.length; j++) {
      let $a = $autoTblWidth[j]
      $a.style.width = tblWidth / autoLength + "px"
      $a.style.display = "block"
      $a.style.overflow = "hidden"
      $a.style.whiteSpace = "nowrap"
      $a.style.textOverflow = "ellipsis"
    }

    _this.props.noRefreshTable()
  }, 0)
}
}



export default TUI._connect({
  isRefreshTable: "publicInfo.isRefreshTable",
  pageLoadStatus: "publicInfo.pageLoadStatus",
  pageInfo: "publicInfo.pageInfo"
}, Table)
