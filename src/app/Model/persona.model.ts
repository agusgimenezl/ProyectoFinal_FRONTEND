export class persona{
    id?:number; //el ? es para indicar q ese dato no es necesario tomarlo o construirlo.  
    nombre:string;
    apellido:string;
    img:string;

    constructor(nombre:string, apellido:string, img:string){ //no necesito poner el id porq es autogenerado
        this.nombre= nombre; //el segundo nombre es el que ingresa por parametro del constructor.
        this.apellido= apellido;
        this.img= img; 
    }

}