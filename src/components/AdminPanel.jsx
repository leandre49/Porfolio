import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSave, FiRefreshCw, FiDownload, FiUser, FiCode, FiFolder, FiBriefcase, FiBookOpen, FiBarChart2 } from 'react-icons/fi'
import { usePortfolio } from '../context/PortfolioContext'

const tabs = [
  { id: 'personal', label: 'Personal', icon: FiUser },
  { id: 'skills', label: 'Skills', icon: FiCode },
  { id: 'projects', label: 'Projects', icon: FiFolder },
  { id: 'experience', label: 'Experience', icon: FiBriefcase },
  { id: 'education', label: 'Education', icon: FiBookOpen },
  { id: 'highlights', label: 'Highlights', icon: FiBarChart2 },
]

export default function AdminPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('personal')
  const portfolio = usePortfolio()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative ml-auto w-full max-w-2xl bg-white dark:bg-surface h-full flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-border">
          <h2 className="text-lg font-bold text-gray-900 dark:text-text-primary">Edit Portfolio</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={portfolio.resetAll}
              className="p-2 rounded-lg text-gray-500 dark:text-text-secondary hover:text-red-500 hover:bg-gray-100 dark:hover:bg-surface-light transition-colors"
              title="Reset to defaults"
            >
              <FiRefreshCw size={16} />
            </button>
            <button
              onClick={() => {
                const blob = new Blob([portfolio.exportData()], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'portfolio-backup.json'
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="p-2 rounded-lg text-gray-500 dark:text-text-secondary hover:text-primary hover:bg-gray-100 dark:hover:bg-surface-light transition-colors"
              title="Export data"
            >
              <FiDownload size={16} />
            </button>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary hover:bg-gray-100 dark:hover:bg-surface-light transition-colors">
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200 dark:border-border overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'personal' && <PersonalForm portfolio={portfolio} />}
          {activeTab === 'skills' && <SkillsForm portfolio={portfolio} />}
          {activeTab === 'projects' && <ProjectsForm portfolio={portfolio} />}
          {activeTab === 'experience' && <ExperienceForm portfolio={portfolio} />}
          {activeTab === 'education' && <EducationForm portfolio={portfolio} />}
          {activeTab === 'highlights' && <HighlightsForm portfolio={portfolio} />}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-border">
          <p className="text-xs text-gray-400 dark:text-text-secondary text-center">
            Changes are saved automatically to localStorage.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-500 dark:text-text-secondary mb-1">{label}</label>
      {children}
    </div>
  )
}

function Input({ value, onChange, placeholder, type = 'text', multiline = false }) {
  const cls = 'w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-border bg-white dark:bg-surface-light text-gray-900 dark:text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors'
  if (multiline) {
    return <textarea className={`${cls} resize-y min-h-[60px]`} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} />
  }
  return <input type={type} className={cls} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function ImageUpload({ current, onUpload, onUrlChange, label }) {
  const [mode, setMode] = useState(current?.startsWith('data:') ? 'file' : 'url')
  const [preview, setPreview] = useState(current || '')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await fileToDataURL(file)
    setPreview(dataUrl)
    onUpload(dataUrl)
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${mode === 'url' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-surface-light text-gray-600 dark:text-text-secondary'}`}
        >
          URL
        </button>
        <button
          type="button"
          onClick={() => setMode('file')}
          className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${mode === 'file' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-surface-light text-gray-600 dark:text-text-secondary'}`}
        >
          Upload
        </button>
      </div>
      {mode === 'url' ? (
        <Input value={current || ''} onChange={onUrlChange} placeholder="https://..." />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full text-sm text-gray-500 dark:text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer"
        />
      )}
      {preview && (
        <img src={preview} alt="preview" className="w-20 h-20 rounded-lg object-cover border border-gray-200 dark:border-border" onError={(e) => { e.target.style.display = 'none' }} />
      )}
    </div>
  )
}

function ProfileImageUpload({ current, onUpload }) {
  const [preview, setPreview] = useState(current || '')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await fileToDataURL(file)
    setPreview(dataUrl)
    onUpload(dataUrl)
  }

  const handleRemove = () => {
    setPreview('')
    onUpload('')
  }

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="profile" className="w-28 h-28 rounded-xl object-cover border border-gray-200 dark:border-border" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          >
            &times;
          </button>
        </div>
      ) : (
        <div className="w-28 h-28 rounded-xl border-2 border-dashed border-gray-300 dark:border-border flex flex-col items-center justify-center text-gray-400 dark:text-text-secondary">
          <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-xs">No image</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="w-full text-sm text-gray-500 dark:text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer"
      />
    </div>
  )
}

