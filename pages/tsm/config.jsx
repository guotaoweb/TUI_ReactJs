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
    992:"该班级正在投票,无法完成升级操作",
    991:"默认问卷设置错误,请返回问卷列表进行调整",
    990:"用户注册失败",
    989:"用户不存在",
    988:"用户已存在",
    987:"两次输入的密码不一致",
    986:"账号或密码错误",
    985:"密码重置失败",
    984:"账户已被锁定",
    983:"无权限",
    982:"该班级下没有任课老师"
}    

export const DEFAULT_OPEN_SIDE = [0,0]
export const VERSION = "Version 2.0.0(20161109)"
export const SCROLL = {
    speed:0.8,
    smoothScrolling:true,
    minScrollSize:40,
    scrollRadius:5
}
export const THEME = {
    default:{
        bg:"rgb(36, 46, 63)",
        unBg:"",
        color:"white",
        unColor:"#999",
        border:"rgb(76, 134, 220)"
    },
    blue:{
        bg:"#6493BB",
        unBg:"",
        color:"#454545",
        unColor:"white",
        border:"#1D6FD7"
    },
    green:{
        bg:"rgba(134, 220, 72,.5)",
        unBg:"",
        color:"#454545",
        unColor:"white",
        border:"rgba(134, 220, 72,.5)"
    },
    red:{
        bg:"#FDBF62",
        unBg:"",
        color:"#454545",
        unColor:"white",
        border:"#DB543E"
    }
}