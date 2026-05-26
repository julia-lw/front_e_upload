import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  // URL base dos endpoints
  private apiUrl = 'http://localhost:3000/arquivo'; 
  
  // URL onde os arquivos estáticos ficam acessíveis para as miniaturas
  // IMPORTANTE: Ajuste esta URL se o seu NestJS usar outro caminho (ex: http://localhost:3000/static/)
  private staticUrl = 'http://localhost:3000/uploads/';

  constructor(private http: HttpClient) { }

  // 1. Envio de Arquivo (POST /arquivo/upload)
  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // 2. Listar Arquivos (GET /arquivo)
  listar(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // 3. Remover arquivo por nome (DELETE /arquivo/nome/:filename)
  remover(filename: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/nome/${filename}`);
  }

  // Retorna a URL completa para ser usada na tag <img src="..."> da miniatura
  getUrlPreview(filename: string): string {
    return `${this.staticUrl}${filename}`;
  }

  // Realiza o download seguro buscando o arquivo como Blob
  download(filename: string): Observable<Blob> {
    // Caso o backend não sirva arquivos estáticos diretamente, buscamos os bytes do arquivo
    return this.http.get(`${this.staticUrl}${filename}`, { responseType: 'blob' });
  }
}