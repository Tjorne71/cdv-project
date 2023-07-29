import React from 'react'

export default function ColorLegend({colorFunction}) {
  const levels = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

  return (
    <div className="flex flex-row m-auto">
        {levels.map((level, index) => {
          return (
          <div key={level} style={{backgroundColor : colorFunction(index + 2)}} className={`h-6 flex items-center justify-center w-6 mr-1 text-base font-extrabold font-Montserrat text-center text-primary`}>
            {level}
          </div>
        )})}
    </div>
  )
}
