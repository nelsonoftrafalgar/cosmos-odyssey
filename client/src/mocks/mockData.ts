export const mockLeg = {
	id: '35270bd6-644f-443c-80b6-8a45c8b74e4c',
	routeInfo: {
		id: '65b938fa-5ca3-4591-b92e-6358ad651e70',
		from: { id: 'd88350d8-c2ec-4b8c-8ef8-070a13950637', name: 'Neptune' },
		to: { id: '954a5be1-03c6-492c-a870-36554534d59e', name: 'Mercury' },
		distance: 4443090000,
	},
	providers: [
		{
			id: '7d95c121-e06f-4075-9827-5ad527958ef8',
			company: { id: '6efbad8a-67a1-4c93-bd99-70119f092c0f', name: 'Space Piper' },
			price: 721791.84,
			flightStart: '2021-08-09T06:51:31.8002231Z',
			flightEnd: '2021-08-10T14:12:31.8002231Z',
		},
		{
			id: '927c2a76-5c54-4328-b0fd-692d6725e024',
			company: { id: '49d45860-14c3-467c-8ac8-2ff13743aac2', name: 'Space Odyssey' },
			price: 2859639.39,
			flightStart: '2021-08-06T10:15:31.8002582Z',
			flightEnd: '2021-08-11T08:49:31.8002582Z',
		},
		{
			id: '22f11197-67dd-4496-8885-1567ee6b051a',
			company: { id: 'e1e87116-aae9-4685-b760-e14fe49d3c2f', name: 'Explore Dynamite' },
			price: 3366347.33,
			flightStart: '2021-08-13T03:23:31.8002803Z',
			flightEnd: '2021-08-15T00:24:31.8002803Z',
		},
	],
}

export const mockHistory = [
	{
		company_name: 'Explore Origin',
		first_name: 'test',
		identifier: 'dbe9e4a8-884e-461a-abe4-01e73f6af02e',
		last_name: 'test',
		price: '118627.15',
		route: 'Mars-Venus',
		travel_time: '2',
	},
	{
		company_name: 'Explore Dynamite',
		first_name: 'sgs',
		identifier: '8a595923-2eac-44a9-858a-139430e7de98',
		last_name: 'sdfhs',
		price: '186.6',
		route: 'Venus-Earth',
		travel_time: '6',
	},
	{
		company_name: 'SpaceX',
		first_name: 'sdfsdfh',
		identifier: 'a95fc5cd-4363-41c5-a412-7e57eeb18841',
		last_name: 'dsfhsdh',
		price: '31447.03',
		route: 'Venus-Mercury',
		travel_time: '6',
	},
]
