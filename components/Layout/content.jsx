import '!style!css!postcss!sass!./style.scss'
import { Link } from 'react-router'

import Btn from "Btn"
import back from "!url!./img/singleLeft.png"
import loading from "!url!./img/loading.png"

class Content extends React.Component {
    render() {
        const {addHref, txt, children, editHref, addTxt, editTxt, backHref} = this.props
        let addBtn,
            editBtn,
            backBtn
        if (addHref) {
            addBtn = <div style={{ float: "right" }}>
                <Btn type="add" txt={addTxt ? addTxt : "新增"} href={addHref} />
            </div>
        }

        if (editHref) {
            editBtn = <div style={{ float: "right", marginRight: "10px" }}>
                <Btn type="edit" txt={editTxt ? editTxt : "编辑"} href={editHref} />
            </div>
        }

        if (backHref) {
            backBtn = <img src={back} onClick={this.goBack.bind(this)} />
        }
        return (
            <div className="t-content" ref="tContent">
                <div className="t-content_t">
                    <span>{backBtn}{txt}</span>
                    {addBtn}{editBtn}
                </div>
                <div style={{ padding: "5px 7px" }}>

                    {children}
                </div>
                <div className="t-content-loading">
                    <div className="t_loading_img">
                        <img src={loading} />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let allHeight = document.documentElement.clientHeight;
        let headerHeight = document.querySelector(".t-header").offsetHeight;
        let marginTop = 15;
        ReactDOM.findDOMNode(this.refs.tContent).style.height = (allHeight - headerHeight - marginTop * 2) + "px";
        ReactDOM.findDOMNode(this.refs.tContent).style.marginTop = marginTop + "px"
    }

    goBack() {
        this.props.backHref()
    }
};

export default Content;

export function openContentLoading() {
    let sidepage = document.querySelector(".t-content-loading")
    sidepage.style["transition"] = "opacity 200ms ease"
    sidepage.style.opacity = "1"
    sidepage.style.display = "block"
}

export function closeContentLoading() {
    setTimeout(function() {
        let sidepage = document.querySelector(".t-content-loading")
        sidepage.style["transition"] = "opacity 200ms ease"
        sidepage.style.opacity = "0"
        setTimeout(function() {
            sidepage.style.display = "none"
        }, 201)
    }, 500)
}