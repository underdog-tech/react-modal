import * as React from 'react'
import packageJson from '../package.json'
import portalConfig from '../portal.config.json'

const [major, minor, patch] = packageJson.version.split('.').map(Number)
export const SDK_VERSION: SemverObject = { major, minor, patch }

const { url: PORTAL_URL, integrity: PORTAL_INTEGRITY } = portalConfig

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

// BEGIN: AMOUNT SELECTION TYPES
type _PartialSwitch<T> = { action: 'partial_switch'; allocation: T }
type InputAllocationPercentage = _PartialSwitch<{
  type: 'percentage'
  value: number
}>
type InputAllocationAmount = _PartialSwitch<{
  type: 'amount'
  value: number
}>
type InputAllocationRemainder = _PartialSwitch<{
  type: 'remainder'
}>
export type InputAllocation =
  | { action: 'full_switch' }
  | InputAllocationRemainder
  | InputAllocationAmount
  | InputAllocationPercentage
// END: AMOUNT SELECTION TYPES

export type ScreenTransition = {
  screenName: string
  selectedEmployerId?: string
  selectedEmployerName?: string
  selectedPlatformId?: string
  selectedPlatformName?: string
}

export type EventPayload =
  | InputAllocation
  | { selectedEmployerId: string; selectedEmployerName: string }
  | { selectedPlatformId: string; selectedPlatformName: string }
  | { value: number; unit: '%' | '$' }
  | LinkResult
  | { accountId: string; platformId: string }
  | { platformId: string }
  | ScreenTransition
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
  'error',
  'input_allocation',
  'screen_transition'
] as const

export type EventName = typeof EVENT_NAMES[number]

type CssSize = `${string}${'px' | '%' | 'vw' | 'vh' | 'em'}`
export type ModalStylingParams = {
  deltaX?: CssSize
  deltaY?: CssSize
  width?: CssSize
  height?: CssSize
}

interface PinwheelPublicOpenOptions {
  linkToken: string
  onLogin?: (result: { accountId: string; platformId: string }) => void
  onSuccess?: (result: LinkResult) => void
  onError?: (error: PinwheelError) => void
  onExit?: (error: PinwheelError | EmptyPayloadObject) => void
  onEvent?: (eventName: EventName, payload: EventPayload) => void
  /**
   * @experimental - Adjust modal height, width, and placement on screen
   */
  modalStyling?: ModalStylingParams
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

const addScriptTag = (loadCb: () => void, overrideUrl?: string) => {
  const tag = document.createElement('script')
  tag.async = true
  tag.type = 'application/javascript'
  if (overrideUrl) {
    tag.src = overrideUrl
  } else {
    tag.crossOrigin = 'anonymous'
    tag.integrity = PORTAL_INTEGRITY
    tag.src = PORTAL_URL
  }
  document.body.appendChild(tag)

  tag.addEventListener('load', () => loadCb())
  return tag
}

const PinwheelModal = (allProps: PinwheelModalProps) => {
  const { open, _srcUrl, ...props } = allProps

  // Need to get _modalSessionIdOverride like this or else client using this module
  // with strict typescript typing will not be able to compile this without an error.
  // Error: "node_modules/@pinwheel/react-modal/dist/index.d.ts(85,48): error TS2339: Property '_modalSessionIdOverride' does not exist on type 'PinwheelModalProps'."
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const propsAsAny = allProps as unknown as any
  const { _modalSessionIdOverride, _sdkOverride } = propsAsAny

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_srcUrl])

  React.useEffect(() => {
    if (!loaded) return

    if (open && !showing) {
      Pinwheel.open({
        _versionOverride: SDK_VERSION,
        _sdkOverride: _sdkOverride || 'react',
        ...props,
        _modalSessionIdOverride
      })
      setShowing(true)
    } else if (!open && showing) {
      Pinwheel.close()
      setShowing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, showing, setShowing, loaded])

  return <div />
}

export default PinwheelModal
