import { createContext, useContext, useState } from 'react'
import {
  personalInfo as defaultPersonalInfo,
  skills as defaultSkills,
  projects as defaultProjects,
  experience as defaultExperience,
  education as defaultEducation,
  highlights as defaultHighlights,
} from '../data/portfolioData'

const STORAGE_KEY = 'portfolio_data'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return null
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

function mergePersonalInfo(saved, defaults) {
  if (!saved) return defaults
  return {
    ...defaults,
    ...saved,
    profileImage: saved.profileImage || defaults.profileImage,
    social: { ...defaults.social, ...(saved.social || {}) },
  }
}

function mergeSkills(saved, defaults) {
  const result = {}
  for (const [cat, items] of Object.entries(saved)) {
    result[cat] = items.map((savedSkill) => {
      const match = defaults[cat]?.find((d) => d.name === savedSkill.name)
      return { ...savedSkill, icon: match?.icon ?? null }
    })
  }
  for (const [cat, items] of Object.entries(defaults)) {
    if (!result[cat]) {
      result[cat] = items
    }
  }
  return result
}

const initial = loadFromStorage()

const PortfolioContext = createContext()

export function PortfolioProvider({ children }) {
  const [personalInfo, setPersonalInfo] = useState(
    mergePersonalInfo(initial?.personalInfo, defaultPersonalInfo)
  )
  const [skills, setSkills] = useState(
    initial?.skills ? mergeSkills(initial.skills, defaultSkills) : defaultSkills
  )
  const [projects, setProjects] = useState(
    initial?.projects ?? defaultProjects
  )
  const [experience, setExperience] = useState(
    initial?.experience ?? defaultExperience
  )
  const [education, setEducation] = useState(
    initial?.education ?? defaultEducation
  )
  const [highlights, setHighlights] = useState(
    initial?.highlights ?? defaultHighlights
  )

  const persist = (key, value) => {
    const current = loadFromStorage() ?? {}
    current[key] = value
    saveToStorage(current)
  }

  const updatePersonalInfo = (updates) => {
    setPersonalInfo((prev) => {
      const next = { ...prev, ...updates }
      persist('personalInfo', next)
      return next
    })
  }

  const updateBio = (index, value) => {
    setPersonalInfo((prev) => {
      const bio = [...prev.bio]
      bio[index] = value
      const next = { ...prev, bio }
      persist('personalInfo', next)
      return next
    })
  }

  const updateSocial = (platform, url) => {
    setPersonalInfo((prev) => {
      const social = { ...prev.social, [platform]: url }
      const next = { ...prev, social }
      persist('personalInfo', next)
      return next
    })
  }

  const setSkillsData = (data) => {
    setSkills(data)
    persist('skills', data)
  }

  const setProjectsData = (data) => {
    setProjects(data)
    persist('projects', data)
  }

  const setExperienceData = (data) => {
    setExperience(data)
    persist('experience', data)
  }

  const setEducationData = (data) => {
    setEducation(data)
    persist('education', data)
  }

  const setHighlightsData = (data) => {
    setHighlights(data)
    persist('highlights', data)
  }

  const resetAll = () => {
    setPersonalInfo(defaultPersonalInfo)
    setSkills(defaultSkills)
    setProjects(defaultProjects)
    setExperience(defaultExperience)
    setEducation(defaultEducation)
    setHighlights(defaultHighlights)
    localStorage.removeItem(STORAGE_KEY)
  }

  const exportData = () => {
    return JSON.stringify(
      { personalInfo, skills, projects, experience, education, highlights },
      null,
      2
    )
  }

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        updatePersonalInfo,
        updateBio,
        updateSocial,
        skills,
        setSkillsData,
        projects,
        setProjectsData,
        experience,
        setExperienceData,
        education,
        setEducationData,
        highlights,
        setHighlightsData,
        resetAll,
        exportData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => useContext(PortfolioContext)