function PersonalForm({ portfolio }) {
  const { personalInfo, updatePersonalInfo, updateBio, updateSocial } = portfolio
  const info = personalInfo

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-900 dark:text-text-primary">Personal Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name"><Input value={info.name} onChange={(v) => updatePersonalInfo({ name: v })} /></Field>
        <Field label="Title"><Input value={info.title} onChange={(v) => updatePersonalInfo({ title: v })} /></Field>
        <Field label="Email"><Input value={info.email} onChange={(v) => updatePersonalInfo({ email: v })} /></Field>
        <Field label="Phone"><Input value={info.phone} onChange={(v) => updatePersonalInfo({ phone: v })} /></Field>
        <Field label="Location" className="col-span-2"><Input value={info.location} onChange={(v) => updatePersonalInfo({ location: v })} /></Field>
      </div>

      <Field label="Profile Image">
        <ProfileImageUpload
          current={info.profileImage}
          onUpload={(dataUrl) => updatePersonalInfo({ profileImage: dataUrl })}
        />
      </Field>
      <Field label="Resume">
        <div className="flex gap-2 items-center">
          <Input value={info.resumeUrl} onChange={(v) => updatePersonalInfo({ resumeUrl: v })} placeholder="/resume.pdf or data:..." className="flex-1" />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file) {
                const dataUrl = await fileToDataURL(file)
                updatePersonalInfo({ resumeUrl: dataUrl })
              }
            }}
            className="text-xs text-gray-500 dark:text-text-secondary file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer"
          />
        </div>
      </Field>

      <Field label="Bio (paragraph 1)"><Input multiline value={info.bio[0] || ''} onChange={(v) => updateBio(0, v)} /></Field>
      <Field label="Bio (paragraph 2)"><Input multiline value={info.bio[1] || ''} onChange={(v) => updateBio(1, v)} /></Field>

      <h3 className="font-semibold text-gray-900 dark:text-text-primary pt-4 border-t border-gray-200 dark:border-border">Social Links</h3>
      {Object.entries(info.social).map(([platform, url]) => (
        <Field key={platform} label={platform.charAt(0).toUpperCase() + platform.slice(1)}>
          <Input value={url} onChange={(v) => updateSocial(platform, v)} />
        </Field>
      ))}
    </div>
  )
}

