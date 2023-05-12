import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/Model/persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-editacercade',
  templateUrl: './editacercade.component.html',
  styleUrls: ['./editacercade.component.css']
})
export class EditacercadeComponent implements OnInit{
persona: persona =null;

constructor(private activatedRouter: ActivatedRoute, private personaService:PersonaService,
   private router:Router, public imageService:ImageService){}

ngOnInit(): void {
  const id= this.activatedRouter.snapshot.params['id'];
    this.personaService.detail(id).subscribe(
      data=>{
        this.persona=data;
      }, err =>{
        alert("Error al modificar la educación");
        this.router.navigate(['']);
      }
    )
}

onUpdate():void{
  const id= this.activatedRouter.snapshot.params['id']; //captura id
  this.persona.img=this.imageService.url //desde el servicio trae la url y lo pone en img persona
    this.personaService.update(id, this.persona).subscribe(
      data=>{
        this.router.navigate(['']);
      }, err=>{
        alert("Error al modificar los datos");
        this.router.navigate(['']);
      }
    )
}


uploadImage($event:any){
  const id=this.activatedRouter.snapshot.params['id'] //unicidad de archivos
  const name= "perfil_" + id
  this.imageService.uploadImage($event, name)
}


}
