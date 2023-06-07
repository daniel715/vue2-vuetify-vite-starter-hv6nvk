<template>
  <div>
    <basic-crud
      ref="basicCrud"
      @onEdit="onEdit"
      @getItems="getItems"
      @onAdd="onAdd"
      @onDelete="onDelete"
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
      { text: 'Actions', value: 'actions', align: 'end', width: "100px" },
    ],
    editedItem: {},
    editedIndex: '',
  }),
  methods: {
    onAdd() {
      this.$refs.addLibroDialog.dialog = true
      this.$refs.addLibroDialog.$refs.autorCombo.getAutores()
      this.$refs.addLibroDialog.$refs.categoriaCombo.getCategorias()
    },
    onEdit(item, editedIndex) {
      console.log('editando con data', item)
      this.editedItem = item
      this.editedIndex = editedIndex
      this.setRefs()
      setTimeout(() => {
        this.openDialog()
      }, 100)
    },
    async onDelete(data) {
      let libroResponse = await this.$axios.delete('libro/delete/' + data.id)
      console.log(libroResponse)
      if (libroResponse.status == '204') {
        let libroCategoriaResponse = await this.$axios.delete('librocategoria/delete/' + data.id)
        if (libroCategoriaResponse.status == '204') {
          console.log('eliminado')
          this.refresh()
        }
      }
    },
    openDialog() {
      this.$refs.addLibroDialog.dialog = true
    },
    setRefs() {
      setTimeout(() => {
        this.$refs.addLibroDialog.editedIndex = this.editedIndex

        this.$refs.addLibroDialog.editedItem.id = this.editedItem.id
        this.$refs.addLibroDialog.tempItem.nombre = this.editedItem.nombre
        this.$refs.addLibroDialog.tempItem.year = this.editedItem.year
        this.$refs.addLibroDialog.tempItem.resumen = this.editedItem.resumen
        this.$refs.addLibroDialog.tempItem.idAutor = this.editedItem.idAutor
        this.$refs.addLibroDialog.tempItem.precio = this.editedItem.precio
        this.$refs.addLibroDialog.tempItem.stock = this.editedItem.stock
        this.$refs.addLibroDialog.tempItem.imageurl = this.editedItem.imageurl
        this.$refs.addLibroDialog.tempItem.categoriasId = this.editedItem.categoriasId
        this.$refs.addLibroDialog.tempItem.categorias = this.editedItem.categorias
        this.$refs.addLibroDialog.setAutorCombo()
        this.$refs.addLibroDialog.setCategoriasCombo()
        this.$refs.addLibroDialog.setImageInput()
      }, 100)
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