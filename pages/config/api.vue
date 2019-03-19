<template>
  <v-layout row wrap>
    <sub-nav :pid="7" :rules="this.$store.state.adminGroupRules"/>
    <v-flex xs12>
      <v-card>
        <div class="pa-3">京东账户余额: {{ jdBalance }}</div>
        <div class="pa-3">短信账户余额: {{ smsBalance }}</div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import SubNav from "./../../components/SubNav";
export default {
  asyncData({ store, route }) {
    store.dispatch("configGetJdBalance");
    store.dispatch("configGetSmsBalance");
  },
  data() {
    return {};
  },
  components: {
    SubNav
  },
  computed: {
    jdBalance() {
      return this.$store.state.config.jdBalance;
    },
    smsBalance() {
      return this.$store.state.config.smsBalance;
    }
  },
  methods: {}
};
</script>

<style>
</style>
