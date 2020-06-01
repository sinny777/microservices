import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarterHomeComponent } from './starter-home/starter-home.component';
import {
	GridModule,
	ListModule,
	TabsModule,
	TilesModule,
	DialogModule
} from 'carbon-components-angular';
import { StarterHomeRoutingModule } from './starter-home-routing.module';

@NgModule({
	imports: [
		CommonModule,
		StarterHomeRoutingModule,
		GridModule,
		ListModule,
		TabsModule,
		TilesModule,
		DialogModule
	],
	declarations: [StarterHomeComponent]
})
export class StarterHomeModule { }
