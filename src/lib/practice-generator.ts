// Practice plan generator logic

import { 
  AgeGroup, 
  SkillCategory, 
  WarmUp, 
  CoolDown, 
  Drill, 
  PracticePlan,
  PracticeSection,
  SectionType
} from './models';

interface PlanGeneratorInput {
  duration: number;
  ageGroup: AgeGroup;
  skillCategories: SkillCategory[];
  availableDrills: Drill[];
  availableWarmUps: WarmUp[];
  availableCoolDowns: CoolDown[];
}

interface TimeAllocation {
  warmUpDuration: number;
  coolDownDuration: number;
  waterBreakCount: number;
  waterBreakDuration: number;
  totalDrillsDuration: number;
}

export function generatePracticePlan(input: PlanGeneratorInput): PracticePlan {
  const { duration, ageGroup, skillCategories, availableDrills, availableWarmUps, availableCoolDowns } = input;
  
  // Step 1: Calculate time allocation for different sections
  const timeAllocation = calculateTimeAllocation(duration, ageGroup);
  
  // Step 2: Select appropriate warm-up
  const warmUp = selectWarmUp(availableWarmUps, ageGroup, timeAllocation.warmUpDuration);
  
  // Step 3: Select appropriate cool-down
  const coolDown = selectCoolDown(availableCoolDowns, ageGroup, timeAllocation.coolDownDuration);
  
  // Step 4: Calculate water break intervals
  const waterBreakIntervals = calculateWaterBreakIntervals(
    duration, 
    timeAllocation.waterBreakCount, 
    timeAllocation.warmUpDuration
  );
  
  // Step 5: Select drills based on skill focus
  const selectedDrills = selectDrills(
    availableDrills, 
    skillCategories, 
    ageGroup, 
    timeAllocation.totalDrillsDuration
  );
  
  // Step 6: Create practice sections with timing
  const sections = createPracticeSections(
    warmUp,
    coolDown,
    selectedDrills,
    waterBreakIntervals,
    timeAllocation
  );
  
  // Step 7: Create the practice plan
  const practicePlan: PracticePlan = {
    id: Date.now(), // Temporary ID for frontend use
    totalDuration: duration,
    ageGroup,
    skillFocus: skillCategories,
    sections,
    createdAt: new Date().toISOString()
  };
  
  return practicePlan;
}

// Calculate time allocation for different sections of the practice
function calculateTimeAllocation(duration: number, ageGroup: AgeGroup): TimeAllocation {
  // Get warm-up and cool-down durations from age group
  const warmUpDuration = ageGroup.warmUpDuration;
  const coolDownDuration = ageGroup.coolDownDuration;
  
  // Calculate number of water breaks based on practice duration and age group frequency
  const waterBreakCount = Math.floor(duration / ageGroup.waterBreakFrequency);
  
  // Standard water break duration
  const waterBreakDuration = 5;
  
  // Calculate total time for water breaks
  const totalWaterBreakDuration = waterBreakCount * waterBreakDuration;
  
  // Calculate remaining time for drills
  const totalDrillsDuration = duration - warmUpDuration - coolDownDuration - totalWaterBreakDuration;
  
  return {
    warmUpDuration,
    coolDownDuration,
    waterBreakCount,
    waterBreakDuration,
    totalDrillsDuration
  };
}

// Select an appropriate warm-up activity for the age group
function selectWarmUp(warmUps: WarmUp[], ageGroup: AgeGroup, duration: number): WarmUp {
  // Filter warm-ups suitable for the age group
  const suitableWarmUps = warmUps.filter(warmUp => 
    warmUp.ageGroups.some(ag => ag.id === ageGroup.id) && 
    warmUp.duration <= duration
  );
  
  // If no suitable warm-ups found, create a default one
  if (suitableWarmUps.length === 0) {
    return {
      id: 0,
      name: 'Dynamic Warm-up',
      description: 'General dynamic stretching and movement preparation',
      duration,
      ageGroups: [ageGroup],
      createdAt: new Date().toISOString()
    };
  }
  
  // Select a random warm-up from suitable ones
  return suitableWarmUps[Math.floor(Math.random() * suitableWarmUps.length)];
}

