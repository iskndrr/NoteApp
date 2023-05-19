import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.css']
})
export class NoteDataComponent implements OnInit {
  userData: any


  constructor(
    private _formBuilder: FormBuilder,
    private _noteService: NoteService,
    private _matDialog: MatDialogRef<NoteDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  dataForm!: FormGroup
  ngOnInit(): void {
    this.creatForm()
    this.userData = jwtDecode(JSON.stringify(localStorage.getItem("_noteToken")))
    console.log(this.data);
    
  }

  creatForm(): void {
    this.dataForm = this._formBuilder.group({
      title: [this.data ?this.data.note.title: '', Validators.required],
      desc: [this.data ?this.data.note.desc: '', Validators.required],
      token: localStorage.getItem("_noteToken")
    })
  }

  sendData(): void {
    if (this.dataForm.valid) {
      console.log(this.dataForm.value);
      
      if(this.data === null){
        this.addNote()

      }else{
        this.updateNote()
      }
      
    }
  }

  updateNote():void{
    const model ={
     ...this.dataForm.value,
      NoteID:this.data.note._id,
      token: localStorage.getItem("_noteToken")
    }
    this._noteService.updateNote(model).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message == "updated"){
          this._matDialog.close("updated")
        }
        
      }
    })

  }

  addNote(): void {
    const data = {
      ...this.dataForm.value,
      citizenID: this.userData._id

    }

    console.log(data)

    this._noteService.addNote(data).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this._matDialog.close("add")
        }
      }
    })
  }
}
