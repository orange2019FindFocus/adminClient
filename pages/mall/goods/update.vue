<template>
  <v-layout row wrap>
    <nav-sub-mall/>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>添加/编辑商品信息</v-card-title>

        <v-form @submit.prevent="submit">
          <v-container grid-list-xs fluid>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field
                  label="商品名称"
                  type="text"
                  placeholder="输入商品名称"
                  v-model="postData.title"
                  required
                ></v-text-field>
                <v-textarea
                  label="商品简述"
                  placeholder="请输入文章简述"
                  v-model="postData.description"
                  required
                ></v-textarea>
                <v-select
                  :items="categorys"
                  label="商品分类"
                  placeholder="请选择商品分类"
                  v-model="goodsCategory"
                  required
                ></v-select>
                <v-text-field
                  type="number"
                  label="库存"
                  placeholder="输入库存数量(-1为无限库存)"
                  v-model="postData.stock"
                  required
                ></v-text-field>

                <v-layout row wrap>
                  <v-flex xs4>
                    <v-text-field
                      type="text"
                      label="商品市场价格"
                      placeholder="商品市场价格"
                      v-model="postData.price_market"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="text"
                      label="商品成本价格"
                      placeholder="输入商品成本价格"
                      v-model="postData.price_cost"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="number"
                      label="市场价利润"
                      placeholder
                      v-model="profit"
                      required
                      color="blue"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs4>
                    <v-text-field
                      type="number"
                      label="普通利润占比"
                      placeholder="普通利润占比，单位（%）"
                      v-model="profitRate[0]"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="number"
                      label="普通积分占比"
                      placeholder="普通积分占比，单位（%）"
                      v-model="scoreRate[0]"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="number"
                      label="普通返佣占比"
                      placeholder="普通返佣占比，单位（%）"
                      v-model="rabateRate[0]"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs4>
                    <v-text-field type="text" label="焦点价格" placeholder v-model="priceSell" readonly></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="text"
                      label="可用积分抵扣"
                      placeholder
                      v-model="priceScoreSell"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="text"
                      label="不使用用积分抵扣"
                      placeholder
                      v-model="priceSellNoScore"
                      readonly
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs4>
                    <v-text-field
                      type="number"
                      label="VIP利润占比"
                      placeholder="VIP利润占比，单位（%）"
                      v-model="profitRate[1]"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="number"
                      label="VIP积分占比"
                      placeholder="VIP积分占比，单位（%）"
                      v-model="scoreRate[1]"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="number"
                      label="VIP返佣占比"
                      placeholder="VIP返佣占比，单位（%）"
                      v-model="rabateRate[1]"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs4>
                    <v-text-field
                      type="text"
                      label="焦点价格（VIP）"
                      placeholder
                      v-model="priceVip"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="text"
                      label="可用积分抵扣（VIP）"
                      placeholder
                      v-model="priceScoreVip"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="text"
                      label="不使用用积分抵扣（VIP）"
                      placeholder
                      v-model="priceVipNoScore"
                      readonly
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6 class="pl-3">
                <kind-editor
                  id="goods-content"
                  :content="postData.content"
                  label="商品详细信息"
                  @get-html="getEditorHtml"
                />

                <upload-box
                  id="post-cover"
                  label="封面图"
                  :uploadUrl="uploadUrl"
                  @getUploadUrl="getUploadUrl"
                ></upload-box>

                <upload-box
                  id="post-img1"
                  label="参数规格"
                  :uploadUrl="uploadUrlImg1"
                  @getUploadUrl="getUploadUrlImg1"
                ></upload-box>

                <upload-box
                  id="post-img2"
                  label="售后保障"
                  :uploadUrl="uploadUrlImg2"
                  @getUploadUrl="getUploadUrlImg2"
                ></upload-box>
              </v-flex>
            </v-layout>

            <v-flex xs12>
              <v-btn color="blue" type="submit" class="ml-0">提交</v-btn>
            </v-flex>
          </v-container>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import NavSubMall from "./../../../components/SubNavMall";
