export class UsersTable {
	public static users: any = [
		{
			id: 1,
			username: 'admin',
			password: 'demo',
			email: 'admin@demo.com',
			accessToken: 'access-token-8f3ae836da744329a6f93bf20594b5cc',
			refreshToken: 'access-token-f8c137a2c98743f48b643e71161d90aa',
			roles: [1], // Administrator
			pic: './assets/media/users/profile.jpeg',
			fullname: 'Gurvinder Singh',
			occupation: 'Architect',
			companyName: 'IBM',
			phone: '+91 9643989377',
			address: {
				addressLine: 'DB 75E, 3rd Floor, Hari Nagar',
				city: 'New Delhi',
				state: 'Delhi',
				postCode: '110064'
			},
			socialNetworks: {
				linkedIn: 'https://linkedin.com/admin',
				facebook: 'https://facebook.com/admin',
				twitter: 'https://twitter.com/admin',
				instagram: 'https://instagram.com/admin'
			}
		},
		{
			id: 2,
			username: 'manager',
			password: 'manager',
			email: 'manager@demo.com',
			accessToken: 'access-token-6829bba69dd3421d8762-991e9e806dbf',
			refreshToken: 'access-token-f8e4c61a318e4d618b6c199ef96b9e55',
			roles: [2], // Manager
			pic: './assets/media/users/100_2.jpg',
			fullname: 'Michael',
			occupation: 'Operator',
			companyName: 'IBM',
			phone: '+91 9643989377',
			address: {
				addressLine: 'DB 75E, 3rd Floor, Hari Nagar',
				city: 'New Delhi',
				state: 'Delhi',
				postCode: '110064'
			},
			socialNetworks: {
				linkedIn: 'https://linkedin.com/manager',
				facebook: 'https://facebook.com/manager',
				twitter: 'https://twitter.com/manager',
				instagram: 'https://instagram.com/manager'
			}
        },
        {
			id: 3,
			username: 'operator',
			password: 'operator',
			email: 'operator@demo.com',
			accessToken: 'access-token-d2dff7b82f784de584b60964abbe45b9',
			refreshToken: 'access-token-c999ccfe74aa40d0aa1a64c5e620c1a5',
			roles: [3], // Guest
			pic: './assets/media/users/default.jpg',
			fullname: 'Ginobili Maccari',
			occupation: 'Operator',
			companyName: 'IBM',
			phone: '+91 9643989377',
			address: {
				addressLine: 'DB 75E, 3rd Floor, Hari Nagar',
				city: 'New Delhi',
				state: 'Delhi',
				postCode: '110064'
			},
			socialNetworks: {
				linkedIn: 'https://linkedin.com/operator',
				facebook: 'https://facebook.com/operator',
				twitter: 'https://twitter.com/operator',
				instagram: 'https://instagram.com/operator'
			}
		}
	];

	public static tokens: any = [
		{
			id: 1,
			accessToken: 'access-token-' + Math.random(),
			refreshToken: 'access-token-' + Math.random()
		}
	];
}
