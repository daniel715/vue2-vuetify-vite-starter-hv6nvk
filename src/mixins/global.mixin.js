export default {
    methods:
    {
        parseImagesArrayToJson(response) {
            let salida = []
            response.data.forEach((item) => {
                let objeto = {}
                for (let prop in item) {
                    if (prop == 'imageurl') objeto[prop] = JSON.parse(item[prop])
                    else objeto[prop] = item[prop]
                }
                salida.push(objeto)
            })
            return this.deleteDuplicateRecords(salida)
        },

        deleteDuplicateRecords(arr) {
            const seen = new Set()
            const filteredArr = arr.filter((el) => {
                const duplicate = seen.has(el.id)
                seen.add(el.id)
                return !duplicate
            })
            return this.agregarAutoryCategorias(filteredArr)
        },

        agregarAutoryCategorias(array) {
            let arrayAutores = []
            let arraycategorias = []
            let arraycategoriasId = []
            let i = 0

            array.forEach(async (element) => {
                let autoresResponse = await this.$axios.get('autor/find/' + element.idAutor)
                let categoriasResponse = await this.$axios.get('librocategoria/' + element.id)
                arrayAutores.push(autoresResponse.data.nombre)
                arraycategorias.push(categoriasResponse.data.categorias)
                arraycategoriasId.push(categoriasResponse.data.categoriasId)
                element['autor'] = arrayAutores[i]
                element['categorias'] = JSON.parse(arraycategorias[i])
                element['categoriasId'] = JSON.parse(arraycategoriasId[i])
                i = i + 1
            })
            return array
        },
    }
}