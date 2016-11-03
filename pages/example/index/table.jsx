import Content from "Content"
import Table from "Table"
import Pager from "Pager"
import {openDialog} from "Dialog"

class TablePage extends React.Component {
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
                <Content txt="Table表格">
                    <Table tblContent={tblContent} width="50,200,0,0,180"/>
                    <Pager fn={this.pageFn.bind(this) } style={{ float: "right", marginRight: "5px" }}/>
                </Content>
            </div>
        )
    }

    pageFn() {

    }

    componentDidMount() {
        this.props.updatePageInfo({
            index: 1,
            size: 5,
            sum: 100,
            url: ""
        })
    }
}

export default TUI._connect({

}, TablePage)