import '!style!css!postcss!sass!./style.scss'

import loading from "!url!./img/loading.png"

class Loading extends React.Component {
  render() {
    return (
      <div className="t-loading">
        <div className="t_loading_img">
          <img src={loading} />
        </div>
      </div>
    )
  }
}


export default Loading

export function openLoading(op) {
  let sidepage = document.querySelector(".t-loading")
  sidepage.style["transition"] = "opacity 200ms ease"
  sidepage.style.opacity = "1"
  sidepage.style.display = "block"
  if (op == 1) {
    sidepage.style.backgroundColor = "#999"
  }
}

export function closeLoading() {
  setTimeout(function () {
    let sidepage = document.querySelector(".t-loading")
    sidepage.style.backgroundColor = "rgba(0,0,0,0.6)"
    sidepage.style["transition"] = "opacity 200ms ease"
    sidepage.style.opacity = "0"
    setTimeout(function () {
      sidepage.style.display = "none"
    }, 201)
  }, 500)
}