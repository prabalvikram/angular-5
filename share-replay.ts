import { Component } from '@angular/core';
import { ConnectableObservable, from, interval, Observable, of, ReplaySubject, Subject, timer } from 'rxjs';
import { delay, map, mapTo, pluck, publish, publishReplay, refCount, share, shareReplay, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  source
  ngOnInit() {
    console.log('reloaded1')
     this.source = interval(1000)
       .pipe(
      shareReplay({refCount: true, bufferSize: 1}),
      );

  
   const sub1 = this.source.subscribe(x => console.log('sub 1', x));



   setTimeout(() => {
     sub1.unsubscribe();
   }, 3000);

   setTimeout(() => {
     const sub2 = this.source.subscribe(x => console.log('sub 2', x));
      setTimeout(() => {
     sub2.unsubscribe();
   }, 6000);
   }, 6000);

  
  }

  subscribe() {
    console.log('after clicking subscribe')
   const sub3 = this.source.subscribe(x => console.log('sub 3', x));
  }
}
