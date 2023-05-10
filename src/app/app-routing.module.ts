import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewExperienciaComponent } from './components/experiencia/new-experiencia.component';
import { EditExperienciaComponent } from './components/experiencia/edit-experiencia.component';
import { NeweducacionComponent } from './components/educacion/neweducacion.component';
import { EditeducacionComponent } from './components/educacion/editeducacion.component';
import { NewSkillComponent } from './components/hys/new-skill.component';
import { EditSkillComponent } from './components/hys/edit-skill.component';

const routes: Routes = [
{path:'', component: HomeComponent}, //por defecto me lleva al componente home
{path:'login', component: LoginComponent}, //cuando sea /login me lleva al componente login
{path:'nuevaexp', component: NewExperienciaComponent},
{path:'editexp/:id', component: EditExperienciaComponent}, //asi se espera un id de determinada explab
{path:'nuevaedu', component: NeweducacionComponent},
{path:'editedu/:id', component: EditeducacionComponent},
{path:'newskill', component: NewSkillComponent},
{path:'editskill/:id', component: EditSkillComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
