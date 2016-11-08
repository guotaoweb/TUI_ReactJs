import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'
import Content3 from "Content3"
import Btn from "Btn"
import SidePage,{ openSidePage } from "SidePage"

class Layout3 extends React.Component {
    render() {
        return (
            <div>
                <Content3>
                    <div>这是菜单列表</div>
                    <div></div>
                    <ReactIScroll iScroll={iScroll} options={{
                        mouseWheel: true,
                        scrollbars: true
                    }}>
                        <div>
                            <Btn type="add" txt="openSidePage" href={this._openSidePage.bind(this)} style={{ margin: "20px" }} />
                            这是Content3的内容区域-start<br /><br /><br />
                            这是Content3的内容区域1<br /><br /><br />
                            这是Content3的内容区域2<br /><br /><br />
                            这是Content3的内容区域3<br /><br /><br />
                            这是Content3的内容区域4<br /><br /><br />
                            这是Content3的内容区域5<br /><br /><br />
                            这是Content3的内容区域6<br /><br /><br />
                            这是Content3的内容区域7<br /><br /><br />
                            这是Content3的内容区域8<br /><br /><br />
                            这是Content3的内容区域9<br /><br /><br />
                            这是Content3的内容区域10<br /><br /><br />
                            这是Content3的内容区域-end<br /><br /><br />
                        </div>
                    </ReactIScroll>
                </Content3>
                <SidePage title="测试Content3下的SidePage">
                    <div>
                 
                        这是SidePage的内容
                    </div>
                </SidePage>
            </div>

        )
    }
    _openSidePage() {
        openSidePage(this, {
            status: "add",
        })
    }
    _openDialog() {
        openDialog()
    }
}

export default TUI._connect({}, Layout3)