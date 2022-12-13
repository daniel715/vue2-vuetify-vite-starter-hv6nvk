<template>
  <div>
    <v-data-table :headers="headers" :items="books" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Administrador libros</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Agregar Libro </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre" label="Titulo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.autor" label="Autor"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.precio" label="Precio"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.resumen" label="Resumen"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.year" label="Año"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <!-- <v-icon  @click="deleteItem(item)"> mdi-delete </v-icon> -->
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import mixin from '@/mixins/global.mixin'
export default {
  mixins: [mixin],
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {},

    editItem(item) {
      // this.editedIndex = this.books.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
      console.log("editando item", item)
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
      }, 500)
      console.log('books', this.books)
    },
  },
  created() {
    this.getLibros()
  },
}
</script>