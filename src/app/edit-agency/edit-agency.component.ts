import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AgencyService} from "../agency.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-agency',
  templateUrl: './edit-agency.component.html',
  styleUrls: ['./edit-agency.component.css', '../card.css', '../margins.css']
})
export class EditAgencyComponent {
  agencyId: string;
  agency: any;
  agencyForm: any;
  constructor(private router: Router, private agencyService: AgencyService) {
    const routerExtras = this.router.getCurrentNavigation()?.extras.state;
    this.agencyId = routerExtras?.['agencyId'];
    let agency = agencyService.getAgency(this.agencyId);
    if (agency != undefined) {
      this.agency = agency;
      console.table(this.agency);
      this.agencyForm = new FormGroup({
        name: new FormControl(this.agency.name),
        address: new FormControl(this.agency.address),
        foundingYear: new FormControl(this.agency.foundingYear),
        phoneNumber: new FormControl(this.agency.phoneNumber),
        email: new FormControl(this.agency.email),
      });
    }
  }

  deleteAgency() {
    if (!confirm("Are you sure that you want to delete this agency?")) {
      console.log("Denied");
    } else {
      this.agencyService.deleteAgency(this.agencyId);
      this.router.navigate(['home']);
    }
  }

  updateAgency() {
    if (!confirm("Are you sure that you want to update this agency?")) {
      alert("Denied");
    } else {
      if (this.agencyService.validateAgencyForm(this.agencyForm.value)) {
        this.agencyService.updateAgency(this.agencyForm.value, this.agencyId, this.agency.destinations, this.agency.logo);
        this.router.navigate(['home']);
      } else {
        alert("Bad data");
      }
    }
  }
}
