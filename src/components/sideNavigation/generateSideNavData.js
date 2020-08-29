/* Run using 'node' */
const fs = require('fs')

const subjects = ['Arabic', 'English', 'Math']
const levels = ['Level-1', 'Level-2', 'Level-3']
const units = ['Unit-1', 'Unit-2', 'Unit-3']
const lessons = ['Lesson-1', 'Lesson-2', 'Lesson-3']

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
		const subjectID = generateID(10)
		const subjectData = {
			title: subject,
			id: subjectID,
			type: 'subject',
			key: subject.split(' ').join('-').toLowerCase(),
			disabled: false,
			children: [],
		}

		for (const level of levels) {
			const levelID = generateID(10)
			const levelData = {
				title: level,
				id: levelID,
				type: 'level',
				key: subjectData.key + '-' + level.split(' ').join('-').toLowerCase(),
				parentID: subjectID,
				disabled: false,
				children: [],
			}

			for (const unit of units) {
				const unitID = generateID(10)
				const unitData = {
					title: unit,
					id: unitID,
					type: 'unit',
					key: levelData.key + '-' + unit.split(' ').join('-').toLowerCase(),
					parentID: levelID,
					disabled: false,
					children: [],
				}

				for (const lesson of lessons) {
					const lessonID = generateID(10)
					const getLessonTitle = (i) => `Slide-${i + 1}`
					const lessonKey = unitData.key + '-' + lesson.split(' ').join('-').toLowerCase()
					const lessonData = {
						title: lesson,
						id: lessonID,
						type: 'lesson',
						key: lessonKey,
						parentID: unitID,
						disabled: false,
						children: new Array(10).fill(0).map((_, i) => ({
							title: getLessonTitle(i),
							id: generateID(10),
							type: 'slide',
							key: lessonKey + '-' + getLessonTitle(i).split(' ').join('-').toLowerCase(),
							parentID: lessonID,
							disabled: false,
						})),
					}
					unitData.children.push(lessonData)
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
