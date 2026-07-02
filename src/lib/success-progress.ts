"use client"

const PROGRESS_KEY = "success-steps-progress-v1"
const COMPLETED_KEY = "success-steps-completed-v1"

export interface StepProgress {
  stepNumber: number
  completedChecklist: number[] // индексы выполненных пунктов чек-листа
  completedExercises: number[] // индексы выполненных упражнений
  notes: string
  startedAt?: number
  completedAt?: number
}

export function getAllProgress(): Record<number, StepProgress> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function getStepProgress(stepNumber: number): StepProgress | null {
  return getAllProgress()[stepNumber] || null
}

export function updateStepProgress(step: StepProgress): void {
  if (typeof window === "undefined") return
  const all = getAllProgress()
  if (!all[step.stepNumber]) {
    step.startedAt = Date.now()
  }
  all[step.stepNumber] = step
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all))
}

export function toggleChecklistItem(stepNumber: number, itemIndex: number): StepProgress {
  const current = getStepProgress(stepNumber) || {
    stepNumber,
    completedChecklist: [],
    completedExercises: [],
    notes: "",
  }
  const idx = current.completedChecklist.indexOf(itemIndex)
  if (idx === -1) {
    current.completedChecklist.push(itemIndex)
  } else {
    current.completedChecklist.splice(idx, 1)
  }
  updateStepProgress(current)
  return current
}

export function toggleExercise(stepNumber: number, exerciseIndex: number): StepProgress {
  const current = getStepProgress(stepNumber) || {
    stepNumber,
    completedChecklist: [],
    completedExercises: [],
    notes: "",
  }
  const idx = current.completedExercises.indexOf(exerciseIndex)
  if (idx === -1) {
    current.completedExercises.push(exerciseIndex)
  } else {
    current.completedExercises.splice(idx, 1)
  }
  updateStepProgress(current)
  return current
}

export function updateNotes(stepNumber: number, notes: string): void {
  const current = getStepProgress(stepNumber) || {
    stepNumber,
    completedChecklist: [],
    completedExercises: [],
    notes: "",
  }
  current.notes = notes
  updateStepProgress(current)
}

export function getOverallProgress(): { completedSteps: number; totalSteps: number; totalChecklist: number; completedChecklist: number } {
  const all = getAllProgress()
  const completedSteps = Object.values(all).filter(p =>
    p.completedChecklist.length > 0
  ).length
  const completedChecklist = Object.values(all).reduce((sum, p) =>
    sum + p.completedChecklist.length, 0
  )
  return {
    completedSteps,
    totalSteps: 14,
    totalChecklist: 14 * 5, // примерно 5 пунктов на шаг
    completedChecklist,
  }
}

export function resetAllProgress(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(PROGRESS_KEY)
}
