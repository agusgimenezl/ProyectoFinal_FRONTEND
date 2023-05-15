import { Component, OnInit } from '@angular/core';
import { Storage, getDownloadURL, list, ref, uploadBytes } from '@angular/fire/storage';
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
  url: string = "";


  constructor(private activatedRouter: ActivatedRoute,
    private proyectosService: ProyectosService,
    private router: Router,
    public imageService: ImageService,
    public storage: Storage) {


  }
  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectosService.detail(id).subscribe(data => {
      this.proyectos = data;
    }, err => {
      alert("falló");
      this.router.navigate(['']);
    }
    )
    this.imageService.clearUrl();
  }

  OnUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectosService.update(id, this.proyectos).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar el proyecto");
        this.router.navigate(['']);
      }
    )
    this.imageService.clearUrl();
  }


  public uploadImage($event: any) { //ingresa el archivo (evento) + el nombre del archivo
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "proyectos_" + id;
    const file = $event.target.files[0]
    const imgRef = ref(this.storage, `editproyectos/` + name) //ref es metodo de firebase 1er param: donde se guarda 2do param: url(name)
    uploadBytes(imgRef, file) //metodo de firebase que sube la imagen
      .then(response => (this.getImages(name))) //ya que contiene promesas de devolución necesario??
      .catch(error => console.log(error)) //muestra el error por consola si lo hubiese
  }

  getImages(name: String) {
    const imagesRef = ref(this.storage, 'editproyectos')
    list(imagesRef).then(async response => { //lo pongo asincrono ya que tarda, sino lo devolverá vacío
      for (let item of response.items) {
        this.url = await getDownloadURL(item); //await por la asincronicidad
        if (name == item.name) {
          this.proyectos.img = this.url
        }
      }

    })
      .catch(error => console.log(error))
  }

}






