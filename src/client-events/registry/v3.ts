/* eslint-disable @typescript-eslint/ban-types */
import type { AdditionsType, ModificationsType, RemovalsType } from '../utils'
import type { EventPayloadMap as EventPayloadMapV2, LinkApiJob } from './v2.3'

/*
 * Export all the types from V3 and we override whatever changes
 */
export * from './v2.3'

export type SuccessEventPayload = {
  accountId: string
  platformId: string
  job: LinkApiJob
  params?: InputAllocationEventPayload
}

export type InputAllocationEventPayload = {
  action: string | null
  allocation?: {
    type: string
    value?: number
    target?: {
      accountName: string
      accountType: string
    }
  }
}

type EventPayloadAdditions = {}

type EventPayloadModifications = {
  input_allocation: InputAllocationEventPayload
}

type EventPayloadRemovals = ['input_amount']

export type EventPayloadMap = Omit<
  EventPayloadMapV2 &
    AdditionsType<EventPayloadAdditions> &
    ModificationsType<EventPayloadModifications>,
  keyof RemovalsType<EventPayloadRemovals>
>

export type EventHandler = <T extends keyof EventPayloadMap>(
  eventName: T,
  payload: EventPayloadMap[T]
) => void
