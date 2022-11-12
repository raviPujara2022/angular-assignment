import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { PinDataModel } from 'src/app/interface/data.interface';
@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrls: ['./pin-list.component.scss'],
})
export class PinListComponent implements OnChanges, AfterViewInit {
  public displayedColumns = ['title', 'image', 'collaboratory', 'privacy'];
  public dataSource!: MatTableDataSource<PinDataModel>;
  @Input() pinListData!: PinDataModel[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public sanitizer: DomSanitizer) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.setDataSource(this.pinListData);

  }
  // update table data and set intial value in the data via data source
  public setDataSource(pinListData: PinDataModel[]) {
    this.dataSource = new MatTableDataSource(pinListData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // set paginator 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // trust the given img source url uploaded by user
  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
