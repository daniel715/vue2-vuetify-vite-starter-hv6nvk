<template>
  <div>
    <basic-crud :headers="headers" :entidad="'libro'"/>
  </div>
</template>
  <script>
import basicCrud from '@/components/BasicCrud.vue'
export default {
  components: {
    basicCrud,
  },
  data: () => ({
    headers: [
      { text: 'Titulo', value: 'nombre' },
      { text: 'Autor', value: 'autor' },
      { text: 'Año', value: 'year' },
      { text: 'Precio', value: 'precio' },
      { text: 'Stock', value: 'stock' },
      { text: 'Descripcion', value: 'resumen' },
      { text: 'Categorias', value: 'categorias' },
      { text: 'Actions', value: 'actions' },
    ],
  }),
  methods: {},
}
</script>