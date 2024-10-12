import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Usuaarios{
  nombre:string;
  edad:number;
  email:string;
}

@Component({
  selector: 'app-ejemplo1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ejemplo1.component.html',
  // template: `
  //   <p>
  //     ejemplo1 works!
  //   </p>
  // `,
  styles: ``
})
export class Ejemplo1Component implements OnInit{
  formGroup!:FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.formGroup=this.initForm();
  }
  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
      edad:[''],
      email:[''],
    })
  }
  onSubmit():void{
    console.log(this.formGroup.value)
  }
}
