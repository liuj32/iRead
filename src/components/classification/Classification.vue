<template>
     <div class="classification">
          <Loading v-show="isLoading" />
          <div class="content" v-show="!isLoading" >
               <div class="leftBar">
                    <ul>
                         <li v-for="title in titles">
                              <a :href="'#'+title">{{title}}</a>
                         </li>
                    </ul>
               </div>
                <div class="rightBox" >
                    <ClassificationList title="男生" :listClass="male"/>
                    <ClassificationList title="女生" :listClass="female"/>
                    <ClassificationList title="漫画" :listClass="picture"/>
                    <ClassificationList title="出版" :listClass="press"/>
               </div> 
          
          </div>

     </div>
</template>

<script>
import ClassificationList from '@/components/classification/ClassificationList.vue'
export default {
  name: "Classification",
  data() {
    return {
      isLoading: false,
      male: [],
      female: [],
      picture:[],   //漫画
      press:[],     //出版
      titles: ["男生", "女生","漫画","出版"],
      errorMsg:"",
    };
  },
  components:{
       ClassificationList,
  },
  created() {
    this.getClassification();
  },
  methods: {
    getClassification() {

      this.$axios(`/api/cats/lv2/statistics`).then(res => {
        // console.log("classification")
        // console.log(res);
        if (res.data.ok) {
          this.male = res.data.male;
          this.female = res.data.female;
          this.picture = res.data.picture;
          this.press = res.data.press;
        }
      }).catch(Response =>{
        console.log("网络错误")
        console.log(Response)  
      })

    }
  },
  filters: {
    parseUrl(url) {
      return unescape(url.split("/agent/")[1]);
    }
  }
};
</script>

<style scoped lang="less">
.classification {
  margin-top: 45px;
  box-sizing: border-box;
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    outline: none;
  }
  .leftBar {
    position: fixed;
    width: 18vw;
    height: 90vh;
    border-right: 1px solid rgb(243, 245, 240);
    ul {
      li {
        padding-top: 3vh;
      }
    }
  }
  .rightBox {
    text-align: center;
    position: relative;
    margin-left: 20vw;
    width: 80vw;
    overflow-y: scroll;
    height: 83vh;
  }
}
</style>

