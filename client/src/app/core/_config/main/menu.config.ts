export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': [
				{
					'title': 'Pathway',
					'root': true,
					'page': '/dashboard',
					'alignment': 'left'
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot'
				},
				{
					title: 'User Management',
					translate: 'MENU.USER_MANAGEMENT',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					permission: 'accessToAuthModule',
					submenu: [
						{
							title: 'Users',
							translate: 'MENU.USERS',
							page: '/user-management/users'
						},
						{
							title: 'Roles',
							translate: 'MENU.ROLES',
							page: '/user-management/roles'
						}
					]
				},
				{section: 'Other'},
				{
					title: 'Layout Builder',
					translate: 'MENU.LAYOUT_BUILDER',
					root: true,
					icon: 'flaticon2-expand',
					page: '/builder',
					permission: 'accessToLayoutBuilder',
					bullet: 'line'
				}
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
