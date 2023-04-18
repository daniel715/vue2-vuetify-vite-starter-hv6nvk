  <template>
  <v-dialog @click:outside="close" v-model="dialog" max-width="1000px">
    <v-card  >
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
              <autor-combo @input="setAutorId"  ref="autorCombo" />
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <categoria-combo @input="setCategorias" ref="categoriaCombo" />
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field type="number" outlined v-model.number="editedItem.stock" label="Stock"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field type="number" outlined v-model.number="editedItem.precio" label="Precio"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field outlined v-model="editedItem.resumen" label="Descripcion"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field outlined v-model="editedItem.year" label="Año"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <image-input ref="imageInput" @input="formatImagesString" label="Foto" height="190px" width="280px" base64 />
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
import AutorCombo from '@/components/combos/AutorCombo.vue'
import CategoriaCombo from '@/components/combos/CategoriaCombo.vue'
import ImageInput from '@/components/inputs/ImageInput.vue'
import mixin from '@/mixins/global.mixin'
import { UUID } from 'uuidjs'
export default defineComponent({
  components: {
    AutorCombo,
    CategoriaCombo,
    ImageInput,
  },
  mixins: [mixin],
  data: () => ({
    dialog: false,
    editedIndex: -1,
    imageArrayTemp: [],
    editedItem: {
      id: '',
      nombre: '',
      year: '',
      resumen: '',
      idAutor: '',
      precio: 0.0,
      stock: 0,
      imageurl: '',
      categoriasId: [],
      categorias: []
    },
    defaultItem:{
      id: '',
      nombre: '',
      year: '',
      resumen: '',
      idAutor: '',
      precio: 0.0,
      stock: 0,
      imageurl: '',
      categoriasId: [],
      categorias: []
    },
    defaultPayload: {
      categorias: "",
      categoriasId:"",
      libroId: ""
    },
    payload: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Agregar Libro' : 'Editar Libro'
    },
  },
  methods: {
    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.books[this.editedIndex], this.editedItem)
      } else {
        this.editedItem.id = UUID.generate()
        let response = await this.$axios.post('libro/save', this.editedItem)
        // console.log(response)
        if (response.status == '201') {
          this.payload.libroId = this.editedItem.id;
          this.payload.categorias = JSON.stringify(this.editedItem.categorias)
          this.parseString(JSON.stringify(this.editedItem.categoriasId))
          let response = await this.$axios.post('librocategoria/save', this.payload)
          console.log(response)
        }
      }
      this.close()
    },
    formatImagesString(data) {
      console.log("data",data)
      if (data != null) {
        let token = `${data}`
        this.imageArrayTemp.push(token)
        this.editedItem.imageurl = JSON.stringify(this.imageArrayTemp)
      }
    },

    parseString(data) {
      this.payload.categoriasId = data
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.imageArrayTemp = []
      this.payload = Object.assign({}, this.defaultPayload)
      this.$refs.autorCombo.selectedItem = {}
      this.$refs.categoriaCombo.select = []
      this.$refs.imageInput.img = null

    },
    setAutorId(data) {
      if (data != null) {
        console.log('en add item dialog', data)
        this.editedItem.idAutor = data
      }
    },
    async setCategorias(data) {
      if (data != null) {
        console.log(data)
        this.editedItem.categoriasId = await data.map((item) => item.id )
        this.editedItem.categorias = await data.map((item)=> item.nombre)
        console.log(this.editedItem.categoriasId)
        console.log(this.editedItem.categorias)
      }
    },
    async refresh(){
      this.$emit("refresh")
    }
  },
})
</script>