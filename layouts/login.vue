<template>
  <v-app dark>
    <v-content>
      <v-container>
        <v-layout row wrap>
          <v-flex md6 offset-md3>
            <v-card light class="pa-3 mt-5">
              <nuxt/>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2019 橙子网络-聚仁传媒-发现焦点</span>
    </v-footer>
  </v-app>
</template>

<script>
import "material-design-icons-iconfont/dist/material-design-icons.css";
export default {
  data() {
    return {
      fixed: false,
      title: "Vuetify.js"
    };
  }
};
</script>
