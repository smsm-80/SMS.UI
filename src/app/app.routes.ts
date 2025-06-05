import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'Main',
    loadComponent: () =>
      import('./Screens/Main/main-dashboard.component').then((C) => C.MainDashboardComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Screens/Auth/login/login.component').then((C) => C.LoginComponent),
  },
  {
    path: 'DeliveryMgmt',
    loadComponent: () =>
      import('./Screens/DeliveryMgmt/dashboard.component').then((C) => C.DashboardComponent),
  },
  {
    path: 'FleetMgmt',
    loadComponent: () =>
      import('./Screens/FleetMgmt/dashboard.component').then((C) => C.DashboardComponent),
  },
  {
    path: 'DriverMgmt',
    loadComponent: () =>
      import('./Screens/DriverMgmt/dashboard.component').then((C) => C.DashboardComponent),
    // children: [
    //   {
    //     path: 'AddDriver',
    //     loadComponent: () =>
    //       import('./Screens/DriverMgmt/Driver/add-driver/add-driver.component').then((C) => C.AddDriverComponent),
    //   },
    // ],
  },  
  {
    path: 'DriverMgmt/AddDriver',
    loadComponent: () =>
      import('./Screens/DriverMgmt/Driver/add-driver/add-driver.component').then((C) => C.AddDriverComponent),
  },
  {
    path: 'DriverMgmt/DriverList',
    loadComponent: () =>
      import('./Screens/DriverMgmt/Driver/driver-list/driver-list.component').then((C) => C.DriverListComponent),
  },
  {
    path: 'DriverMgmt/EditDriver/:id', 
    loadComponent: () =>
      import('./Screens/DriverMgmt/Driver/edit-driver/edit-driver.component').then((C) => C.EditDriverComponent),
  }

  
];


