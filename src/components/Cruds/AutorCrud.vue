<template>
  <div>
    <basic-crud
      ref="basicCrud"
      @onEdit="onEdit"
      @getItems="getItems"
      @onAdd="onAdd"
      @onDelete="onDelete"
      :headers="headers"
      :entidad="entidad"
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
    entidad: 'autor',
    headers: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Actions', value: 'actions', align: 'end' },
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
    async onDelete(data) {
      let response = await this.$axios.delete('autor/delete/' + data)
      if (response.status == '204') {
        console.log('eliminado')
        this.refresh()
      }
    },
    openDialog() {
      this.$refs.addAutorDialog.dialog = true
    },
    setRefs() {
      this.$refs.addAutorDialog.editedIndex = this.editedIndex
      this.$refs.addAutorDialog.nombre = this.editedItem.nombre
      this.$refs.addAutorDialog.editedItem.id = this.editedItem.id
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