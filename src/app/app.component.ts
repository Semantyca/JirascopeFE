import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, OnDestroy{
  appName = 'JirascopeFE';
  info: any = null;
  appsList: any = [];
  private subscriptions = new Subscription();
  constructor(
    private http: HttpClient
  ) {}

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

  getWorkspaceInfoWithJWT() {
    const JWT = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWlkYSIsImdyb3VwcyI6WyJhZG1pbiIsImRldmVsb3BlciIsInRlc3RlciIsIm9ic2VydmVyIiwicmVwb3J0ZXIiXSwiZXhwIjoxNjg5NDQ5NTYxLCJpYXQiOjE2ODkzNjMxNjEsImlzcyI6IlNlbWFudHljYSIsInN1YiI6ImpvaG4ifQ.MkAEYyPWP5eFcv4ytng1OLuBobB3UVZJHFkHErJyhvOu0RcRMB4Z_3EfzDg0uwMEdiaax3paNw-07QzlGlkBXOhPnEe-iknwiE5pQ3bwpjSdtQOpdeb-vaF1XV9cdpebUOomcpkMM5tL8ZK59MrOsiowkTT5Q3Td5AZNd__0O57IVJQ83GgqSs489uclFuRZTPrqt2dM34ViwLb5ri-PdM3b_Is8We8agIFkW7VBMYkKwYgcqFqQB9lp9vKv_HKi8uTJZWS4u3ocp_DCjZtPh4_OcSXMRw0AHPmA5B1SRyyC4pibVYhklKHHX6xzAXERiy7s7V5my-9-0rhfy5Ht4w`
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${JWT}`)
    }
    return this.http.get(`http://jirascope.semantyca.com:38707/q/openapi`, header).pipe(
      map(result => {
        console.log('result', result);
        return result
      }));
  }

  fakeAuth(){
    this.subscriptions.add(
      this.getWorkspaceInfoWithJWT().subscribe(((res: any) => {
        console.log(res);
      }))
    )
  };

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
