// src/components/PracticePlanDisplay.tsx
import React from 'react';

export type PracticePlanDisplayProps = {
  plan: {
    ageGroupId: number;
    practiceLength: number;
    plan: {
      skillCategoryId: number;
      drills: {
        id: number;
        name: string;
        description: string;
        durationMinutes: number;
      }[];
    }[];
  };
};

const PracticePlanDisplay: React.FC<PracticePlanDisplayProps> = ({ plan }) => {
  return (
    <div>
      <h3>Practice Plan</h3>
      <p>Age Group: {plan.ageGroupId}</p>
      <p>Practice Length: {plan.practiceLength} minutes</p>
      <div>
        {plan.plan.map((section, index) => (
          <div key={index}>
            <h4>Skill Category {section.skillCategoryId}</h4>
            <ul>
              {section.drills.map((drill) => (
                <li key={drill.id}>
                  <strong>{drill.name}</strong>: {drill.description} ({drill.durationMinutes} min)
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticePlanDisplay;
