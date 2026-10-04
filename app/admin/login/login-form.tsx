"use client"

import { useActionState, useRef } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { loginAction } from "./actions"

const initialState = { ok: false, message: "" }

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  )
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h2 className="heading-2">Admin login</h2>
        <CardDescription>Sign in to manage Gouripur Junction.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              ref={usernameRef}
              placeholder="admin"
              autoComplete="username"
              required
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  passwordRef.current?.focus()
                }
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              ref={passwordRef}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              minLength={4}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !usernameRef.current?.value.trim()) {
                  e.preventDefault()
                  usernameRef.current?.focus()
                }
              }}
            />
          </div>

          {state.message && (
            <p
              role={state.ok ? "status" : "alert"}
              className={
                state.ok ? "text-sm text-green-600" : "text-sm text-destructive"
              }
            >
              {state.message}
            </p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Logining in..." : "Login"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Hey bad boys, don&apos;t try to enter the admin panel. 🚂
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
