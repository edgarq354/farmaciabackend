import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { NavbarComponent } from '../../component/navbar/navbar.component';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  location: Location;
  private _router: Subscription;
  // url: string;

  @ViewChild('sidebar') sidebar;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(private router: Router, location: Location) {
    
   
      this.location = location;
     
  }

  ngOnInit() {
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      //   this.url = event.url;
      this.navbar.sidebarClose();
    });

    var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      var $main_panel = $('.main-panel');
      $main_panel.perfectScrollbar();
    }
  }

}
