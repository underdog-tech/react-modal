# Change Log

All notable changes to this project will be documented in this file.

---

### 2.4.2

#### Added

- Allow passing in the `ariaHideDocumentContent` prop, which applies `aria-hidden` to background elements in the document while the Pinwheel modal is open.
- Add `title` attribute to the Pinwheel iframe.

---

### 2.4.0

#### Security

- Add the `sandbox` attribute to the Pinwheel iframe.
- Add integrity hash to the Pinwheel script src.

---

### 2.3.12

#### Added

- Export `ScreenTransition` event payload type.

##### Updated

- Added `screen_transition` to `EventName` type.
- Added `ScreenTransition` to `EventPayload` type.

---

### 2.3.11

#### Added

- Allow passing in `modalStyling` prop as an experimental feature.

---

### 2.3.4

#### Added

- Export `EventPayload` type.
- Export `PinwheelError` type.
- Export `PinwheelErrorType` type.
- Export `EmptyPayloadObject` type as `Record<string, never>`.

##### Updated

- `EventPayload` is no longer a union containing `{}`. It now contains `Record<string, never>` instead due to [this behavior](https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-all-types-assignable-to-empty-interfaces).
- Mark exported `Error` type as **@deprecated** because it collides with the built-in javascript `Error` object. Replaced with `PinwheelError`.
- Mark exported `ErrorType` type as **@deprecated** because the new naming convention is prefixing with "`PinwheelError`". Replaced with `PinwheelErrorType`.
- Update `onExit` type to be `(error: PinwheelError | Record<string, never>)` to be accurate with current functionality.
