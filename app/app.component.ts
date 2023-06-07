import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  fileUrl: string;
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  async prueba() {
    this.getPDF().subscribe((x) => {
      var newBlob = new Blob([x], { type: 'application/pdf' });
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data;
      link.download = 'Je kar.pdf';
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }
  getPDF(): Observable<Blob> {
    let uri = 'https://www.soundczech.cz/temp/lorem-ipsum.pdf';
    return this.http.get(uri, { responseType: 'blob' });
  }
}
