export const MARK_JOB = 'MARK_JOB'
export const UNMARK_JOB = 'UNMARK_JOB'

export const bookmarkJob = (job) => {
  return {
    type: MARK_JOB,
    payload: [job]
  }
}

export const unBookmarkJob = (job) => {
  return {
    type: UNMARK_JOB,
    payload: job
  }
}
