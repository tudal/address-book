import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {ListComponent} from "./list.component";
import {EditComponent} from "./edit.component";
import {StartComponent} from "./start.component";
import {appRouting} from "./app.routing";
import {AdressesService} from "./adresses.service";

@NgModule({
	declarations: [
		AppComponent,
		ListComponent,
		EditComponent,
		StartComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		appRouting,
	],
	providers: [AdressesService],
	bootstrap: [AppComponent,]
})
export class AppModule {
}
