<template>
  <div>
    <v-data-table :headers="headers" :items="items" class="elevation-1">
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
    <confirmation-dialog @onConfirm="deleteItemConfirm()" ref="confirmationDialog" />
  </div>
</template>
<script>
import mixin from '@/mixins/global.mixin'
import addItemDialog from '@/components/dialogs/AddItemDialog.vue'
import confirmationDialog from './dialogs/ConfirmationDialog.vue'
import AddLibroDialog from './AddDialogs/AddLibroDialog.vue'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    libro: {
      type: Object,
      default: null,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    entidad: {
      type: String,
      default: '',
    },
  },
  mixins: [mixin],
  components: {
    addItemDialog,
    confirmationDialog,
    AddLibroDialog,
  },
  data: () => ({
    dialog: false,
    editedIndex: -1,
    items: [],
    editedItem: '',
  }),
  methods: {
    addItem() {
      this.$emit('onAdd')
    },
    editItem(item) {
      console.log('editando item', item)
      this.editedIndex = this.items.indexOf(item) // para que cambie el titulo
      this.$emit('onEdit', item, this.editedIndex)
    },
    deleteItem(item) {
      this.$refs.confirmationDialog.dialog = true
      this.editedItem = item
    },

    async deleteItemConfirm() {
      this.$emit('onDelete', this.editedItem)
    },

    async getItems() {
      this.$emit('getItems')
    },
    refresh() {
      this.getItems()
    },
  },
  created() {
    this.getItems()
  },
})
</script>