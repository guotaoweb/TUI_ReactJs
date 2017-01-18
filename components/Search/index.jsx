import '!style!css!postcss!sass!./style.scss'
import Btn from 'Btn'
import search from "!url!./img/search.png"
import loading from "!url!./img/loading.png"

class Search extends React.Component {
  render() {
    const {txt, placeholder,searchLoadStatus} = this.props
    let _search = []
    if (txt) {
      _search.push(
        <div className="t-search" key="serach_btn1">
          <input id="t-search-i" type="text" ref="search" placeholder={placeholder ? placeholder : "请输入关键词"} />
          <div onClick={this._Search.bind(this)}><Btn txt={txt ? txt : "搜索"} /></div>
        </div>
      )
    }
    else {
      _search.push(
        <div className="t-search1" key="serach_btn2" style={this.props.style}>
          <input id="t-search-i" type="text" ref="search" placeholder={placeholder ? placeholder : "请输入关键词"} />
          <div onClick={this._Search.bind(this)}>
            {searchLoadStatus==1?<img src={search} />:<img className="search-loading" src={loading} />}
          </div>
        </div>
      )
    }

    return (
      <div>{_search}</div>
    )
  }

  componentDidMount() {
    const {fn,searchLoading,searchLoadComplete} = this.props
    let $search = this.refs.search

    let keypressFn = function (e) {
      if (e.keyCode == 13) {
        searchLoading()
        if(fn){fn($search.value,searchLoadComplete)}
      }
    }
    
    //搜索
    $search.addEventListener("focus", function () {
      document.addEventListener("keypress", keypressFn)
    })

    $search.addEventListener("blur", function () {
      document.removeEventListener("keypress", keypressFn)
    })
  }

  _Search() {
    const {fn,searchLoading,searchLoadComplete} = this.props
    let $search = this.refs.search
    if(fn){fn($search.value,searchLoadComplete)}
  }
}


export default TUI._connect({
  searchLoadStatus:"publicInfo.searchLoadStatus"
}, Search)
