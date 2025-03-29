'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Drill } from '@/lib/db/models'
import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

// Mock drill data for demonstration
const mockDrills: Drill[] = [
  {
    id: 1,
    name: 'Passing Circle',
    objective: 'Improve forearm passing accuracy and communication',
    description: '1. Players form a circle with one player in the middle\n2. Middle player tosses ball to players on the outside\n3. Outside players pass back to the middle\n4. Rotate positions every 2 minutes',
    duration: 15,
    difficulty: 'Beginner',
    minPlayers: 5,
    maxPlayers: 12,
    equipment: 'Volleyballs',
    createdAt: '',
    skillCategories: [{ id: 1, name: 'Passing', description: '', createdAt: '' }],
    ageGroups: [
      { id: 1, name: 'U12', minAge: 10, maxAge: 12, waterBreakFrequency: 20, warmUpDuration: 10, coolDownDuration: 5, createdAt: '' },
      { id: 2, name: 'U14', minAge: 13, maxAge: 14, waterBreakFrequency: 25, warmUpDuration: 12, coolDownDuration: 5, createdAt: '' }
    ]
  },
  {
    id: 2,
    name: 'Serving Target Practice',
    objective: 'Develop serving accuracy and consistency',
    description: '1. Place targets (hoops, towels) on opposite court\n2. Players serve from baseline aiming at targets\n3. Keep score of successful target hits\n4. Increase difficulty by moving targets or changing serve type',
    duration: 10,
    difficulty: 'Intermediate',
    minPlayers: 4,
    maxPlayers: 16,
    equipment: 'Volleyballs, targets (hoops, towels)',
    createdAt: '',
    skillCategories: [{ id: 2, name: 'Serving', description: '', createdAt: '' }],
    ageGroups: [
      { id: 2, name: 'U14', minAge: 13, maxAge: 14, waterBreakFrequency: 25, warmUpDuration: 12, coolDownDuration: 5, createdAt: '' },
      { id: 3, name: 'U16', minAge: 15, maxAge: 16, waterBreakFrequency: 30, warmUpDuration: 15, coolDownDuration: 8, createdAt: '' }
    ]
  },
  {
    id: 3,
    name: 'Defensive Shuffle',
    objective: 'Improve defensive positioning and reaction time',
    description: '1. Players start in defensive position\n2. Coach signals direction (left, right, forward, back)\n3. Players shuffle in that direction while maintaining stance\n4. Coach tosses ball and player must make the dig',
    duration: 12,
    difficulty: 'Intermediate',
    minPlayers: 6,
    maxPlayers: 12,
    equipment: 'Volleyballs',
    createdAt: '',
    skillCategories: [{ id: 3, name: 'Defense', description: '', createdAt: '' }],
    ageGroups: [
      { id: 3, name: 'U16', minAge: 15, maxAge: 16, waterBreakFrequency: 30, warmUpDuration: 15, coolDownDuration: 8, createdAt: '' },
      { id: 4, name: 'High School', minAge: 14, maxAge: 18, waterBreakFrequency: 30, warmUpDuration: 15, coolDownDuration: 10, createdAt: '' }
    ]
  },
  {
    id: 4,
    name: 'Setting Accuracy',
    objective: 'Develop consistent and accurate setting',
    description: '1. Players pair up with one volleyball\n2. One player tosses to the setter\n3. Setter sets to a target or specific location\n4. Switch roles after 10 repetitions\n5. Increase difficulty by adding movement or changing distances',
    duration: 15,
    difficulty: 'Intermediate',
    minPlayers: 4,
    maxPlayers: 16,
    equipment: 'Volleyballs, targets (optional)',
    createdAt: '',
    skillCategories: [{ id: 4, name: 'Setting', description: '', createdAt: '' }],
    ageGroups: [
      { id: 2, name: 'U14', minAge: 13, maxAge: 14, waterBreakFrequency: 25, warmUpDuration: 12, coolDownDuration: 5, createdAt: '' },
      { id: 3, name: 'U16', minAge: 15, maxAge: 16, waterBreakFrequency: 30, warmUpDuration: 15, coolDownDuration: 8, createdAt: '' },
      { id: 4, name: 'High School', minAge: 14, maxAge: 18, waterBreakFrequency: 30, warmUpDuration: 15, coolDownDuration: 10, createdAt: '' }
    ]
  },
  {
    id: 5,
    name: 'Hitting Line',
    objective: 'Practice approach and hitting technique',
    description: '1. Form a line of hitters at position 4\n2. Coach or setter at position 2\n3. Toss or set ball to hitters\n4. Hitters practice approach and hit\n5. Rotate to back of line after each hit\n6. Switch to position 2 after everyone has had multiple attempts',
    duration: 20,
    difficulty: 'Advanced',
    minPlayers: 6,
    maxPlayers: 12,
    equipment: 'Volleyballs, net',
    createdAt: '',
    skillCategories: [{ id: 5, name: 'Attacking', description: '', createdAt: '' }],
    ageGroups: [
      { id: 3, name: 'U16', minAge: 15, maxAge: 16, waterBreakFrequency: 30, warmUpDuration: 15, coolDownDuration: 8, createdAt: '' },
      { id: 4, name: 'High School', minAge: 14, maxAge: 18, waterBreakFrequency: 30, warmUpDuration: 15, coolDownDuration: 10, createdAt: '' },
      { id: 5, name: 'College', minAge: 18, maxAge: 22, waterBreakFrequency: 35, warmUpDuration: 15, coolDownDuration: 10, createdAt: '' }
    ]
  }
];

