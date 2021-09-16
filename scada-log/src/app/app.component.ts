import { CreatorService } from './services/creator.service';
import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { TreeMode } from 'tree-ngx';
import { JsonService } from './services/json.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scada-log';
  constructor(private config: NgSelectConfig, public json:JsonService, public conn:SocketService, public creator: CreatorService) {
    this.config.notFoundText = 'Are you joking?';
}
  public  selectedGroup;
  public selectedAsset;
  public selectedShift;
  public selectedItems;

  Shapes = []

  ngOnInit(){
    this.Shapes.push({
      data: {
        heirarchy:'',
        group: [],
        asset: null,
        shift: null,
      }
    })
    this.conn.connect();
  }

  // public selectedFHFFF
  public filters:any = []

  options = {
    mode: TreeMode.MultiSelect,
    checkboxes: true,
    alwaysEmitSelected: false
  }

  removeShape(index){
    this.Shapes.splice(index, 1);
  }

  addShape(){
    this.Shapes.push({
      data: {
        heirarchy:'',
        group: [],
        asset: null,
        shift: null,
      }
    })
  }

  saveShape(){
    this.creator.createJSONPayload(this.Shapes)
  }
  
  // public filterTypes = [
  //   {
  //     disabled: false,
  //     isShow: true,
  //     label: "Hierarchy",
  //     type: "tree",
  //     value: "site",
  //   },
  //   {
  //     disabled: false,
  //     isShow: true,
  //     label: "Asset Group",
  //     type: "multiCheckboxSelect",
  //     value: "device_group",
  //   },
  //   {
  //     disabled: false,
  //     isShow: true,
  //     label: "Assets",
  //     type: "multiCheckboxSelect",
  //     value: "devices",
  //   },
  //   {
  //     disabled: false,
  //     isShow: true,
  //     label: "Shift",
  //     type: "multiCheckboxSelect",
  //     value: "shift",
  //   }];



}
