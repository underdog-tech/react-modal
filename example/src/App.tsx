import React, { useState } from 'react'

import PinwheelModal from '@pinwheel/react-modal'
import '@pinwheel/react-modal/dist/index.css'

const token = window.location.search.split('token=')[1] ||
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7Im9yZ19uYW1lIjoiQXNwYXJhZ3VzIFRydXN0LCBJbmMuIiwiam9iIjoiZGlyZWN0X2RlcG9zaXRfc3dpdGNoIiwiYWNjb3VudF90eXBlIjoiY2hlY2tpbmciLCJyb3V0aW5nX251bWJlciI6IjU3NTc4MjkwOSIsImFjY291bnRfbnVtYmVyIjoiOTk5NjQxMjQ2NyIsInBsYXRmb3JtX2tleSI6bnVsbCwic2tpcF9pbnRyb19zY3JlZW4iOmZhbHNlLCJza2lwX2V4aXRfc3VydmV5IjpmYWxzZSwiYW1vdW50IjpudWxsLCJlbXBsb3llcl9pZCI6bnVsbCwiYWNjb3VudF9uYW1lIjpudWxsLCJkaXNhYmxlX2RpcmVjdF9kZXBvc2l0X3NwbGl0dGluZyI6ZmFsc2UsInNraXBfZW1wbG95ZXJfc2VhcmNoIjpudWxsLCJwbGF0Zm9ybV9pZCI6bnVsbCwicmVxdWlyZWRfam9icyI6bnVsbCwibW9kZSI6InNhbmRib3giLCJhcGlfa2V5IjoieHl6IiwidG9rZW5faWQiOiJiNjM1ZjM3OC1kZjQ0LTRlNWYtOWU1ZS04MjczYWM5ZTFhNjUifSwiaWF0IjozNjExNzc0MTkyLCJleHAiOjM2MTE3NzUwOTJ9.psETOaf7qyWGaaXvA29gTabRa-uvoGT69roY4A5z1fY'

const App = () => {
  const [open, setOpen] = useState(true)

  return <div>
    <button onClick={() =>setOpen(true)}>Click me</button>
    <PinwheelModal linkToken={token} open={open} onExit={() => setOpen(false)} />
  </div>
}

export default App
