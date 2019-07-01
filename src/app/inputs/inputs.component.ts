import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
  isText: Boolean = true;
  isAscending: Boolean = true;
  openList: Boolean = false;
  toDoForm: FormGroup;
  errorMsg:String = "";
  
  //Dummy Data
  todoLists = [
    { item: 'Buy Treats for the dog', date: '8/1/2018' },
    { item: 'Call Vet for Annual Check up', date: '8/31/2018' },
  ];

  completedList = [
    { item: 'Buy food for the dog', date: '7/24/2018' }
  ];

  constructor(public formBuilder: FormBuilder) {
    this.createToDoForm();
  }

  ngOnInit() {

  }

  createToDoForm() {
    this.toDoForm = this.formBuilder.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  addList() {
    let tempDate;
    if (this.toDoForm.valid) {
      this.errorMsg = "";
      tempDate = this.toDoForm.get('date').value.split('-');
      this.toDoForm.value['date'] = tempDate[1] + '/' + tempDate[2] + '/' + tempDate[0];
      this.todoLists.push(this.toDoForm.value);
      this.clearItem();
    } else {
      this.errorMsg = "Please check the values"
    }
  }

  clearItem() {
    this.toDoForm.reset();
  }


  removeRow(item: ToDoItem) {
    if (item) {
      const itemIndex: number = this.todoLists.indexOf(item);
      this.completedList.push(this.todoLists[itemIndex]);
      this.todoLists.splice(itemIndex, 1);
    }
  }

  uncheckItem(item:ToDoItem) {
    //add interface instead of param types
    if (item) {
      const itemIndex: number = this.completedList.indexOf(item);
      this.todoLists.push(this.completedList[itemIndex]);
      this.completedList.splice(itemIndex, 1);
    }
  }

  sortArray(key:Boolean, type:Boolean) {
    //Type true = ascending order
    //Type false = descending order
    this.isAscending = type;
    if (key) {
      if (type) {
        this.todoLists.sort((a, b) => ((a.item).toLowerCase() > (b.item).toLowerCase()) ? 1 : -1)
        // console.log('ascending text')
      } else if (!type) {
        this.todoLists.sort((a, b) => ((a.item).toLowerCase() > (b.item).toLowerCase()) ? -1 : 1)
        // console.log('desc text')
      }
    } else if (!key) {
      if (type) {
        this.todoLists.sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)
        // console.log('asc date')
      } else if (!type) {
        this.todoLists.sort((a, b) => (new Date(a.date) > new Date(b.date)) ? -1 : 1)
        // console.log('desc date')
      }
    }
  }
}


export interface ToDoItem {
  item: string,
  date: string
}