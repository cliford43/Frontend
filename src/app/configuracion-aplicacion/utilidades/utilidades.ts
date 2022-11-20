import { FormGroup } from "@angular/forms";
import { Constantes } from "../constantes/constantes";

export class Utilidades {
  static obtenerValoresFormulario(informacionFormulario: any, formProyecto: FormGroup) {
    for (const campo in formProyecto.controls) {
        informacionFormulario[campo] = formProyecto.controls[campo].value;
      }
  }
    
    /**
     * Metodo que se encarga de transformar un numero a string
     * agregandole ceros a la izquierda, segun la cantidad de 
     * caracteres requerida.
     * La cantidad de caracteres por defecto son 2.
     * Ejemplo:  llenarCeros(1)   -> respuesta: '01'
     *           llenarCeros(1,2) -> respuesta: '01'
     *           llenarCeros(1,3) -> respuesta: '001'
     * llenarCeros(1,2) -> respuesta: '01'
     * @param numero Número a convertir a string con ceros a la izquierda
     * @param cantidad Cantidad de caracteres que debe contener el string
     */
    static llenarCeros(numero: number, cantidad?: number):string {
        let s = numero.toString();
        while (s.length < (cantidad || 2)) {
            s = "0" + s;
        }
        return s;
    }
    /**
     * Metodo que se encarga de transformar el formato de una fecha
     * yyyy-mm-dd a dd/mm/yyyy
     * @param fecha fecha en formato yyyy-mm-dd
     */
    static formatoFecha(fecha:string):string | null {
    if (!fecha) {
        return null;
    }
    let nuevaFecha = fecha.split(Constantes.SEPARADOR_FECHA_MODElO);
    let hora = new Date(fecha).toLocaleTimeString(Constantes.CODIGO_PAIS,{hour12:true});

    let fechaFormato = Utilidades.llenarCeros(parseInt(nuevaFecha[2], 10))
                        + Constantes.SEPARADOR_FECHA_VISTA
                        + Utilidades.llenarCeros(parseInt(nuevaFecha[1], 10))
                        + Constantes.SEPARADOR_FECHA_VISTA
                        + parseInt(nuevaFecha[0], 10).toString()
                        + ( nuevaFecha[2].split(" ").length == 2? " " + hora : "" );
    
     return fechaFormato;
    }

  /**
   * @description obtiene el archivo contenido en el arrayBuffer con la extensión 
   * especificada en la informacionArchivo y genera un link para que pueda ser descargado.
   * @param arrarBuffer:any objeto que contiene el contenido del archivo.
   * @param informacionArchivo:any objeto que contiene la información general del archivo.
  */
  static descargarArchivo(arrarBuffer:any , informacionArchivo:any){
    let blob = new Blob([arrarBuffer], {type: informacionArchivo.tipoContenido});
    let url = URL.createObjectURL(blob);
    let nombre  = "Archivo-" +informacionArchivo.idArchivo  + "." + informacionArchivo.extension;
    let linkDescarga = document.createElement("a");
    linkDescarga.setAttribute("href", url);
    linkDescarga.setAttribute("download", nombre);
    let evento = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false
    });
    linkDescarga.dispatchEvent(evento);
  }
  /**
   * @description verifica si el navegador donde se esta ejecutando corresponde a un 
   * dispositivo movil.
  */
  static esMovil(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
  }
  /**
   * @description verifica si un número es entero
   * @param numero numero a verificar
   * @returns verdadero si lo es y falso si no.
   */
  static esEntero(numero:number){
    return numero % 1 == 0;
  }
  /**
   * @description devuelve la posicion de un objeto
   * @param el 
   * @returns 
   */
  static getOffset( el:any ) {
    var _x = 0;
    var _y = 0;
    console.log(el);
    while( el && el.offsetLeft  &&  el.offsetTop  ) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
    }
    return { top: _y, left: _x };
    }
}
