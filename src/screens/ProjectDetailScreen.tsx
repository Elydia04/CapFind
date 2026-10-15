import { Calendar, Check, Ellipsis, FileQuestionMark, Image, MessageSquare } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppBar } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { StatusPill } from '../components/StatusPill'
import { Tag } from '../components/Tag'
import { useApp } from '../context/AppContext'
import { projects } from '../data/projects'

export function ProjectDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { appliedProjectIds, applyToProject, startConversation, showToast } = useApp()

  const [applying, setApplying] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    },
    [],
  )

  const project = projects.find((item) => item.id === id)

  if (!project) {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppBar title="Project Details" showBack />
        <main className="flex flex-1 flex-col items-center justify-center gap-3 bg-page px-6 text-center">
          <FileQuestionMark className="h-8 w-8 text-muted" aria-hidden="true" />
          <p className="text-base font-bold text-ink">Project not found</p>
          <p className="text-sm text-muted">
            The project you are looking for is not available.
          </p>
          <Button variant="secondary" onClick={() => navigate('/browse')}>
            Back to Browse
          </Button>
        </main>
      </div>
    )
  }

  const isApplied = appliedProjectIds.includes(project.id)

  const handleApply = () => {
    setApplying(true)
    timerRef.current = window.setTimeout(() => {
      applyToProject(project.id)
      showToast(`Application sent to ${project.clientName}`)
      setApplying(false)
    }, 800)
  }

  const handleMessage = () => {
    const conversationId = startConversation(project.clientName, project.clientInitials)
    navigate(`/messages/${conversationId}`)
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AppBar
        title="Project Details"
        showBack
        action={{
          icon: <Ellipsis className="h-5 w-5" aria-hidden="true" />,
          label: 'More options',
          onClick: () => showToast('More options are not available in this prototype.'),
        }}
      />

      <main className="flex-1 overflow-y-auto bg-page">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-4">
          <div
            role="img"
            aria-label={`${project.title} banner image placeholder`}
            className="flex h-40 items-center justify-center rounded-xl bg-primary-soft text-primary md:h-52"
          >
            <Image className="h-8 w-8" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-ink md:text-2xl">{project.title}</h2>
            <div className="flex items-center gap-2">
              <Avatar initials={project.clientInitials} size="sm" />
              <span className="text-sm text-muted">
                Posted by{' '}
                <span className="font-semibold text-ink">{project.clientName}</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill variant={project.status === 'open' ? 'open' : 'closing'} />
              {isApplied ? <StatusPill variant="applied" /> : null}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-ink">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-line bg-white p-3 text-sm text-muted">
            <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {project.timeline} · Applications close {project.deadline}
            </span>
          </div>
        </div>
      </main>

      <div className="shrink-0 border-t border-line bg-white px-4 py-3">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
          <Button
            fullWidth
            loading={applying}
            disabled={isApplied}
            icon={isApplied ? <Check className="h-4 w-4" aria-hidden="true" /> : undefined}
            onClick={handleApply}
          >
            {isApplied ? 'Applied' : applying ? 'Sending…' : 'Apply Now'}
          </Button>
          <Button
            variant="secondary"
            fullWidth
            disabled={!isApplied}
            aria-disabled={!isApplied}
            icon={<MessageSquare className="h-4 w-4" aria-hidden="true" />}
            onClick={handleMessage}
          >
            Message Client
          </Button>
          {!isApplied ? (
            <p className="text-center text-xs text-muted">Available after you apply</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
