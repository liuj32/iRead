<template>
  <div class="search">
    <div class="searchBar">
      <div class="searchBar-inner">
        <i class="iconfont icon-search icon"></i>
        <input
          class="searchBar-input"
          v-model="search_input"
          @click="cancel = false"
          @input="onInput"
          type="text"
        >
      </div>
      <a class="searchBar-cancel" :class="{cancel:cancel}" @click="cancel = !cancel">取消</a>
    </div>
  </div>
</template>

<script>
import ls from "@/utils/localStorage";
import { mapState } from "vuex";

export default {
  name: "searchHeader",
  components: {},
  data() {
    return {
      search_input: "",
      cancel: false,
      searchThrottle: null
    };
  },
  computed: {
    ...mapState(["search_value"])
  },
  created() {
    this.search_input = this.search_value;
    this.searchThrottle = this.throttle(function() {
    this.$store.dispatch("searchComplement", arguments[0]);
    //console.log('ajax request ' + arguments[0])
    }, 1000);
  },
  watch: {
    search_value(val) {
      this.search_input = val;
    }
  },
  mounted() {},
  methods: {
    onSearch(e) {
      this.$store.dispatch("search", this.search_input);
    },
    onInput(e) {
      this.cancel = false;
      this.searchThrottle(e.target.value);
    },
    throttle(fn, delay) {
      let prev = Date.now();
      let timer = null;
      return function() {
        let context = this;
        let now = Date.now();
        let args = arguments
        if (now - prev > delay) {
          fn.apply(context, args);
          prev = now;
        } else {
          clearInterval(timer)
          timer = setTimeout(function() {
            prev = now
            fn.apply(context, args);
          }, 1000);
        }
      };
    }
  }
};
</script>

<style lang="less">
.icon {
  line-height: 28px;
}
.search {
  width: 100%;
  .searchBar {
    background-color: #26a2ff;
    padding: 8px 10px;
    display: flex;
    box-sizing: border-box;
    .searchBar-inner {
      flex: 1;
      background: #fff;
      padding: 4px 6px;
      display: flex;
      height: 28px;
      i {
      }
      .searchBar-input {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        outline: none;
        border: 0;
      }
    }
    .searchBar-cancel {
      padding-left: 3px;
      padding-right: 3px;
      line-height: 36px;
      color: #fff;
    }
    .cancel {
      display: none;
    }
  }
}
</style>
