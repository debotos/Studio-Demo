/* Run using 'node' */
const fs = require('fs')

const subjects = ['Arabic', 'English', 'Math']
const levels = ['Level-1', 'Level-2', 'Level-3']
const units = ['Unit-1', 'Unit-2', 'Unit-3']
const exercises = ['Exercise-1', 'Exercise-2', 'Exercise-3']

function generateID(length) {
	var text = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

function generateSideNavData() {
	const results = []

	for (const subject of subjects) {
		const subjectData = {
			title: subject,
			id: generateID(10),
			type: 'subject',
			key: subject.split(' ').join('-').toLowerCase(),
			disabled: false,
			children: [],
		}

		for (const level of levels) {
			const levelData = {
				title: level,
				id: generateID(10),
				type: 'level',
				key: subjectData.key + '-' + level.split(' ').join('-').toLowerCase(),
				disabled: false,
				children: [],
			}

			for (const unit of units) {
				const unitData = {
					title: unit,
					id: generateID(10),
					type: 'unit',
					key: levelData.key + '-' + unit.split(' ').join('-').toLowerCase(),
					disabled: false,
					children: [],
				}

				for (const exercise of exercises) {
					const getExerciseTitle = (i) => `Slide-${i + 1}`
					const exerciseKey = unitData.key + '-' + exercise.split(' ').join('-').toLowerCase()
					const exerciseData = {
						title: exercise,
						id: generateID(10),
						type: 'exercise',
						key: exerciseKey,
						disabled: false,
						children: new Array(10).fill(0).map((_, i) => ({
							title: getExerciseTitle(i),
							id: generateID(10),
							type: 'slide',
							key: exerciseKey + '-' + getExerciseTitle(i).split(' ').join('-').toLowerCase(),
							disabled: false,
						})),
					}
					unitData.children.push(exerciseData)
				}
				levelData.children.push(unitData)
			}
			subjectData.children.push(levelData)
		}
		results.push(subjectData)
	}

	return results
}

const data = generateSideNavData()
fs.writeFileSync('sideNavData.json', JSON.stringify(data))
