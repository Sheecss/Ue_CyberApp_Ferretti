import { Component, OnInit } from '@angular/core';
import { RdvService } from '../shared/rdv/rdv.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-rdv-list',
  templateUrl: './rdv-list.component.html',
  styleUrls: ['./rdv-list.component.css']
})
export class RdvListComponent implements OnInit {
  rdvs: Array<any>;

  constructor(private rdvService: RdvService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.rdvService.getAll().subscribe(data => {
      this.rdvs = data;
      
    });
  }
}
