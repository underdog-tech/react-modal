/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
import type { AdditionsType, ModificationsType, RemovalsType } from '../utils'
import type {
  BillEventPayload,
  BillSwitchEventPayload,
  EventPayloadMap as EventPayloadMapV3
} from './v3'

/*
 * Export all the types from V3 and we override whatever changes
 */
export * from './v3'

type EventPayloadAdditions = {}

type EventPayloadModifications = {
  bill_removed: BillEventPayload
  bill_switch_success: BillSwitchEventPayload
}

type EventPayloadRemovals = []

export type EventPayloadMap = Omit<
  EventPayloadMapV3 &
    AdditionsType<EventPayloadAdditions> &
    ModificationsType<EventPayloadModifications>,
  keyof RemovalsType<EventPayloadRemovals>
>

export type EventHandler = <T extends keyof EventPayloadMap>(
  eventName: T,
  payload: EventPayloadMap[T]
) => void
