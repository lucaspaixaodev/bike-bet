import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalApostaComponent } from '../modal-aposta/modal-aposta.component';

interface Ciclista {
  id: number;
  nome: string;
  equipe: string;
  odds: number;
  imagemUrl: string;
  posicaoRanking?: number;
  pontosUci?: number;
  nacionalidade?: string;
}

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule]
})
export class PaginaInicialComponent implements OnInit {
  ciclistasDestaque: Ciclista[] = [
    {
      id: 1,
      nome: 'Tadej Pogačar',
      equipe: 'UAE Team Emirates',
      odds: 2.5,
      imagemUrl: 'assets/ciclistas/pogacar.jpg'
    },
    {
      id: 2,
      nome: 'Jonas Vingegaard',
      equipe: 'Team Visma',
      odds: 2.8,
      imagemUrl: 'assets/ciclistas/vingegaard.jpg'
    },
    {
      id: 3,
      nome: 'Remco Evenepoel',
      equipe: 'Soudal Quick-Step',
      odds: 3.2,
      imagemUrl: 'assets/ciclistas/evenepoel.jpg'
    }
  ];

  proximasProvas = [
    {
      nome: 'Tour de France 2024',
      data: '29 Jun - 21 Jul',
      local: 'França',
      imagemUrl: 'assets/imagens/provas/italia.jpg'
    },

    {
      nome: 'Giro d\'Italia 2024',
      data: '4 Mai - 26 Mai',
      local: 'Itália',
      imagemUrl: 'assets/imagens/provas/france.jpg'

    }
  ];

  topCiclistas: Ciclista[] = [
    {
      id: 1,
      nome: 'Tadej Pogačar',
      equipe: 'UAE Team Emirates',
      odds: 2.5,
      imagemUrl: 'assets/ciclistas/pogacar.jpg',
      posicaoRanking: 1,
      pontosUci: 7220,
      nacionalidade: 'Eslovênia'
    },
    {
      id: 4,
      nome: 'Primož Roglič',
      equipe: 'BORA-hansgrohe',
      odds: 3.5,
      imagemUrl: 'assets/ciclistas/roglic.jpg',
      posicaoRanking: 2,
      pontosUci: 6720,
      nacionalidade: 'Eslovênia'
    },
    {
      id: 2,
      nome: 'Jonas Vingegaard',
      equipe: 'Team Visma',
      odds: 2.8,
      imagemUrl: 'assets/ciclistas/vingegaard.jpg',
      posicaoRanking: 3,
      pontosUci: 6300,
      nacionalidade: 'Dinamarca'
    },
    {
      id: 3,
      nome: 'Remco Evenepoel',
      equipe: 'Soudal Quick-Step',
      odds: 3.2,
      imagemUrl: 'assets/ciclistas/evenepoel.jpg',
      posicaoRanking: 4,
      pontosUci: 6100,
      nacionalidade: 'Bélgica'
    },
    {
      id: 5,
      nome: 'Mathieu van der Poel',
      equipe: 'Alpecin-Deceuninck',
      odds: 4.0,
      imagemUrl: 'assets/ciclistas/vanderpoel.jpg',
      posicaoRanking: 5,
      pontosUci: 5890,
      nacionalidade: 'Holanda'
    }
  ];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  fazerAposta(ciclistaId: number): void {
    const ciclista = this.ciclistasDestaque.find(c => c.id === ciclistaId) ||
                    this.topCiclistas.find(c => c.id === ciclistaId);

    const dialogRef = this.dialog.open(ModalApostaComponent, {
      width: '500px',
      data: { ciclista },
      panelClass: 'bg-transparent',
      backdropClass: 'bg-gray-900/50'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dados da aposta:', result);
        // Aqui você pode implementar a lógica para salvar a aposta
        // com os dados do usuário e do ciclista selecionado
      }
    });
  }
}
