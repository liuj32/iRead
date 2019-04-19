<template>
  <div class="page_container" :bg="bg_color">
    <Loading v-show="isLoading"/>
    <div v-if="!isLoading">
      <div class="head" :bg="bg_color">{{chapter.title}}</div>
        <div v-html="content" class="contents" ref="fz_size"></div>
         <div class="chapterBtn">
             <span class="btn" @click="preChapter" :class="{disabled:chapterId==0}">上一章</span>
             <span class="btn" @click="nextChapter" :class="{disabled:chapterId== chapters.chapters.length-1}">下一章</span>
         </div>
    </div>

  
    <div class="top" @click="pageUp"></div>
    <div class="toggleBar" @click="toggleBar"></div>
    <div class="bottom" @click="pageDown"></div>
    <top-nav></top-nav>
    <bottom-nav></bottom-nav> 
    <ViewList v-show="list_panel"></ViewList>
    <SettingPanel v-show="setting_panel"></SettingPanel>
    <Cover :class="{hide: !list_panel}" />
  </div>
</template>

<script>
import ls from "@/utils/localStorage";
import Vue from "vue";
import TopNav from "@/components/read/topNav/TopNav";
import BottomNav from "@/components/read/bottomNav/BottomNav";
import ViewList from "@/components/read/ViewList";
import SettingPanel from "@/components/read/settingPanel/SettingPanel";
import Cover from "@/components/comm/Cover";
import {mapState} from "vuex";