interface DrillLibraryProps {
  onSelectDrill?: (drill: Drill) => void;
}

export function DrillLibrary({ onSelectDrill }: DrillLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<string>('all')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null)

  // Filter drills based on search and filters
  const filteredDrills = mockDrills.filter(drill => {
    const matchesSearch = drill.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         drill.objective.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = selectedSkill === 'all' || 
                        drill.skillCategories.some(sc => sc.name.toLowerCase() === selectedSkill.toLowerCase());
    
    const matchesAgeGroup = selectedAgeGroup === 'all' || 
                           drill.ageGroups.some(ag => ag.name.toLowerCase() === selectedAgeGroup.toLowerCase());
    
    const matchesDifficulty = selectedDifficulty === 'all' || 
                             drill.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    
    return matchesSearch && matchesSkill && matchesAgeGroup && matchesDifficulty;
  });

  const handleDrillClick = (drill: Drill) => {
    setSelectedDrill(drill);
    if (onSelectDrill) {
      onSelectDrill(drill);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drills..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={selectedSkill} onValueChange={setSelectedSkill}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Skill" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skills</SelectItem>
            <SelectItem value="passing">Passing</SelectItem>
            <SelectItem value="serving">Serving</SelectItem>
            <SelectItem value="defense">Defense</SelectItem>
            <SelectItem value="setting">Setting</SelectItem>
            <SelectItem value="attacking">Attacking</SelectItem>
            <SelectItem value="blocking">Blocking</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Age Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ages</SelectItem>
            <SelectItem value="u12">U12</SelectItem>
            <SelectItem value="u14">U14</SelectItem>
            <SelectItem value="u16">U16</SelectItem>
            <SelectItem value="high school">High School</SelectItem>
            <SelectItem value="college">College</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDrills.map(drill => (
          <Card 
            key={drill.id} 
            className={`cursor-pointer hover:border-primary transition-colors ${selectedDrill?.id === drill.id ? 'border-primary' : ''}`}
            onClick={() => handleDrillClick(drill)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{drill.name}</CardTitle>
                <Badge variant={
                  drill.difficulty === 'Beginner' ? 'secondary' :
                  drill.difficulty === 'Intermediate' ? 'default' : 'destructive'
                }>
                  {drill.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{drill.objective}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {drill.skillCategories.map(skill => (
                  <Badge key={skill.id} variant="outline">{skill.name}</Badge>
                ))}
                <Badge variant="outline" className="bg-muted">{drill.duration} min</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedDrill && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedDrill.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Objective</h3>
              <p>{selectedDrill.objective}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Instructions</h3>
              <p className="whitespace-pre-line">{selectedDrill.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Duration</h3>
                <p>{selectedDrill.duration} minutes</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Players</h3>
                <p>{selectedDrill.minPlayers}{selectedDrill.maxPlayers ? ` - ${selectedDrill.maxPlayers}` : '+'}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Equipment</h3>
                <p>{selectedDrill.equipment || 'None required'}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Suitable for</h3>
                <p>{selectedDrill.ageGroups.map(ag => ag.name).join(', ')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
