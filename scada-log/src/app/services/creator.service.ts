import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  constructor() { }

  public mapping = {
    hierarchy: 1,
    deviceGroups: 2,
    tagGroups: 'tag_group',
    devices: 3,
    sites: 'site_list',
    shift: 4,
    tags: 'tags'
  };

  public indexDictionary = {};
  public filterList = [];
  public mainJSON = {
    "tag" : [{
        "unit" : {"label": "Watt", "value": "unit_101"},
        "value" : "tag_264"
      },{
        "unit" : {"label": "Watt", "value": "unit_101"},
        "value" : "tag_264"
      },{
        "unit" : {"label": "Watt", "value": "unit_101"},
        "value" : "tag_265"
      }],
    "node_id" : ["1", "4", "6"]
  }

  createJSONPayload(json){
    this.indexDictionary = {};
    this.filterList = [];
    json.forEach(element => {
      element['reference'] = '';
      this.getConfiguredFilters(element)
      console.log(element)
      this.createJSONObject(element);
    });
    console.log("Filter", this.filterList);
    console.log("Indexed Dictionary", this.indexDictionary);

    // const formatter = new JSONFormatter(this.filterList);
    // let test = document.getElementById('formattedJSON');
    // test.innerHTML = '';
    // test.appendChild(formatter.render());
  }

  getConfiguredFilters(filter){
    for (const [key, value] of Object.entries(filter.data)) {
      if(Array.isArray(filter.data[key])){
        if(filter.data[key]?.length >= 1){
          filter['reference'] += key + ' || ';
        }
      } else {
        if(filter.data[key]){
          filter['reference'] += key + ' || ';
        }
      }
    }
  }

  createJSONObject(element){
    console.log(this.indexDictionary)
    console.log(element.reference)
    if(this.indexDictionary.hasOwnProperty(element.reference)){
      let searchableIndex = this.indexDictionary[element.reference];
      console.log(searchableIndex)
      let addableIndex;
      let index = 0;
      let pkS = false;
      let array;
      searchableIndex.forEach(arr => {
        // for(let arr of searchableIndex){

        
        console.log(arr);
        let primaryKey = arr[0].data[0];
        let firstKey = element.reference.split(' || ')[0];
        let isPrimaryKeySame;

        if(Array.isArray(primaryKey[firstKey])){
          isPrimaryKeySame = this.arrayEquals(primaryKey[firstKey], element.data[firstKey]);
        } else if(typeof primaryKey[firstKey] == 'object'){
          isPrimaryKeySame = this.objectEquals(primaryKey[firstKey], element.data[firstKey]);
        }
        if(isPrimaryKeySame){
          addableIndex = index;
          array = arr;
          pkS = true;
        }
        index++;
        console.log(isPrimaryKeySame);
      });
      if(pkS){
        // console.log('apped rest elements.')
        this.appendRestElements(element, array);
      } else {
        // console.log('add fresh element')
        this.insertFreshElement(element);
      }
      //search and sort
    } else {
      this.insertFreshElement(element)
    }
  }

  appendRestElements(element, arr){
    let allKeys = element.reference.split(' || ');
    allKeys.shift();
    for(let key of allKeys){
      let fromFilterList = this.filterList[arr[1]]
      for(let allFilters of fromFilterList.data){
        if(allFilters.hasOwnProperty(key)){
          allFilters[key].push(element.data[key]);
        }
      }
    }
    this.filterList[arr[1]]['node_id'].push((Math.random() * 10).toFixed(0));
    this.filterList[arr[1]]['tag'].push({
      "unit" : {"label": "Watt", "value": "unit_" +(Math.random() * 100).toFixed(0)},
      "value" : "tag_" + (Math.random() * 500).toFixed(0)
    });
  }

  arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  objectEquals(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
  }

  insertFreshElement(element){
    this.filterList.push({data :[]});
  
    let filter = this.filterList[this.filterList.length - 1].data;
    for(let keys of element.reference.split(' || ')){
      if(keys){
        if(filter.length == 0){
          let temp = {}
          temp[keys] = element.data[keys];
          filter.push(temp)
        } else {
          let temp = {}
          temp[keys] = [element.data[keys]];
          filter.push(temp)
        }
      }
    }

    this.filterList[this.filterList.length - 1]['node_id'] = [(Math.random() * 10).toFixed(0)];
    this.filterList[this.filterList.length - 1]['tag'] =  [{
      "unit" : {"label": "Watt", "value": "unit_101"},
      "value" : "tag_264"
    }];

    (this.indexDictionary[element.reference]) ?
    this.indexDictionary[element.reference].push([this.filterList[this.filterList.length - 1], this.filterList.length - 1]) :
    this.indexDictionary[element.reference] = [[this.filterList[this.filterList.length - 1], this.filterList.length - 1]];
  }
}
