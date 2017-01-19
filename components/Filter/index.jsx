import '!style!css!postcss!sass!./style.scss'

class Filter extends React.Component {
  render() {
    return (
      <div className="t-filter">
        <h3>高级搜索</h3>
        {this.props.children}
        <div className="t-filter-close" onClick={this.closeAdvanceSearch.bind(this)}>close</div>
      </div>
    )
  }

  closeAdvanceSearch() {
    const {fn} = this.props
    let $tFilter = document.getElementsByClassName("t-filter")[0]
    $tFilter.setAttribute("class", "t-filter")
    if(fn){
      fn()
    }
  }
}


export default TUI._connect({}, Filter)


export function openFilter() {
  let $tFilter = document.getElementsByClassName("t-filter")[0]
  $tFilter.setAttribute("class", "t-filter t-filter_open")
}

export function closeFilter() {
  let $tFilter = document.getElementsByClassName("t-filter")[0]
  $tFilter.setAttribute("class", "t-filter")
}
