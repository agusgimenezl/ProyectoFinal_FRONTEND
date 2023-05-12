import { Component } from '@angular/core';
import { Proyectos } from 'src/app/Model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  proyectos: Proyectos[] = [];

  constructor(private proyectosS: ProyectosService, private tokenService: TokenService,
    public imageService:ImageService) { }
  isLogged = false;

  ngOnInit(): void {
    this.cargarProyectos();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyectos(): void {
    this.proyectosS.lista().subscribe(data => ( this.proyectos = data)
        )
  }

  borrar(id ?: number){
    if (id != undefined) {
      this.proyectosS.delete(id).subscribe(
        data => {
          this.cargarProyectos();
        }, err => {
          alert("No se pudo eliminar");
        }
      )
    }
  }
}
