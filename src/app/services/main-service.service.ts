import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";


const API = "https://localhost:7194/";
const UPLOAD = "https://localhost:7194/fileupload";
const KANYE_API = "https://api.kanye.rest";

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(API + "api/Product");
  }

  getOrders() {
    return this.http.get(API + "api/Order");
  }

  deleteProducts(id: any) {
    return this.http.delete(`${API}api/Product/id?id=${id}`)
  }

  getUser() {
    return this.http.get(API + "api/User")
  }

  getCart() {
    return this.http.get(API + "api/Cart");
  }


  postLoginDetails(payload: any) {
    return this.http.post(API + "Login", payload);
  }
  addUsers(payload: any) {
    return this.http.post<any>(API + "api/User", payload)
  }
  addOrder(payload: any) {
    return this.http.post<any>(API + "api/Order", payload)
  }

  addProducts(payload: any) {
    console.log(payload);
    payload.ImagePath = "https://localhost:7194/" + payload.ImagePath
    return this.http.post<any>(API + "api/Product", payload);
  }
  addCart(payload: any) {
    return this.http.post<any>(API + "api/Cart", payload)
  }


  deleteFromCart(id: any) {
    return this.http.delete(`${API}api/Cart/id?id=${id}`)
  }

  //https://localhost:7194/api/Cart/id?id=6

  updateCart(id: any, payload: any) {
    return this.http.put<any>(API + `api/Cart?id=${id}`, payload)
  }
  //https://localhost:7194/api/Cart?id=7

  updateUser(id: any, payload: any) {
    return this.http.put<any>(API + `api/User?id=${id}`, payload)
  }

  uploadFile(data: any) {
    return this.http.post(UPLOAD, data);
  }


  getDecodeJwtToken(token: any) {

    const decoded = jwtDecode(token);
    return decoded
  }

  sendMail(payload:any) {
    return this.http.post(API+ "api/Mail", payload)
  }

  getKanye() {
    return this.http.get(KANYE_API)
  }
}
