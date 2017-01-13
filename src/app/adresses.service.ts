import {Injectable} from "@angular/core";
import {Country} from "./ts/Country";
import {Adress} from "./ts/Adress";

@Injectable()
export class AdressesService {
	
	private mapIDToAdress: Map<number, Adress> = new Map<number, Adress>();
	
	private initialList: Adress[] = [
		new Adress(1, 'Marek', 'Brun', 'marek.brun@gmail.com', Country.getCountryByCode('pl')),
		new Adress(2, 'John', 'Smith', 'john@gmail.com', Country.getCountryByCode('us')),
		new Adress(3, 'Gerg', 'Cooper', 'greg@gmail.com', Country.getCountryByCode('gb')),
	];
	
	private nextID: number = 0;
	
	constructor() {
		let jsonStr: string = localStorage.getItem("adresses");
		if (jsonStr && jsonStr.length) {
			//{"list":[{"id":1,"firstName":"Marek","lastName":"Brun","email":"marek.brun@gmail.com","country":{"name":"Poland","id":"PL"}}, ... ]}
			let jsonObj = JSON.parse(jsonStr);
			let adress: Adress;
			for (let o of jsonObj.list) {
				adress = new Adress(o.id, o.firstName, o.lastName, o.email, Country.getCountryByCode(o.country.id));
				this.mapIDToAdress.set(o.id, o);
				if (o.id >= this.nextID) {
					this.nextID = o.id;
				}
			}
			
		} else {
			for (let o of this.initialList) {
				if (o.id >= this.nextID) {
					this.nextID = o.id;
				}
				this.mapIDToAdress.set(o.id, o);
			}
			
			// console.log("alama:"+localStorage.getItem("alama"));
			// localStorage.setItem("alama", "kota"+Math.random());
			this.serializeAndSave();
		}
		this.nextID++;
		
	}
	
	public serializeAndSave() {
		let jsonStr: string = JSON.stringify({list: this.getArray()});
		localStorage.setItem("adresses", jsonStr);
	}
	
	getByID(id: number): Adress {
		if (this.mapIDToAdress.has(id)) {
			return this.mapIDToAdress.get(id);
		}
		throw new Error("Adress with id:" + id + " not found");
	}
	
	createNew(firstName: string, lastName: string, email: string, country: Country): Adress {
		let adress: Adress = new Adress(this.nextID, firstName, lastName, email, country);
		this.nextID++;
		this.mapIDToAdress.set(adress.id, adress);
		this.serializeAndSave();
		return adress;
	}
	
	/* no support for IterableIterator by ngFor
	 getArray(): IterableIterator<Adress> {
	 return this.mapIDToAdress.values();
	 }*/
	
	getArray(): Array<Adress> {
		return Array.from(this.mapIDToAdress.values());
	}
	
	remove(adress: Adress) {
		this.mapIDToAdress.delete(adress.id);
		this.serializeAndSave();
	}
}
