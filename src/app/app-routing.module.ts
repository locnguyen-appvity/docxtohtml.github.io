import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalSettings } from './shared/global.settings';

const routes: Routes = [
	{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
	{ path: '', redirectTo: GlobalSettings.Info.LandingPage, pathMatch: 'full' },
	{ path: '**', redirectTo: GlobalSettings.Info.LandingPage, pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
