import * as React from 'react'
import packageJson from '../package.json'
import portalConfig from '../portal.config.json'
import { LinkOptions } from './client-events/client'

export * from './client-events/registry/v3'

const [major, minor, patch] = packageJson.version.split(/\.|-/).map(Number)
export const SDK_VERSION: SemverObject = { major, minor, patch }

const { url: PORTAL_URL, integrity: PORTAL_INTEGRITY } = portalConfig

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

export type OverlayStylingParams = {
  backgroundColor?: string
}

type PinwheelPublicOpenOptions = {
  modalStyling?: ModalStylingParams
  overlayStyling?: OverlayStylingParams
  ariaHideDocumentContent?: boolean
  useSecureOrigin?: boolean
} & LinkOptions

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
  useSecureOrigin?: boolean
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
  const privateProps = allProps as unknown as PinwheelPrivateOpenOptions
  const { _modalSessionIdOverride, _sdkOverride } = privateProps

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
        useSecureOrigin: props.useSecureOrigin || false,
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
