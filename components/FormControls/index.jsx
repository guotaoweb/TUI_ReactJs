import '!style!css!postcss!sass!./style.scss'
import '!style!css!react-date-picker/index.css'
import { DateField } from 'react-date-picker'

import unRadio from "!url!./img/unradio.png"
import isRadio from "!url!./img/radio.png"
import unCheckbox from "!url!./img/uncheckbox.png"
import isCheckbox from "!url!./img/checkbox.png"
import cha from "!url!./img/chacha.png"
import search from "!url!./img/search.png"
import chag from "!url!./img/chacha-g.png"

import Btn from "Btn"

const onChange = (dateString, { dateMoment, timestamp }) => {
    console.log(dateString)
}

class FormControls extends React.Component {
    render() {
        const {
            ctrl,
            label,
            labelTxt,
            type,
            txt,
            labelWidth,
            minWidth,
            data,
            value,
            onChangeFn,
            bind,
            selectFn,
            clearFn
        } = this.props
        let bindElem



        if (ctrl == "input") {
            bindElem = <CTRL_INPUT
                label={label}
                labelWidth={labelWidth}
                type={type}
                value={value}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                style={this.props.style}
                disabled={this.props.disabled}
                addFn={this.props.addEditInfo}
                required={this.props.required}
                data={data}
                bind={bind}
                selectFn={selectFn}
                editFn={this.props.updateEditInfo}
                placeholder={this.props.placeholder}
                labelTxt={labelTxt}
                minWidth={minWidth}
                clearFn={clearFn}
                />
        }
        else if (ctrl == "textarea") {
            bindElem = <CTRL_TEXTAREA
                label={label}
                labelWidth={labelWidth}
                value={value}
                tyle={this.props.style}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                style={this.props.style}
                required={this.props.required}
                addFn={this.props.addEditInfo}
                required={this.props.required}
                data={data}
                bind={bind}
                labelTxt={labelTxt}
                minWidth={minWidth}
                />
        }
        else if (ctrl == "select") {
            bindElem = <CTRL_SELECT
                label={label}
                labelWidth={labelWidth}
                value={value}
                options={this.props.options}
                style={this.props.style}
                required={this.props.required}
                addFn={this.props.addEditInfo}
                data={data}
                onChangeFn={onChangeFn}
                bind={bind}
                labelTxt={labelTxt}
                minWidth={minWidth}
                disabled={this.props.disabled}
                />
        }
        else if (ctrl == "radio") {
            bindElem = <CTRL_RADIO
                label={label}
                labelWidth={labelWidth}
                txt={txt}
                style={this.props.style}
                disabled={this.props.disabled}
                groupName={this.props.groupName}
                selected={this.props.selected}
                value={this.props.value}
                labelTxt={labelTxt}
                minWidth={minWidth}
                id={this.props.id}
                clickFn={this.props.clickFn}
                />
        }
        else if (ctrl == "checkbox") {
            bindElem = <CTRL_CHECKBOX
                label={label}
                labelWidth={labelWidth}
                txt={txt}
                style={this.props.style}
                disabled={this.props.disabled}
                selected={this.props.selected}
                value={this.props.value}
                fn={this.props.fn}
                id={this.props.id}
                labelTxt={labelTxt}
                minWidth={minWidth}
                clickFn={this.props.clickFn}
                />
        }
        else if (ctrl == "tip") {
            bindElem = <CTRL_TIP
                label={label}
                labelWidth={labelWidth}
                txt={txt}
                deleteFn={this.props.deleteFn}
                addFn={this.props.addFn}
                style={this.props.style} />
        }
        else if (ctrl == "datepicker") {
            bindElem = <CTRL_DATE_PICKER
                label={label}
                labelWidth={labelWidth}
                value={value}
                style={this.props.style}
                addFn={this.props.addEditInfo}
                required={this.props.required}
                data={data}
                bind={bind}
                type={type}
                blurFn={this.props.blurFn} />
        }
        else if (ctrl == "slide") {
            bindElem = <CTRL_SLIDE
                label={label}
                labelWidth={labelWidth}
                value={value}
                style={this.props.style}
                addFn={this.props.addEditInfo}
                options={this.props.options}
                data={data}
                bind={bind}
                editFn={this.props.updateEditInfo}
                selected={this.props.selected}
                size={this.props.size}
                fn={this.props.fn}
                 />
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
            onFocus,
            addFn,
            style,
            disabled,
            value,
            data,
            bind,
            selectFn,
            placeholder,
            clearFn
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

        let _value = ""
        if (value && data[value.split(".")[0]]) {
            _value = data[value.split(".")[0]][value.split(".")[1]]
        }

        let _input = []
        if (type == "select") {
            _input.push(
                <div key={"formcontrol-input-search" + data} className="formcontrol-input-select">
                    <input className={required} ref="formcontrolInputSelect" type="text" onClick={this._selectFn.bind(this)} onBlur={onBlur} onChange={this._onChange.bind(this)} value={_value || ""} style={style} placeholder={placeholder} readOnly />
                    <img src={search} onClick={this._selectFn.bind(this)} />
                    {_value ? <img src={chag} onClick={this._clearSelect.bind(this)} className="chachag" /> : ""}
                </div>
            )
        }
        else {
            _input.push(<input key={"formcontrol-input-other" + data} className={required} type={type ? type : "text"} onFocus={onFocus} onBlur={onBlur} onChange={this._onChange.bind(this)} value={_value || ""} style={style} placeholder={placeholder} disabled={disabled} />)
        }

        return (
            <div className="t-formControls">
                {_label}
                {_input}
            </div>
        )
    }
    _selectFn() {
        const {selectFn, bind, addFn, value, clearFn} = this.props
        if (this.props.selectFn) {
            let _object = value.split(".")
            let _info = {
                infoName: _object[0]
            }
            for (let key in bind) {
                _info[key] = bind[key]
            }
            addFn(_info)
            selectFn(_info)
        }
    }
    _clearSelect(e) {
        const {value, editFn, bind, clearFn} = this.props
        let _object = value.split(".")
        let _info = {
            infoName: _object[0]
        }
        _info[_object[1]] = ""

        if (editFn) { editFn(_info) }
        if (clearFn) { clearFn() }
        this.refs.formcontrolInputSelect.value = ""
    }
    _onChange(e) {
        const {value, addFn, data, bind} = this.props

        let _object = value.split(".")
        let _info = {
            infoName: _object[0]
        }
        if (bind) {
            for (let key in bind) {
                _info[key] = bind[key]
            }
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
            value,
            data,
            onBlur,
            onFocus,
            bind
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

        let _value = ""
        if (value && data[value.split(".")[0]]) {
            _value = data[value.split(".")[0]][value.split(".")[1]]
        }

        return (
            <div className="t-formControls">
                {_label}
                <textarea className={required} value={_value || ""} onFocus={onFocus} onBlur={onBlur} onChange={this._onChange.bind(this)} style={style} ></textarea>
            </div>
        )
    }

    _onChange(e) {
        const {value, addFn, data, bind} = this.props
        let _object = value.split(".")
        let _info = {
            infoName: _object[0]
        }

        if (bind) {
            for (let key in bind) {
                _info[key] = bind[key]
            }
        }
        _info[_object[1]] = e.currentTarget.value

        addFn(_info)
    }
}

class CTRL_SELECT extends React.Component {
    render() {
        const {
            addFn,
            value,
            data,
            onChangeFn,
            bind,
            disabled
        } = this.props
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

        let _value = ""
        if (value && data[value.split(".")[0]]) {
            _value = data[value.split(".")[0]][value.split(".")[1]]
        }

        let options = []
        options.push(<option key={"o-1"} value="-1">请选择</option>)

        if (this.props.options) {
            for (var index = 0; index < this.props.options.length; index++) {
                var $o = this.props.options[index];
                if ($o.id == _value) {
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
                <select className={this.props.required} style={this.props.style} disabled={disabled} onChange={this._onChange.bind(this)}  >
                    {options}
                </select>
            </div>
        )
    }
    _onChange(e) {
        const {value, addFn, data, onChangeFn, bind} = this.props
        let _object = value.split(".")
        let _info = {
            infoName: _object[0]
        }
        if (bind) {
            for (let key in bind) {
                _info[key] = bind[key]
            }
        }
        let _this = e.currentTarget
  
        _info[_object[1]] = _this.value
        _info[_object[1] + "Name"] = _this.options[_this.selectedIndex].innerHTML
        addFn(_info)
        if (onChangeFn) {
            onChangeFn(_this.value)
        }
    }
}

class CTRL_RADIO extends React.Component {
    render() {
        const {labelTxt, minWidth} = this.props
        let label
        if (this.props.label) {
            let _style = {
                width: this.props.labelWidth + "px",
                verticalAlign: "middle",
                float: "left"
            }
            if (minWidth) {
                _style["minWidth"] = minWidth
            }
            label = <label style={_style}>{this.props.label}{labelTxt ? labelTxt : ":"} </label>
        }

        const {txt} = this.props
        return (
            <div className="t-formControls">
                {label}
                <div className="t-c_radio" data-groupname={this.props.groupName} data-id={this.props.id} onClick={this.radioClick.bind(this)} data-status={this.props.selected == "yes" ? "selected" : "unselect"} data-value={this.props.value}>
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
                $e.setAttribute("data-status", "unselect")
                $e.getElementsByTagName("img")[0].setAttribute("src", unRadio)
            }
        }
        $elem.parentNode.setAttribute("data-status", "selected")
        if ($elem.tagName == "SPAN") {
            $elem.previousSibling.setAttribute("src", isRadio)
        }
        else {
            $elem.setAttribute("src", isRadio)
        }

        if (this.props.clickFn) { this.props.clickFn(e) }
    }
}

class CTRL_CHECKBOX extends React.Component {
    render() {
        const {labelTxt, minWidth} = this.props
        let label
        if (this.props.label) {
            let _style = {
                width: this.props.labelWidth + "px",
                verticalAlign: "middle",
                float: "left"
            }
            if (minWidth) {
                _style["minWidth"] = minWidth
            }
            label = <label style={_style}>{this.props.label}{labelTxt ? labelTxt : ":"} </label>
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
            $elem.parentNode.getElementsByTagName("img")[0].setAttribute("src", unCheckbox)
            if (this.props.fn) {
                this.props.fn("close", {
                    name: this.props.txt,
                    id: $elem.parentNode.getAttribute("data-id")
                })
            }
        }
        else {
            $elem.parentNode.setAttribute("data-status", "selected")
            $elem.parentNode.getElementsByTagName("img")[0].setAttribute("src", isCheckbox)
            if (this.props.fn) {
                this.props.fn("open", {
                    name: this.props.txt,
                    id: $elem.parentNode.getAttribute("data-id")
                })
            }
        }
        if (this.props.clickFn) { this.props.clickFn(e) }
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

class CTRL_DATE_PICKER extends React.Component {
    render() {
        const {
            label,
            required,
            labelWidth,
            type,
            addFn,
            style,
            disabled,
            value,
            data,
            bind,
            blurFn
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

        let _value = ""
        if (value && data[value.split(".")[0]]) {
            _value = data[value.split(".")[0]][value.split(".")[1]]
        }

        return (
            <div className="t-formControls" style={style}>
                {_label}
                <DateField
                    value={_value || ""}
                    dateFormat={type ? type : "YYYY-MM-DD"}
                    onChange={this._onChange.bind(this)}
                    />
            </div>
        )
    }

    _onChange(e) {
        const {value, addFn, data, bind, blurFn} = this.props

        let _object = value.split(".")
        let _info = {
            infoName: _object[0]
        }
        if (bind) {
            for (let key in bind) {
                _info[key] = bind[key]
            }
        }
        if (blurFn) { blurFn(e) }
        _info[_object[1]] = e
        addFn(_info)
    }
}

class CTRL_SLIDE extends React.Component {
    render() {
        const {
            label,
            labelWidth,
            type,
            editFn,
            addFn,
            style,
            value,
            data,
            bind,
            options,
            selected,
            size,
            fn
        } = this.props

        let _label
        if (label) {
            let _style = {
                width: labelWidth + "px",
                verticalAlign: "middle",
                marginTop: "-20px"
            }

            _label = <label style={_style}>{label}: </label>
        }


        let _value = ""
        if (value && data[value.split(".")[0]]) {
            _value = data[value.split(".")[0]][value.split(".")[1]]
        }
        // if(selected){
        //     _value = options[_value].name
        // }

        let _object = value.split(".")
        let _index = 0
        if (data[_object[0]]) {
            _index = data[_object[0]][_object[1]]
        }

        let _activity = _index == 0 ? 't-slide '+(size=="long"?"t-slide-long":"")+' t-slide_activity' : "t-slide "+(size=="long"?"t-slide-long":"")

        return (
            <div className="t-formControls">
                {_label}
                <div className={_activity} onClick={this._onClick.bind(this)}>
                    <span>{options ? options[_index].name : ""}</span>
                    <b></b>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const {value, addFn, editFn, data, options, selected} = this.props
        let _object = value.split(".")
        if (data[_object[0]]) {
            let _info = {
                infoName: _object[0]
            }
            _info[_object[1]] = selected ? selected : 0
            _info[_object[1] + "Name"] = options[selected ? selected : 0].name
            if (editFn) { editFn(_info) }
        }
        else {
            let _info = {
                infoName: _object[0]
            }

            _info[_object[1]] = selected ? selected : 0
            _info[_object[1] + "Name"] = options[selected ? selected : 0].name
            if (addFn) { addFn(_info) }
        }
    }

    _onClick() {
        const {value, addFn, data, bind, options,fn} = this.props

        let _object = value.split(".")
        let _info = {
            infoName: _object[0]
        }
        if (bind) {
            for (let key in bind) {
                _info[key] = bind[key]
            }
        }

        let _index = data[_object[0]][_object[1]] == 0 ? 1 : 0

        _info[_object[1]] = _index
        _info[_object[1] + "Name"] = options[_index].name
        addFn(_info)
        if(fn){
            fn(_info)
        }
    }
}

export default TUI._connect({
    data: "formControlInfo.data",
}, FormControls)

export function clearCtrlStatus() {
    let $checkbox = document.getElementsByClassName("t-c_checkbox")
    for (var i = 0; i < $checkbox.length; i++) {
        var $c = $checkbox[i];
        $c.getElementsByTagName("img")[0].setAttribute("src", unCheckbox)
        $c.setAttribute("data-status", "unselect")
    }
    let $radio = document.getElementsByClassName("t-c_radio")
    for (var i = 0; i < $radio.length; i++) {
        var $c = $radio[i];
        $c.getElementsByTagName("img")[0].setAttribute("src", unRadio)
        $c.setAttribute("data-status", "unselect")
    }
}
