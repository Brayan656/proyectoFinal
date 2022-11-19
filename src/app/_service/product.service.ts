import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../_model/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlProduct: string = `${environment.procuct}product/`;
  private urlImagen: string = `${environment.procuct}imagen/`;

  constructor(private http:HttpClient) { }

//zona servicios productos
  //CREATE
  public productAdd(product: Product){
    return this.http.post<any>(this.urlProduct+'create',{
      "nombre": product.nombre,
      "descripcion":product.descripcion,
      "precioUnidad": product.precioUnidad,
      "stock": product.stock
    });
  }
  //READ
  public productlistAll(){
    return this.http.get<any>(this.urlProduct+'findAll');
  }
  public productlistById(id:number){
    return this.http.get<any>(this.urlProduct+'findById/'+id);
  }
  public productListByName(name:String){
    return this.http.get<any>(this.urlProduct+'findByName/'+name);
  }
  //UPDATE
  public prodctupdate(product:Product){
    this.http.put<any>(this.urlProduct+'update/'+product.idProduct,{
      "nombre": product.nombre,
      "descripcion":product.descripcion,
      "precioUnidad": product.precioUnidad,
      "stock": product.stock
    });
  }
  //DELETE
  public productDeleteById(id:number){
    return this.http.delete<any>(this.urlProduct+'delete/'+id);
  }

//////////////////////////////////////// 
//////////////////////////////////////// 
//////////////////////////////////////// 
//       zona servicios imagenes      //
//////////////////////////////////////// 
//////////////////////////////////////// 
//////////////////////////////////////// 

  //CREATE
/*   public imageAdd(idPost:number,imagen:any){
    return this.http.post<any>(this.urlImagen+'save/'+idPost,{
      'file':imagen
    });
  } */
  public imageAdd(idPost:number,imagen:any){
    return this.http.post<any>(this.urlImagen+'save/'+idPost, imagen);
  }
  //READ
  public imageListAll(){
    return this.http.get<any>(this.urlImagen+'findAll');
  }
  public imageListByProduct(post:number){
    return this.http.get<any>(this.urlImagen+'findByPost/'+post);
  }
  public imageListById(id:number){
    return this.http.get<any>(this.urlImagen+'findAById/'+id);
  }
  //UPDATE
  public imageUpdate(id:number,imagen:any){
    return this.http.put<any>(this.urlImagen+'update/'+id,{
      'file':imagen
    });
  }
  //DELETE
  public imageDeleteAll(){
    return this.http.delete<any>(this.urlImagen+'deleteAll');
  }
  public imageDeleteById(id:number){
    return this.http.delete<any>(this.urlImagen+'deleteById/'+id)
  }
  public imageDeleteByPost(id:number){
    return this.http.delete<any>(this.urlImagen+'deleteByPost/'+id)
  }

}
