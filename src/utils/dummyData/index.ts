import data from './dummyDataStore.json'

const { subjects, levels, units, lessons, slides } = data || {}

/* Statistics */
export const getStatistics = () => [
	{ type: 'subject', total: subjects.length },
	{ type: 'level', total: levels.length },
	{ type: 'unit', total: units.length },
	{ type: 'lesson', total: lessons.length },
	{ type: 'slide', total: slides.length },
]

/* Subject */
export const getSubjects = () => subjects
export const findSubjectByID = (id: string | number) => subjects.find((subject: any) => subject.id === id)

/* Level */
export const getLevels = () => levels
export const findLevelByID = (id: string | number) => levels.find((level: any) => level.id === id)
export const getLevelsByParentID = (subjectID: string | number): any[] => {
	return levels.filter((level: any) => level.subjectID === subjectID)
}

/* Unit */
export const getUnits = () => units
export const findUnitByID = (id: string | number) => units.find((unit: any) => unit.id === id)
export const getUnitsByParentID = (levelID: string | number): any[] => {
	return units.filter((unit: any) => unit.levelID === levelID)
}

/* Lesson */
export const getLessons = () => lessons
export const findLessonByID = (id: string | number) => lessons.find((lesson: any) => lesson.id === id)
export const getLessonsByParentID = (unitID: string | number): any[] => {
	return lessons.filter((lesson: any) => lesson.unitID === unitID)
}

/* Slide */
export const getSlides = () => slides
export const findSlideByID = (id: string | number) => slides.find((slide: any) => slide.id === id)
export const getSlidesByParentID = (lessonID: string | number): any[] => {
	return slides.filter((slide: any) => slide.lessonID === lessonID)
}
