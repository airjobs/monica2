import {MARK_JOB, UNMARK_JOB} from './actions'

export default function (state = {bookmark: []}, action) {
  if (action.type === MARK_JOB) {
    return {bookmark: [...state.bookmark, ...action.payload]}
  }

  if (action.type === UNMARK_JOB) {
    const filtered = state.bookmark.filter((item) => item.id !== action.payload.id)
    return {bookmark: filtered}
  }

  return state
}
