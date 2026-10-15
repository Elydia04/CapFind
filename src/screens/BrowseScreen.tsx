import { Bell, Search, SearchX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { FilterChip } from '../components/FilterChip'
import { FormField } from '../components/FormField'
import { StatusPill } from '../components/StatusPill'
import { Tag } from '../components/Tag'
import { useApp } from '../context/AppContext'
import { projectCategories, projects } from '../data/projects'
import type { ProjectCategory } from '../types'

export function BrowseScreen() {
  const navigate = useNavigate()
  const { appliedProjectIds, conversations, showToast } = useApp()

  const [query, setQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState<ProjectCategory[]>([])

  const toggleCategory = (category: ProjectCategory) => {
    setActiveCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category],
    )
  }

  const clearFilters = () => {
    setQuery('')
    setActiveCategories([])
  }

  const filteredProjects = useMemo(() => {
    const term = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesCategory =
        activeCategories.length === 0 || activeCategories.includes(project.category)
      if (!matchesCategory) {
        return false
      }
      if (term === '') {
        return true
      }
      return (
        project.clientName.toLowerCase().includes(term) ||
        project.title.toLowerCase().includes(term) ||
        project.tags.some((tag) => tag.toLowerCase().includes(term))
      )
    })
  }, [query, activeCategories])

  const hasUnread = conversations.some((conversation) => conversation.unread)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AppBar
        title="Browse Projects"
        action={{
          icon: <Bell className="h-5 w-5" aria-hidden="true" />,
          label: 'Notifications',
          onClick: () => showToast("You're all caught up."),
        }}
      />

      <main className="flex-1 overflow-y-auto bg-page">
        <div className="flex flex-col gap-3 border-b border-line bg-page px-4 py-3">
          <div role="search">
            <FormField
              label="Search projects"
              type="search"
              placeholder="Search by client, title, or tag"
              icon={<Search className="h-4 w-4" />}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((category) => (
              <FilterChip
                key={category}
                label={category}
                active={activeCategories.includes(category)}
                onClick={() => toggleCategory(category)}
              />
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <SearchX className="h-8 w-8 text-muted" aria-hidden="true" />
            <p className="text-base font-bold text-ink">No projects match your search</p>
            <p className="text-sm text-muted">
              Try a different keyword or clear your filters.
            </p>
            <Button variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        ) : (
          <ul className="flex flex-col gap-3 p-4">
            {filteredProjects.map((project) => {
              const isApplied = appliedProjectIds.includes(project.id)
              return (
                <li
                  key={project.id}
                  className="relative rounded-xl border border-line bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <Avatar initials={project.clientInitials} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-ink">
                        {project.clientName}
                      </p>
                      <h2 className="text-base font-bold leading-snug text-ink">
                        <Link
                          to={`/project/${project.id}`}
                          className="after:absolute after:inset-0 after:content-['']"
                        >
                          {project.title}
                        </Link>
                      </h2>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusPill variant={project.status === 'open' ? 'open' : 'closing'} />
                    {isApplied ? <StatusPill variant="applied" /> : null}
                    {project.tags.slice(0, 2).map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <div className="relative z-10 mt-3">
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </main>

      <BottomNav unreadMessages={hasUnread} />
    </div>
  )
}
