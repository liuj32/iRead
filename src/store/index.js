import Vue from 'vue'
import Vuex from 'vuex'
import ls from '@/utils/localStorage'
import mutations from './mutations';
import actions from './actions';
import rank from './modules/rank';

Vue.use(Vuex)

const state = {
    search_value: ls.getItem("search_value"),
    search_btn: false,
    detail_id: '',     //点击的小说详情id
    hot_label: ls.getItem("hot_label"),    //热标签
    search_complement:'', //自动补充关键词
    book_detail: ls.getItem("book_detail"),
    chapters: ls.getItem("chapters"),
    read_info:ls.getItem("read_info"),
    bar:false,                //阅读页top.bottom转化
    list_panel:false,          //章节列表面板
    setting_panel:false,          //字体面板
    model:true,                //白天
    cur_chapter:0,
    font_size:16,
    bg_color:7,
    menu_item:""
}

var store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
      rank
    }
})

export default  store
