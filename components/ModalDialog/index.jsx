import '!style!css!postcss!sass!./style.scss'


import close from "!url!./img/close.png"
import building from "!url!./img/building.png"

class ModalDialog extends React.Component {
  render() {
    const {txt} = this.props
    return (
      <div>
        <div className="t-coverbg" ref="coverbg"></div>
        <div className="t-modalDialog">
          <p className="t-modalDialog_close" onClick={this.closeModalDialog.bind(this) }><img src={close} /></p>
          <div className="t-modalDialog_title">帮助说明</div>
          <div className="t-modalDialog_building">
            <img src={building} />
            <p>==建设中==</p>
          </div>
        </div>
      </div>
    )
  }

  closeModalDialog() {
    let $dialog = document.querySelector(".t-modalDialog")
    let $coverbg = document.querySelector(".t-coverbg")
    $dialog.style["transition"] = "transform 200ms ease"
    $dialog.style["transform"] = "scale(0)"
    $coverbg.style.display = "none"
    setTimeout(function () {
      $dialog.style.opacity = "0"
    }, 140)
  }
}

export default TUI._connect({
  txt: "publicInfo.dialogInfo"
}, ModalDialog)


export function openModalDialog() {
  setTimeout(function () {
    let $dialog = document.querySelector(".t-modalDialog")
    let $coverbg = document.querySelector(".t-coverbg")

    let allWidth = document.documentElement.clientWidth
    let allHeight = document.documentElement.clientHeight

    $dialog.style.width = (allWidth - 120) + "px"
    $dialog.style.height = (allHeight - 80) + "px"

    let dialogWidth = $dialog.offsetWidth
    let dialogHeight = $dialog.offsetHeight

    $dialog.style.left = (allWidth - dialogWidth + 50) / 2 + "px"
    $dialog.style.top = (allHeight - dialogHeight) / 2 + "px"



    $dialog.style["transition"] = "transform 200ms ease"
    $dialog.style.opacity = "1"
    $coverbg.style.display = "block"
    $dialog.style["transform"] = "scale(1)"
  }, 120)
}

