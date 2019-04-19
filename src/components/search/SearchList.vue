<template>
    <div>
        <router-link class="item-wrapper"
         v-for="item in listBook" 
         :to="{path:'/detail/'+item._id}"
         :key="item._id">
            <div class="item-image">
                <img style="width:80%;" :src="item.cover |  decodeUrl">
            </div>
            <div class="item-right">
                <div class="title" style="font-size:3.6vw;">{{item.title}}</div>
                <div class="intro">{{item.shortIntro}}</div>
                <div class="text">
                    <span class="author">
                        <i class="iconfont icon-account"></i>
                        {{item.author}}
                    </span>
                    <span class="type">{{item.cat}}</span>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {};
  },
  props: {
    listBook: {
      type: Array,
      default: []
    }
  },

  filters: {
    decodeUrl(url) {
      return unescape(url.split("/agent/")[1]);
    }
  },
  computed: {},
  created() {
    
  },
  components: {},
  watch: {},
  methods: {}
};
</script>
<style lang="less">
.item-wrapper {
  display: flex;
  text-decoration: none;
  padding: 4vw;
  border-bottom: 1px solid #e4e4e4;
  .title{
        color: #333!important;
  }
  .item-image {
    width: 20vw;
    img {
      height: 80px;
    }
  }
  .item-right {
    text-align: left;
    flex: 1;
    padding-left: 3vw;
    .intro {
      padding-top: 1vh;
      font-size: 3.4vw;
      color: #777;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
        /* ! autoprefixer: off */  
        -webkit-box-orient: vertical; 
        /* autoprefixer: on */
    }
    .text {
      font-size: 3.4vw;
      color: #777;
      padding-top: 1vw;
      font-size: 3vw;
      .type {
        float: right;
      }
    }
  }
}
</style>
