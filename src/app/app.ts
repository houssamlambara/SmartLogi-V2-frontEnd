import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar';
import { NgxSonnerToaster } from 'ngx-sonner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NgxSonnerToaster, NgxSpinnerModule],
  templateUrl: "./app.html",
  styleUrl: './app.css'
})

export class App {
  constructor(private router: Router) { }

  isAuthPage(): boolean {
    return this.router.url.startsWith('/auth');
  }
}
