<template>
    <div class="search">
        <SearchHeader/>
        <!-- <Loading v-show="isLoading"/> -->
        <div class="box">
            <div class="content" v-show="!isLoading">
                <HotSearch v-show="isShowHot"></HotSearch>
                <Supple v-show="!isShowHot" :complement="complements" /> 
                 <SearchedList v-show="isShowHot" :listBook="searchList"/>

            </div>
        </div>

   
    </div>
</template>

<script>
import Loading from '@/components/comm/Loading'
import SearchHeader from '@/components/search/SearchHeader'
import HotSearch from '@/components/search/HotSearch'
import {mapState} from 'vuex'
import ls from '@/utils/localStorage'
import SearchedList from '@/components/search/SearchList'
import Supple from  '@/components/search/Supple'


export default {
    name: 'search',
    data(){
        return {
          isLoading:false,
          searchList:[],
          isShowBook:true,
          isShowHot:true,
          complements:[],           //搜索补充
        }
    },
    filters:{
       decodeUrl(url){
           return unescape(url.split("/agent/")[1])
       }
    },
    computed:{
          ...mapState([
              'search_value','search_complement'
          ])
    },
    created(){
        if(ls.getItem("search_novel")){
            this.searchList = ls.getItem("search_novel")
        }

       
    },
    components:{
        Loading,
        SearchHeader,
        HotSearch,
        SearchedList,
        Supple,

    },
    watch:{
        'search_value'(val,old){
            if(val !=""){
                 this.isShowHot =  true
                 console.log(val)
                this.search(val)
            }
        },
        search_complement(val,old){
            if(val == ""){
                             
                this.isShowHot =  true
            }else{
              this.isShowHot = false 
              this.getComplement(val);
            } 
            
        }
    },
    /**
     * http://api.zhuishushenqi.com/book/search-hotword
     */
    methods:{
        getComplement(query){
            this.isLoading = true;
            this.$axios(`/api/book/auto-complete?query=${query}`).then(res =>{
                this.isLoading = false
                console.log( res.data.keywords    )
                this.complements = res.data.keywords           
            })
        },
        search(query){
            console.log("query"+query)
            this.isLoading = true;
            this.$axios(`/api/book/fuzzy-search?query=${query}`).then(res =>{
                this.searchList = res.data.books;
                this.isLoading = false;
                console.log(res)
                this.saveData("search_novel",res.data.books)
                
            })
        },
        saveData(key,value){
            ls.setItem(key,value)
        }
    },

}
</script>
<style lang="less" scoped>

 .search{
     display: flex;
     flex-direction: column;
      width:100vw;
       height: 100vh;
        .box {
            flex: 1;
            border: 1px solid yellow;
            .content {
            word-wrap: break-word;
            word-break: break-all;
            overflow: auto;
            height: 87vh;
            }
        } 
       
   
     .item-wrapper{
         display:flex; 
         padding: 4vw;
         border-bottom: 1px solid #e4e4e4;
         .item-image{
            width: 25vw;
            img{
              
                height: 80px;
            }
         }
         .item-right{
             text-align: left;
            flex:1;
            padding-left: 3vw;
         }
     }

 }
</style>
