import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(private ChangeDetectorRef: ChangeDetectorRef, private router: Router) { }

  userName: string;

  ngOnInit() {
    this.userName = sessionStorage.getItem('userName');
    this.ChangeDetectorRef.detectChanges();
  }

  ngAfterViewChecked() {
    this.userName = sessionStorage.getItem('userName');
  }

  logout() {
    this.userName = '';
    sessionStorage.clear();  
    this.router.navigate(['/']);
  }

}
