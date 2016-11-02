import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll'

import TUI from '../../utils'
import Actions from "../../actions/index"

import Content3 from "../../components/Layout/content3"


class Layout3 extends Component {
    render() {
        return (

            <Content3>
                <div>这是菜单列表</div>
                <div></div>
                <ReactIScroll iScroll={iScroll} options={{
                    mouseWheel: true,
                    scrollbars: true
                }}>
                    <div>
                        这是Content3的内容区域-start<br/><br/><br/>
                        这是Content3的内容区域1<br/><br/><br/>
                        这是Content3的内容区域2<br/><br/><br/>
                        这是Content3的内容区域3<br/><br/><br/>
                        这是Content3的内容区域4<br/><br/><br/>
                        这是Content3的内容区域5<br/><br/><br/>
                        这是Content3的内容区域6<br/><br/><br/>
                        这是Content3的内容区域7<br/><br/><br/>
                        这是Content3的内容区域8<br/><br/><br/>
                        这是Content3的内容区域9<br/><br/><br/>
                        这是Content3的内容区域10<br/><br/><br/>
                        这是Content3的内容区域-end<br/><br/><br/>
                    </div>
                </ReactIScroll>
            </Content3>



        )
    }

    _openDialog() {
        openDialog()
    }
}

export default TUI._connect({}, Layout3)