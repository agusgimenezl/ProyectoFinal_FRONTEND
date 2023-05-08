import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/Model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
persona: persona = new persona("","","");

constructor(public personaService:PersonaService) {}
//llamo al servicio de persona

ngOnInit(): void{
  this.personaService.getPersona().subscribe(data=>{this.persona =data}) //lo que entra en persona se guarda en datos
} 
  //el subscribe es como un metodo que detecta siempre que el Observable hace un cambio. y provoca una respuesta
// entonces cuando cambien los datos de persona, se guardan en eldata, dsps en el service y dsps a back
}
