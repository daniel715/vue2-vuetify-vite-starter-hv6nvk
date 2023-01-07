<template>
  <div>
    <v-select
      v-model="selectedItem"
      :items="items"
      item-value="id"
      item-text="nombre"
      outlined
      dense
      ref="input"
    ></v-select>
  </div>
</template>

<script>
export default {
  data: () => ({
    select: ['Vuetify', 'Programming'],
    items: [],
    selectedItem: {},
  }),

  methods: {
    async getAutores() {
      let response = await this.$axios.get('autor/list')
      console.log(response)
      this.items = response.data
      this.selectedItem = this.items[0]
    },
  },
  watch: {
    selectedItem(newVal, oldVal) {
      console.log('elemento seleccionado',newVal)
      this.$emit('input', newVal)
    },
  },
  created() {
    console.log('trayendo autores')
    this.getAutores()
  },
}
</script>