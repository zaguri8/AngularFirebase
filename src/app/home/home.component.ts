import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  noteForm = new FormGroup({
    note_title: new FormControl('', [Validators.required]),
    note_content: new FormControl('', [Validators.required]),
    note_date: new FormControl('', [Validators.required]),
  })

  userSubscription: Subscription
  constructor(public authService: AuthService,
    public databaseService: DatabaseService,
    private router: Router) {

    this.userSubscription = authService.user$.subscribe((user) => {
      if (user === null) {
        this.router.navigate(['auth'])
      }
    })
  }


  onAddNote(user: User) {
    const note_title = this.noteForm.value.note_title!!
    const note_content = this.noteForm.value.note_content!!
    const note_date = this.noteForm.value.note_date!!

    this.databaseService.saveNote(user, {
      id: '',
      title: note_title,
      content: note_content,
      date: note_date
    })

  }


  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

}
