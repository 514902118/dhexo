<template>
  <div>
    <vLoginHeader/>
    <div class="main">
      <div class="box query-details">
        <div class="top">
          <h3><i class="logo"></i>张三的全外解读报告</h3>
          <p class="doctor">
            <span>解读医生：李医生</span>
            <span>时间：2020/04/24</span>
          </p>
        </div>
        <div class="block block1">
          <p class="title"><em>患者基本信息</em></p>
          <ul class="base-info">
            <li><span>姓名：</span><p>张三</p></li>
            <li><span>性别：</span><p>女</p></li>
            <li><span>年龄：</span><p>20</p></li>
            <li><span>症状：</span><p>脚疼；头疼</p></li>
            <li><span>家族遗传病史：</span><p>无</p></li>
          </ul>
        </div>
        <div class="block block2">
          <p class="title"><em>检测结果</em></p>
          <p class="result">
            <span><i class="danger"></i>检测到3个高度关注的突变。突变Chr15:48487333 C>G 极有可能会导致色盲。</span>
            <span>检测到4个中度关注的突变。突变Chr2 8888 A>C 可能导致耳聋。</span>
            <span>检测到5个低度关注的突变。突变Chr3 8888 A>C 可能导致地贫。</span>
          </p>
        </div>
        <div class="block block3">
          <p class="title"><em>高度关注</em></p>
          <dl class="table">
            <dt>
              <span>RS</span>
              <span>染色体位置</span>
              <span>Ref</span>
              <span>Alt</span>
              <span>基因型</span>
              <span>MAF</span>
              <span>基因</span>
              <span>致病分值</span>
            </dt>
            <dd>
              <span>rs140598</span>
              <span>15:48487333</span>
              <span>C</span>
              <span>G</span>
              <span>0/1</span>
              <span>0.05</span>
              <span>CHRNB1</span>
              <span>0.85</span>
            </dd>
          </dl>
          <dl class="table">
            <dt>
              <span>RS</span>
              <span>染色体位置</span>
              <span>Ref</span>
              <span>Alt</span>
              <span>基因型</span>
              <span>MAF</span>
              <span>基因</span>
              <span>致病分值</span>
            </dt>
            <dd>
              <span>rs140598</span>
              <span>15:48487333</span>
              <span>C</span>
              <span>G</span>
              <span>0/1</span>
              <span>0.05</span>
              <span>CHRNB1</span>
              <span>0.85</span>
            </dd>
          </dl>
        </div>
        <div class="block block4">
          <p class="title"><em>重点关注疾病</em></p>
          <ul class="diseases-info">
            <li><i>疾病名</i><span>DIGEORGE SYNDROME; DGS</span></li>
            <li><i>发病年龄</i><span>Neonata</span></li>
            <li><i>遗传方式</i><span>Autosomal dominant</span></li>
            <li><i>发病率</i><span>1-5 / 10 000</span></li>
          </ul>
        </div>
        <div class="block block5">
          <p class="title"><em>中度关注</em></p>
          <dl class="table">
            <dt>
              <span>RS</span>
              <span>染色体位置</span>
              <span>Ref</span>
              <span>Alt</span>
              <span>基因型</span>
              <span>MAF</span>
              <span>基因</span>
              <span>致病分值</span>
            </dt>
            <dd>
              <span>rs140598</span>
              <span>15:48487333</span>
              <span>C</span>
              <span>G</span>
              <span>0/1</span>
              <span>0.05</span>
              <span>CHRNB1</span>
              <span>0.85</span>
            </dd>
          </dl>
        </div>
        <div class="block block6">
          <p class="title"><em>其他</em></p>
          <dl class="table">
            <dt>
              <span>RS</span>
              <span>染色体位置</span>
              <span>Ref</span>
              <span>Alt</span>
              <span>基因型</span>
              <span>MAF</span>
              <span>基因</span>
              <span>致病分值</span>
            </dt>
            <dd>
              <span>rs140598</span>
              <span>15:48487333</span>
              <span>C</span>
              <span>G</span>
              <span>0/1</span>
              <span>0.05</span>
              <span>CHRNB1</span>
              <span>0.85</span>
            </dd>
          </dl>
        </div>
        <div class="block block7">
          <p class="title"><em>参考文献</em></p>
          <p class="description">
          [1]  Ammann, A. J., Wara, D. W., Cowan, M. J., Barrett, D. J., Stiehm, E. R. The DiGeorge syndrome and the fetal alcohol syndrome. Am. J. Dis. Child. 136: 906-908, 1982.
          </p>
        </div>
      </div>
    </div>
    <vFooter/>
  </div>