import UploadBox from "./../../../components/UploadBox";
import KindEditor from "./../../../components/KindEditor";
export default {
  asyncData({ store, route }) {
    let id = route.query.id || 0;
    if (id) {
      store.dispatch("mallGoodsInfoGet", { id: id }).then(ret => {
        if (ret.code == 0) {
          let goodsInfo = ret.data.info;

          let profit = goodsInfo.price_market - goodsInfo.price_cost;
          let profitSell = goodsInfo.price_sell - goodsInfo.price_cost;
          let profitVip = goodsInfo.price_vip - goodsInfo.price_cost;
          let scoreSell = goodsInfo.price_score_sell;
          let scoreVip = goodsInfo.price_score_vip;

          console.log(profit, profitSell, profitVip);
          store.state.mallGoods.profitRate = [
            parseInt(((profit - profitSell) / profit) * 10000) / 100,
            parseInt(((profit - profitVip) / profit) * 10000) / 100
          ];

          store.state.mallGoods.scoreRate = [
            parseInt((scoreSell / profit) * 10000) / 100,
            parseInt((scoreVip / profit) * 10000) / 100
          ];
          store.state.mallGoods.rabateRate = [
            goodsInfo.rabate_rate,
            goodsInfo.rabate_rate_vip
          ];
        }
      });
    } else {
      store.state.mallGoods.info = {};
    }

    if (
      !store.state.mallCategory.list ||
      !store.state.mallCategory.list.lenght
    ) {
      store.dispatch("mallCategoryListGet");
    }
  },
  data() {
    return {
      // profitRate: [50, 30],
      // scoreRate: [30, 10],
      // rabateRate: [80, 80]
    };
  },
  components: {
    NavSubMall,
    UploadBox,
    KindEditor
  },
  computed: {
    profitRate() {
      return this.$store.state.mallGoods.profitRate;
    },
    scoreRate() {
      return this.$store.state.mallGoods.scoreRate;
    },
    rabateRate() {
      return this.$store.state.mallGoods.rabateRate;
    },
    postData() {
      return this.$store.state.mallGoods.info;
    },
    uploadUrl() {
      return this.$store.state.mallGoods.info.cover || "";
    },
    uploadUrlImg1() {
      return this.$store.state.mallGoods.info.img_1 || "";
    },
    uploadUrlImg2() {
      return this.$store.state.mallGoods.info.img_2 || "";
    },
    profit() {
      // let info = this.$store.state.mallGoods.info;
      return (
        parseInt(
          this.$store.state.mallGoods.info.price_market * 100 -
            this.$store.state.mallGoods.info.price_cost * 100
        ) / 100
      );
    },
    priceSell() {
      return (
        parseInt(this.profit * this.profitRate[0]) / 100 +
        parseInt(this.$store.state.mallGoods.info.price_cost * 100) / 100
      );
    },
    priceScoreSell() {
      return parseInt(
        (((this.$store.state.mallGoods.info.price_market -
          this.$store.state.mallGoods.info.price_cost) *
          this.scoreRate[0]) /
          100) *
          1000
      );
    },
    priceSellNoScore() {
      return (
        parseInt((this.priceSell + this.priceScoreSell / 1000) * 100) / 100
      );
    },
    priceVip() {
      return (
        parseInt(this.profit * this.profitRate[1]) / 100 +
        parseInt(this.$store.state.mallGoods.info.price_cost * 100) / 100
      );
    },
    priceScoreVip() {
      return parseInt(
        (((this.$store.state.mallGoods.info.price_market -
          this.$store.state.mallGoods.info.price_cost) *
          this.scoreRate[1]) /
          100) *
          1000
      );
    },
    priceVipNoScore() {
      return parseInt((this.priceVip + this.priceScoreVip / 1000) * 100) / 100;
    },
    categorys() {
      let list = this.$store.state.mallCategory.list;
      let categorys = [];
      list.forEach(item => {
        categorys.push({ text: item.title, value: item.id });
      });
      return categorys;
    },
    goodsCategory() {
      return parseInt(this.$store.state.mallGoods.info.category) || 1;
    }
  },
  methods: {
    async submit() {
      let postData = this.postData;
      console.log(postData);
      postData.price_sell = this.priceSell;
      postData.price_vip = this.priceVip;
      postData.price_score_sell = this.priceScoreSell / 1000;
      postData.price_score_vip = this.priceScoreVip / 1000;
      postData.rabate_rate = this.rabateRate[0];
      postData.rabate_rate_vip = this.rabateRate[1];
      // postData.content = this.getEditorHtml();
      postData.type = this.$route.query.type || 1;
      // postData.cover = this.getUploadUrl()

      // console.log(postData);
      // return;

      let ret = await this.$store.dispatch("mallGoodsInfoUpdate", postData);
      console.log("submit ret", ret);
      if (ret.code == 0) {
        this.$router.go(-1);
      }
    },
    getEditorHtml(html) {
      // this.content = html;
      // console.log(html);
      this.postData.content = html;
      // return html;
    },
    getUploadUrl(url) {
      console.log("url", url);
      this.postData.cover = url;
      // return url
    },
    getUploadUrlImg1(url) {
      console.log("url", url);
      this.postData.img_1 = url;
      // return url
    },
    getUploadUrlImg2(url) {
      console.log("url", url);
      this.postData.img_2 = url;
      // return url
    }
  }
};
</script>

<style>
</style>
