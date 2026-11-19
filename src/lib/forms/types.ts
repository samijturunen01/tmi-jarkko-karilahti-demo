import type { TopicId } from '../../data/pricing'

export type Timing = '' | 'pian' | 'kuukausi' | 'joustava'

/** Quote / appointment request – what a detailer needs to price the job and get back to the customer. */
export interface QuoteRequest {
  topics: TopicId[]
  vehicle: string
  details: string
  timing: Timing
  name: string
  phone: string
  email: string
}

export type FieldErrors = Partial<Record<keyof QuoteRequest | 'contact', string>>

export interface SubmitResult {
  ok: boolean
  /** True when nothing was actually sent (demo mode). */
  demo: boolean
  message: string
}

/** Every delivery mechanism implements this – the UI never knows which one is active. */
export interface FormAdapter {
  submit(data: QuoteRequest): Promise<SubmitResult>
}

export const emptyQuote = (topics: TopicId[] = []): QuoteRequest => ({
  topics,
  vehicle: '',
  details: '',
  timing: '',
  name: '',
  phone: '',
  email: '',
})
