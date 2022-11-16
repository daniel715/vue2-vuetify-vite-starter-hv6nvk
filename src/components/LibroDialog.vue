<template>
  <v-dialog class="dialog" v-model="dialog" max-width="90%">
    <v-container class="ma-0 pa-0 ">
      <v-card>
        <v-row class="column">
          <v-col cols="7" align="center">
            <div class="pa-5" style="max-width: 50%">
              <v-img :src="mainImage" />
            </div>
          </v-col>
          <!-- <div class="pa-5">
            <v-img :src="mainImage" max-width="50%" />
          </div> -->
          <v-col cols="4">
            <div class="mt-8">
              <v-alert v-if="isDisponible" outlined type="success" text icon="mdi-school"> Libro Disponible </v-alert>
              <v-alert v-else outlined type="warning" prominent border="left">
                Libro actualmente no disponible
              </v-alert>
              <div class="d-flex flex-column">
                <div class="property">
                  <div class="propertyname">Titulo</div>
                  {{ libro.nombre }}
                </div>
                <div class="property">
                  <div class="propertyname">Autor</div>
                  {{ libro.autor }}
                </div>
                <div class="property">
                  <div class="propertyname">Año</div>
                  {{ libro.year }}
                </div>
                <div class="property">
                  <div class="propertyname">Precio</div>
                  S/{{ libro.precio }}
                </div>
                <div class="property">
                  <div class="propertyname">Resumen</div>
                  {{ libro.resumen }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  props: {
    libro: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    mainImage() {
      return this.libro.imageurl[0]
    },
    otherImages() {
      return this.libro.imageurl.filter((item) => {
        if (this.libro.imageurl.indexOf(item) != '0') return item
      })
    },
    isDisponible() {
      return this.libro.stock > 0
    },
  },
  created() {
    console.log('en dialogo libro', this.libro)
  },
}
</script>
<style scoped>
.property {
  margin-bottom: 20px;
}
.propertyname {
  font-weight: bold;
}
.dialog{
    height: 110vh
}
column{
    padding: 0px
}
</style>