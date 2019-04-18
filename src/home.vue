<template>
    <div class="page_container">
      <mt-tab-container  v-model="selected" :swipeable="false" :value="selected">
          <mt-tab-container-item id="书架">
             <BookStore></BookStore>
          </mt-tab-container-item>
          <mt-tab-container-item id="搜索">
              <Search></Search>
          </mt-tab-container-item>
          <mt-tab-container-item id="排行">
              <Rank></Rank>
              <mt-header fixed :title="selected"></mt-header> 
              
            <!-- <keep-alive include="Rank">
              <Ranklist class="tab-container"></Ranklist>
            </keep-alive>  -->
          </mt-tab-container-item>
          <mt-tab-container-item id="分类">
                <mt-header fixed :title="selected"></mt-header>
              <keep-alive>
                <Classification></Classification>
              </keep-alive>
               
          </mt-tab-container-item>
        </mt-tab-container>    

        <mt-tabbar v-model="selected" :fixed="true"  :value="selected" class="mt_tabbar">
          <mt-tab-item id="书架">
            <i slot="icon" class="iconfont icon-shu"></i>书架
          </mt-tab-item>
          <mt-tab-item id="搜索">
            <i slot="icon" class="iconfont icon-search"></i>搜索
          </mt-tab-item>
          <mt-tab-item id="排行">
            <i slot="icon" class="iconfont icon-cascades"></i>  排行
          </mt-tab-item>
          <mt-tab-item id="分类">
            <i slot="icon" class="iconfont icon-paihangbang--"></i>分类
          </mt-tab-item>
        </mt-tabbar>

    </div>
</template>

<script>
import BookStore from '@/components/bookStore/BookStore'
import Search from '@/components/search/Search'
import Rank from '@/components/rank/Rank'
import Classification from '@/components/classification/Classification'
import ls from '@/utils/sessionStorage'

export default {
     name:'',
     data(){
         return{
            selected:'书架',
         }
     },
     created(){
        if(ls.getItem("selected")){
            this.selected = ls.getItem("selected")
        }
     },
     
     watch:{
        selected(val,old){
            ls.setItem("selected",val)
        }
     },
     components:{
         BookStore, Search, Rank, Classification,
     },
     methods:{
        changeIndex(id) {
        this.now_menu = id;
        }

     }
}
</script>

<style lang="less"  scoped>
.page_container{
    width: 100%;
    height:100%;
    overflow: hidden;

}
 .mint-tab-item {
   padding: 3px 0;
 }
 .mint-tab-item-icon {
   height: auto;
 }
 .mint-header{
   background: #da2626;
 }
</style>

