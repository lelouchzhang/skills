import { PostHogProvider as PHProvider, usePostHog } from '@posthog/react'
import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: '2026-01-30',
        capture_pageview: false,
        capture_pageleave: true,
        capture_exceptions: true,
        person_profiles: 'identified_only',
      }}
    >
      {children}
    </PHProvider>
  )
}

export function PostHogPageView() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const search = useRouterState({ select: (s) => s.location.searchStr })
  const ph = usePostHog()

  useEffect(() => {
    if (ph) {
      ph.capture('$pageview', { $current_url: window.location.href })
    }
  }, [pathname, search, ph])

  return null
}
