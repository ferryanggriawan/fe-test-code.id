<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <span class="title">Code.id</span>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Source</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-sheet color="grey lighten-3" height="400">
        <v-row class="fill-height" justify="center" align-content="center">
          <v-col cols="7" class="text-center">
            <div class="text-h6">Welcome to Code.id Image Site</div>
            <span class="text-subtitle-1">
              Search image to found your dream
            </span>
          </v-col>
          <v-col cols="7" class="text-center">
            <v-autocomplete
              v-model="value"
              :items="items"
              item-text="author"
              filled
              rounded
              prepend-inner-icon="mdi-magnify"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-sheet>
      <HelloWorld v-if="items.length > 0" :author="value" :listImages="items" />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld"

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data() {
    return {
      items: [],
      value: "",
    }
  },

  mounted() {
    this.browse()
  },

  methods: {
    async browse() {
      const datas = await this.callApi().get("/v2/list")

      this.items = datas.data
    },
  },
}
</script>
