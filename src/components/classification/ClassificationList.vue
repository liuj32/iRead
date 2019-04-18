<template>
    <div class="listContainer" >
        <div class="title"><a :name="title">{{title}}</a></div>
        <ul>
            <li v-for="(item,index) in listClass" @click="jumpTo(item.name)" :key="index" ref="majorText">
                <div class="info">
                    <span class="text">{{item.name}}</span>
                    <span class="count">{{item.bookCount }}</span>
                </div>
                <div class="imgBox">
                    <img :src="item.bookCover[0] | parseUrl" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "ClassificationList",
  data() {
    return {

    }
  },
  created() {

  },
  props: {
    title: {
      type: String,
      default: ""
    },
    listClass: {
      type: Array,
      default: []
    }
  },
  computed: {},
  filters: {
    parseUrl(url) {
      return unescape(url.split("/agent/")[1]);
    }
  },
  components: {},
  methods: {
    jumpTo(value) {
       this.$router.push({path:`/category/?gender=${this.title}&major=${value}`})
       console.log(value) 
    } 
  }
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  outline: none;
}
ul {
  flex-wrap: wrap;
  display: flex;
}
.title{
        margin-bottom: 2vh;
}
li {
  list-style: none;
  box-sizing: border-box;
  background: rgb(243, 245, 240);
  margin-bottom: 2vh;
  margin-left: 2vw;
  flex: 0 0 45%;
  position: relative;
  height: 16vw;
  .info {
    position: absolute;
    left: 0;
    padding: 2vh;
    display: flex;
    flex-direction: column;
  }
  .imgBox {
    right: 0;
    position: absolute;
    width: 13vw;
    height: 16vw;
    img {
      max-width: 13vw;
      max-height: 16vw;
    }
  }
}
</style>

