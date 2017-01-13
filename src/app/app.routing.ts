import {Routes, RouterModule} from "@angular/router";
import {EditComponent} from "./edit.component";
import {StartComponent} from "./start.component";
import {ListComponent} from "./list.component";

const APP_ROUTES: Routes = [
  {path: '', component: StartComponent},
  {path: 'list', component: ListComponent},
  {path: 'edit', component: EditComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'new', component: EditComponent},
];

export const appRouting = RouterModule.forRoot(APP_ROUTES);
