import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquivoService } from './ArquivoService';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Necessário para usar *ngFor, *ngIf no HTML
  templateUrl: './app.html',
})
export class App implements OnInit {
  arquivos: any[] = [];
  arquivoSelecionado: File | null = null;
  
  // Variáveis para dar feedback visual ao usuário
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private arquivoService: ArquivoService) {}

  // Esse método roda automaticamente assim que a tela abre
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

  // Captura o arquivo quando o usuário escolhe no input
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
        this.arquivoSelecionado = null; // Limpa a seleção
        this.carregarArquivos(); // Recarrega a lista para mostrar o novo arquivo
      },
      error: (erro) => {
        // Captura as mensagens de erro do seu NestJS (Ex: Payload Too Large ou Bad Request)
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
          this.carregarArquivos(); // Atualiza a lista após deletar
        },
        error: () => {
          this.exibirErro('Erro ao deletar o arquivo.');
        }
      });
    }
  }

  // Funções auxiliares para mostrar mensagens por 3 segundos
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