import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  currentEvent!: Event;
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap(params => this.eventService.get(params['id'])),
    tap(x => this.currentEvent = x),
  );

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm): void {
    //console.log(this.currentEvent?.id);

    const event = new Event();
    event.id = this.currentEvent.id;
    event.date = form.value.date;
    event.location = form.value.location;
    event.name = form.value.name;
    event.time = form.value.time;

    this.eventService
      .update(event)
      .subscribe(() => this.route.navigate(['']))
  }
}
