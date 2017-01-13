import {Component, Output, EventEmitter} from "@angular/core";
import {Adress} from "./ts/Adress";
import {Router} from "@angular/router";
import {AdressesService} from "./adresses.service";

@Component({
	selector: 'ab-list',
	templateUrl: './list.component.html',
	styles: []
})
export class ListComponent {
	
	@Output() requestEdit = new EventEmitter<Adress>();
	
	private list: Adress[];
	
	constructor(private router: Router,
				private adresses: AdressesService) {
		this.list = adresses.getArray();
	}
	
	onClickEdit(event) {
		let adress: Adress = this.list[Number(event.target.id)];
		this.requestEdit.emit(adress);
		this.router.navigate(['/edit', adress.id]);
	}
	
	onClickRemove(event) {
		let adress: Adress = this.list[Number(event.target.id)];
		this.adresses.remove(adress);
		var index = this.list.indexOf(adress, 0);
		if (index > -1) {
			this.list.splice(index, 1);
		}
	}
}
