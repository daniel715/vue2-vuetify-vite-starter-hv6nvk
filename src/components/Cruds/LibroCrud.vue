<template>
  <div>
    <basic-crud
      ref="basicCrud"
      @onEdit="onEdit"
      @getItems="getItems"
      @onAdd="onAdd"
      :headers="headers"
      :entidad="'libro'"
    />
    <add-libro-dialog @refresh="refresh" ref="addLibroDialog" />
  </div>
</template>
  <script>
import basicCrud from '@/components/BasicCrud.vue'
import AddLibroDialog from '../AddDialogs/AddLibroDialog.vue'
import mixin from '@/mixins/global.mixin'
export default {
  components: {
    basicCrud,
    AddLibroDialog,
  },
  mixins: [mixin],
  data: () => ({
    headers: [
      { text: 'Titulo', value: 'nombre' },
      { text: 'Autor', value: 'autor' },
      { text: 'Año', value: 'year' },
      { text: 'Precio', value: 'precio' },
      { text: 'Stock', value: 'stock' },
      { text: 'Descripcion', value: 'resumen' },
      { text: 'Categorias', value: 'categorias' },
      { text: 'Actions', value: 'actions' },
    ],
    editItem: {},
    editedIndex: '',
  }),
  methods: {
    onAdd() {
      this.$refs.addLibroDialog.dialog = true
    },
    onEdit(item, editedIndex) {
      console.log('editando con data', item)
      this.editItem = item
      this.editedIndex = editedIndex
      this.setRefs()
      setTimeout(() => {
        this.openDialog()
      }, 100)
    },
    openDialog() {
      this.$refs.addLibroDialog.dialog = true
    },
    setRefs() {
        this.$refs.addLibroDialog.editedIndex = this.editedIndex
        this.$refs.addLibroDialog.editedItem = this.editItem
        this.$refs.addLibroDialog.setAutorCombo()
        this.$refs.addLibroDialog.setCategoriasCombo()
        this.$refs.addLibroDialog.setImageInput()
        this.$refs.addLibroDialog.dialog = true
    },
    refresh() {
      this.$refs.basicCrud.refresh()
    },

    async getItems() {
      let response = await this.$axios.get('libro/list')
      let result = this.parseImagesArrayToJson(response)
      setTimeout(() => {
        this.$refs.basicCrud.items = result
      }, 500)
    },
  },
}
</script>