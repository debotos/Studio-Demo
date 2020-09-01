export function getBase64(file: any) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}

export const capitalize = (string: string = '') => string.trim().charAt(0).toUpperCase() + string.trim().slice(1)
