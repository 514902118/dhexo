<template>
  <div class="home">
    <!-- vHeader -->
    <vHeader/>
    <div class="banner">
      <!-- <img src="../assets/banner.jpg" alt="" ondragstart="return false"/> -->
    </div>
    <div class="container">
      <!-- one -->
      <div class="one">
        <div class="left">
          <div class="info">
            <h4>遗传病解读</h4>
            <p>成功开发出“全外”人工智能解读引<br/>擎实现遗传病“全外”数据全自动智<br/>能解读，为业界唯一。</p>
            <div class="more-btn">了解更多</div>
          </div>
        </div>
        <div class="right">
          <div class="rect"></div>
          <img src="../assets/home-01.png" alt="" ondragstart="return false">
        </div>
      </div>
      <!-- two -->
      <div class="two">
        <div class="left"><img src="../assets/home-02.png" alt="" ondragstart="return false"/></div>
        <div class="right">
          <div class="info">
            <h4>最完整的知识数据库</h4>
            <div class="rect">
              <p>构建了业内最完整的疾病-症状（表型）-基因-变异位点知识库，底层以 GRAKN 图数据库技术做支撑。</p>
              <div class="more-btn">了解更多</div>
            </div>
          </div>
        </div>
      </div>
      <!-- three -->
      <div class="three">
        <div class="left">
          <div class="rect-outer">
            <div class="rect-inner">
              <h4>医学研究文献及时同步</h4>
              <div>
                <p>利用人工智能（AI）技术支持的自然语言处理（NLP）技术从专业医学研究文献中实现知识的自动获取，并实现知识库资源的随时更新。</p>
                <div class="more-btn">了解更多</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <img src="../assets/home-03.png" alt="" ondragstart="return false"/>
        </div>
      </div>
      <!-- four -->
      <div class="four">
        <div class="left">
          <div class="elcarousel">
            <el-carousel ref="carousel" height="500" :autoplay="false" arrow="never" indicator-position="outside" @change="handleChange">
              <el-carousel-item>
                <img class="img" src="../assets/home-04.png" alt="" ondragstart="return false">
              </el-carousel-item>
              <el-carousel-item>
                <img class="img" src="../assets/home-05.png" alt="" ondragstart="return false">
              </el-carousel-item>
              <el-carousel-item>
                <img class="img" src="../assets/home-06.png" alt="" ondragstart="return false">
              </el-carousel-item>
              <el-carousel-item>
                <img class="img" src="../assets/home-07.png" alt="" ondragstart="return false">
              </el-carousel-item>
            </el-carousel>
          </div>
          
        </div>
        <div class="right">
          <div class="rect">
            <ul class="list">
              <li :class="{'active': this.activeIndex === 0}" @mouseenter="handleEnter(0)"><p>开发完成基于机器学习模型的集成化变异位点致病性打分机制</p></li>
              <li :class="{'active': this.activeIndex === 1}" @mouseenter="handleEnter(1)"><p>采用精准的种群特异性的次等位基因频率（MAF）对变异位点评估</p></li>
              <li :class="{'active': this.activeIndex === 2}" @mouseenter="handleEnter(2)"><p>实现由知识图谱技术支持的报告智能展示</p></li>
              <li :class="{'active': this.activeIndex === 3}" @mouseenter="handleEnter(3)"><p>使用可拓展性的前沿前端和后端技术</p></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- vFooter -->
    <vFooter/>
  </div>
</template>

<script>
import vHeader from '@/components/common/vHeader'
import vFooter from '@/components/common/vFooter'

