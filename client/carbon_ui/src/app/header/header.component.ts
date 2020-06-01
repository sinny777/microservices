import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
	// adds padding to the top of the document, so the content is below the header
	@HostBinding('class.bx--header') headerClass = true;

	brandTemplate = 'IBM';

	hasHamburger = true;
	leftPanelActive = false;
	hasActiveChild = true;
	showSearch = true;

	headerItems = [{
			type: 'item',
			route: ['support'],
			content: 'Support'
		},
		{
			type: 'menu',
			title: 'Docs',
			trigger: 'click',
			menuItems: [
				{
					type: 'item',
					route: ['foo'],
					content: 'IBM Cloud Platform'
				},
				{
					type: 'item',
					route: ['bar'],
					content: 'Watson Assistant'
				},
				{
					type: 'item',
					route: ['bar'],
					content: 'Watson Discovery'
				},
				{
					type: 'item',
					route: ['bar'],
					content: 'Cloud Object Storage'
				}
			]
		}
	];

	hamburgerClicked(event) {
		console.log(event);
	}

	notificationClicked(event) {
		console.log(event);
	}

}
