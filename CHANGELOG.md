# Change Log

All notable changes to this project will be documented in this file.

## 3.0.x Releases

- `3.0.x` Releases - [3.0.0](#300)

### [3.0.0](https://github.com/underdog-tech/pinwheel-ios-sdk/releases/tag/3.0.0)

---

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
- Removed `Error` export. `Error` was marked as deprecated in version 2. Use `ErrorEventPayload` instead.
- Removed `ErrorType` export. `ErrorType` was marked as deprecated in version 2. Use `PinwheelErrorType` instead.
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
