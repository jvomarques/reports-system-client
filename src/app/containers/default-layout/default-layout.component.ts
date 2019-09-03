import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {
  
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  usuario:any;  
  
  constructor(@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit(){
    // this.usuario.nome = '';
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.usuario);
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
    // this.usuario.nome = '';

    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    
  }
}
