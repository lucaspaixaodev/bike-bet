import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  ciclista: {
    id: number;
    nome: string;
    equipe: string;
    odds: number;
  };
}

@Component({
  selector: 'app-modal-aposta',
  templateUrl: './modal-aposta.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ModalApostaComponent implements OnInit {
  apostaForm: FormGroup;
  tipoApostaSelecionada: 'tempo' | 'posicao' | null = null;
  ciclista: DialogData['ciclista'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalApostaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.ciclista = data.ciclista;
    this.apostaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
      tempo: [null],
      posicao: [null]
    });
  }

  ngOnInit(): void {
  }

  selecionarTipoAposta(tipo: 'tempo' | 'posicao'): void {
    this.tipoApostaSelecionada = tipo;

    // Resetar os campos não utilizados
    if (tipo === 'tempo') {
      this.apostaForm.get('posicao')?.reset();
      this.apostaForm.get('tempo')?.setValidators([Validators.required, Validators.min(1)]);
      this.apostaForm.get('posicao')?.clearValidators();
    } else {
      this.apostaForm.get('tempo')?.reset();
      this.apostaForm.get('posicao')?.setValidators([Validators.required, Validators.min(1)]);
      this.apostaForm.get('tempo')?.clearValidators();
    }

    this.apostaForm.get('tempo')?.updateValueAndValidity();
    this.apostaForm.get('posicao')?.updateValueAndValidity();
  }

  submeterAposta(): void {
    if (this.apostaForm.valid && this.tipoApostaSelecionada) {
      const dadosAposta = {
        ...this.apostaForm.value,
        tipoAposta: this.tipoApostaSelecionada,
        ciclista: this.ciclista
      };
      this.dialogRef.close(dadosAposta);
    }
  }

  fecharModal(): void {
    this.dialogRef.close();
  }
}
