import '!style!css!postcss!sass!./style.scss'


import close from "!url!./img/close.png"


class ModalDialog extends React.Component {
  render() {
    const {children, title, id} = this.props
    return (
      <div>
        <div className="t-coverbg" ref="coverbg"></div>
        <div className="t-modalDialog" id={id}>
          <p className="t-modalDialog_close" onClick={this.closeModalDialog.bind(this)}><img src={close} /></p>
          <div className="t-modalDialog_title">{title}</div>
          {children}
        </div>
      </div>
    )
  }

  closeModalDialog() {
    let $dialog = document.getElementsByClassName("t-modalDialog")
    let $coverbg = document.querySelector(".t-coverbg")
    for (var index = 0; index < $dialog.length; index++) {
      var $d = $dialog[index];
      $d.style["transition"] = "transform 200ms ease"
      $d.style["transform"] = "scale(0)"
      
      setTimeout(function () {
        $d.style.opacity = "0"
      }, 140)
    }
$coverbg.style.display = "none"
  }
}

export default TUI._connect({
  txt: "publicInfo.dialogInfo"
}, ModalDialog)


export function openModalDialog(param) {
  setTimeout(function () {
    let $dialog = document.querySelector(".t-modalDialog")
    if (param) {
      if (param.id) {
        $dialog = document.getElementById(param.id)
      }
    }

    let $coverbg = document.querySelector(".t-coverbg")


    let allWidth = document.documentElement.clientWidth
    let allHeight = document.documentElement.clientHeight

    // $dialog.style.width = (allWidth - 120) + "px"
    // $dialog.style.height = (allHeight - 80) + "px"

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



