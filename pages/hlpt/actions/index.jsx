import * as publicActions from '../../../components/Public/public.actions' //public 不能用,貌似是关键字
import * as fromControl from '../../../components/Public/public.formControl.actions' //public 不能用,貌似是关键字
import * as vteamEdit from './vteamEdit.actions'
import * as vteamList from './vteamList.actions'
import * as vteamManage from './vteamManage.actions'
import * as vteamUsers from './vteamUsers.actions'
import * as orgnization from './orgnization.actions'
import * as orgnizationManage from './orgnizationManage.actions'
import * as positionGroup from './positionGroup.actions'
import * as positionMaintain from './positionMaintain.actions'
import * as userMaintain from './userMaintain.actions'
import * as dataPrivileges from './dataPrivileges.actions'
import * as personMatchPost from './personMatchPost.actions'
import * as sideList from './sideList.actions'
import * as auditlogs from './auditlogs.actions'


export default {
    ...vteamEdit,
    ...vteamList,
    ...vteamManage,
    ...vteamUsers,
    ...orgnization,
    ...publicActions,
    ...orgnizationManage,
    ...positionGroup,
    ...positionMaintain,
    ...userMaintain,
    ...dataPrivileges,
    ...personMatchPost,
    ...fromControl,
    ...sideList,
    ...auditlogs
}
