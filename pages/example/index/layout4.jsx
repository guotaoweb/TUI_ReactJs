import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"
import Search from "Search"
import {openSideContent} from "SideContent"

class _Search extends React.Component {
    render() {
        return (
            <Content txt="SideContent">
                SideContent
            </Content>
        )
    }

    componentDidMount(){
        openSideContent()
    }

    _Search(val){
        console.info(val)
    }
}

export default TUI._connect({
    tips: "publicInfo.tips"
}, _Search)