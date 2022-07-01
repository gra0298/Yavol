

//const API = "https://graph.facebook.com/v14.0/?access_token=EAAIHQhIvwlkBADVyaZAwFAzngLn20ZBE3ufb5pPAKvuVN5qAdFV8iIq7JkP09wQGr8IqFnngpJxydpKITFtBeF1L9U9SN8O2tU3DAuquRQsg7bZBTs0SUkFzyCf6DrKxhk1HQAWVBZCuzaYF8a7ZBahioEQaOpwrQTvZCB7frQ6jDXgkVKB6ip";
const API = "https://graph.facebook.com/v14.0/";
//const ID = "740942583993914"
const TOKEN = "?fields=id,name,picture&access_token=EAAIHQhIvwlkBAD6txNPHE30buWU95eKkhUYnd4ZBMXLZCAfAA793sCSHcJsif3P186QBKwe2Ivs189wUAhkH6ju3QR3WsTxCZBCUrbvTFyzhQ7suaYR85tWCSKn2TZCBhMzFmIbGTApzpaPFBjCafWKoH0W2tDyesIws0kekEpZBaZAU4ZCGZC9wMVRCWJEbprY2g00F03jLrSL05jPdMUlDVQy2UUn8rMCdTjFaKNkMXoG79ZAYSnZAhc"
//615022695

const facebook = Vue.createApp({
    data() { //atributos: nombre apellido,mensaje, resultado.. data es una palabra reservada de vue
      return {
        //son atributos 
        //mensaje: 'Bienvenido SENA ',
        //busqueda : null,
        busqueda : null,
        resultado : null, //vacío
        fail: null,
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
            const response = await fetch(API + this.busqueda + TOKEN)//aquí se realiza la busqueda
            console.log(response)
            //si ok es false,lanzar un nuevo error
            if(!response.ok) throw new Error("usuario no a sido encontrado")//este se muestra en el catch
            const data = await response.json()
            this.resultado = data //el true se cambia a data para trear toda la info
            this.fail = null
            console.log(data)
            
            
            
            
          } catch (error) {
            this.fail = error   
            this.resultado = false
           //finalmente hacer que la busqueda quede vacía
           //finalmente se recomienda limpiar caché
          } finally {
            this.busqueda = null
            
          }         
            
        },addFavorito(){
          //la clave de este map será el Id y la clave será el resultado

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