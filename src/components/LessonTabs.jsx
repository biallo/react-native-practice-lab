import { CheckSquare, Library } from 'lucide-react';

const lessonTabs = [
  { id: 'explain', label: '讲解' },
  { id: 'review', label: '复盘' }
];

const icons = {
  explain: Library,
  review: CheckSquare
};

export function LessonTabs({ activeTab, onTabChange }) {
  return (
    <div className="tab-bar" role="tablist" aria-label="课程内容">
      {lessonTabs.map((tab) => {
        const Icon = icons[tab.id];
        const selected = tab.id === activeTab;

        return (
          <button
            aria-selected={selected}
            className={selected ? 'tab-button active' : 'tab-button'}
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            type="button"
          >
            <Icon size={18} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
