import Content from "Content"
import Btn from "Btn"
import { openLoading, closeLoading } from "Loading"

class _Loading extends React.Component {
    render() {
        return (
            <div>
                <Content txt="Loading">
                    <div className="t-content-padding">
                        <Btn txt="加载" href={this.openLoading.bind(this)} style={{ padding: "10px" }} />
                    </div>
                </Content>
            </div>
        )
    }

    openLoading() {
        openLoading()
        setTimeout(function () {
            closeLoading()
        }, 2000)
    }
}

export default TUI._connect({

}, _Loading)