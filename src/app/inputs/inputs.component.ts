import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
  addTaskValue;
  dateValue;
  isText: Boolean = true;
  isAscending: Boolean = true;
  openList: Boolean = false;
  constructor(public formBuilder: FormBuilder ) { 
    this.createToDoForm();
  }

  ngOnInit() {
    
  }

  toDoForm: FormGroup;
  createToDoForm() {
    this.toDoForm = this.formBuilder.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
    })
  }



  todoLists = [
    {item: 'Buy Treats for the dog', date: '8/1/2018'},
    {item: 'Call Vet for Annual Check up', date: '8/31/2018'},
  ];
  completedList = [
    {item: 'Buy food for the dog', date: '7/24/2018'}
  ];

  addList() {
    let tempDate;
    if (this.toDoForm.valid) {
      tempDate = this.toDoForm.get('date').value.split('-');
      console.log(tempDate);
      this.toDoForm.value['date'] = tempDate[1] + '/' + tempDate[2] + '/' + tempDate[0];
      console.log(this.toDoForm['date'])
      console.log(this.toDoForm.value)
      this.todoLists.push(this.toDoForm.value);
      this.clearItem();
    }
  }
  
  clearItem() {
    this.toDoForm.reset();
  }


  removeRow(item: { item: string; date: string; }) {
    if(item) {
      const itemIndex:number = this.todoLists.indexOf(item);
      this.completedList.push(this.todoLists[itemIndex]);
      this.todoLists.splice(itemIndex, 1);
    }
  }

  uncheckItem(item: { item: string; date: string; }) {
    if(item) {
      const itemIndex:number = this.completedList.indexOf(item);
      this.todoLists.push(this.completedList[itemIndex]);
      this.completedList.splice(itemIndex, 1);
    }
  }

  sortArray(key, type) {
    //Type true = ascending order
    //Type false = descending order
    this.isAscending = type;
    if(key) {
      if(type) {
        this.todoLists.sort((a, b) => ((a.item).toLowerCase() > (b.item).toLowerCase()) ? 1 : -1)
        // console.log('ascending text')
      } else if(!type) {
        this.todoLists.sort((a, b) => ((a.item).toLowerCase() > (b.item).toLowerCase()) ? -1 : 1)
        // console.log('desc text')
      }
    } else if(!key) {
      if(type) {
        this.todoLists.sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)
        // console.log('asc date')
      } else if(!type) {
        this.todoLists.sort((a, b) => (new Date(a.date) > new Date(b.date)) ? -1 : 1)
        // console.log('desc date')
      }
    }
  }
}
