"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

interface RoadmapProps {
  name: string
  answers: Record<number, number>
}

interface Career {
  id: string
  title: string
  match: number
}

export default function CareerRoadmap({ name = "Future Engineer", answers }: RoadmapProps) {
  const [careers, setCareers] = useState<Career[]>([
    { id: "sde", title: "Software Development Engineer", match: 95 },
    { id: "cybersec", title: "Cybersecurity Analyst", match: 88 },
    { id: "cloud", title: "Cloud Solutions Architect", match: 85 },
    { id: "data", title: "Data Scientist", match: 82 },
    { id: "aiml", title: "AI/ML Engineer", match: 90 },
  ])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(careers)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setCareers(items)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="relative min-h-[600px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute left-1/2 top-8 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-emerald-100 to-purple-100 px-8 py-4 rounded-xl shadow-md">
            <h3 className="font-semibold text-gray-800 text-xl whitespace-nowrap">{name}</h3>
          </div>
        </motion.div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="careers">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {careers.map((career, index) => (
                  <Draggable key={career.id} draggableId={career.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          transition: snapshot.isDragging ? "transform 0.1s" : "all 0.3s",
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-4 bg-white shadow-md w-full">
                            <h4 className="font-medium text-center mb-2">{career.title}</h4>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${career.match}%` }}
                                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-purple-500"
                              />
                            </div>
                            <p className="text-sm text-gray-500 text-center mt-1">
                              {career.match}% Match
                            </p>
                          </Card>
                        </motion.div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}