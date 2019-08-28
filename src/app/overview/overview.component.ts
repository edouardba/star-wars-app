import { Component, OnInit, OnDestroy } from '@angular/core';
import { StarWarsRessourcesService } from '../shared/services/star-wars-ressources';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {

  constructor(private starWarsRessourcesService: StarWarsRessourcesService) {}

  public films = [];
  public people = [];
  public planets = [];
  public species = [];
  public starships = [];
  public vehicles = [];
  public selectedRessource;
  private _getAllRessources$: Subscription;
  private _getDetails$: Subscription;
  public search: String;
  public ressources: any;
  public resultSearch = [];
  public resultDetail = {};
  objectKeys = Object.keys;
  config: any;
  public panelExpanded = true;

  ngOnInit() {
      this.starWarsRessourcesService.getAllRessources().subscribe(res => {
        this.ressources = res;
        console.log('ressources : ',this.ressources)
        this.setDefaultValue()
      })
  }

  onSearch(event) {
    if (event.key === "Enter") {
      this._getAllRessources$ = this.starWarsRessourcesService.onSearch(this.selectedRessource, event.target.value).subscribe(res => {
        this.resultSearch = res;
        console.log('this.resultSearch', this.resultSearch)
        console.log('this.selectedRessource', this.selectedRessource)
      })
    }
  }

  showDetails(url: string) {
    this._getDetails$ = this.starWarsRessourcesService.getDetails(this.selectedRessource, url).subscribe(res => {
      this.resultDetail = res;
      console.log('url', url)
    })
  }

  setDefaultValue() {
    this.selectedRessource = Object.keys(this.ressources)[0]
    console.log(this.selectedRessource)
  }

  ngOnDestroy() {
    this._getAllRessources$.unsubscribe();  
    this._getDetails$.unsubscribe();
  }

}
