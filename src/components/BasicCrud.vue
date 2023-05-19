<template>
  <div>
    <v-data-table :headers="headers" :items="books" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Administrador {{ entidad }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn class="primary" @click="addItem()">Agregar</v-btn>
          <v-btn class="primary ml-5" @click="getItems()">Refrescar</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon color="yellow" small class="mr-2" @click="editItem(item)" elevation="2">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-btn icon color="red" small @click="deleteItem(item)" elevation="2">
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="refresh()">Recargar</v-btn>
      </template>
    </v-data-table>
    <add-item-dialog @refresh="refresh()" ref="editDialog" />
    <confirmation-dialog @onConfirm="deleteItemConfirm()" ref="confirmationDialog" />
  </div>
</template>
<script>
import mixin from '@/mixins/global.mixin'
import addItemDialog from '@/components/dialogs/AddItemDialog.vue'
import confirmationDialog from './dialogs/ConfirmationDialog.vue'
export default {
  props: {
    libro: {
      type: Object,
      default: null,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    entidad:{
      type: String,
      default: ''
    }
  },
  mixins: [mixin],
  components: {
    addItemDialog,
    confirmationDialog,
  },
  data: () => ({
    dialog: false,
    tab: '',
    deleteBookId: '',
    books: [],
    editedIndex: -1,
    editedItem: {
      nombre: '',
      year: '',
      resumen: '',
      autor: '',
      precio: '',
    },
    defaultItem: {
      nombre: '',
      year: '',
      resumen: '',
      autor: '',
      precio: '',
    },
    categorias: [],
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  methods: {
    addItem() {
      this.editedIndex = -1
      this.$refs.editDialog.dialog = true
      this.$refs.editDialog.editedIndex = -1
    },
    editItem(item) {
      console.log('editando item', item)
      this.editedItem = item
      this.editedIndex = this.books.indexOf(item) // para que cambie el titulo
      this.setRefs(item)
      this.getItems()
    },
    deleteItem(item) {
      this.deleteBookId = item.id
      this.$refs.confirmationDialog.dialog = true
    },

    async deleteItemConfirm() {
      console.log("on delete item confirm")
      let libroResponse = await this.$axios.delete('libro/delete/' + this.deleteBookId)
      console.log(libroResponse)
      if (libroResponse.status == '204') {
        let libroCategoriaResponse = await this.$axios.delete('librocategoria/delete/' + this.deleteBookId)
        if (libroCategoriaResponse.status == '204') {
          console.log('eliminado')
          this.refresh()
        }
      }
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.books[this.editedIndex], this.editedItem)
      } else {
        this.books.push(this.editedItem)
      }
      this.close()
    },

    async getItems() {
      console.log("get libross")
      let response = await this.$axios.get('libro/list')
      console.log(response)
      let result = this.parseImagesArrayToJson(response)
      setTimeout(() => {
        this.books = result
      }, 500)
    },
    refresh() {
      this.getItems()
    },
    setRefs(item) {
      console.log('seteando refs con item', item)
      this.$refs.editDialog.editedIndex = this.editedIndex
      this.$refs.editDialog.editedItem = item
      this.$refs.editDialog.setAutorCombo()
      this.$refs.editDialog.setCategoriasCombo()
      this.$refs.editDialog.setImageInput()
      this.$refs.editDialog.dialog = true
    },
  },
  created() {
    this.getItems()
  },
}
</script>