export default {
  name: 'Home',
  components: {
    vHeader,
    vFooter
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    handleEnter(index) {
      this.activeIndex = index
      this.$refs.carousel.setActiveItem(index)
    },
    handleChange(activeIndex) {
      this.activeIndex = activeIndex
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.home {
  width: 100%;
  .banner {
    width: 100%;
    height: 371px;
    background: url(../assets/banner.jpg) no-repeat center center;
    background-size: cover;
    // img {
    //   display: inline-block;
    //   width: 100%;
    // }
  }
  .container {
    position: relative;
    width: 100%;
    .one {
      display: flex;
      height: 640px;
      margin-bottom: 36px;
      overflow: hidden;
      .left {
        position: relative;
        flex: .65;
        .info {
          position: absolute;
          top: 50%;
          left: 50%;
          padding: 0 20px;
          margin-top: -260px;
          margin-left: -240px;
          h4 {
            display: block;
            width: 100%;
            height: 76px;
            line-height: 82px;
            padding-left: 214px;
            margin-left: -14px;
            margin-bottom: 120px;
            text-align: left;
            font-weight: normal;
            font-size: 40px;
            color: $fontColor2;
            background: url(../assets/logo2.png) no-repeat 0 center;
            background-size: 194px auto;
            // i {
            //   display: inline-block;
            //   margin-right: 30px;
            //   letter-spacing: 4px;
            //   font-family: NotoSansHans-Bold !important;
            //   font-size: 57.79px;
            //   color: $mainColor;
            // }
          }
          p {
            line-height: 40px;
            margin-bottom: 120px;
            text-align: left;
            font-size: 22px;
            // letter-spacing: 3px;
            color: $fontColor2;
          }
          .more-btn {
            margin-left: -4px;
          }
        }
      }
      .right {
        position: relative;
        flex: .35;
        max-width: 704px;
        .rect {
          width: 100%;
          height: calc(100% - 40px);
          border-top-left-radius: 36px;
          border-bottom-left-radius: 36px;
          margin-top: 36px;
          background-color: $bgColor1;
        }
        img {
          position: absolute;
          top: 50%;
          left: -309px;
          height: 500px;
          margin-top: -250px;
        }
      }
    }
    .two {
      display: flex;
      height: 720px;
      margin-bottom: 36px;
      background-color: $bgColor1;
      overflow: hidden;
      .left {
        position: relative;
        flex: .5;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          height: 500px;
          margin-top: -250px;
          margin-left: -300px;
        }
      }
      .right {
        flex: .5;
        .info {
          width: 520px;
          margin-top: 126px;
          margin-left: 60px;
          // letter-spacing: 4px;
          color: $fontColor2;
          h4 {
            margin-bottom: 40px;
            text-align: center;
            font-weight: normal;
            font-size: 40px;
          }
          .rect {
            height: 300px;
            padding: 40px 70px;
            border-radius: 36px;
            box-shadow: 0 0px 14px 4px rgba(2, 167, 240, 0.1);
            background-color: #fff;
            p {
              line-height: 40px;
              margin-top: 40px;
              font-size: 20px;
              // letter-spacing: 4px;
              color: $fontColor2;
            }
            .more-btn {
              margin-top: 85px;
            }
          }
        }
      }
    }
    .three {
      display: flex;
      height: 720px;
      margin-bottom: 36px;
      overflow: hidden;
      .left {
        position: relative;
        flex: .45;
        .rect-outer {
          position: relative;
          height: 100%;
          border-top-right-radius: 36px;
          border-bottom-right-radius: 36px;
          background-image: $bgGradient1;
          .rect-inner {
            position: absolute;
            top: 50%;
            right: 70px;
            width: 495px;
            margin-top: -232px;
            h4 {
              margin-bottom: 40px;
              text-align: center;
              font-weight: normal;
              font-size: 40px;
              // letter-spacing: 4px;
              color: #fff;
            }
            > div {
              height: 300px;
              padding: 40px 50px;
              border-radius: 36px;
              background-color: rgba(255, 255, 255, 0.2);
              p {
                line-height: 40px;
                margin-top: 20px;
                font-size: 20px;
                // letter-spacing: 2px;
                color: #fff;
              }
              .more-btn {
                margin-top: 60px;
              }
            }
          }
        }
      }
      .right {
        position: relative;
        flex: .55;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          height: 570px;
          margin-top: -285px;
          margin-left: -340px;
        }
      }
    }
    .four {
      display: flex;
      height: 597px;
      margin-bottom: 36px;
      background-color: $bgColor1;
      .left {
        position: relative;
        flex: .55;
        .elcarousel {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 700px;
          height: 700px;
          margin-top: -340px;
          margin-left: -300px;
          text-align: center;
          .img {
            display: inline-block;
            height: 600px;
          }
        }
      }
      .right {
        position: relative;
        flex: .45;
        .rect {
          position: absolute;
          top: 50%;
          left: 80px;
          width: 354px;
          height: 450px;
          border-radius: 36px;
          margin-top: -225px;
          box-shadow: 0 0px 14px 4px rgba(2, 167, 240, 0.1);
          background-color: rgba(255, 255, 255);
          .list {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            height: 100%;
            li {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 25%;
              &.active {
                width: 400px;
                padding: 0 23px;
                border-radius: 20px;
                margin-left: -23px;
                margin-right: -23px;
                color: #fff;
                background-image: $bgGradient1;
                cursor: pointer;
              }
              p {
                line-height: 26px;
                padding: 0 30px;
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
}
.more-btn {
  display: inline-block;
  width: 260px;
  height: 60px;
  line-height: 60px;
  border-radius: 36px;
  text-align: center;
  font-family: NotoSansHans-Medium;
  font-size: 24px;
  color: #fff;
  background-image: $bgGradient2;
  cursor: pointer;
}
</style>
