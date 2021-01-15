import { Component, OnInit, ɵɵresolveBody, Output, EventEmitter, OnChanges } from '@angular/core';
import { faLightbulb as faSolidLightbulb,  faDollarSign,  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faRegularLightbulb } from "@fortawesome/free-regular-svg-icons";
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit, OnChanges {
 message: boolean;
  darkTheme =  new FormControl(false);
  lightMode : boolean = false;

@Output() lightModeToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
 //
  constructor() {
   /* this.darkTheme.valueChanges.subscribe(value => {
      if (value) {
        this.themeService.toggleDark();
      } else {
        this.themeService.toggleLight();
      }
    });*/
    
   }
 
  ngOnInit() {
    
  }

  ngOnChanges(): void {
    this.lightMode = this.lightMode;
  } 

}
