import * as React from 'react'

const [major, minor, patch] = (require('../package.json').version as string)
  .split('.')
  .map(Number)

export const SDK_VERSION: SemverObject = { major, minor, patch }

export type LinkResult = {
  accountId: string
  job: string
  params: {
    amount?: { value: number; unit: '%' | '$' }
  }
}

/**
 * @deprecated You should use `PinwheelErrorType` instead. `ErrorType` will be removed in version 2.4
 */
export type ErrorType =
  | 'clientError'
  | 'systemError'
  | 'networkError'
  | 'userActionRequired'
  | 'platformError'
  | 'invalidAccountsConfiguration'
  | 'invalidUserInput'
  | 'invalidLinkToken'

/**
 * @deprecated The type should not be used as it clashes with the native JS `Error` object.
 * You should use `PinwheelError` instead. `Error` will be removed in version 2.4
 */
export type Error = {
  type: PinwheelErrorType
  code: string
  message: string
  pendingRetry: boolean
}

export type PinwheelErrorType = ErrorType

export type PinwheelError = Error

export type EmptyPayloadObject = Record<string, never>

export type EventPayload =
  | { selectedEmployerId: string; selectedEmployerName: string }
  | { selectedPlatformId: string; selectedPlatformName: string }
  | { value: number; unit: '%' | '$' }
  | LinkResult
  | { accountId: string; platformId: string }
  | { platformId: string }
  | PinwheelError
  | EmptyPayloadObject
  | undefined

export type SemverObject = {
  major: number
  minor: number
  patch: number
}

const EVENT_NAMES = [
  'open',
  'select_employer',
  'select_platform',
  'incorrect_platform_given',
  'login_attempt',
  'login',
  'input_amount',
  'exit',
  'success',
  'error'
] as const

export type EventName = typeof EVENT_NAMES[number]

interface PinwheelPublicOpenOptions {
  linkToken: string
  onLogin?: (result: { accountId: string; platformId: string }) => void
  onSuccess?: (result: LinkResult) => void
  onError?: (error: PinwheelError) => void
  onExit?: (error: PinwheelError | EmptyPayloadObject) => void
  onEvent?: (eventName: EventName, payload: EventPayload) => void
}

interface PinwheelPrivateOpenOptions {
  _versionOverride?: SemverObject
  _sdkOverride?: string
  _modalSessionIdOverride?: string
}

declare let Pinwheel: {
  open: (
    options: PinwheelPublicOpenOptions & PinwheelPrivateOpenOptions
  ) => Promise<void>
  close: () => Promise<void>
}

export type PinwheelModalProps = PinwheelPublicOpenOptions & {
  open?: boolean
  _srcUrl?: string
}

const addScriptTag = (loadCb: Function, url?: string) => {
  const tag = document.createElement('script')
  tag.async = true
  tag.type = 'application/javascript'
  tag.src = url || `https://cdn.getpinwheel.com/pinwheel-v${major}.${minor}.js`
  document.body.appendChild(tag)

  tag.addEventListener('load', () => loadCb())
  return tag
}

const PinwheelModal = ({
  open,
  _srcUrl,
  // @ts-ignore
  _modalSessionIdOverride,
  ...props
}: PinwheelModalProps) => {
  const [loaded, setLoaded] = React.useState(false)
  const [showing, setShowing] = React.useState(false)
  const [tag, setTag] = React.useState<HTMLScriptElement>()

  React.useEffect(() => {
    // eslint-disable-next-line dot-notation
    delete window['Pinwheel']
    setLoaded(false)

    const els = document.querySelectorAll('.pinwheel-portal')
    els.forEach((e) => e.parentNode?.removeChild(e))

    const newTag = addScriptTag(() => setLoaded(true), _srcUrl)
    setTag(newTag)
  }, [_srcUrl, setLoaded])

  React.useEffect(() => {
    if (tag && tag.parentNode) tag.parentNode.removeChild(tag)
  }, [_srcUrl])

  React.useEffect(() => {
    if (!loaded) return

    if (open && !showing) {
      Pinwheel.open({
        ...props,
        _versionOverride: SDK_VERSION,
        _sdkOverride: 'react',
        _modalSessionIdOverride
      })
      setShowing(true)
    } else if (!open && showing) {
      Pinwheel.close()
      setShowing(false)
    }
  }, [open, showing, setShowing, loaded])

  return <div />
}

export default PinwheelModal
