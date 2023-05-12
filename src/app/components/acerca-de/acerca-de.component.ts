import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/Model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
persona: persona = null;

constructor(public personaService:PersonaService, private tokenService: TokenService) {}
//llamo al servicio de persona

isLogged=false;

ngOnInit(): void{
 this.cargarPersona();
 if (this.tokenService.getToken()) { //le asigna el estado de logueado o no
  this.isLogged = true;
} else {
  this.isLogged = false;
}
} 
  //el subscribe es como un metodo que detecta siempre que el Observable hace un cambio. y provoca una respuesta
// entonces cuando cambien los datos de persona, se guardan en eldata, dsps en el service y dsps a back

cargarPersona(){
  this.personaService.detail(1).subscribe(
    data=> (this.persona=data)
  )
}

}
