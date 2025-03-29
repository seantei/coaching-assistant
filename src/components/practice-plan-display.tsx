'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PracticePlan, PracticeSection } from '@/lib/db/models'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'
import { Printer, Download } from 'lucide-react'

interface PracticePlanDisplayProps {
  plan: PracticePlan
}

export function PracticePlanDisplay({ plan }: PracticePlanDisplayProps) {
  const [activeView, setActiveView] = useState('overview')
  const printRef = useRef<HTMLDivElement>(null)
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  // Format time string (e.g., "0:05" to "0:05")
  const formatTime = (time: string) => {
    return time
  }

  // Group sections by type for the overview
  const warmUps = plan.sections.filter(section => section.sectionType === 'warm-up')
  const drills = plan.sections.filter(section => section.sectionType === 'drill')
  const waterBreaks = plan.sections.filter(section => section.sectionType === 'water-break')
  const coolDowns = plan.sections.filter(section => section.sectionType === 'cool-down')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Practice Plan</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Practice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Age Group</p>
              <p>{plan.ageGroup.name} ({plan.ageGroup.minAge}-{plan.ageGroup.maxAge} years)</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Duration</p>
              <p>{plan.totalDuration} minutes</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Skill Focus</p>
              <p>{plan.skillFocus.map(skill => skill.name).join(', ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {warmUps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Warm-up Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {warmUps.map(section => (
                      <li key={section.id} className="flex justify-between">
                        <span>{section.name}</span>
                        <span className="text-muted-foreground">{section.duration} min</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {drills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Skill Drills</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {drills.map(section => (
                      <li key={section.id} className="flex justify-between">
                        <span>{section.name}</span>
                        <span className="text-muted-foreground">{section.duration} min</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {waterBreaks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Water Breaks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {waterBreaks.map(section => (
                      <li key={section.id} className="flex justify-between">
                        <span>{section.name}</span>
                        <span className="text-muted-foreground">{section.duration} min</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {coolDowns.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Cool-down Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {coolDowns.map(section => (
                      <li key={section.id} className="flex justify-between">
                        <span>{section.name}</span>
                        <span className="text-muted-foreground">{section.duration} min</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {plan.sections.map((section, index) => (
                  <div key={section.id} className="flex items-start">
                    <div className="min-w-24 text-sm">
                      {formatTime(section.startTime)} - {formatTime(section.endTime)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          section.sectionType === 'warm-up' ? 'bg-green-500' :
                          section.sectionType === 'drill' ? 'bg-blue-500' :
                          section.sectionType === 'water-break' ? 'bg-cyan-500' :
                          'bg-purple-500'
                        }`} />
                        <h3 className="font-medium">{section.name}</h3>
                        <span className="ml-auto text-sm text-muted-foreground">{section.duration} min</span>
                      </div>
                      {section.sectionType === 'drill' && (
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          Focus on proper technique and form
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Hidden printable version */}
      <div className="hidden">
        <div ref={printRef} className="p-8">
          <h1 className="text-2xl font-bold mb-4">Volleyball Practice Plan</h1>
          <div className="mb-6">
            <p><strong>Age Group:</strong> {plan.ageGroup.name} ({plan.ageGroup.minAge}-{plan.ageGroup.maxAge} years)</p>
            <p><strong>Duration:</strong> {plan.totalDuration} minutes</p>
            <p><strong>Skill Focus:</strong> {plan.skillFocus.map(skill => skill.name).join(', ')}</p>
          </div>
          
          <h2 className="text-xl font-bold mb-2">Practice Timeline</h2>
          <table className="w-full mb-6">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Time</th>
                <th className="text-left py-2">Activity</th>
                <th className="text-left py-2">Duration</th>
                <th className="text-left py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {plan.sections.map(section => (
                <tr key={section.id} className="border-b">
                  <td className="py-2">{section.startTime} - {section.endTime}</td>
                  <td className="py-2">{section.name}</td>
                  <td className="py-2">{section.duration} min</td>
                  <td className="py-2">{section.sectionType}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="text-sm text-gray-500 mt-8">
            <p>Generated by Coaches Assistant on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
