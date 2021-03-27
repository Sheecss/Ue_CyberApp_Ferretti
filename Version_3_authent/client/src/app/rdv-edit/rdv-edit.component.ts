import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RdvService } from '../shared/rdv/rdv.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rdv-edit',
  templateUrl: './rdv-edit.component.html',
  styleUrls: ['./rdv-edit.component.css']
})
export class RdvEditComponent implements OnInit, OnDestroy {
  rdv: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rdvService: RdvService,
              private giphyService: GiphyService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.rdvService.get(id).subscribe((rdv: any) => {
          if (rdv) {
            this.rdv = rdv;
            this.rdv.href = rdv._links.self.href;
            this.giphyService.get(rdv.name).subscribe(url => rdv.giphyUrl = url);
          } else {
            console.log(`Rdv with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/rdv-list']);
  }

  save(form: NgForm) {
    this.rdvService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.rdvService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
