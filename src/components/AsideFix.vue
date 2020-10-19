<template>
  <ul class="aside aside-fix">
    <router-link :to="{ name: 'home'}" tag="li"><i class="iconfont icon-shouye1"></i><span>返回首页</span></router-link>
    <router-link :to="{ name: 'leaveMessage'}" tag="li"><i class="iconfont icon-liuyanban-05"></i><span>留言</span></router-link>
  </ul>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.aside {
  position: fixed;
  top: 50%;
  left: 0;
  margin-top: -61px;
  list-style: none;
  z-index: 3;
  li {
    display: block;
    width: 232px;
    height: 68px;
    line-height: 68px;
    padding-left: 10px;
    border-top-right-radius: 36px;
    border-bottom-right-radius: 36px;
    margin-bottom: 10px;
    background-color: $bgColor5;
    cursor: pointer;
    &:nth-of-type(2) {
      background-color: $bgColor9;
    }
    i {
      display: inline-block;
      margin-left: 44px;
      margin-right: 4px;
      font-size: 36px;
      color: #fff;
      vertical-align: top;
    }
    span {
      display: inline-block;
      font-size: 28px;
      color: #fff;
    }
  }
}
@media screen and (min-width: 1600px) {
  // .aside {
  //   li {
  //     width: 160px;
  //   }
  // }
}
</style>