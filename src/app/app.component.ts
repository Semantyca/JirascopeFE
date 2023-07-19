import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  appName = 'JirascopeFE';
  info: any = null;
  private subscriptions = new Subscription();
  constructor(
    private http: HttpClient
  ) {

  }

  ngOnInit(){
    this.subscriptions.add(
      this.getWorkspaceInfo().subscribe(((res: any) => {
        console.log(res.info);
        this.info = res.info;
        this.appName = this.info.title
      }))
    )
  }

  getWorkspaceInfo() {
    return this.http.get(`http://jirascope.semantyca.com:38707/q/openapi`).pipe(
      map(result => {
        console.log('result', result);
        return result
      }));
  }


}
