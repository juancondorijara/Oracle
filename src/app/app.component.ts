import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet/>'            //new
  //templateUrl: './app.component.html',  //before
  //styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';
}
