import * as publicActions from '../../../components/Public/public.actions' //public 不能用,貌似是关键字
import * as multyMenu from './multyMenu.actions'


export default {
    ...multyMenu,
    ...publicActions
}
