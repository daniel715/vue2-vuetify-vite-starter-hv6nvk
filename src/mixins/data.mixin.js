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

        async getAutores() {
            let response = await this.$axios.get("autor/list")
            this.$store.state.autores = response.data
            console.log("this.$store.state.autores", this.$store.state.autores)
        },

        async getCategorias() {
            let response = await this.$axios.get("categoria/list")
            this.$store.state.categorias = response.data
            console.log("this.$store.state.categorias", this.$store.state.categorias)
        },
        async getPedidos() {
            let response = await this.$axios.get("pedido/list")
            this.$store.state.pedidos = response.data
            console.log("this.$store.state.pedidos", this.$store.state.pedidos)
        }
    },
}