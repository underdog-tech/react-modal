import * as React from 'react'

interface PinwheelOpenOptions {
  linkToken: string
  onSuccess?: (result: { tokenId: string }) => void
  onExit?: (
    error: { errorCode: string; errorMsg: string },
    result: { tokenId: string }
  ) => void
  onEvent?: (
    eventName: string,
    params: {
      modalSessionId?: string
      [key: string]: any
    }
  ) => void
}

declare let Pinwheel: {
  open: (options: PinwheelOpenOptions) => Promise<void>
  close: () => Promise<void>
}

export type PinwheelModalProps = PinwheelOpenOptions & {
  open?: boolean
  _srcUrl?: string
}

const PinwheelModal = ({
  open,
  _srcUrl,
  ...props
}: PinwheelOpenOptions & {
  open?: boolean
  _srcUrl?: string
}) => {
  const [loaded, setLoaded] = React.useState(false)
  const [showing, setShowing] = React.useState(false)

  React.useEffect(() => {
    const tag = document.createElement('script')
    tag.async = true
    tag.type = 'application/javascript'
    tag.src = _srcUrl || 'https://cdn.getpinwheel.com/pinwheel-v1.js'
    document.body.appendChild(tag)

    tag.addEventListener('load', () => setLoaded(true))
  }, [setLoaded])

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
