// UI components for the practice plan form
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { AgeGroup, SkillCategory, PracticePlanFormInput } from '@/lib/db/models'

interface PracticeFormProps {
  ageGroups: AgeGroup[]
  skillCategories: SkillCategory[]
  onSubmit: (data: PracticePlanFormInput) => void
  isLoading: boolean
}

export function PracticeForm({ ageGroups, skillCategories, onSubmit, isLoading }: PracticeFormProps) {
  const [duration, setDuration] = useState<number>(90)
  const [ageGroupId, setAgeGroupId] = useState<number | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<number[]>([])

  const handleSkillToggle = (skillId: number) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId) 
        : [...prev, skillId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ageGroupId && selectedSkills.length > 0) {
      onSubmit({
        duration,
        ageGroupId,
        skillCategoryIds: selectedSkills
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Practice Plan</CardTitle>
        <CardDescription>
          Enter details to generate a customized volleyball practice plan
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="duration">Practice Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              min={30}
              max={180}
              step={15}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age-group">Player Age Group</Label>
            <Select 
              onValueChange={(value) => setAgeGroupId(parseInt(value))}
              required
            >
              <SelectTrigger id="age-group">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                {ageGroups.map((ageGroup) => (
                  <SelectItem key={ageGroup.id} value={ageGroup.id.toString()}>
                    {ageGroup.name} ({ageGroup.minAge}-{ageGroup.maxAge} years)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Skill Focus (select at least one)</Label>
            <div className="grid grid-cols-2 gap-2">
              {skillCategories.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`skill-${skill.id}`} 
                    checked={selectedSkills.includes(skill.id)}
                    onCheckedChange={() => handleSkillToggle(skill.id)}
                  />
                  <Label htmlFor={`skill-${skill.id}`} className="cursor-pointer">
                    {skill.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !ageGroupId || selectedSkills.length === 0}
          >
            {isLoading ? 'Generating...' : 'Generate Practice Plan'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
