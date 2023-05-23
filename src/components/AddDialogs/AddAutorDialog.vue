<template>
  <v-dialog @click:outside="close" v-model="dialog" max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="8">
              <v-text-field outlined v-model="editedItem.nombre" label="Nombre"></v-text-field>
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
</template>
  <script>
import { defineComponent } from '@vue/composition-api'
import { UUID } from 'uuidjs'
export default defineComponent({
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      id: '',
      nombre: '',
    },
    defaultItem: {
      id: '',
      nombre: '',
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Agregar Autor' : 'Editar Autor'
    },
  },
  methods: {
    async save() {
      console.log(this.editedIndex)
      //editando autor
      if (this.editedIndex > -1) {
        let respuesta = await this.$axios.patch('autor/update/' + this.editedItem.id, this.editedItem)
        console.log(respuesta)
        if (respuesta.status == '201') {
          this.refresh()
        }
      } else {
        //creando nuevo autor
        this.editedItem.id = UUID.generate()
        let response = await this.$axios.post('autor/save', this.editedItem)
        if (response.status == '201') {
          this.refresh()
        }
      }

      this.close()
    },
    refresh() {
      this.$emit('refresh')
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
})
</script>