import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/Model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-editproyecto',
  templateUrl: './editproyecto.component.html',
  styleUrls: ['./editproyecto.component.css']
})
export class EditproyectoComponent implements OnInit {
proyectos: Proyectos = null

  constructor(private activatedRouter: ActivatedRoute,
    private proyectosService: ProyectosService,
    private router:Router,
    public imageService:ImageService){


  }
  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectosService.detail(id).subscribe(data=>{
        this.proyectos=data;
      }, err  =>{
        alert("falló");
        this.router.navigate(['']);
      }
    )
  }

   OnUpdate():void{
    const id= this.activatedRouter.snapshot.params['id'];
    this.proyectos.img=this.imageService.url
    this.proyectosService.update(id, this.proyectos).subscribe(
      data=>{
        this.router.navigate(['']);
      }, err=>{
        alert("Error al modificar el proyecto");
        this.router.navigate(['']);
      }
    )

  }

  uploadImage($event:any){
    const id= this.activatedRouter.snapshot.params['id'];
    const name= "proyectos_" + id;
    this.imageService.uploadImage($event, name)
  }



}
