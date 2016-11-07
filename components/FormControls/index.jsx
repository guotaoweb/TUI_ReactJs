import '!style!css!postcss!sass!./style.scss'
import unRadio from "!url!./img/unradio.png"
import isRadio from "!url!./img/radio.png"
import unCheckbox from "!url!./img/uncheckbox.png"
import isCheckbox from "!url!./img/checkbox.png"
import cha from "!url!./img/chacha.png"

import Btn from "Btn"


class FormControls extends React.Component {
  render() {
    const {ctrl, label, type, txt, labelWidth, data, value} = this.props
    let bindElem

    if (ctrl == "input") {
      bindElem = <CTRL_INPUT label={label} labelWidth={labelWidth} type={type} value={value} onBlur={this.props.onBlur} style={this.props.style} disabled={this.props.disabled} addFn={this.props.addFormControl
      } required={this.props.required} data={data} />
    }
    else if (ctrl == "textarea") {
      bindElem = <CTRL_TEXTAREA label={label} labelWidth={labelWidth} value={value} tyle={this.props.style} required={this.props.required} addFn={this.props.addFormControl
      } required={this.props.required} data={data} />
    }
    else if (ctrl == "select") {
      bindElem = <CTRL_SELECT label={label} labelWidth={labelWidth} value={value} options={this.props.options} style={this.props.style} required={this.props.required} />
    }
    else if (ctrl == "radio") {
      bindElem = <CTRL_RADIO label={label} labelWidth={labelWidth} txt={txt} style={this.props.style} disabled={this.props.disabled} groupName={this.props.groupName} selected={this.props.selected} value={this.props.value} />
    }
    else if (ctrl == "checkbox") {
      bindElem = <CTRL_CHECKBOX label={label} labelWidth={labelWidth} txt={txt} style={this.props.style} disabled={this.props.disabled} selected={this.props.selected} value={this.props.value} fn={this.props.fn} id={this.props.id} />
    }
    else if (ctrl == "tip") {
      bindElem = <CTRL_TIP label={label} labelWidth={labelWidth} txt={txt} deleteFn={this.props.deleteFn} addFn={this.props.addFn} style={this.props.style} />
    }

    return (
      <div>
        {bindElem}
      </div>
    )
  }
}

class CTRL_INPUT extends React.Component {
  render() {
    const {
      label,
      required,
      labelWidth,
      type,
      onBlur,
      addFn,
      style,
      disabled,
      value
    } = this.props

    let _label
    if (label) {
      let _style = {
        width: labelWidth + "px"
      }
      if (required == "required") {
        _label = <label style={_style}><b style={{ color: "red" }}>*</b>{label}: </label>
      }
      else {
        _label = <label style={_style}><b style={{ color: "red" }}>&nbsp;&nbsp;</b>{label}: </label>
      }
    }

    return (
      <div className="t-formControls">
        {_label}
        <input className={required} type={type ? type : "text"} onBlur={onBlur} onChange={this._onChange.bind(this)} value={value ? this.props.data[value.split(".")[1]] : ""} style={style} disabled={disabled} data-addFn={addFn} />
      </div>
    )
  }

  _onChange(e) {
    const {value, addFn, data} = this.props

    let _object = value.split(".")
    let _info = {
      infoName: _object[0]
    }

    _info[_object[1]] = e.currentTarget.value

    addFn(_info)
  }
}

class CTRL_TEXTAREA extends React.Component {
  render() {
    const {
      label,
      required,
      labelWidth,
      addFn,
      style,
      value
    } = this.props

    let _label
    if (label) {
      let _style = {
        width: labelWidth + "px",
        verticalAlign: "top"
      }

      if (required == "required") {
        _label = <label style={_style}><b style={{ color: "red" }}>*</b>{label}: </label>
      }
      else {
        _label = <label style={_style}><b style={{ color: "red" }}>&nbsp;&nbsp;</b>{label}: </label>
      }
    }
    return (
      <div className="t-formControls">
        {_label}
        <textarea className={required} value={value ? this.props.data[value.split(".")[1]] : ""} onChange={this._onChange.bind(this)} style={style} ></textarea>
      </div>
    )
  }

  _onChange(e) {
    const {value, addFn, data} = this.props
    let _object = value.split(".")
    let _info = {
      infoName: _object[0]
    }

    _info[_object[1]] = e.currentTarget.value

    addFn(_info)
  }
}

