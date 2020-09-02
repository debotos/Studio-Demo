import { createSlice } from '@reduxjs/toolkit'

import keys from '../../config/keys'

type SliceState = { sideNav: 'pinned' | boolean }

const getSideNavInitValue = () => {
	const val = localStorage.getItem(keys.sideNav)
	if (!val) return false
	if (val === 'pinned') {
		return 'pinned'
	} else if (val === 'true') {
		return true
	} else {
		return false
	}
}

const initialState: SliceState = { sideNav: getSideNavInitValue() }

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSettings(settings, { payload }) {
			return { ...settings, ...payload }
		},
	},
})

export const { setSettings } = settingsSlice.actions

export default settingsSlice.reducer
