<template>
  <div class="favorite-box">
    <vLoginHeader/>
    <div class="query-box query-box4">
      <div class="box">
        <span class="query-btn"
          v-for="(item, index) in queryList"
          :key="index"
          :class="{'query-btn-active':queryActive===index}"
          @click="switchBtn(index)">{{item.name}}</span>
        <el-input class="query-inp query-inp2" v-model="queryInp" :placeholder="placeholder" @keyup.enter.native="search">
          <template slot="prefix">
            <el-select v-model="fieldType" placeholder="请选择" class="field-type-select">
              <el-option
                v-for="item in fieldTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <i slot="append" class="el-input__icon iconfont icon-sousuo1" @click="search"></i>
        </el-input>
      </div>
    </div>
    <div class="main">
      <div class="sort-box">
        <div class="tit">排序</div>
        <p :class="{'active': this.active === 0}" @click="handleSort(0)"><span>时间</span><i class="el-icon-check"></i></p>
        <p :class="{'active': this.active === 1}" @click="handleSort(1)"><span>名字</span><i class="el-icon-check"></i></p>
      </div>
      <div class="query-details">
        <div v-show="isShowDisease" class="block block1">
          <p class="title"><em>疾病</em><span>Disease</span></p>
            <div class="diseases-tab">
            <p class="tit">
              <span>疾病名</span>
              <span>疾病ID</span>
              <span>收藏时间</span>
              <span>备注</span>
            </p>
            <ul class="context">
              <template v-if="this.diseaseList.length > 0">
                <li v-for="(item, index) in this.diseaseList" :key="index">
                  <p>{{item.diseaseName}}</p>
                  <p><span class="spn" @click="toQueryPage(item)">{{item.name}}</span></p>
                  <p>{{item.collectTime}}</p>
                  <p>
                    <span class="remark">
                      <template v-if="item.isAllowedNote">
                        <el-input type="textarea" v-model="item.reservedTow" :disabled="!item.isAllowedNote" autosize placeholder="请输入备注" class="note-inp"></el-input>
                      </template>
                      <template v-else>
                        <span>{{item.reservedTow}}</span>
                      </template>
                      <i title="修改备注" class="edite-btn el-icon-edit" @click="changeEdit(item, index)"></i>
                    </span>
                  </p>
                </li>
              </template>
              <template v-else>
                <li class="no-data">暂无数据</li>
              </template>
            </ul>
          </div>
        </div>
        <div v-show="isShowGene" class="block block2">
          <p class="title"><em>基因</em><span>Gene</span></p>
            <div class="gene-tab">
            <p class="tit">
              <span>基因名</span>
              <span>收藏时间</span>
              <span>备注</span>
            </p>
            <ul class="context">
              <template v-if="this.geneList.length > 0">
                <li v-for="(item, index) in this.geneList" :key="index">
                  <p><span class="spn" @click="toQueryPage(item)">{{item.name}}</span></p>
                  <p>{{item.collectTime}}</p>
                  <p>
                    <span class="remark">
                      <template v-if="item.isAllowedNote">
                        <el-input type="textarea" v-model="item.reservedTow" :disabled="!item.isAllowedNote" autosize placeholder="请输入备注" class="note-inp"></el-input>
                      </template>
                      <template v-else>
                        <span>{{item.reservedTow}}</span>
                      </template>
                      <i title="修改备注" class="edite-btn el-icon-edit" @click="changeEdit(item, index)"></i>
                    </span>
                  </p>
                </li>
              </template>
              <template v-else>
                <li class="no-data">暂无数据</li>
              </template>
            </ul>
          </div>
        </div>
        <div v-show="isShowVariation" class="block block3">
          <p class="title"><em>变异</em><span>Variation</span></p>
            <div class="variation-tab">
            <p class="tit">
              <span>RS</span>
              <span>收藏时间</span>
              <span>备注</span>
            </p>
            <ul class="context">
              <template v-if="this.variationList.length > 0">
                <li v-for="(item, index) in this.variationList" :key="index">
                  <p style="text-align:center"><span class="spn" @click="toQueryPage(item)">{{item.name}}</span></p>
                  <p>{{item.collectTime}}</p>
                  <p>
                    <span class="remark">
                      <template v-if="item.isAllowedNote">
                        <el-input type="textarea" v-model="item.reservedTow" :disabled="!item.isAllowedNote" autosize placeholder="请输入备注" class="note-inp"></el-input>
                      </template>
                      <template v-else>
                        <span>{{item.reservedTow}}</span>
                      </template>
                      <i title="修改备注" class="edite-btn el-icon-edit" @click="changeEdit(item, index)"></i>
                    </span>
                  </p>
                </li>
              </template>
              <template v-else>
                <li class="no-data">暂无数据</li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <AsideFix/>
    <vFooter/>
  </div>
