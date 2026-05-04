export function LessonHeader({ lesson }) {
  return (
    <header className="lesson-header">
      <div className="lesson-hero">
        <div className="lesson-meta">
          <span>{lesson.period}</span>
          <span>{lesson.level}</span>
          <span>{lesson.theme}</span>
        </div>
        <h2>{lesson.version}: {lesson.title}</h2>
        <p>{lesson.subtitle}</p>
      </div>
    </header>
  );
}
