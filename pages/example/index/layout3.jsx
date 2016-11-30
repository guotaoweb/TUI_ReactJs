import Content3 from "Content3"
import Btn from "Btn"
import SidePage, { openSidePage } from "SidePage"
import Table from "Table"

import Layout1 from "./layout1"
import Layout4 from "./layout4"

class Layout3 extends React.Component {
    render() {
        let _this = this
        let tblContent = {
            "thead": { "name1": "序号", "name2": "字段一", "name3": "字段二", "name4": "字段三", "name5": "操作" },
            "tbody": []
        }

        for (var index = 0; index < 10; index++) {
            tblContent.tbody.push({
                "value1": index + 1,
                "value2": "1",
                "value3": "2",
                "value4": "这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,这是一个超级超级长的问题,",
                "fns": [{
                    "name": "编辑",
                    "fn": function () {
                        openDialog(_this, "这是编辑按钮")
                    }
                }, {
                    "name": "删除",
                    "fn": function () {
                        openDialog(_this, "这是删除按钮")
                    }
                }]
            })

        }
        return (
            <div>
                <Content3>
                    <div>这是菜单列表</div>
                    <div></div>
                    <div>
                        <Btn type="add" txt="openSidePage1" href={this._openSidePage1.bind(this)} style={{ margin: "20px" }} />
        
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
                </Content3>
                <SidePage id="s1">
                    <div>
                        <Layout1 />
                    </div>
                </SidePage>
            </div>

        )
    }
    _openSidePage1() {
        openSidePage(this, {
            id: 's1',
            status: "add",
        })
    }
    _openSidePage2() {
        openSidePage(this, {
            id: 's2',
            status: "add",
        })
    }
    _openDialog() {
        openDialog()
    }
}

export default TUI._connect({}, Layout3)