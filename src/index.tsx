import * as React from 'react'

export type LinkResult = {
  accountId: string
  job: string
  params: {
    amount?: { value: number; unit: '%' | '$' }
  }
}

export type ErrorType =
  | 'clientError'
  | 'systemError'
  | 'networkError'
  | 'userActionRequired'
  | 'platformError'
  | 'invalidAccountsConfiguration'
  | 'invalidUserInput'
  | 'invalidLinkToken'

export type Error = {
  type: ErrorType
  code: string
  message: string
  pendingRetry?: boolean
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

interface PinwheelOpenOptions {
  linkToken: string
  onLogin?: (result: { accountId: string; platformId: string }) => void
  onSuccess?: (result: LinkResult) => void
  onError?: (error: Error) => void
  onExit?: (error?: Error) => void
  onEvent?: (eventName: string, payload: EventPayload) => void
}

declare let Pinwheel: {
  open: (options: PinwheelOpenOptions) => Promise<void>
  close: () => Promise<void>
}

export type PinwheelModalProps = PinwheelOpenOptions & {
  open?: boolean
  _srcUrl?: string
}

const addScriptTag = (loadCb: Function, url?: string) => {
  const tag = document.createElement('script')
  tag.async = true
  tag.type = 'application/javascript'
  tag.src = url || 'https://cdn.getpinwheel.com/pinwheel-v2.js'
  document.body.appendChild(tag)

  tag.addEventListener('load', () => loadCb())
  return tag
}

const PinwheelModal = ({ open, _srcUrl, ...props }: PinwheelModalProps) => {
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
      Pinwheel.open(props)
      setShowing(true)
    } else if (!open && showing) {
      Pinwheel.close()
      setShowing(false)
    }
  }, [open, showing, setShowing, loaded])

  return <div />
}

export default PinwheelModal