// Select an appropriate cool-down activity for the age group
function selectCoolDown(coolDowns: CoolDown[], ageGroup: AgeGroup, duration: number): CoolDown {
  // Filter cool-downs suitable for the age group
  const suitableCoolDowns = coolDowns.filter(coolDown => 
    coolDown.ageGroups.some(ag => ag.id === ageGroup.id) && 
    coolDown.duration <= duration
  );
  
  // If no suitable cool-downs found, create a default one
  if (suitableCoolDowns.length === 0) {
    return {
      id: 0,
      name: 'Static Stretching',
      description: 'General static stretching and cool-down exercises',
      duration,
      ageGroups: [ageGroup],
      createdAt: new Date().toISOString()
    };
  }
  
  // Select a random cool-down from suitable ones
  return suitableCoolDowns[Math.floor(Math.random() * suitableCoolDowns.length)];
}

// Calculate when water breaks should occur during practice
function calculateWaterBreakIntervals(
  totalDuration: number, 
  waterBreakCount: number, 
  warmUpDuration: number
): number[] {
  const intervals: number[] = [];
  
  if (waterBreakCount <= 0) {
    return intervals;
  }
  
  // Calculate interval between water breaks
  const practiceWithoutWarmUp = totalDuration - warmUpDuration;
  const interval = practiceWithoutWarmUp / (waterBreakCount + 1);
  
  // Calculate water break times
  for (let i = 1; i <= waterBreakCount; i++) {
    const breakTime = Math.round(warmUpDuration + (interval * i));
    intervals.push(breakTime);
  }
  
  return intervals;
}

// Select appropriate drills based on skill focus and available time
function selectDrills(
  drills: Drill[], 
  skillCategories: SkillCategory[], 
  ageGroup: AgeGroup, 
  totalDrillsDuration: number
): Drill[] {
  // Filter drills by skill categories and age group
  const suitableDrills = drills.filter(drill => 
    drill.ageGroups.some(ag => ag.id === ageGroup.id) &&
    drill.skillCategories.some(sc => skillCategories.some(selectedSc => selectedSc.id === sc.id))
  );
  
  // If no suitable drills found, return empty array
  if (suitableDrills.length === 0) {
    return [];
  }
  
  // Calculate time allocation per skill category
  const timePerSkill = totalDrillsDuration / skillCategories.length;
  
  const selectedDrills: Drill[] = [];
  let remainingTime = totalDrillsDuration;
  
  // Select drills for each skill category
  for (const skillCategory of skillCategories) {
    if (remainingTime <= 0) break;
    
    // Filter drills for this skill category
    const drillsForSkill = suitableDrills.filter(drill => 
      drill.skillCategories.some(sc => sc.id === skillCategory.id)
    );
    
    if (drillsForSkill.length === 0) continue;
    
    // Sort drills by duration (ascending)
    drillsForSkill.sort((a, b) => a.duration - b.duration);
    
    // Allocate time for this skill category
    let skillTimeRemaining = Math.min(timePerSkill, remainingTime);
    const skillDrills: Drill[] = [];
    
    // Select drills until we fill the time allocation for this skill
    while (skillTimeRemaining > 0 && drillsForSkill.length > 0) {
      // Find drills that fit in remaining time
      const fittingDrills = drillsForSkill.filter(drill => drill.duration <= skillTimeRemaining);
      
      if (fittingDrills.length === 0) {
        // If no fitting drills, take the shortest one and adjust time
        const shortestDrill = drillsForSkill[0];
        skillDrills.push(shortestDrill);
        break;
      }
      
      // Select a random drill from fitting ones
      const selectedIndex = Math.floor(Math.random() * fittingDrills.length);
      const selectedDrill = fittingDrills[selectedIndex];
      
      // Add to selected drills
      skillDrills.push(selectedDrill);
      
      // Update remaining time
      skillTimeRemaining -= selectedDrill.duration;
      
      // Remove selected drill from available drills
      const drillIndex = drillsForSkill.findIndex(drill => drill.id === selectedDrill.id);
      if (drillIndex !== -1) {
        drillsForSkill.splice(drillIndex, 1);
      }
    }
    
    // Add selected drills for this skill to overall selected drills
    selectedDrills.push(...skillDrills);
    
    // Update remaining time for all skills
    remainingTime -= (timePerSkill - skillTimeRemaining);
  }
  
  return selectedDrills;
}

