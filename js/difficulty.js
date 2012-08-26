var difficulty = [
	{// very easy
		solved : 10,
		interval : 1000 * 30,
		speed : 40,
		conditions : [
			{
				min : 0,
				max : 10,
				operation : "+",
			}
		]	
	},
	{ // easy
		solved : 10,
		interval : 1000 * 30,
		speed : 40,
		conditions : [
			{
				min : 0,
				max : 15,
				operation : "+",
			},
			{
				min : 0,
				max : 10,
				operation : "-",
			}
		]	
	},
	{ // medium
		solved : 20,
		interval : 1000 * 15,
		speed : 30,
		conditions : [
			{
				min : 0,
				max : 25,
				operation : "+",
			},
			{
				min : 0,
				max : 25,
				operation : "-",
			},
			{
				min : 0,
				max : 10,
				operation : "*",
			}
		]	
	},
	{ // hard
		solved : 15,
		interval : 1000 * 5,
		speed: 25,
		conditions : [
			{
				min : 0,
				max : 50,
				operation : "+",
			},
			{
				min : 0,
				max : 50,
				operation : "-",
			},
			{
				min : 0,
				max : 10,
				operation : "*",
			},
			{
				min : 0,
				max : 15,
				operation : "/",
			}
		]	
	},
	{ // evil
		solved : 100,
		interval : 1000 * 3,
		speed : 20,
		conditions : [
			{
				min : 0,
				max : 50,
				operation : "+",
			},
			{
				min : 0,
				max : 50,
				operation : "-",
			},
			{
				min : 0,
				max : 20,
				operation : "*",
			},
			{
				min : 0,
				max : 20,
				operation : "/",
			}
		]
	},
];