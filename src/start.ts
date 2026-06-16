import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
import { createStart } from '@tanstack/react-start'

// By default, clerkMiddleware() will not protect any routes. All routes are public and you must opt-in to protection for routes. See the clerkMiddleware() reference to learn how to require authentication for specific routes.
export const startInstance = createStart(() => {
  return {
    requestMiddleware: [clerkMiddleware()],
  }
})