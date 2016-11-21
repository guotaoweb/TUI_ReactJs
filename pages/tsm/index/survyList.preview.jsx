import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import { openDialog, closeDialog } from "Dialog"
import { closeSidePage } from 'SidePage'



class SurvyListPreview extends React.Component {
    render() {
        const {editInfo, survyData} = this.props
        let _survys = []

        if (survyData.length == 0) {
            _survys.push(<SurvyEmpty key="survyEmpty" action={this} />)
        }
        else {
            _survys.push(<SurvyProblem key="survyProblem" survyData={survyData} action={this} />)
        }
        return (
            <div>
                {_survys}
            </div>
        )
    }
}

export default TUI._connect({
    editInfo: "formControlInfo.data",
    survyData: "survyList.data"
}, SurvyListPreview)


class SurvyProblem extends React.Component {
    render() {
        const {survyData, action} = this.props

        let _survyProblem = []

        for (var i = 0; i < survyData.length; i++) {
            var $s = survyData[i]
            let _editInfo = action.props.editInfo["survyProblemInfo_" + $s.Id]
            _survyProblem.push(
                <div key={"survyProblem_" + i}>
                    <span style={{ float: "left", marginTop: "5px", marginRight: "10px" }}>{i + 1}、</span>
                    <div style={{ float: "left", marginTop: "5px", marginLeft: "-15px" }}>{_editInfo ? _editInfo.value : "NULL"}</div>
                    <br className="clear" />
                    <SurvyOptions survyOptionsData={$s.Datas} i={i} action={action} type={$s.Type} parentId={$s.Id} />
                </div>
            )
        }

        return (
            <div>
                {_survyProblem}
            </div>
        )
    }

    goBack() {
        closeSidePage()
    }
}


class SurvyOptions extends React.Component {
    render() {
        const {survyOptionsData, i, action, type, parentId} = this.props

        let _survy = []
        if (survyOptionsData) {
            for (let j = 0; j < survyOptionsData.length; j++) {
                let $o = survyOptionsData[j]
                let _options = [],
                    _editInfo = action.props.editInfo["survyOptionInfo_" + $o.Id],
                    _type = this.props.type
                if (_type != "textarea") {
                    let _val = _editInfo ? this.NumSwitchChar(j + 1) + "、" + _editInfo.value : "NULL"
                    _options.push(<FormControls key={"options_type" + j} ctrl={_type} txt={_val} />)
                }
                else {
                    //_options = _editInfo.value
                    _options.push(<FormControls key={"options_type" + j} ctrl={_type} value="" style={{ width: "430px" }} />)
                }

                _survy.push(
                    <div key={"survy_s_" + i + "_" + j} style={{ marginLeft: "20px" }}>
                        <span style={{ float: "left", marginTop: "5px", marginRight: "10px" }}></span>
                        <div style={{ float: "left", marginTop: "5px", marginLeft: "-15px" }}>
                            {_options}
                        </div>
                        <br className="clear" />
                    </div>
                )
            }
        }

        return (
            <div>
                {_survy}
            </div>
        )
    }

    NumSwitchChar(num) {
        switch (num) {
            case 1: return "A"
            case 2: return "B"
            case 3: return "C"
            case 4: return "D"
            case 5: return "E"
            case 6: return "F"
            case 7: return "G"
            case 8: return "H"
            case 9: return "I"
            case 10: return "J"
            case 11: return "K"
            case 12: return "L"
            case 13: return "M"
            default: return "N"
        }
    }
}

class SurvyEmpty extends React.Component {
    render() {
        return (
            <div key={"survy_empty"} style={{
                padding: "10px",
                color: "#999",
                width: "100%",
                textAlign: "center",
                marginTop: "15%",
                fontSize: "20px"
            }}>
                <span>此处为问卷预览区域</span>
            </div>
        )
    }
}