export default {
    methods: {
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
            return this.agregarAutor(filteredArr)
        },
        agregarAutor(array) {
            let arrayAutores = []
            let i = 0

            array.forEach(async (element) => {
                let response = await this.$axios.get('autor/find/' + element.idAutor)
                arrayAutores.push(response.data.nombre)
            })
            setTimeout(() => {
                array.forEach((element) => {
                    element['autor'] = arrayAutores[i]
                    i = i + 1
                })
            }, 500)
            return array
        },
        async getCategorias() {
            let response = await this.$axios.get('categoria/list')
            this.categorias = response.data
        },
    }
}