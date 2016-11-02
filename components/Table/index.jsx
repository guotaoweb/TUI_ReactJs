import '!style!css!postcss!sass!./style.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class Table extends Component {
  render() {
    const {tblContent, width} = this.props
    let tbl_thead = [],
      tbl_tbody = []

    let w = ""
    for (let thead in tblContent.thead) {
      tbl_thead.push(<td key={"tbl_thead_tr" + thead}>{tblContent.thead[thead]}</td>)
      if (w) {
        w += ",0"
      }
      else {
        w = "0"
      }
    }

    let _width = width ? width : w
    for (let i = 0; i < tblContent.tbody.length; i++) {
      let _td = tblContent.tbody[i]

      let _tds = []
      let j = 0
      for (let key in _td) {

        if (key != "fns") {
          _tds.push(<td width={_width.split(",")[j] == "0" ? "" : _width.split(",")[j]} key={i + "_" + key}>{_td[key]}</td>)
        }
        else {
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
      <table className="t-tbl" style={this.props.style}>
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
}


export default Table
