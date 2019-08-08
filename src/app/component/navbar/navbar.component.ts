import { Component, OnInit, Renderer, ViewChild, ElementRef, Directive } from '@angular/core';
import { ROUTES } from '../../component/sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {HttpClient} from '@angular/common/http';
 
 
import * as readline from 'readline';
//import * as fs from 'file-system';
 
declare function getIp():any;
declare function  readTextFile():any;


var misc: any = {
  navbar_menu_visible: 0,
  active_collapse: true,
  disabled_collapse_init: 0,
}
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html' 
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  public informacionMaquina:any;

 public file:any;


  @ViewChild("navbar-cmp") button;

  constructor(
    private _router: Router,
    location: Location, 
    private renderer: Renderer,
     private element: ElementRef,
     private http: HttpClient) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.informacionMaquina="";
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    if ($('body').hasClass('sidebar-mini')) {
      misc.sidebar_mini_active = true;
    }
    $('#minimizeSidebar').click(function () {
      var $btn = $(this);

      if (misc.sidebar_mini_active == true) {
        $('body').removeClass('sidebar-mini');
        misc.sidebar_mini_active = false;

      } else {
        setTimeout(function () {
          $('body').addClass('sidebar-mini');

          misc.sidebar_mini_active = true;
        }, 300);
      }

      // we simulate the window Resize so the charts will get updated in realtime.
      var simulateWindowResize = setInterval(function () {
        window.dispatchEvent(new Event('resize'));
      }, 180);

      // we stop the simulation of Window Resize after the animations are completed
      setTimeout(function () {
        clearInterval(simulateWindowResize);
      }, 1000);
    });

    this.obtenerInformacionMaquina();
  }
 
 

   abrirAchivo()
   {
    readTextFile();
   }
  
  obtenerInformacionMaquina()
  {

    getIp();


/*
    this.http.get<{ip:string}>('https://api.ipify.org?format=json')
    .subscribe( data => {
      console.log('th data', data);
       this.informacionMaquina = data
    })
*/
  }

  isMobileMenu() {
    if ($(window).width() < 991) {
      return false;
    }
    return true;
  }

  sidebarOpen() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');
    this.sidebarVisible = true;
  }
  sidebarClose() {
    var body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }
  sidebarToggle() {
    // var toggleButton = this.toggleButton;
    // var body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible == false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      var parent = this.listTitles[item];
      if (parent.path === titlee) {
        return parent.title;
      } else if (parent.children) {
        var children_from_url = titlee.split("/")[2];
        for (var current = 0; current < parent.children.length; current++) {
          if (parent.children[current].path === children_from_url) {
            return parent.children[current].title;
          }
        }
      }
    }
    return '';
  }

  getPath() {
    // console.log(this.location);
    return this.location.prepareExternalUrl(this.location.path());
  }

  salir(){
    sessionStorage.clear();
    localStorage.clear();
   this._router.navigate(["/"]);
  }
}
