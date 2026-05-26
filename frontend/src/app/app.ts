import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquivoService } from './ArquivoService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
})
export class App implements OnInit {
  arquivos: any[] = [];
  arquivoSelecionado: File | null = null;
  
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  baseUrlImagens: string = 'http://localhost:3000/arquivo';

  constructor(private arquivoService: ArquivoService) {}

  ngOnInit() {
    this.carregarArquivos();
  }

  carregarArquivos() {
    this.arquivoService.listar().subscribe({
      next: (resposta) => {
        this.arquivos = resposta.files;
      },
      error: () => {
        this.exibirErro('Não foi possível listar os arquivos. O servidor está rodando?');
      }
    });
  }

  aoSelecionarArquivo(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;
    }
  }

  fazerUpload() {
    if (!this.arquivoSelecionado) {
      this.exibirErro('Por favor, selecione um arquivo primeiro.');
      return;
    }

    this.arquivoService.upload(this.arquivoSelecionado).subscribe({
      next: (resposta) => {
        this.exibirSucesso(resposta.message);
        this.arquivoSelecionado = null;
        this.carregarArquivos();
      },
      error: (erro) => {
        const msg = erro.error?.message || 'Ocorreu um erro no upload.';
        this.exibirErro(msg);
      }
    });
  }

  deletarArquivo(filename: string) {
    if (confirm(`Tem certeza que deseja deletar o arquivo ${filename}?`)) {
      this.arquivoService.remover(filename).subscribe({
        next: (resposta) => {
          this.exibirSucesso(resposta.message);
          this.carregarArquivos();
        },
        error: () => {
          this.exibirErro('Erro ao deletar o arquivo.');
        }
      });
    }
  }

  private exibirSucesso(msg: string) {
    this.mensagemSucesso = msg;
    this.mensagemErro = '';
    setTimeout(() => this.mensagemSucesso = '', 3000);
  }

  private exibirErro(msg: string) {
    this.mensagemErro = msg;
    this.mensagemSucesso = '';
    setTimeout(() => this.mensagemErro = '', 3000);
  }
}