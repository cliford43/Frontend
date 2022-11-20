import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Catalogos } from '../../constantes/catalogos';

@Injectable({
  providedIn: 'root'
})
export class ApiCatalogosService {
  constructor(private http: HttpClient) { }
  /**
   * @description Obtiene la información del usuario que esta autenticado.   
   */
  async getItemsCatalogo(idCatalogo: Catalogos) {
    return await this.http.get<any>(environment.API_URL + "catalogos/" + idCatalogo.toString() + "/items").toPromise();
  }

  /**
   * @description Obtiene los catalogos del sistema dado su tipo
   * @param catalogo Enum del Catalogo a obtener
   */
   async getCatalogoPorId(catalogo: string) {
    return await this.http.get<any[]>(environment.API_URL + "catalogos/" + catalogo + "/items").toPromise();
  }

}
