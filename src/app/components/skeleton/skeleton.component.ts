import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SkeletonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    return;
  }

}
