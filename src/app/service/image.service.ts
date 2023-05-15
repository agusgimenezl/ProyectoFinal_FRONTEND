import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { getDownloadURL, list } from '@firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url:string ="";

  
  constructor(private storage: Storage) { }


  public uploadImage($event: any, name: string) { //ingresa el archivo (evento) + el nombre del archivo
    const file = $event.target.files[0]
    const imgRef = ref(this.storage, `imagen/`+ name) //ref es metodo de firebase 1er param: donde se guarda 2do param: url(name)
    uploadBytes(imgRef, file) //metodo de firebase que sube la imagen
      .then(response => (this.getImages())) //ya que contiene promesas de devolución necesario??
      .catch(error => console.log(error)) //muestra el error por consola si lo hubiese
  }

  getImages() {
    const imagesRef = ref(this.storage, 'imagen' ) 
    list(imagesRef).then(async response => { //lo pongo asincrono ya que tarda, sino lo devolverá vacío
      for (let item of response.items) {
        this.url = await getDownloadURL(item); //await por la asincronicidad
      }
    })
    .catch(error => console.log(error))
  }

  clearUrl() {
    this.url = "";
  }
 
}




