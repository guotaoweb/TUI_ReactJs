//接口地址前缀
export const INTERFACE1 = "/v1"
//项目根目录
export const ROOTPATH = "/tsm/"
//图片地址
export const IMGPATH = "http://tam.hngytobacco.com/service/fileService/showPic?fileId="
//动画时间
export const ANIMATE_TIME = 50000
//异常信息
export const ERROR_INFO = {
    1002:"参数错误",
    1001:"班级升级失败,已经达到最大级别",
    1000:"年级级别已存在",
    999:"系统异常",
    998:"删除项下面绑定了其他数据,禁止删除",
    997:"班级已存在",
    996:"已存在开启的投票,请先将其关闭后在执行此操作",
    995:"科目已存在",
    994:"已存在开启的投票班级,请先将其关闭后在执行此操作",
    993:"没有已开启的投票",
    992:"该班级正在投票,无法完成升级操作"
}    

export const DEFAULT_OPEN_SIDE = [0,0]
export const VERSION = "Version 2.0.0(20161109)"
export const SCROLL = {
    speed:0.8,
    smoothScrolling:true,
    minScrollSize:40,
    scrollRadius:5
}