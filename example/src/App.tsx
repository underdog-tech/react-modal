import React, { useState } from 'react'

import PinwheelModal from '@pinwheel/react-modal'

const token = window.location.search.split('token=')[1] || undefined

const App = () => {
  const [open, setOpen] = useState(true)

  if (!token) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        No token found. Please add a token to the URL params like this:
        ?token=LINK_TOKEN
      </div>
    )
  }

  return (
    <div>
      <PinwheelModal
        linkToken={token}
        open={open}
        onExit={() => setOpen(false)}
        ariaHideDocumentContent={true}
      />
    </div>
  )
}

export default App
