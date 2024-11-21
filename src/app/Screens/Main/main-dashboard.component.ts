import { Component, OnInit } from '@angular/core';
import { SysSystem } from '../../Modules/Sys/Main/SysSystem';
import { SystemCardComponent } from '../../Components/Main/system-card/system-card.component';
import { MasterDashboardComponent } from '../../Components/Main/master-dashboard/master-dashboard.component';
import { CommonModule } from '@angular/common';
import { SysSystemService } from '../../Services/Sys/Main/SySystem/sys-system.service';


@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, SystemCardComponent, MasterDashboardComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
  systems: SysSystem[] = [];

  constructor(private sysSystemService: SysSystemService) { }

  ngOnInit(): void {
    this.sysSystemService.GetAllSysSystems().subscribe({
      next: (data) => {
        console.log(data);
        this.systems = data;
      },
      error: (err) => {
        console.error('Error fetching systems:', err);
      }
    });
  }
}