</template>

<script>
import vLoginHeader from '@/components/common/vLoginHeader'
import vFooter from '@/components/common/vFooter'

export default {
  components: {
    vLoginHeader,
    vFooter,
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.main {
  position: relative;
  width: 100%;
  padding: 78px 0;
  margin-bottom: 3px;
  background-color: $bgColor1;
  .box {
    position: relative;
    width: 1240px;
    padding: 20px 53px 100px;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: #fff;
    .top {
      position: relative;
      h3 {
        position: relative;
        padding: 40px 100px;
        font-weight: normal;
        font-size: 28px;
        // letter-spacing: 2px;
        color: $fontColor2;
        .logo {
          position: absolute;
          top: 50%;
          left: 0;
          width: 80px;
          height: 118px;
          margin-top: -59px;
          background: url(../../assets/report-logo.png) no-repeat center center;
          background-size: 100% auto;
        }
      }
      .doctor {
        position: absolute;
        top: 0;
        right: -33px;
        width: 100%;
        text-align: right;
        font-size: 20px;
        color: $fontColor6;
        span {
          display: inline-block;
          margin-left: 10px;
        }

      }
    }
    .block {
      margin-top: 60px;
      margin-bottom: 30px;
      .title {
        em {
          font-size: 26px;
        }
      }
    }
  }
}
.block1 {
  .base-info {
    position: relative;
    width: 100%;
    list-style: none;
    li {
      display: flex;
      padding: 20px;
      font-size: 20px;
      color: $fontColor6;
      span {
        position: relative;
        width: 270px;
        &:after {
          position: absolute;
          top: 50%;
          right: 0;
          width: 2px;
          height: 40px;
          margin-top: -20px;
          background-color: $fontColor13;
          content: '';
        }
      }
      p {
        flex: 1;
        padding-left: 74px;
      }
      &:nth-of-type(2n-1) {
        background-color: $bgColor1;
      }
    }
  }
}
.block2 {
  .result {
    position: relative;
    width: 100%;
    font-size: 20px;
    color: $fontColor6;
    span {
      position: relative;
      display: block;
      padding: 20px 60px;
      &:nth-of-type(2n-1) {
        background-color: $bgColor1;
      }
      .danger {
        position: absolute;
        top: 50%;
        left: 23px;
        width: 22px;
        height: 22px;
        margin-top: -11px;
        background: url(../../assets/report-01.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
.block3, .block5, .block6 {
  .table {
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    dt,dd {
      position: relative;
      display: flex;
      background-color: $bgColor16;
      span {
        flex: 1;
        padding: 20px 0;
        text-align: center;
        font-size: 20px;
        color: #fff;
        
      }
    }
    dd {
      margin-top: 10px;
      background-color: $bgColor1;
      span {
        font-size: 15px;
        color: $fontColor6;
      }
    }
  }
}
.block4 {
  .diseases-info {
    li {
      &:nth-of-type(1) i {
        background-color: $bgColor5;
      }
      &:nth-of-type(2) i {
        background-color: $bgColor8;
      }
      &:nth-of-type(3) i {
        background-color: $bgColor9;
      }
      &:nth-of-type(4) i {
        background-color: $bgColor11;
      }
    }
  }
}
.block7 {
  .description {
    width: 1108px;
    line-height: 30px;
    padding-bottom: 40px;
    margin: 0 auto 50px;
    text-indent: 25px;
    font-size: 22px;
    color: #000;
  }
}
</style>