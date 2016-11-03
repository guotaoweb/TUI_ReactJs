
import Content from "Content"
import Btn from "Btn"
import {openModalDialog} from "ModalDialog"

class _modelDiloag extends React.Component {
    render() {
        return (
            <div>
                <Content txt="ModelDialog">
                    <Btn txt="模态窗体" href={openModalDialog} style={{padding:"10px"}} />
                </Content>
            </div>
        )
    }
 
}

export default TUI._connect({

}, _modelDiloag)