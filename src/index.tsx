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

const addScriptTag = (loadCb: Function, url?: string) => {
  const tag = document.createElement('script')
  tag.async = true
  tag.type = 'application/javascript'
  tag.src = url || 'https://cdn.getpinwheel.com/pinwheel-v1.js'
  document.body.appendChild(tag)

  tag.addEventListener('load', () => loadCb())
  return tag
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
  const [tag, setTag] = React.useState<HTMLScriptElement>()

  React.useEffect(() => {
    addScriptTag(() => setLoaded(true), _srcUrl)
  }, [setLoaded])

  React.useEffect(() => {
    // eslint-disable-next-line dot-notation
    delete window['Pinwheel']
    setLoaded(false)

    const els = document.querySelectorAll('.pinwheel-portal')
    els.forEach((e) => e.parentNode?.removeChild(e))

    if (tag && tag.parentNode) tag.parentNode.removeChild(tag)

    const newTag = addScriptTag(() => setLoaded(true), _srcUrl)
    setTag(newTag)
  }, [_srcUrl, setLoaded, tag])

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
