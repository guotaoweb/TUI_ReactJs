import Content2 from "Content2"
import FormControls from "FormControls"
import Btn from "Btn"
import {closeSidePage} from "SidePage"

class SurvyTool extends React.Component {
    render() {
        const {editInfo} = this.props
        
        return (
            <div style={{padding:"10px"}}>
                <Btn txt="关闭" width="70" style={{marginTop:"10px"}} href={closeSidePage} />
                <br/>
                <div className="survy_tool">
                    <p>+ 单选题</p>
                    <p>+ 多选题</p>
                    <p>+ 填空题</p>
                </div>
            </div>
        )
    }
}

export default TUI._connect({
    editInfo:"survyList.editInfo"
}, SurvyTool)