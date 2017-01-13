import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AdressesService} from "./adresses.service";
import {Adress} from "./ts/Adress";
import {Country} from "./ts/Country";

@Component({
	selector: 'ab-edit',
	templateUrl: './edit.component.html',
	styles: [`

	`]
})
export class EditComponent implements OnInit, OnDestroy {
	
	title = "Edit adress";
	
	user = {
		firstName: '',
		lastName: '',
		email: '',
		country: ''
	};
	
	private id = 0;
	private routeSubscription: Subscription;
	private isNew: boolean = false;
	private adress: Adress;
	private countries: Array<Country>;
	public isActive: boolean = false;
	public isAlertActive: boolean = false;
	public alertMessage: string;
	
	constructor(
		private route: ActivatedRoute,
		private adresses: AdressesService,
		private router: Router
	) {
		this.countries = Array.from(Country.mapIDToCountry.values());
	}
	
	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(
			(params: any) => {
				if (this.router.url == "/new") {
					this.isNew = true;
					this.title = "Add new adress";
					this.isActive = true;
				} else {
					if (params.hasOwnProperty('id')) {
						this.isNew = false;
						try {
							this.adress = this.adresses.getByID(Number(params['id']));
							this.user.firstName = this.adress.firstName;
							this.user.lastName = this.adress.lastName;
							this.user.email = this.adress.email;
							this.user.country = this.adress.country.id;
							this.isActive = true;
						} catch (e) {
							this.alertMessage = "There's no user with ID:" + params['id']
							this.isAlertActive = true;
						}
					} else {
						this.alertMessage = "No user ID specified."
						this.isAlertActive = true;
					}
				}
			}
		);
	}
	
	onSubmit(form: NgForm) {
		if(this.isNew) {
			this.adresses.createNew(this.user.firstName, this.user.lastName, this.user.email, Country.getCountryByCode(this.user.country));
		}else{
			this.adress.firstName = this.user.firstName;
			this.adress.lastName = this.user.lastName;
			this.adress.email = this.user.email;
			this.adress.country = Country.getCountryByCode(this.user.country);
			this.adresses.serializeAndSave();
		}
		this.router.navigate(['/list']);
	}
	
	ngOnDestroy(): void {
		this.routeSubscription.unsubscribe();
	}
	
}
