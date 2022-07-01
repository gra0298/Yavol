

//const API = "https://graph.facebook.com/v14.0/?access_token=EAAIHQhIvwlkBADVyaZAwFAzngLn20ZBE3ufb5pPAKvuVN5qAdFV8iIq7JkP09wQGr8IqFnngpJxydpKITFtBeF1L9U9SN8O2tU3DAuquRQsg7bZBTs0SUkFzyCf6DrKxhk1HQAWVBZCuzaYF8a7ZBahioEQaOpwrQTvZCB7frQ6jDXgkVKB6ip";
const API = "https://graph.facebook.com/v14.0/";
//const ID = "740942583993914"
const TOKEN = "?fields=id,name,picture&access_token=EAAIHQhIvwlkBAI1sk6hcVT91A2rtGfRNX5lsHPnBnonIsZAPFsmmsaqmPe3DeRAOcjiQ1gb7Vpc2i8BSkRN3sdqsMaMUIqzS0xO6bYOQ5GY6q6vV5YqbLCiiLs13SV4StomcL7TW7D9wOqjvHmkWlucQW68D4rxQpRt7eknjmdGRuKZCES62RsYk9nXFPxnBA1ZC7pIS3GSV7c43BWzYe8jmZBhHhBa09INTAZBsfxRb4i6J7IBB1"
//615022695


//create app método de la clase vue e inicializa el proyecto
const facebook = Vue.createApp({
    data() { //atributos: nombre apellido,mensaje, resultado.. data es una palabra reservada de vue
      return {
        //son atributos 
        //mensaje: 'Bienvenido SENA ',
        //busqueda : null,
        busqueda : null,
        resultado : null, //vacío
        fail: null,
        //Se guardan los favoritos en arry de tipo map
        favoritos: new Map()// aqui se define nuevo atributo Y SE GUARDAN LOS FAVORITOS
      }
    /*},created(){
      const FavoritosGuardados = JSON.parse(window.localStorage.getItem("favoritos"))
      //primero evalua si existe
      if(FavoritosGuardados?.length){
        const favoritosRebuild = new Map(

          FavoritosGuardados.map(alias =>[alias.id,alias]))

          this.favoritos = favoritosRebuild
          console.log(this.favoritos)
        
      }*/
    },
    computed: {
      //es favorito?
      esFavorito(){
        return this.favoritos.has(this.resultado.id)

      },
      //con esta propiedad computada se retornantodos los favoritos 
      //pero únicamente los valores,no las keys para eso se usa values()
      TodosFavoritos(){
        return Array.from(this.favoritos.values())
      }

    },
    methods: {
      
        async Buscar(){
          try {
            //Constante response que devuelve una búsqueda
            const response = await fetch(API + this.busqueda + TOKEN)//aquí se realiza la busqueda
            console.log(response)
            //si ok es false,lanzar un nuevo error
            if(!response.ok) throw new Error("usuario no a sido encontrado")//este se muestra en el catch
            const data = await response.json()
            this.resultado = data //el true se cambia a data para trear toda la info
            this.fail = null
            console.log(data)
            
            
            /*
            Trycatch: Un bloque catch contiene sentencias que especifican que hacer si una excepción es lanzada
             en el bloque try . Si cualquier sentencia dentro del bloque try (o en una funcion llamada desde
             dentro del bloque try ) lanza una excepción, el control cambia inmediatamente al bloque catch */
            
          } catch (error) {
            this.fail = error   
            this.resultado = false
           //finalmente hacer que la busqueda quede vacía
           //finalmente se recomienda limpiar caché
          } finally {
            this.busqueda = null
            //En búsqueda de vue si no se colocaba el finally aparecia 
            //lo que se había buscado independientemente si estaba bien o mal
            
          }         
           //Se crea nueva función
        },addFavorito(){
          //Esta función se encargará de agregar el perfil de una persona a favoritos.
          //la clave de este map será el Id y la clave será el resultado
          //Se pide que se traiga la clave que es el id
          this.favoritos.set(this.resultado.id,this.resultado)
          
          this.UpdateStorage()//se carga el updateStorage porque se está llamando al método


        },removerfavorito(){

          this.favoritos.delete(this.resultado.id);//para eliminar favorito
          this.UpdateStorage()

        },
        //se pretende guardar en cache informacion de favoritos de manera persistente
        UpdateStorage(){
          //convertimos el map en una cadena de texto Json
          window.localStorage.setItem('favoritos',JSON.stringify(this.TodosFavoritos));//para convertir el map en cadena de texto
        }

    }
  })//.mount('#app')

  //createApp me crea el objet>

  //Storage (API de almacenamiento web) nos permite almacenar datos de manera local en el navegador y sin necesidad de realizar alguna conexión a una base de datos. En este artículo
  //te mostraré cómo utilizarlo mediante JavaScript.