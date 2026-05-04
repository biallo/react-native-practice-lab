import { Check } from 'lucide-react';
import { CodeBlock } from './CodeBlock.jsx';
import { FeatureList } from './FeatureList.jsx';

function DetailGroups({ groups }) {
  return (
    <div className="detail-list">
      {groups.map((group) => (
        <section className="detail-group" key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function CodeExamples({ lesson }) {
  const examples = lesson.codeExamples || [
    {
      title: '基础示例',
      description: '这一段示例对应当前课程的核心知识点。',
      code: lesson.code
    }
  ];

  return (
    <div className="code-example-list">
      {examples.map((example, index) => (
        <section className="code-example" key={example.title}>
          <div className="code-example-copy">
            <h3>{example.title}</h3>
            <p>{example.description}</p>
          </div>
          <CodeBlock code={example.code} label={`example ${index + 1}`} />
        </section>
      ))}
    </div>
  );
}

export function LessonContent({ isDone, lesson, onDone, tab }) {
  if (tab === 'review') {
    return (
      <section className="content-grid">
        <article className="panel wide">
          <div className="section-title">
            <span>Review</span>
            <h2>复盘清单</h2>
          </div>
          <ul className="checklist">
            {lesson.checklist.map((item) => (
              <li key={item}>
                <Check size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button
            className={isDone ? 'primary done' : 'primary'}
            disabled={isDone}
            onClick={onDone}
            type="button"
          >
            {isDone ? '已完成' : '标记为已完成'}
          </button>
        </article>
      </section>
    );
  }

  return (
    <section className="content-grid">
      <article className="panel wide">
        <div className="section-title">
          <span>Why</span>
          <h2>这个阶段解决了什么</h2>
        </div>
        <p className="lead">{lesson.whyItMatters}</p>
      </article>

      <article className="panel wide">
        <div className="section-title">
          <span>Features</span>
          <h2>重要功能与特性</h2>
        </div>
        <FeatureList features={lesson.features} />
      </article>

      <article className="panel wide">
        <div className="section-title">
          <span>Deep Dive</span>
          <h2>深入理解</h2>
        </div>
        <DetailGroups groups={lesson.deepDive} />
      </article>

      <article className="panel wide">
        <div className="section-title">
          <span>Code</span>
          <h2>代码示例</h2>
        </div>
        <CodeExamples lesson={lesson} />
      </article>
    </section>
  );
}
