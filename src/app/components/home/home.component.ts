import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { NoteService } from 'src/app/core/services/note.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes: any[] = [];
  value = '';
  constructor(
    private _dialog: MatDialog,
    private _noteService: NoteService,
    private _auth: AuthService
  ) { }
  ngOnInit(): void {
    this.getNotes()
  }
  addNote(): void {
    const matDialogRef = this._dialog.open(NoteDataComponent);
    matDialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res === "add") {
          this.getNotes()
        }
      }
    })
  }
  setData(note:any): void {
    const matDialogRef = this._dialog.open(NoteDataComponent,{
      data:{note}
    });
   matDialogRef.afterClosed().subscribe({
    next:(res)=>{
      if(res == "updated"){
        this.getNotes()
      }
    }
   })
  }

  getNotes(): void {
    const model = {
      token: localStorage.getItem('_noteToken'),
      userID: this._auth.user.getValue()._id
    }

    this._noteService.getNotes(model).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.notes = res.Notes
        }
        console.log(res);

      }
    })
  }

  deleteNote(id: string, index: number): void {
    const model = {
      NoteID: id,
      token: localStorage.getItem("_noteToken")
    }
    this._noteService.deleteNote(model).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == "deleted") {
          this.notes.splice(index, 1);
          this.notes = [...this.notes]
        }

      }
    })
    console.log(id);

  }
}
