const ACTIVE_LESSON_KEY = 'rn-practice-lab-active-lesson';
const PROGRESS_KEY = 'rn-practice-lab-progress';

const canUseStorage = () => typeof window !== 'undefined' && window.localStorage;

export function loadActiveLessonId(lessons, fallbackId) {
  if (!canUseStorage()) {
    return fallbackId;
  }

  const storedId = window.localStorage.getItem(ACTIVE_LESSON_KEY);
  return lessons.some((lesson) => lesson.id === storedId) ? storedId : fallbackId;
}

export function saveActiveLessonId(lessonId) {
  if (canUseStorage()) {
    window.localStorage.setItem(ACTIVE_LESSON_KEY, lessonId);
  }
}

export function loadProgress(lessons) {
  if (!canUseStorage()) {
    return {};
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(PROGRESS_KEY) || '{}');
    return lessons.reduce((progress, lesson) => {
      progress[lesson.id] = Boolean(parsed[lesson.id]);
      return progress;
    }, {});
  } catch {
    return {};
  }
}

export function saveProgress(progress) {
  if (canUseStorage()) {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }
}
