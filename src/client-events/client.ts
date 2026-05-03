import type {
  ErrorEventPayload,
  EventHandler,
  LoginAttemptEventPayload,
  LoginEventPayload,
  SuccessEventPayload
} from './registry/v4'

export type LinkOptions = {
  linkToken: string
  onLogin?: (payload: LoginEventPayload) => void
  onLoginAttempt?: (payload: LoginAttemptEventPayload) => void
  onSuccess?: (payload: SuccessEventPayload) => void
  onError?: (error: ErrorEventPayload) => void
  onExit?: (error?: ErrorEventPayload) => void
  onEvent?: EventHandler
}
