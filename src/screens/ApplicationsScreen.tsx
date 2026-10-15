import { ClipboardList } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar } from '../components/AppBar'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { StatusPill } from '../components/StatusPill'
import { useApp } from '../context/AppContext'
import { projects } from '../data/projects'
import type { Project } from '../types'

export function ApplicationsScreen() {
  const navigate = useNavigate()
  const { appliedProjectIds, conversations } = useApp()

  const appliedProjects = appliedProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => project !== undefined)

  const hasUnread = conversations.some((conversation) => conversation.unread)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AppBar title="My Applications" />

      <main className="flex-1 overflow-y-auto bg-page">
        <div className="mx-auto w-full max-w-2xl px-4 py-4">
          {appliedProjects.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <ClipboardList className="h-8 w-8 text-muted" aria-hidden="true" />
              <p className="text-base font-bold text-ink">
                You have not applied to any projects yet
              </p>
              <p className="text-sm text-muted">
                Browse open projects and send your first application.
              </p>
              <Button variant="secondary" onClick={() => navigate('/browse')}>
                Browse projects
              </Button>
            </div>
          ) : (
            <>
              <p className="pb-3 text-sm text-muted">
                {appliedProjects.length}{' '}
                {appliedProjects.length === 1 ? 'application' : 'applications'}
              </p>
              <ul className="flex flex-col gap-3">
                {appliedProjects.map((project) => (
                  <li
                    key={project.id}
                    className="relative rounded-xl border border-line bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-base font-bold leading-snug text-ink">
                          <Link
                            to={`/project/${project.id}`}
                            className="after:absolute after:inset-0 after:content-['']"
                          >
                            {project.title}
                          </Link>
                        </h2>
                        <p className="mt-0.5 text-sm text-muted">{project.clientName}</p>
                      </div>
                      <StatusPill variant="applied" />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>

      <BottomNav unreadMessages={hasUnread} />
    </div>
  )
}
