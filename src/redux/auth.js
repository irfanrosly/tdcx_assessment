import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"

const { Types, Creators } = createActions({
	login: ["name", "apiKey"],
	loginSuccess: ["payload"],
	loginFail: null,
	reset: null,
})

export const AuthTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
	name: "Toi",
	apiKey: "18d4dd5c73093472",
	data: { name: "", token: "" },
	loading: false,
})

const login = (state, action) => {
	return state.merge({
		loading: true,
	})
}

const loginSuccess = (state, action) => {
	return state.merge({
		loading: false,
		data: action.payload.token,
	})
}

const loginFail = (state, action) => {
	return state.merge({
		loading: false,
	})
}

const reset = () => {
	return INITIAL_STATE
}

export const auth = createReducer(INITIAL_STATE, {
	[Types.LOGIN]: login,
	[Types.LOGIN_SUCCESS]: loginSuccess,
	[Types.LOGIN_FAIL]: loginFail,
	[Types.RESET]: reset,
})
