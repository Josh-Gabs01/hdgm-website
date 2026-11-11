import React from 'react'
import { configuredPrograms } from '@/data/programs'
import { charityProgramsVisible } from '@/lib/section-visibility'

// The charity's own programs, sourced from src/data/programs.ts. To change
// them, edit that file — no need to touch this component.
const index = () => {
  if (!charityProgramsVisible()) return null

  return (
    <div id="programs" className="py-[52px]">
      <div className="w-[90%] lg:px-[20px] mx-auto max-w-[1280px]">
        <h2 className="font-[400] text-[40px] lg:text-[48px] tracking-[0] text-center mx-auto mb-[50px] faustina-font">
          Our Programs
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
          {configuredPrograms.map((program) => (
            <div
              key={program.title}
              className="rounded-[20px] border-t-[6px] border-primary bg-paper p-[30px] shadow-lg"
            >
              <h3 className="mb-[16px] text-[28px] font-[400] leading-[120%] lato-font">
                {program.title}
              </h3>
              <p className="text-[20px] font-[400] leading-[150%] lato-font">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default index