export default {
  name: "",
  data() {
    return {
      isLoading: true,
      id: "", // 书id
      chapterId: "", //章节id
      chapter: {}, //当前章节
      chapters:{},
      skin: 1,
      readInfo: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.chapters = ls.getItem("chapters")
    /**
     * readInfo
     * {"58ff0e0f2afbafd0424b21f0":0}
     */
    this.readInfo = ls.getItem("read_info");
    this.init();
  },
  computed: {
    content() {
      let str = this.chapter.cpContent;
      if (str) {
        return str.replace(/\n/g, "<p>");
      }
    },
    ...mapState([
        "cur_chapter","font_size","bg_color","setting_panel","list_panel","book_detail"
    ])
  },
  components: {
    TopNav,
    BottomNav,
    ViewList,
    SettingPanel,
    Cover,
     
  },
  watch:{
    cur_chapter(val,old){
      this.chapterId = val
      console.log("curChapter:"+ val)
      let link = this.chapters.chapters[this.chapterId].link;
      this.getChapter(link)
      this.saveData()
    },
    font_size(val,old){
      this.$refs.fz_size.style.fontSize = val + "px"
    }
  },
  /**
   {
     "546c3538e09d79005bc44b60":{
        title:"标题",
        cover: "",
        chapterId:1,
        time:""
     }
   }
   */
  methods: {
    async init() {
      console.log("init")
      if (!(this.chapters && this.chapters.book == this.id)) {
         await this.getData(this.id);
      }
        if (this.readInfo && this.readInfo[this.id] != null) {
          this.chapterId = this.readInfo[this.id].chapterId;
          console.log(111);
        } else if (this.readInfo) {
          this.chapterId = 0;
          console.log(222);
        } else {
          this.readInfo = {};
          this.chapterId = 0;
        }

      
      console.log(444);
      let link = this.chapters.chapters[this.chapterId].link;
      await this.getChapter(link);
      this.saveData()
    },
  /**
   {
     "546c3538e09d79005bc44b60":{
        title:"标题",
        cover: "",
        chapterId:1,
        time:""
     }
   }
   */    
    saveData(){
      let bookInfo = {
        title: this.book_detail.title,
        cover: this.book_detail.cover,
        chapterId:this.chapterId,
        chapterTitle:this.chapters.chapters[this.chapterId].title,
        time:this.$currentTime()        
      }
      this.readInfo[this.id] = bookInfo;
      ls.setItem("read_info", this.readInfo);
    },
    /**
     * 根据link获取章节内容信息
     */
    getChapter(chaperId) {
      this.isLoading = true;
      this.$axios(`/chapter/${chaperId}`).then(res => {
        if (res.data.ok) {
          this.chapter = res.data.chapter;
          console.log(this.chapter);
          this.isLoading = false;
        }
      });
    },
    async getData(bookId) {
      // this.isLoading = true
      //let _this = this
      var arr = [];
      try {
        const response = await Vue.axios(
          `/api/btoc?view=summary&book=` + bookId
        );
        console.log(response);
        if (this.isArray(response.data)) {
          let sourceId = response.data[0]._id;
          console.log(sourceId);
          const res = await Vue.axios(
            "/api/atoc/" + sourceId + "?view=chapters"
          );
          this.chapters = res.data
          this.$store.dispatch("chapters", res.data);
          console.log(res);
        } else {
          console.log("获取源id错误");
        }

        //this.isLoading = false
      } catch (error) {
        console.error("资源获取失败");
      }
    },
    isArray(arr) {
      if (arr && Object.prototype.toString.call(arr) == "[object Array]") {
        return true;
      } else {
        return false;
      }
    },
    pageUp() {
      console.log("pageup")
    },
    toggleBar() {
      console.log("toggleBar")
      if(this.setting_panel){
          this.$store.dispatch("toggleSettingPanel")
      }else{
          this.$store.dispatch("toggleBar")
      }
     
    },
    pageDown() {
      console.log("pageDown")
    },
    back() {
      this.$router.go(-1);
    },
    preChapter(){
      let id = this.chapterId
      if(id){
          id = id-1
          this.$store.dispatch("curChapter",id)
      }
    },
    nextChapter(){
      let id = this.chapterId
      if(id<this.chapters.chapters.length-1){
          id = id+1
          this.$store.dispatch("curChapter",id)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page_container {
  display: flex;
  width: 100vw;
  box-sizing: border-box;
  min-height: 600px;
  .head {
    position: fixed;
    height: 7vh;
    top: 0;
    left: 0;
    width: 100vw;
    line-height: 7vh;
  }
  .contents {
    margin-top: 7vh;
    padding: 3vw;
    p {
      text-align: justify;
      text-indent: 2em;
      letter-spacing: 0px;
    }
  }
  .chapterBtn{
    display: flex;
    justify-content:space-around;
    padding: 2vh;
    .btn{
      display: inline-block;
      width:30vw;
      border-radius: 10px;
      height: 10vw;
      line-height: 10vw;
      background:rgba(0, 0, 0, 0.1)
    }
    .disabled{
      cursor: not-allowed;
    }
  }
}

.cover {
}
.top {
  position: fixed;
  width: 100%;
  height: 35%;
  top: 0;
  color: rgba(0, 0, 0, 0.1);
  z-index: 5;
  //border: 1px solid red;
}
.toggleBar{
  //border: 1px solid yellow;
  position: fixed;
  width: 100vw;
  height: 35%;
  top: 35%;
  color: rgba(0, 0, 0, 0.1);
  z-index: 5;
}
.bottom {
 // border: 1px solid yellow;
  position: fixed;
  width: 100vw;
  height: 22%;
  top: 70%;
  color: rgba(0, 0, 0, 0.1);
  z-index: 5;
}
.bac(@color) {
    background-color: @color;
  }


  [bg='1'] {
    .bac(#e9dfc7);
  }

  [bg='2'] {
    .bac(#e7eee5);
  }

  [bg='3'] {
    .bac(#a4a4a4);
  }

  [bg='4'] {
    .bac(#cdefcd);
  }

   [bg='5'] {
    .bac(#283548);
  }

  [bg='6'] {
    .bac(#0f1410);
  }
  [bg="7"] {
   .bac(rgb(212, 217, 217));
}
  [night='true'] {
    .bac(#0f1410);
    h4 {
      .bac(#0f1410);
    }
  }
</style>

