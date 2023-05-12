import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/Model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-newproyecto',
  templateUrl: './newproyecto.component.html',
  styleUrls: ['./newproyecto.component.css']
})
export class NewproyectoComponent implements OnInit {
  nombre:string;
  descripcion:string;
  img:string;
  link:string;

  constructor(private proyectosS: ProyectosService, private activatedRouter:ActivatedRoute ,private router:Router, public imageService:ImageService){}
  
  ngOnInit(): void {
    
  }

  onCreate():void{
    const proyectos = new Proyectos(this.nombre, this.descripcion, this.img, this.link);
    this.proyectosS.save(proyectos).subscribe(data=>{
        alert("Proyecto añadido correctamente");
        this.router.navigate(['']);
      }, err  =>{
        alert("falló");
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
