import * as types from './mutations-types'
import ls from '@/utils/localStorage'

export default {

    //小说详情id
    [types.DETAIL_ID](state,value){
        state.detail_id   = value
    },
    //设置热bai标签
    [types.HOT_LABEL](state,value){
        state.hot_label = value;
        ls.setItem("hot_label",value)
    },
    //搜索值
    [types.SEARCH_VALUE](state,value){
        ls.setItem("search_value",value)
        state.search_value   = value
    },    
    [types.SEARCH_BTN](state){
        state.search_btn = !state.search_btn
    }, 
    [types.SEARCH_COMPLEMENT](state,value){
        state.search_complement = value
    } ,
    [types.BOOK_DETAIL](state,value){
        ls.setItem("book_detail",value)
        state.book_detail = value
    } ,
    [types.CHAPTERS](state,value){
        ls.setItem("chapters",value)
        state.chapters = value
    } ,
    /**
     * 
     * @param {*} state read
     */
    [types.BAR](state){
        state.bar = !state.bar
    } ,
    [types.LIST_PANEL](state){
        state.list_panel = !state.list_panel
    } ,
    [types.SETTING_PANEL](state){
        state.setting_panel = !state.setting_panel
    } ,
    [types.MODEL](state){
        state.model = !state.model
    } ,      
    [types.CURCHAPTER](state,value){
        state.cur_chapter = value
    } ,              
    [types.FONT_SIZE](state,value){
        state.font_size = value
    } ,  
    [types.BG_COLOR](state,value){
        state.bg_color = value
    } ,      
       
}