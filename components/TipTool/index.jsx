import '!style!css!postcss!sass!./style.scss'

class TipTool extends React.Component {
  componentDidUpdate() {
    const {alertMsg, msgInfo} = this.props
    let _color = null

    if (msgInfo.txt) {
      if (msgInfo.status == 2) {
        _color = "rgba(255, 112, 112,1)"
      }
      else if (msgInfo.status == 1) {
        _color = "rgba(29, 166, 100,1)"
      }
      else {
        _color = "rgba(0, 0, 0,1)"
      }

      let $tipTool = document.querySelector(".t-tiptool")
      $tipTool.style.opacity = 0
      $tipTool.style.top = "-100px"

      setTimeout(function () {
        $tipTool.style.display = "block"
        let tContent3Side = document.querySelector(".t-content3_side")
        let sideWidth = tContent3Side ? tContent3Side.offsetWidth : 0

        $tipTool.style.left = (document.body.offsetWidth - $tipTool.offsetWidth + sideWidth) / 2 + "px"
      
        $tipTool.style.top = (parseInt(document.body.scrollTop) + 80) + "px"
        $tipTool.style.opacity = 1
        $tipTool.style["transition"] = "top 200ms ease"
        // $tipTool.style.bottom = document.documentElement.clientHeight / 2 + "px"
        $tipTool.style.backgroundColor = _color
      }, 200)

      this.clearTipTool($tipTool)
    }
  }

  clearTipTool($tipTool, t) {
    const {alertMsg, msgInfo} = this.props
    let hideTime = t ? t : 1500
    if (msgInfo.status == 3) {
      hideTime = 3600000 //一小时
    }

    setTimeout(function () {
      $tipTool.style.opacity = 0
      $tipTool.style["transition"] = "opacity 200ms ease"
    }, hideTime)

    setTimeout(function () {
      alertMsg("")
      $tipTool.style.display = "none"
    }, hideTime + 300)
  }
  render() {
    const {msgInfo} = this.props
    return (
      <div className="t-tiptool">
        {msgInfo.txt}
      </div>
    )
  }
}


export default TUI._connect({ msgInfo: "publicInfo.msgInfo" }, TipTool)
