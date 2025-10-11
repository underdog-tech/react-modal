# Change Log

All notable changes to this project will be documented in this file.

## 3.3.x Releases

- `3.3.x` Releases - [3.3.0](#330)

### 3.3.0

#### Added

- Added Bill Switch client events: [Docs](https://docs.pinwheelapi.com/public/docs/link-events#bill-switch-events)

## 3.2.x Releases

- `3.2.x` Releases - [3.2.0](#320)

---

### 3.2.0

#### Added

- Added React 19 support.

---

## 3.1.x Releases

- `3.1.x` Releases - [3.1.0](#310)

---

### 3.1.0

#### Added

- Added prop `useDarkMode` for launching the Link modal in dark mode.

---

## 3.0.x Releases

- `3.0.x` Releases - [3.0.0](#300) | [3.0.1](#301) | [3.0.2](#302) | [3.0.3](#303) | [3.0.4](#304)

---

### 3.0.4

#### Updated

- Resolved inconsistent modal loading behavior in some Next.js environments.

#### Security

- Update dependencies to address security vulnerabilities.

### 3.0.3

#### Updated

- Fix the casing of the `screenName` field in the exported `ScreenTransitionEventPayload` event payload type.

#### Security

- Update dependencies to address security vulnerabilities

---

### 3.0.2

#### Security

- Update dependencies to address security vulnerabilities

### 3.0.1

#### Added

- Enable passing in `overlayStyling` as a prop.

---

### 3.0.0

This new major version bump introduces an updated API to support partner-based switches.

#### Changed

- The `action` field in `input_allocation` event is now optional.
- The `params` field in the `success` event uses the `input_allocation` schema with fields `action` and `allocation`.

#### Removed

- Removed `LinkResult` export. This was the old `success` event payload. The new payload has the same format as the newly exported `SuccessEventPayload`.
<!-- - Removed `PinwheelError` export. Use `ErrorEventPayload` instead. -->
- Removed `EventPayload` export. The event handler function will now be implicitly typed.
  <!-- - Removed `ScreenTransition` export. Use `ScreenTransitionEventPayload` instead. -->
  <!-- - Removed `InputAllocation` export. Use `ScreenTransitionEventPayload` instead. -->
- Removed `EmptyPayloadObject` export.
- Removed `Error` export. Use `ErrorEventPayload` instead. (`Error` was marked as deprecated in version 2.)
- Removed `ErrorType` export. Use `PinwheelErrorType` instead. (`ErrorType` was marked as deprecated in version 2.)
- Removed `input_amount` event. Use `input_allocation` even instead.

## 2.4.x Releases

- `2.4.x` Releases - [2.4.0](#240) | [2.4.1](#241) | [2.4.2](#242) | [2.4.3](#243) | [2.4.4](#244) | [2.4.5](#245)

---

### 2.4.5

#### Added

- Add the `clipboard-write` permission to the Pinwheel iframe.

### 2.4.4

#### Security

- Pass parent window origin to the Link iframe, so that cross-origin messages are verified and always have a target origin set.

### 2.4.3

#### Added

- Allow passing in the `ariaHideDocumentContent` prop, which applies `aria-hidden` to background elements in the document while the Pinwheel modal is open.
- Add `title` attribute to the Pinwheel iframe.

### 2.4.2

#### Added

- Export types (`index.d.ts`)

### 2.4.0

#### Security

- Add the `sandbox` attribute to the Pinwheel iframe.
- Add integrity hash to the Pinwheel script src.

### 2.3.12

#### Added

- Export `ScreenTransition` event payload type.

##### Updated

- Added `screen_transition` to `EventName` type.
- Added `ScreenTransition` to `EventPayload` type.

### 2.3.11

#### Added

- Allow passing in `modalStyling` prop as an experimental feature.

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
