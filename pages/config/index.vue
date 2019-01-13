<template>
  <v-layout row wrap>
    <nav-sub-config/>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title></v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import NavSubConfig from "./../../components/SubNavConfig";
export default {
  components: {
    NavSubConfig
  }
};
</script>

<style>
</style>
