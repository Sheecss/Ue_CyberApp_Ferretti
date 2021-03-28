import { Component, OnInit } from '@angular/core';
import { RdvService } from '../shared/rdv/rdv.service';


@Component({
  selector: 'app-rdv-list',
  templateUrl: './rdv-list.component.html',
  styleUrls: ['./rdv-list.component.css']
})
export class RdvListComponent implements OnInit {
  rdvs: Array<any>;

  constructor(private rdvService: RdvService) { }

  ngOnInit() {
    this.rdvService.getAll().subscribe(data => {
      this.rdvs = data;
      
    });
  }
}
