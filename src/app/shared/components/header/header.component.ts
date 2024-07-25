import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { LucideAngularModule } from 'lucide-angular';
import { environment } from 'src/environments/environment';
import { SkeletonComponent } from '../skeleton/skeleton.component';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SkeletonComponent, LucideAngularModule]

})
export class HeaderComponent implements OnInit {

  turma: any;
  @Input() title?: string;
  @Input() goBack?: boolean = true;
  @Input() defaultHref?: string | undefined;
  @Input() translucent?: boolean = false;
  @Input() hasAdd?: boolean = false;


  ngOnInit(): void {

  }

  constructor(private location: Location,
  ) {

  }


  navigateBack() {
    this.location.back();
  }

}
