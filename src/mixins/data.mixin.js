export default {
    methods: {
        async getLibros() {
            let response = await this.$axios.get("libro/list")
            let tablalibro = response.data
            const libros = tablalibro

            for (let index = 0; index < tablalibro.length; index++) {
                let response = await this.$axios.get("librocategoria/" + tablalibro[index].idLibro)
                let array = [];
                response.data.forEach(async element => {
                    array.push(element.idCategoria)
                })
                libros[index].categorias = array;
            }
            this.$store.state.libros = libros

        },
    },
}