import Content2 from "Content2"
import {openDialog} from "Dialog"

class Layout2 extends React.Component {
    render() {
        let tabs = [{name:"选项一",id:"tabs1"},{name:"选项二",id:"tabs2"},{name:"选项三",id:"tabs3"}]
        return (
            <div>
                <Content2 tabs={tabs}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </Content2>
            </div>
        )
    }
}

export default TUI._connect({}, Layout2)