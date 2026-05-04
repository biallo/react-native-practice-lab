import { CheckCircle2, Circle, FlaskConical } from 'lucide-react';

export function Sidebar({ activeLesson, completedCount, lessons, onLessonSelect, progress }) {
  const completionPercent = Math.round((completedCount / lessons.length) * 100);
  const handleLessonChange = (event) => {
    const nextLesson = lessons.find((lesson) => lesson.id === event.target.value);

    if (nextLesson) {
      onLessonSelect(nextLesson);
    }
  };

  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark" aria-hidden="true">
          <FlaskConical size={22} strokeWidth={2.4} />
        </div>
        <div>
          <h1>React Native</h1>
          <p className="eyebrow">Practice Lab</p>
        </div>
      </div>

      <div className="progress-panel">
        <div>
          <span>学习进度</span>
          <strong>
            {completedCount}/{lessons.length}
          </strong>
        </div>
        <div className="progress-track" aria-label={`完成度 ${completionPercent}%`}>
          <div style={{ width: `${completionPercent}%` }} />
        </div>
      </div>

      <div className="lesson-select-panel">
        <label htmlFor="lesson-select">选择课程</label>
        <select id="lesson-select" onChange={handleLessonChange} value={activeLesson.id}>
          {lessons.map((lesson) => {
            const doneMark = progress[lesson.id] ? '✓ ' : '';

            return (
              <option key={lesson.id} value={lesson.id}>
                {doneMark}
                {lesson.version} · {lesson.title}
              </option>
            );
          })}
        </select>
      </div>

      <nav className="lesson-list" aria-label="课程目录">
        {lessons.map((lesson) => {
          const isActive = lesson.id === activeLesson.id;
          const isDone = Boolean(progress[lesson.id]);

          return (
            <button
              className={isActive ? 'lesson-link active' : 'lesson-link'}
              key={lesson.id}
              onClick={() => onLessonSelect(lesson)}
              type="button"
            >
              <span className="lesson-state" aria-hidden="true">
                {isDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              </span>
              <span>
                <strong>{lesson.version}</strong>
                <em>{lesson.title}</em>
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
