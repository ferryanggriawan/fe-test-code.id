<template>
  <v-container fluid class="py-10 px-16">
    <v-row>
      <v-col cols="6">
        <h1 class="text-h6 font-weight-bold mb-5">
          Images
        </h1>
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn depressed @click="filter = !filter">
          Filter
        </v-btn>
      </v-col>

      <template v-if="filter">
        <v-col cols="12" sm="6" lg="3">
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                placeholder="Search by date"
                prepend-inner-icon="mdi-calendar"
                readonly
                filled
                rounded
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </template>

      <v-col cols="12">
        <v-row v-if="images.length > 0">
          <v-col
            v-for="n in images"
            :key="n.id"
            class="d-flex child-flex"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-img
              :src="n.download_url"
              :lazy-src="n.download_url"
              aspect-ratio="1.7778"
              class="grey lighten-2"
              @click="setDetail(n)"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="640">
      <v-card>
        <v-card-title class="headline">
          Image Detail
        </v-card-title>

        <v-card-text v-if="activeImage != null">
          <v-img
            :src="activeImage.download_url"
            :lazy-src="activeImage.download_url"
            aspect-ratio="1.7778"
            class="grey lighten-2"
          ></v-img>
          <v-row>
            <v-col cols="6">
              <div class="pt-3 font-weight-bold">
                {{ activeImage.author }}
              </div>
            </v-col>
            <v-col cols="6" class="text-right">
              <div class="pt-3">
                <v-icon size="small" color="primary"
                  >mdi-thumb-up-outline</v-icon
                >
                <span class="ml-2">{{ activeImage.height }}</span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return {
      filter: false,
      dialog: false,
      activeImage: null,
      date: "",
      modal: false,
      images: [],
    }
  },

  props: {
    author: String,
    listImages: Array,
  },

  watch: {
    author(val) {
      const images = this.listImages.filter((image) => image.author == val)
      this.images = images
    },
  },

  mounted() {
    this.images = this.listImages
  },

  methods: {
    setDetail(images) {
      this.dialog = true
      this.activeImage = images
    },
  },
}
</script>