class CTRL_SELECT extends React.Component {
  render() {
    let label
    if (this.props.label) {
      let _style = {
        width: this.props.labelWidth + "px",
        verticalAlign: "middle"
      }
      if (this.props.required == "required") {
        label = <label style={_style}><b style={{ color: "red" }}>*</b>{this.props.label}: </label>
      }
      else {
        label = <label style={_style}><b style={{ color: "red" }}>&nbsp;&nbsp;</b>{this.props.label}: </label>
      }
    }
    let options = []
    if (this.props.options) {
      for (var index = 0; index < this.props.options.length; index++) {
        var $o = this.props.options[index];
        if ($o.id == this.props.value) {
          options.push(<option key={"o_" + index} value={$o.id} selected="selected">{$o.name}</option>)
        }
        else {
          options.push(<option key={"o_" + index} value={$o.id}>{$o.name}</option>)
        }
      }
    }
    return (
      <div className="t-formControls">
        {label}
        <select className={this.props.required} style={this.props.style} onChange={this_onChange.bind(this)}  >
          {options}
        </select>
      </div>
    )
  }
  _onChange(e) {
    const {value, addFn, data} = this.props
    let _object = value.split(".")
    let _info = {
      infoName: _object[0]
    }

    _info[_object[1]] = e.currentTarget.value

    addFn(_info)
  }
}

class CTRL_RADIO extends React.Component {
  render() {
    let label
    if (this.props.label) {
      let _style = {
        width: this.props.labelWidth + "px",
        verticalAlign: "middle",
        float: "left"
      }
      label = <label style={_style}>{this.props.label}: </label>
    }

    const {txt} = this.props
    return (
      <div className="t-formControls">
        {label}
        <div className="t-c_radio" data-groupname={this.props.groupName} onClick={this.radioClick.bind(this)} data-status={this.props.selected == "yes" ? "selected" : "unselect"} data-value={this.props.value}>
          <img src={this.props.selected == "yes" ? isRadio : unRadio} />
          <span>{txt}</span>
        </div>
      </div>
    )
  }

  radioClick(e) {
    let $elem = e.target,
      status,
      groupName = $elem.parentNode.getAttribute("data-groupname"),
      $radios = document.getElementsByClassName("t-c_radio")

    for (var i = 0; i < $radios.length; i++) {
      var $e = $radios[i];
      if ($e.getAttribute("data-groupName") == groupName) {
        $e.getElementsByTagName("img")[0].setAttribute("src", "unselect")
        $e.getElementsByTagName("img")[0].setAttribute("src", unRadio)
      }
    }
    $elem.parentNode.setAttribute("data-status", "selected")
    $elem.setAttribute("src", isRadio)
  }
}

class CTRL_CHECKBOX extends React.Component {
  render() {
    let label
    if (this.props.label) {
      let _style = {
        width: this.props.labelWidth + "px",
        verticalAlign: "middle",
        float: "left"
      }
      label = <label style={_style}>{this.props.label}: </label>
    }
    const {txt} = this.props
    return (
      <div className="t-formControls">
        {label}
        <div className="t-c_checkbox" onClick={this.checkboxClick.bind(this)} data-id={this.props.id} data-status={this.props.selected == "yes" ? "selected" : "unselect"} data-value={this.props.value}>
          <img src={this.props.selected == "yes" ? isCheckbox : unCheckbox} />
          <span>{txt}</span>
        </div>
      </div>
    )
  }

  checkboxClick(e) {
    e.stopPropagation()
    if (this.props.disabled == "disabled") { return false }

    let $elem = e.target,
      status


    if ($elem.className == "t-c_checkbox") { return false }
    if ($elem.parentNode.getAttribute("data-status") == "selected") {
      $elem.parentNode.setAttribute("data-status", "unselect")
      $elem.setAttribute("src", unCheckbox)
      if (this.props.fn) {
        this.props.fn("close", {
          name: this.props.txt,
          id: $elem.parentNode.getAttribute("data-id")
        })
      }
    }
    else {
      $elem.parentNode.setAttribute("data-status", "selected")
      $elem.setAttribute("src", isCheckbox)
      if (this.props.fn) {
        this.props.fn("open", {
          name: this.props.txt,
          id: $elem.parentNode.getAttribute("data-id")
        })
      }
    }

  }
}


class CTRL_TIP extends React.Component {
  render() {
    let label
    if (this.props.label) {
      let _style = {
        width: this.props.labelWidth + "px",
        verticalAlign: "middle",
        float: "left"
      }
      label = <label style={_style}>{this.props.label}: </label>
    }
    const {txt, addFn} = this.props
    let _txt = []

    for (var i = 0; i < txt.length; i++) {
      var $d = txt[i]
      _txt.push(<span key={"tip_" + $d.id}>{$d.name}<b onClick={this.deleteFn.bind(this)} data-id={$d.id}><img src={cha} /></b></span>)
    }
    return (
      <div className="t-formControls">
        {label}
        <div className="t_c_tip" style={this.props.style}>
          {_txt}
          <Btn txt="添加" href={addFn.bind(this)} />
        </div>
        <br className="claer" />
      </div>
    )
  }

  addTip(e) {
    let $elem = e.target
  }

  deleteFn(e) {
    let $elem = e.target,
      id = $elem.parentNode.getAttribute("data-id")
    this.props.deleteFn(id)
  }
}



export default TUI._connect({
  data: "formControlInfo.data"
}, FormControls)
