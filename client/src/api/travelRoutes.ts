export const travelRoutes: Record<string, string[]> = {
	Mercury: ['Venus'],
	Venus: ['Mercury', 'Earth'],
	Earth: ['Jupiter', 'Uranus'],
	Mars: ['Venus'],
	Jupiter: ['Mars', 'Venus'],
	Saturn: ['Earth', 'Neptune'],
	Uranus: ['Saturn', 'Neptune'],
	Neptune: ['Uranus', 'Mercury'],
}
