import Content from "Content"
import FormControls from "FormControls"
import Btn from "Btn"

class check extends React.Component {
    render() {
        return (
            <div>
                <Content txt="单选/多选">
                    <div className="t-content-padding">
                        <FormControls label="多选" ctrl="checkbox" txt="这是第一个问题" />
                        <FormControls label="单选" ctrl="radio" txt="这是第二个问题" groupName="test" />
                        <FormControls label="单选" ctrl="radio" txt="这是第三个问题" groupName="test" />
                        <FormControls label="单选" ctrl="radio" txt="这是第四个问题(和其它单选问题不同组)" />
                    </div>
                </Content>
            </div>
        )
    }
}

export default TUI._connect({
    preventSubmit: "publicInfo.msgInfo.txt"
}, check)