import React, { useCallback, useState } from 'react'
import PinwheelModal from '@pinwheel/react-modal'

const initialToken = (() => {
  const params = new URLSearchParams(window.location.search)
  const value = params.get('token')
  return value ? decodeURIComponent(value) : undefined
})()

const App = () => {
  const [linkToken, setLinkToken] = useState<string | undefined>(initialToken)
  const [open, setOpen] = useState<boolean>(Boolean(initialToken))
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const generateLinkToken = useCallback(async () => {
    const key = process.env.PINWHEEL_API_KEY as string | undefined
    if (!key) {
      setError(
        'Missing Pinwheel API key. Set PINWHEEL_API_KEY in your environment before starting the dev server.'
      )
      return
    }
    setError(null)
    setIsGenerating(true)
    try {
      const response = await fetch(
        `${process.env.PINWHEEL_API_URL}/v1/link_tokens`,
        {
          method: 'POST',
          headers: {
            'X-API-SECRET': key,
            'Content-Type': 'application/json',
            'Pinwheel-Version': '2025-07-08'
          },
          body: JSON.stringify({
            allocation: {
              targets: [
                {
                  account_number: '000000000',
                  routing_number: '000000000',
                  type: 'checking',
                  name: 'Demo Checking'
                }
              ],
              value: 900
            },
            disable_direct_deposit_splitting: false,
            enable_self_id: false,
            features: ['direct_deposit_switch'],
            language: 'en',
            skip_intro_screen: false,
            solution: 'Deposit Switch',
            org_name: 'demo-org',
            end_user_id: 'demo-user'
          })
        }
      )
      const json: any = await response.json()
      const token: string | undefined = json?.token ?? json?.data?.token
      if (token) {
        setLinkToken(token)
        setOpen(true)
      } else {
        setError('Unexpected response creating link token')
        // surface response details in console for debugging
        // eslint-disable-next-line no-console
        console.log('Link token response:', json)
      }
    } catch (err) {
      setError('Failed to create link token')
      // eslint-disable-next-line no-console
      console.log('Failed to create link token', err)
    } finally {
      setIsGenerating(false)
    }
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      {!linkToken ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '10px' }}>
            {error ? <div style={{ color: 'red' }}>{error}</div> : null}
          </div>
          <button
            onClick={generateLinkToken}
            disabled={isGenerating}
            style={{ padding: '8px 12px' }}
          >
            {isGenerating ? 'Generating…' : 'Generate Link Token'}
          </button>
          <div style={{ marginTop: '12px', color: '#555' }}>
            Tip: export <code>PINWHEEL_API_KEY=YOUR_API_SECRET</code> before
            running <code>npm run start</code>.
          </div>
        </div>
      ) : null}

      {linkToken ? (
        <PinwheelModal
          useSecureOrigin
          linkToken={linkToken}
          open={open}
          onExit={() => setOpen(false)}
          ariaHideDocumentContent={true}
        />
      ) : null}
    </div>
  )
}

export default App