function SkillsForm({ portfolio }) {
  const { skills, setSkillsData } = portfolio
  const categories = Object.keys(skills)
  const [activeCategory, setActiveCategory] = useState(categories[0])

  const updateSkill = (catIndex, skillIndex, field, value) => {
    const entries = Object.entries(skills)
    const [catName, items] = entries[catIndex]
    const updated = [...items]
    updated[skillIndex] = { ...updated[skillIndex], [field]: value }
    setSkillsData({ ...skills, [catName]: updated })
  }

  const addSkill = (catIndex) => {
    const entries = Object.entries(skills)
    const [catName, items] = entries[catIndex]
    setSkillsData({ ...skills, [catName]: [...items, { name: 'New Skill', color: '#6366f1' }] })
  }

  const removeSkill = (catIndex, skillIndex) => {
    const entries = Object.entries(skills)
    const [catName, items] = entries[catIndex]
    setSkillsData({ ...skills, [catName]: items.filter((_, i) => i !== skillIndex) })
  }

  const addCategory = () => {
    const name = prompt('Category name:')
    if (name) {
      setSkillsData({ ...skills, [name]: [] })
      setActiveCategory(name)
    }
  }

  const removeCategory = (catName) => {
    if (Object.keys(skills).length <= 1) return
    const { [catName]: _, ...rest } = skills
    setSkillsData(rest)
    setActiveCategory(Object.keys(rest)[0])
  }

  const catEntries = Object.entries(skills)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {catEntries.map(([catName], i) => (
          <button
            key={catName}
            onClick={() => setActiveCategory(catName)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeCategory === catName
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-surface-light text-gray-600 dark:text-text-secondary hover:bg-gray-200 dark:hover:bg-surface-card'
            }`}
          >
            {catName}
            <span onClick={(e) => { e.stopPropagation(); removeCategory(catName) }} className="ml-2 opacity-50 hover:opacity-100 cursor-pointer">&times;</span>
          </button>
        ))}
        <button onClick={addCategory} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-dashed border-gray-300 dark:border-border text-gray-500 hover:text-primary hover:border-primary transition-colors">
          + Category
        </button>
      </div>

      {catEntries.map(([catName, items], catIndex) =>
        activeCategory === catName ? (
          <div key={catName} className="space-y-3">
            <Field label="Category Name">
              <Input value={catName} onChange={(v) => {
                const entries2 = Object.entries(skills)
                entries2[catIndex] = [v, items]
                setSkillsData(Object.fromEntries(entries2))
                setActiveCategory(v)
              }} />
            </Field>
            {items.map((skill, skillIndex) => (
              <div key={skillIndex} className="p-3 rounded-lg border border-gray-200 dark:border-border bg-gray-50 dark:bg-surface-light/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-text-secondary">Skill #{skillIndex + 1}</span>
                  <button onClick={() => removeSkill(catIndex, skillIndex)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Name"><Input value={skill.name} onChange={(v) => updateSkill(catIndex, skillIndex, 'name', v)} /></Field>
                  <Field label="Color (hex)">
                    <div className="flex gap-2 items-center">
                      <input type="color" value={skill.color} onChange={(e) => updateSkill(catIndex, skillIndex, 'color', e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-gray-300 dark:border-border" />
                      <Input value={skill.color} onChange={(v) => updateSkill(catIndex, skillIndex, 'color', v)} />
                    </div>
                  </Field>
                </div>
              </div>
            ))}
            <button onClick={() => addSkill(catIndex)} className="w-full py-2 text-xs font-medium rounded-lg border border-dashed border-gray-300 dark:border-border text-gray-500 hover:text-primary hover:border-primary transition-colors">
              + Add Skill
            </button>
          </div>
        ) : null
      )}
    </div>
  )
}

function ProjectsForm({ portfolio }) {
  const { projects, setProjectsData } = portfolio

  const updateProject = (index, field, value) => {
    const updated = [...projects]
    updated[index] = { ...updated[index], [field]: value }
    setProjectsData(updated)
  }

  const updateTechStack = (index, value) => {
    const updated = [...projects]
    updated[index] = { ...updated[index], techStack: value.split(',').map((s) => s.trim()) }
    setProjectsData(updated)
  }

  const addProject = () => {
    const maxId = Math.max(...projects.map((p) => p.id), 0)
    setProjectsData([...projects, { id: maxId + 1, title: '', description: '', image: '', techStack: [], liveUrl: '', githubUrl: '' }])
  }

  const removeProject = (index) => {
    setProjectsData(projects.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={project.id} className="p-4 rounded-lg border border-gray-200 dark:border-border bg-gray-50 dark:bg-surface-light/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-900 dark:text-text-primary">{project.title || `Project #${index + 1}`}</span>
            <button onClick={() => removeProject(index)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Title"><Input value={project.title} onChange={(v) => updateProject(index, 'title', v)} /></Field>
            <Field label="Image">
              <ImageUpload
                current={project.image}
                onUpload={(dataUrl) => updateProject(index, 'image', dataUrl)}
                onUrlChange={(v) => updateProject(index, 'image', v)}
              />
            </Field>
          </div>
          <Field label="Description"><Input multiline value={project.description} onChange={(v) => updateProject(index, 'description', v)} /></Field>
          <Field label="Tech Stack (comma-separated)"><Input value={project.techStack.join(', ')} onChange={(v) => updateTechStack(index, v)} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Live URL"><Input value={project.liveUrl} onChange={(v) => updateProject(index, 'liveUrl', v)} /></Field>
            <Field label="GitHub URL"><Input value={project.githubUrl} onChange={(v) => updateProject(index, 'githubUrl', v)} /></Field>
          </div>
        </div>
      ))}
      <button onClick={addProject} className="w-full py-3 text-sm font-medium rounded-lg border border-dashed border-gray-300 dark:border-border text-gray-500 hover:text-primary hover:border-primary transition-colors">
        + Add Project
      </button>
    </div>
  )
}

