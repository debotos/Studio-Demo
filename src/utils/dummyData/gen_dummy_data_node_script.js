/* Run using 'node' & make sure shortid npm is globally available(yarn global add shortid) */
const fs = require('fs')
const shortid = require('shortid')
const faker = require('faker')

const count = { subject: 4, level: 4, unit: 3, lesson: 3, slide: 2 }

/* Subject */
const subjects = Array(count.subject)
	.fill(0)
	.map((_, index) => {
		const id = shortid.generate()
		return {
			id,
			type: 'subject',
			title: `Subject ${index + 1}`,
			thumbnail: 'https://picsum.photos/100/100',
			levelCount: count.level,
			unitCount: count.level * count.unit,
			lessonCount: count.level * count.unit * count.lesson,
			slideCount: count.level * count.unit * count.lesson * count.slide,
		}
	})

/* Level */
const generateLevels = () => {
	let data = []
	for (const subject of subjects) {
		const local = Array(count.level)
			.fill(0)
			.map((_, index) => {
				const id = shortid.generate()
				return {
					id,
					subjectID: subject.id,
					type: 'level',
					title: `Level ${index + 1} ${faker.lorem.words()}`,
					thumbnail: 'https://picsum.photos/100/100',
					unitCount: count.unit,
					lessonCount: count.unit * count.lesson,
					slideCount: count.unit * count.lesson * count.slide,
				}
			})

		data = [...data, ...local]
	}
	return data
}
const levels = generateLevels()

/* Unit */
const generateUnits = () => {
	let data = []
	for (const level of levels) {
		const local = Array(count.unit)
			.fill(0)
			.map((_, index) => {
				const id = shortid.generate()
				return {
					id,
					subjectID: level.subjectID,
					levelID: level.id,
					type: 'unit',
					title: `Unit ${index + 1} ${faker.lorem.words()}`,
					thumbnail: 'https://picsum.photos/100/100',
					lessonCount: count.lesson,
					slideCount: count.lesson * count.slide,
				}
			})

		data = [...data, ...local]
	}
	return data
}
const units = generateUnits()

/* Lesson */
const generateLessons = () => {
	let data = []
	for (const unit of units) {
		const local = Array(count.lesson)
			.fill(0)
			.map((_, index) => {
				const id = shortid.generate()
				return {
					id,
					subjectID: unit.subjectID,
					levelID: unit.levelID,
					unitID: unit.id,
					type: 'lesson',
					title: `Lesson ${index + 1} ${faker.lorem.words()}`,
					thumbnail: 'https://picsum.photos/100/100',
					slideCount: count.slide,
					published: index < 1,
				}
			})

		data = [...data, ...local]
	}
	return data
}
const lessons = generateLessons()

/* Slide */
const generateSlides = () => {
	let data = []
	for (const lesson of lessons) {
		const local = Array(count.slide)
			.fill(0)
			.map((_, index) => {
				const id = shortid.generate()
				return {
					id,
					subjectID: lesson.subjectID,
					levelID: lesson.levelID,
					unitID: lesson.unitID,
					lessonID: lesson.id,
					type: 'slide',
					title: `Slide ${index + 1} ${faker.lorem.words()}`,
					thumbnail: 'https://picsum.photos/100/100',
				}
			})

		data = [...data, ...local]
	}
	return data
}
const slides = generateSlides()

/* Save in a json file */
const finalData = {
	subjects,
	levels,
	units,
	lessons,
	slides,
}

fs.writeFileSync('dummyDataStore.json', JSON.stringify(finalData))
