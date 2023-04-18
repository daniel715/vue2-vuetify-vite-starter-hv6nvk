<template>
  <div>
    <v-data-table :headers="headers" :items="books" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Administrador libros</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click="addItem">Agregar Libro</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon color="green" small class="mr-2" @click="editItem(item)" elevation="2">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-btn icon color="red" small @click="deleteItem(item)" elevation="2"></v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getLibros()">Recargar</v-btn>
      </template>
    </v-data-table>
    <add-item-dialog @refresh="getLibros()" ref="editDialog" />
  </div>
</template>
<script>
import mixin from '@/mixins/global.mixin'
import addItemDialog from '@/components/dialogs/AddItemDialog.vue'
export default {
  mixins: [mixin],
  components: {
    addItemDialog,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Titulo', value: 'nombre' },
      { text: 'Autor', value: 'autor', align: 'start' },
      { text: 'Año', value: 'year' },
      { text: 'Precio', value: 'precio' },
      { text: 'Descripcion', value: 'resumen' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
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
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {

    addItem() {
      this.editedIndex = -1
      this.$refs.editDialog.dialog = true
      this.$refs.editDialog.editedIndex = -1
    },
    editItem(item) {
      console.log('item', item)
      this.editedIndex = this.books.indexOf(item)
      this.$refs.editDialog.editedIndex = this.editedIndex
      this.editedItem = item
      this.$refs.editDialog.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.books.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.books.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
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
    async getLibros() {
      let response = await this.$axios.get('libro/list')
      let result = this.parseImagesArrayToJson(response)
      setTimeout(() => {
        this.books = result
        console.log('books', this.books)
      }, 500)
    },
  },
  created() {
    this.getLibros()
  },
}
</script>