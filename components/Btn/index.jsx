import '!style!css!postcss!sass!./style.scss'

import add from "!url!./img/add.png"
import cancel from "!url!./img/cancel.png"
import edit from "!url!./img/edit.png"
import check from "!url!./img/check.png"
import back from "!url!./img/back.png"

class Btn extends React.Component {
  render() {
    const {type, width, href, txt, style} = this.props
    let icon

    if (type == "edit") {
      icon = <img src={edit} />
    }
    else if (type == "cancel") {
      icon = <img src={cancel} />
    }
    else if (type == "submit") {
      icon = <img src={check} />
    }
    else if (type == "add") {
      icon = <img src={add} />
    }
    else if (type == "back") {
      icon = <img src={back} />
    }
    else { }

    let btnElem

    if (href && typeof href == "string") {
      btnElem = <Link to={href} className={"t-btn t-btn--" + type} style={{ padding: "10px " + width + "px" }}>
        {icon}
        {txt}
      </Link>
    }
    else {
      btnElem = <a href="javascript:void(0);" className={"t-btn t-btn--" + type}  style={{ padding: "10px " + width + "px" }} onClick={this._onClick.bind(this) }>
        {icon}
        {txt}
      </a>
    }


    return (
      <div style={style}>
        {btnElem}
      </div>
    )
  }

  _onClick(e) {
    const {type, href, preventSubmit, waiteMsg, errorMsg} = this.props
    if (type == "submit") {
      if (preventSubmit) { return false }

      let isRequired = false
      let $requiredInput = e.target.parentNode.parentNode.parentNode.getElementsByClassName("required")
      for (let i = 0; i < $requiredInput.length; i++) {
        if ($requiredInput[i].tagName == "SELECT") {
        
          if ($requiredInput[i].value == -1 || $requiredInput[i].options[$requiredInput[i].selectedIndex].text=="请选择") {
            isRequired = true
            break
          }
        }
        else {
          if (!$requiredInput[i].value) {
            isRequired = true
            break
          }
        }
      }

      if (isRequired) {
        errorMsg("标星字段为必填项")
        isRequired = false
        return false
      }

      setTimeout(function(){waiteMsg("提交中,请稍等...")},100)
    }
    if (href) {
      href()
    }
  }
}

export default TUI._connect({
  preventSubmit: "publicInfo.msgInfo.txt"
}, Btn)
