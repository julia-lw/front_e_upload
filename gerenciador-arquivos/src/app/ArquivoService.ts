import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  // A URL do seu backend NestJS
  private apiUrl = 'http://localhost:3000/arquivo'; 

  constructor(private http: HttpClient) { }

  // 1. Envio de Arquivo (POST)
  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    // O Angular entende que FormData deve ser enviado como multipart/form-data automaticamente
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // 2. Listar Arquivos (GET)
  listar(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // 3. Remover arquivo por nome (DELETE)
  remover(filename: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/nome/${filename}`);
  }
}