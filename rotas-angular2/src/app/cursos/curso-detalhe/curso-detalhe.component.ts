import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit, OnDestroy {

  id: number;
  inscricao: Subscription;
  curso: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {
    // this.id = this.route.snapshot.params['id']; console.log('parametro eh ' + this.id);
    // problema é que, so vai pegar uma vez.. se mudar parametro, já elvis..
  }

  ngOnInit() {
    // se inscrevendo nas mudanças de parametros para receber os valores novos
    this.inscricao = this.route.params.subscribe((params: any) => {
      this.id = params['id'];
      console.log('buscando curso.: ' + this.id);
      this.curso = this.cursosService.getCurso(this.id);

      if (this.curso == null) {
        this.router.navigate(['/naoEncontrado']);
      }

    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe(); // pra nao continuar a inscriçao qd o component for destruído
  }

}
