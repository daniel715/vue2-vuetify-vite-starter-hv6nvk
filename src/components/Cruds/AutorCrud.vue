<template>
  <div>
    <basic-crud
      @onEdit="onEdit"
      @getItems="getItems"
      @onAdd="onAdd"
      ref="basicCrud"
      :headers="headers"
      :entidad="'autor'"
    />
    <add-autor-dialog @refresh="refresh" ref="addAutorDialog" />
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import basicCrud from '@/components/BasicCrud.vue'
import AddAutorDialog from '../AddDialogs/AddAutorDialog.vue'
export default defineComponent({
  components: {
    basicCrud,
    AddAutorDialog,
  },
  data: () => ({
    headers: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Actions', value: 'actions' },
    ],
    editedItem: {},
    editedIndex: '',
  }),
  methods: {
    onAdd() {
      this.$refs.addAutorDialog.dialog = true
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
    openDialog() {
      this.$refs.addAutorDialog.dialog = true
    },
    setRefs() {
      this.$refs.addAutorDialog.editedIndex = this.editedIndex
      this.$refs.addAutorDialog.editedItem = this.editedItem
    },
    refresh() {
      this.$refs.basicCrud.refresh()
    },
    async getItems() {
      let response = await this.$axios.get('autor/list')
      console.log(response)
      setTimeout(() => {
        this.$refs.basicCrud.items = response.data
      }, 500)
    },
  },
})
</script>