function ExperienceForm({ portfolio }) {
  const { experience, setExperienceData } = portfolio

  const updateExp = (index, field, value) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], [field]: value }
    setExperienceData(updated)
  }

  const updateHighlights = (index, value) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], highlights: value.split('\n').filter((s) => s.trim()) }
    setExperienceData(updated)
  }

  const addExp = () => {
    const maxId = Math.max(...experience.map((e) => e.id), 0)
    setExperienceData([...experience, { id: maxId + 1, role: '', company: '', location: '', period: '', highlights: [] }])
  }

  const removeExp = (index) => {
    setExperienceData(experience.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div key={exp.id} className="p-4 rounded-lg border border-gray-200 dark:border-border bg-gray-50 dark:bg-surface-light/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-900 dark:text-text-primary">{exp.role || `Experience #${index + 1}`}</span>
            <button onClick={() => removeExp(index)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Role"><Input value={exp.role} onChange={(v) => updateExp(index, 'role', v)} /></Field>
            <Field label="Company"><Input value={exp.company} onChange={(v) => updateExp(index, 'company', v)} /></Field>
            <Field label="Location"><Input value={exp.location} onChange={(v) => updateExp(index, 'location', v)} /></Field>
            <Field label="Period"><Input value={exp.period} onChange={(v) => updateExp(index, 'period', v)} /></Field>
          </div>
          <Field label="Highlights (one per line)"><Input multiline value={exp.highlights.join('\n')} onChange={(v) => updateHighlights(index, v)} /></Field>
        </div>
      ))}
      <button onClick={addExp} className="w-full py-3 text-sm font-medium rounded-lg border border-dashed border-gray-300 dark:border-border text-gray-500 hover:text-primary hover:border-primary transition-colors">
        + Add Experience
      </button>
    </div>
  )
}

function EducationForm({ portfolio }) {
  const { education, setEducationData } = portfolio

  const updateEdu = (index, field, value) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    setEducationData(updated)
  }

  const addEdu = () => {
    const maxId = Math.max(...education.map((e) => e.id), 0)
    setEducationData([...education, { id: maxId + 1, degree: '', school: '', period: '', details: '' }])
  }

  const removeEdu = (index) => {
    setEducationData(education.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={edu.id} className="p-4 rounded-lg border border-gray-200 dark:border-border bg-gray-50 dark:bg-surface-light/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-900 dark:text-text-primary">{edu.degree || `Education #${index + 1}`}</span>
            <button onClick={() => removeEdu(index)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Degree"><Input value={edu.degree} onChange={(v) => updateEdu(index, 'degree', v)} /></Field>
            <Field label="School"><Input value={edu.school} onChange={(v) => updateEdu(index, 'school', v)} /></Field>
            <Field label="Period"><Input value={edu.period} onChange={(v) => updateEdu(index, 'period', v)} /></Field>
            <Field label="Details"><Input value={edu.details} onChange={(v) => updateEdu(index, 'details', v)} /></Field>
          </div>
        </div>
      ))}
      <button onClick={addEdu} className="w-full py-3 text-sm font-medium rounded-lg border border-dashed border-gray-300 dark:border-border text-gray-500 hover:text-primary hover:border-primary transition-colors">
        + Add Education
      </button>
    </div>
  )
}

function HighlightsForm({ portfolio }) {
  const { highlights, setHighlightsData } = portfolio

  const updateHighlight = (index, field, value) => {
    const updated = [...highlights]
    updated[index] = { ...updated[index], [field]: value }
    setHighlightsData(updated)
  }

  const addHighlight = () => {
    setHighlightsData([...highlights, { value: '', label: '' }])
  }

  const removeHighlight = (index) => {
    setHighlightsData(highlights.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500 dark:text-text-secondary">Stats shown in the About section.</p>
      {highlights.map((item, index) => (
        <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-border bg-gray-50 dark:bg-surface-light/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-text-primary">#{index + 1}</span>
            <button onClick={() => removeHighlight(index)} className="text-xs text-red-500 hover:text-red-600">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Value"><Input value={item.value} onChange={(v) => updateHighlight(index, 'value', v)} /></Field>
            <Field label="Label"><Input value={item.label} onChange={(v) => updateHighlight(index, 'label', v)} /></Field>
          </div>
        </div>
      ))}
      <button onClick={addHighlight} className="w-full py-3 text-sm font-medium rounded-lg border border-dashed border-gray-300 dark:border-border text-gray-500 hover:text-primary hover:border-primary transition-colors">
        + Add Highlight
      </button>
    </div>
  )
}