// Create practice sections with proper timing
function createPracticeSections(
  warmUp: WarmUp,
  coolDown: CoolDown,
  drills: Drill[],
  waterBreakIntervals: number[],
  timeAllocation: TimeAllocation
): PracticeSection[] {
  const sections: PracticeSection[] = [];
  let currentTime = 0;
  let sequenceOrder = 1;
  
  // Add warm-up section
  sections.push({
    id: Date.now() + sequenceOrder,
    practicePlanId: 0, // Will be set when saved to database
    sectionType: 'warm-up',
    name: warmUp.name,
    startTime: formatTime(currentTime),
    endTime: formatTime(currentTime + warmUp.duration),
    duration: warmUp.duration,
    detailsId: warmUp.id,
    detailsType: 'warm-up',
    sequenceOrder: sequenceOrder++,
    createdAt: new Date().toISOString()
  });
  
  currentTime += warmUp.duration;
  
  // Create a timeline with water breaks and drills
  let drillIndex = 0;
  let waterBreakIndex = 0;
  
  while (drillIndex < drills.length && currentTime < (timeAllocation.warmUpDuration + timeAllocation.totalDrillsDuration)) {
    // Check if it's time for a water break
    if (waterBreakIndex < waterBreakIntervals.length && 
        currentTime >= waterBreakIntervals[waterBreakIndex]) {
      // Add water break
      sections.push({
        id: Date.now() + sequenceOrder,
        practicePlanId: 0,
        sectionType: 'water-break',
        name: 'Water Break',
        startTime: formatTime(currentTime),
        endTime: formatTime(currentTime + timeAllocation.waterBreakDuration),
        duration: timeAllocation.waterBreakDuration,
        sequenceOrder: sequenceOrder++,
        createdAt: new Date().toISOString()
      });
      
      currentTime += timeAllocation.waterBreakDuration;
      waterBreakIndex++;
    } else if (drillIndex < drills.length) {
      // Add drill
      const drill = drills[drillIndex];
      
      sections.push({
        id: Date.now() + sequenceOrder,
        practicePlanId: 0,
        sectionType: 'drill',
        name: drill.name,
        startTime: formatTime(currentTime),
        endTime: formatTime(currentTime + drill.duration),
        duration: drill.duration,
        detailsId: drill.id,
        detailsType: 'drill',
        sequenceOrder: sequenceOrder++,
        createdAt: new Date().toISOString()
      });
      
      currentTime += drill.duration;
      drillIndex++;
    }
  }
  
  // Add any remaining water breaks
  while (waterBreakIndex < waterBreakIntervals.length) {
    sections.push({
      id: Date.now() + sequenceOrder,
      practicePlanId: 0,
      sectionType: 'water-break',
      name: 'Water Break',
      startTime: formatTime(currentTime),
      endTime: formatTime(currentTime + timeAllocation.waterBreakDuration),
      duration: timeAllocation.waterBreakDuration,
      sequenceOrder: sequenceOrder++,
      createdAt: new Date().toISOString()
    });
    
    currentTime += timeAllocation.waterBreakDuration;
    waterBreakIndex++;
  }
  
  // Add cool-down section
  sections.push({
    id: Date.now() + sequenceOrder,
    practicePlanId: 0,
    sectionType: 'cool-down',
    name: coolDown.name,
    startTime: formatTime(currentTime),
    endTime: formatTime(currentTime + coolDown.duration),
    duration: coolDown.duration,
    detailsId: coolDown.id,
    detailsType: 'cool-down',
    sequenceOrder: sequenceOrder++,
    createdAt: new Date().toISOString()
  });
  
  return sections;
}

// Format time in hours:minutes format
function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
}
