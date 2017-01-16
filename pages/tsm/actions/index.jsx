import * as publicActions from '../../../components/Public/public.actions' //public 不能用,貌似是关键字
import * as fromControl from '../../../components/Public/public.formControl.actions' //public 不能用,貌似是关键字
import * as teacherList from './teacherList.actions'
import * as courseList from './courseList.actions'
import * as classesList from './classesList.actions'
import * as survyList from './survyList.actions'
import * as voteList from './voteList.actions'
import * as gradeList from './gradeList.actions'
import * as adminList from './adminList.actions'
import * as voting from './voting.actions'
import * as print from './print.actions'

export default {
    ...teacherList,
    ...courseList,
    ...classesList,
    ...survyList,
    ...publicActions,
    ...fromControl,
    ...voteList,
    ...gradeList,
    ...adminList,
    ...voting,
    ...print
}
