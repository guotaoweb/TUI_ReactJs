import * as utils from '../utils/index'
import * as publicActions from './public.actions' //public 不能用,貌似是关键字
import * as multyMenu from './multyMenu.actions'

export default {
    ...utils,
    ...publicActions,
    ...multyMenu
}
