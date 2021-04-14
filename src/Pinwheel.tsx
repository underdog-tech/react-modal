export type LinkResult = {
  accountId: string
  job: string
  params: {
    amount?: { value: number; unit: '%' | '$' }
  }
}

type EventPayload =
  | { selectedEmployerId: string; selectedEmployerName: string }
  | { selectedPlatformId: string; selectedPlatformName: string }
  | { value: number; unit: '%' | '$' }
  | LinkResult
  | { accountId: string; platformId: string }
  | Error
  | {}
  | undefined

export type SemverObject = {
  major: number
  minor: number
  patch: number
}

interface PinwheelPrivateOpenOptions {
  _versionOverride?: SemverObject
  _sdkOverride?: string
}

export interface PinwheelPublicOpenOptions {
  linkToken: string
  onLogin?: (result: { accountId: string; platformId: string }) => void
  onSuccess?: (result: LinkResult) => void
  onError?: (error: Error) => void
  onExit?: (error?: Error) => void
  onEvent?: (eventName: string, payload: EventPayload) => void
}

type PortalOpenFunction = (
  options: PinwheelPublicOpenOptions & PinwheelPrivateOpenOptions
) => Promise<void>

type PortalCloseFunction = () => Promise<void>

declare let Pinwheel: {
  open: PortalOpenFunction
  close: PortalCloseFunction
}

export const open: PortalOpenFunction = (options) => Pinwheel.open(options)
