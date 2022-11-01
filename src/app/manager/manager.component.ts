import {Component, Input, OnInit} from '@angular/core';
import {Manager} from "../../Employee";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  @Input() manager: Manager | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
