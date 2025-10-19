"use client"

import { useState, useEffect } from "react"

interface CurrentUser {
  firstName: string
  lastName: string
  email: string
}

export function useCurrentUser(): CurrentUser | null {
  const [user, setUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("temp_user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser({
          firstName: parsedUser.firstName || "",
          lastName: parsedUser.lastName || "",
          email: parsedUser.email || "",
        })
      } catch (error) {
        console.error("Failed to parse user data:", error)
        setUser(null)
      }
    }
  }, [])

  return user
}
