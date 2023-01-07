  <template>
  <v-dialog v-model="dialog" max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="8">
              <v-text-field outlined v-model="editedItem.nombre" label="Titulo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <autor-combo/> 
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <categoria-combo/> 
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field outlined v-model="editedItem.stock" label="Stock"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field outlined v-model="editedItem.precio" label="Precio"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field outlined v-model="editedItem.resumen" label="Descripcion"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field outlined v-model="editedItem.year" label="Año"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <upload-image-vue />
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
import AutorCombo from "@/components/combos/AutorCombo.vue"
import CategoriaCombo from "@/components/combos/CategoriaCombo.vue"
import UploadImageVue from '../uploads/UploadImage.vue'
export default defineComponent({
  components:{
    AutorCombo,
    CategoriaCombo,
    UploadImageVue
  },
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      nombre: '',
      year: '',
      resumen: '',
      autor: '',
      precio: '',
      stock: ''
    },
    defaultItem: {
      nombre: '',
      year: '',
      resumen: '',
      autor: '',
      precio: '',
      stock: ''
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Agregar Libro' : 'Editar Libro'
    },
  },
  methods: {
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.books[this.editedIndex], this.editedItem)
      } else {
        // this.books.push(this.editedItem)
      }
      this.close()
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