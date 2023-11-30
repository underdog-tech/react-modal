/* eslint-disable @typescript-eslint/ban-types */
import type { AdditionsType, ModificationsType, RemovalsType } from '../utils'

export type ErrorType =
  | 'sandboxError'
  | 'clientError'
  | 'systemError'
  | 'userActionRequired'
  | 'platformError'
  | 'invalidAccountsConfiguration'
  | 'invalidUserInput'
  | 'invalidLinkToken'
  | 'networkError'

export type LinkApiJob = 'login' | 'direct_deposit_switch' | 'card_switch'

export type OpenEventPayload = {}

export type SelectEmployerEventPayload = {
  selectedEmployerId: string
  selectedEmployerName: string
}

export type SelectPlatformEventPayload = {
  selectedPlatformId: string
  selectedPlatformName: string
}

export type IncorrectPlatformGivenEventPayload = {}

export type LoginAttemptEventPayload = {
  platformId: string
}

export type LoginEventPayload = {
  accountId: string
  platformId: string
}

export type InputAmountEventPayload = {
  value: number
  unit: '$' | '%'
}

export type InputAllocationEventPayload = {
  action: string
  allocation?: {
    type: string
    value?: number
    target?: {
      accountName: string
      accountType: string
    }
  }
}

export type CardSwitchBeginEventPayload = {}

export type DocUploadsBeginEventPayload = {
  uploadedDocumentsSubmittedCount?: number
}

export type DocUploadsSubmittedEventPayload = {
  uploadedDocumentSubmittedCount: number
}

export type DdFormBeginEventPayload = {}

export type DdFormCreateEventPayload = {
  url: string
}

export type DdFormDownloadEventPayload = {}

export type ScreenTransitionEventPayload = {
  screen_name: string
  selectedEmployerId?: string
  selectedEmployerName?: string
  selectedPlatformId?: string
  selectedPlatformName?: string
}

export type ExitEventPayload = {}

export type SuccessEventPayload = {
  accountId: string
  platformId: string
  job: LinkApiJob
  params?: {
    amount?: { value: number; unit: '%' | '$' }
  }
}

export type ErrorEventPayload = {
  type: ErrorType
  code: string
  message: string
  pendingRetry: boolean
}

type EventPayloadAdditions = {
  open: OpenEventPayload
  select_employer: SelectEmployerEventPayload
  select_platform: SelectPlatformEventPayload
  incorrect_platform_given: IncorrectPlatformGivenEventPayload
  login_attempt: LoginAttemptEventPayload
  login: LoginEventPayload
  input_amount: InputAmountEventPayload
  input_allocation: InputAllocationEventPayload
  card_switch_begin: CardSwitchBeginEventPayload
  doc_uploads_begin: DocUploadsBeginEventPayload
  doc_uploads_submitted: DocUploadsSubmittedEventPayload
  dd_form_begin: DdFormBeginEventPayload
  dd_form_create: DdFormCreateEventPayload
  dd_form_download: DdFormDownloadEventPayload
  screen_transition: ScreenTransitionEventPayload
  exit: ExitEventPayload
  success: SuccessEventPayload
  error: ErrorEventPayload
}

type EventPayloadModifications = {}

type EventPayloadRemovals = []

export type EventPayloadMap = Omit<
  AdditionsType<EventPayloadAdditions> &
    ModificationsType<EventPayloadModifications>,
  keyof RemovalsType<EventPayloadRemovals>
>

export type EventHandler = <T extends keyof EventPayloadMap>(
  eventName: T,
  payload: EventPayloadMap[T]
) => void