</template>

<script>
import moment from 'moment'
import vLoginHeader from '@/components/common/vLoginHeader'
import vFooter from '@/components/common/vFooter'
import AsideFix from '@/components/AsideFix'

export default {
  components: {
    vLoginHeader,
    vFooter,
    AsideFix
  },
  data() {
    return {
      queryList: [
        {
          name: '疾病'
        },
        {
          name: '基因'
        },
        {
          name: '变异'
        },
      ],
      fieldTypeOptions: [],
      fieldType: '',
      queryActive: 0,
      placeholder: '',
      queryInp: '', // 219700
      diseaseList: [],
      geneList: [],
      variationList: [],
      _diseaseList: [], // 临时存储，用来查询后的列表展示
      _geneList: [],
      _variationList: [],
      listParams: {
        timeAsc: '1',
        nameAsc: '',
      },
      total: 0,
      pageSize: 10,
      active: 0,
      autosize: { minRows: 1, maxRows: 8},
      isShowDisease: true,
      isShowGene: true,
      isShowVariation: true
    }
  },
  methods: {
    // 获取收藏夹列表
    getFavoriteList() {
      this.$post(this.$Url.collect.list, this.listParams).then(res => {
        if (res.status === 200) {
          let data = res.data
          if (data && data.length > 0) {
            let diseaseList = []
            let geneList = []
            let variationList = []
            data.forEach(v => {
              let time = moment(data.createTime).format('YYYY MM DD')
              let arr = time.split(' ')
              v.isAllowedNote = false
              // 备注
              if (v.reservedTow === '') {
                v.reservedTow = '暂无'
              }
              if (v.type === 0) {
                v.collectTime = `${arr[0]}年${arr[1]}月${arr[2]}日`
                diseaseList.push(v)
              } else if (v.type === 1) {
                v.collectTime = `${arr[0]}年${arr[1]}月${arr[2]}日`
                geneList.push(v)
              } else if (v.type === 2) {
                v.collectTime = `${arr[0]}年${arr[1]}月${arr[2]}日`
                variationList.push(v)
              }
            })
            
            this.diseaseList = diseaseList
            this.geneList = geneList
            this.variationList = variationList

            this._diseaseList = JSON.parse(JSON.stringify(this.diseaseList))
            this._geneList = JSON.parse(JSON.stringify(this.geneList))
            this._variationList = JSON.parse(JSON.stringify(this.variationList))

          }
        }
      }).catch(err => {})
    },
    changeEdit(item, index) {
      let type = item.type
      if (item.isAllowedNote) {
        this.$get(this.$Url.collect.update, {
          collectId: item.id,
          remark: item.reservedTow
        }).then(res => {
          if (type === 0) {
            this.$set(this.diseaseList[index], 'isAllowedNote', !item.isAllowedNote)
          } else if (type === 1) {
            this.$set(this.geneList[index], 'isAllowedNote', !item.isAllowedNote)
          } else if (type === 2) {
            this.$set(this.variationList[index], 'isAllowedNote', !item.isAllowedNote)
          }
        }).catch(err => {})
      } else {
        if (type === 0) {
          this.$set(this.diseaseList[index], 'isAllowedNote', !item.isAllowedNote)
        } else if (type === 1) {
          this.$set(this.geneList[index], 'isAllowedNote', !item.isAllowedNote)
        } else if (type === 2) {
          this.$set(this.variationList[index], 'isAllowedNote', !item.isAllowedNote)
        }
      }
      
    },
    toQueryPage(item) {
      let name = ''
      if (item.type === 0) {
        name = 'diseaseQuery'
      } else if (item.type === 1) {
        name = 'genesQuery'
      } else if (item.type === 2) {
        name = 'variationQuery'
      }

      let url = this.$router.resolve({
        name: name,
        query: {
          search: item.name,
          active: item.reservedOne !== '' ? item.reservedOne : '0'
        }
      })
      window.open(url.href, '_blank')
    },
    switchBtn(index) {
      this.initFieldType(index)
      this.queryActive = index
      // this.getPlaceholder()
    },
    initFieldType(index) {
      if (index == 0) {
        this.fieldTypeOptions = [
          {
            label: '英文名',
            value: 'disease_name'
          },
          {
            label: 'OMIM id',
            value: 'OMIM_id'
          }
        ]
        this.fieldType = 'disease_name'
      } else if (index == 1) {
        this.fieldTypeOptions = [
          {
            label: '英文名',
            value: 'gene_symbol'
          },
          {
            label: 'OMIM id',
            value: 'omim_id'
          },
          {
            label: 'entrze id',
            value: 'entrez_id'
          }
        ]
        this.fieldType = 'gene_symbol'
      } else if (index == 2) {
        this.fieldTypeOptions = [
          {
            label: 'RS号',
            value: 'RSId'
          },
        ]
        this.fieldType = 'RSId'
      }
    },
    search() {
      if (this.queryInp === '') {
        this.$message({
          type: 'error',
          duration: 2000,
          message: this.placeholder
        })
      }


      if (this.queryActive === 0) {
        // this.isShowDisease = true
        // this.isShowGene = false
        // this.isShowVariation = false

        let newList = this._diseaseList.filter(item => item.name === this.queryInp.trim())
        if (newList.length > 0) {
          // this.diseaseList = newList
          this.toQueryPage(newList[0])
        } else {
          // this.diseaseList = []
          this.$message({
            type: 'error',
            duration: 2000,
            message: '未找到对应数据'
          })
        }
      } else if (this.queryActive === 1) {
        // this.isShowDisease = false
        // this.isShowGene = true
        // this.isShowVariation = false
        
        let newList = this._geneList.filter(item => item.name === this.queryInp.trim())
        if (newList.length > 0) {
          // this.geneList = newList
          this.toQueryPage(newList[0])
        } else {
          // this.geneList = []
          this.$message({
            type: 'error',
            duration: 2000,
            message: '未找到对应数据'
          })
        }
      } else if (this.queryActive === 2) {
        // this.isShowDisease = false
        // this.isShowGene = false
        // this.isShowVariation = true

        let newList = this._variationList.filter(item => item.name === this.queryInp.trim())
        if (newList.length > 0) {
          // this.variationList = newList
          this.toQueryPage(newList[0])
        } else {
          // this.variationList = []
          this.$message({
            type: 'error',
            duration: 2000,
            message: '未找到对应数据'
          })
        }
      }

    
    },
    // 排序
    handleSort(active) {
      this.active = active
      this.isShowDisease = true
      this.isShowGene = true
      this.isShowVariation = true
      switch (active) {
        case 0:
          this.listParams.nameAsc = ''
          this.listParams.timeAsc = '1'
          this.getFavoriteList()
          break
        case 1:
          this.listParams.nameAsc = '1'
          this.listParams.timeAsc = ''
          this.getFavoriteList()
          break
      }
    },
    getPlaceholder() {
      let type = this.fieldTypeOptions.filter(item => item.value === this.fieldType)
      this.placeholder = '请输入' + this.queryList[this.queryActive].name + type[0].label
    },
    
  },
  watch: {
    queryActive() {
      this.getPlaceholder()
    },
    fieldType() {
      this.getPlaceholder()
    }
  },
  mounted() {
    this.initFieldType(0)
    this.getPlaceholder()
    this.getFavoriteList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.query-box4 {
  height: 245px;
  background: none;
  .box {
    top: 70px;
  }
}
.main {
  position: relative;
  width: 1270px;
  margin: 0 auto;
  .sort-box {
    width: 400px;
    p {
      &.active {
        i {
          background-color: $bgColor5;
        }
      }
      span {
        display: inline-block;
      }
      i {
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 22px;
        border-radius: 50%;
        margin-left: 6px;
        text-align: center;
        font-size: 15px;
        color: #fff;
        vertical-align: text-bottom;
        background-color: $fontColor10;
      }
    }
  }
  .query-details {
    max-width: 100%;
  }
}
.diseases-tab, .gene-tab {
  .context {
    li {
      p {
        position: relative;
        text-align: center;
        .note-inp {
          flex: 1;
        }
      }
    }
  }
}
.edite-btn {
  position: absolute;
  top: 50%;
  right: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-top: -20px;
  font-size: 20px;
  cursor: pointer;
}
</style>