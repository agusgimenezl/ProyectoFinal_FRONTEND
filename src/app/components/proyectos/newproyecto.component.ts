import { Component, OnInit } from '@angular/core';
import { ref, uploadBytes, Storage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/Model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { getDownloadURL, list } from '@firebase/storage';

@Component({
  selector: 'app-newproyecto',
  templateUrl: './newproyecto.component.html',
  styleUrls: ['./newproyecto.component.css']
})
export class NewproyectoComponent implements OnInit {
  proyectos: Proyectos= null;
  nombre: string;
  descripcion: string;
  img: string;
  link: string;
  url: string="";

  constructor(private proyectosS: ProyectosService, private activatedRouter: ActivatedRoute, private router: Router,
    private storage: Storage, public imageService: ImageService,) { }
  

  ngOnInit(): void {
    this.imageService.clearUrl();
  }

  onCreate(): void {
    const proyectos = new Proyectos(this.nombre, this.descripcion, this.img, this.link); 
    this.proyectosS.save(proyectos).subscribe(data => {
      alert("Proyecto añadido correctamente");
      this.router.navigate(['']);
    }, err => {
      alert("falló");
      this.router.navigate(['']);
    }
    )
  }

  uploadImage($event: any) { 
    const name = this.nombre; //crea el name (nombre del archivo de proyecto)
    const file = $event.target.files[0]; //crea cte file con el archivo?
    const imgRef = ref(this.storage, `newproyectos/` + name);
    uploadBytes(imgRef, file)
      .then(response => (this.getImages(name))) //ya que contiene promesas de devolución, necesario??
      .catch(error => console.log(error))
  }

  getImages(name:String) {
    const imagesRef = ref(this.storage, 'newproyectos');
    list(imagesRef).then(async response => { //lo pongo asincrono ya que tarda, sino lo devolverá vacío
      for (let item of response.items) {
        this.url = await getDownloadURL(item); //await por la asincronicidad
        if (name == item.name) {
          this.proyectos.img = this.url
        }
      }
    }).catch(error => console.log(error))

  }

}
