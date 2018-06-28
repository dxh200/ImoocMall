<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <a>Goods</a>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:;" class="default cur">Default</a>
            <a href="javascript:;" class="price" @click="setSortFlat">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:;" class="filterby stopPop" v-on:click="setFilterPrice">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:;" @click="setFilterChecked('All')" :class="{'cur':priceChecked=='All'}">All</a></dd>

                <dd v-for="(price,index) in priceFilter" @click="setFilterChecked(index)" v-bind:sprice="price.startPrice" v-bind:eprice="price.endPrice" ref="_priceFliter_">
                  <a href="javascript:;" :class="{cur:priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>

              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>

                  <li v-for="(item,index) in data">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/img/'+item.img" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.name}}</div>
                      <div class="price">{{item.price}}</div>
                      <div class="btn-area" @click="addCart(item.id)">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>

                </ul>
                <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="5">
                    <img src="./../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>

<style scoped>
  .load-more{
      height: 100px;
      line-height: 100px;
      text-align: center;
  }
</style>

<script>
    import "./../assets/css/base.css"
    import "./../assets/css/product.css"
    import "./../assets/css/login.css"

    //模板
    import NavHeader from "@/components/NavHeader.vue"
    import NavFooter from "@/components/NavFooter.vue"
    import NavBread from "@/components/NavBread.vue"

    //插件
    import axios from "axios"

    export default {
        data(){
          return {
            data:[],
            priceFilter:[
              {startPrice:0,endPrice:500.00},
              {startPrice:500.00,endPrice:1000.00},
              {startPrice:1000.00,endPrice:1500.00},
              {startPrice:1500.00,endPrice:2000.00},
              {startPrice:2000.00,endPrice:3000.00},
            ],
            priceChecked:"All",   /*默认All选中*/
            overLayFlag:false,    /*遮罩默认不显示*/
            filterBy:false,
            page:1,
            pageSize:4,
            sortFlat:true,
            busy:true,    /*是否禁用滚动加载 true禁用，false启用*/
            sprice:0,
            eprice:1000,
            loading:false

          }
        }
        ,components:{
            NavHeader:NavHeader,
            NavFooter,
            NavBread
        }
        ,methods:{
            loadMore(){
                this.busy  = true;
                setTimeout(()=>{
                    this.page++;
                    this.goodsList(true);
                },500);
            },
            setSortFlat(){
                this.sortFlat = ! this.sortFlat;
                this.page = 1;
                this.goodsList();
            },
            setFilterPrice(){
                this.filterBy = true;
                this.overLayFlag = true;
            },
            setFilterChecked(index){
                this.page = 1;
                this.priceChecked=index;
                this.closePop();
                if(index!="All"){
                  let pObj_ = this.$refs._priceFliter_[index];
                  this.sprice = pObj_.getAttribute("sprice");
                  this.eprice = pObj_.getAttribute("eprice");
                }
                this.goodsList();
            },
            closePop(){
                this.filterBy = false;
                this.overLayFlag = false;
            }
            ,goodsList(flag){   /*flag是否累加*/
                this.loading = true;
                let param = {
                    page:this.page,
                    pageSize:this.pageSize,
                    sort:this.sortFlat?1:-1,
                    priceChecked:this.priceChecked,
                    sprice:this.sprice,
                    eprice:this.eprice
                };
                axios.get("/goods",{
                  params:param
                }).then((res)=>{
                  let data = res.data;
                  if(data.status=="0"){
                      this.loading = false;
                      if(flag){
                          this.data = this.data.concat(data.result.list);
                          if(data.result.count==0 || data.result.count<this.pageSize){
                              this.busy = true;
                          }else{
                              this.busy = false;
                          }
                      }else{
                          this.data = data.result.list;
                          this.busy = false;
                      }
                  }else{
                    alert("数据加载错误");
                  }
                }).catch((err)=>{
                  alert("服务端加载失败");
                  this.loading = false;
                })
            },
            addCart(productId){
              axios.post("/goods/addCart",{
                productId:productId
              }).then((res)=>{
                if(res.status==0){
                  alert("购物车添加成功");
                }else{
                  alert("购物车添加成功");
                }
              }).catch((err)=>{
                alert(err.message);
              })
            }
        }
        ,mounted(){
            this.goodsList();
         }
    }
</script>

