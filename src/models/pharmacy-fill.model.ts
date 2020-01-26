import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class PharmacyFill extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  pharmacy_id: number;

  @property({
    type: 'number',
    required: true,
  })
  order_id: number;

  @property({
    type: 'number',
    required: true,
  })
  user_id: number;

  @property({
    type: 'number',
  })
  line_id?: number;

  @property({
    type: 'string',
    required: true,
    default: 'new',
  })
  state: string;

  @property({
    type: 'date',
    required: true,
    defaultFn: 'now',
  })
  created_at: string;

  @property({
    type: 'date',
  })
  items_selected_at?: string;

  @property({
    type: 'date',
  })
  clinical_verification_at?: string;

  @property({
    type: 'date',
  })
  accepted_at?: string;

  @property({
    type: 'date',
  })
  unit_label_printing_at?: string;

  @property({
    type: 'date',
  })
  unit_label_printed_at?: string;

  @property({
    type: 'number',
  })
  dispense_verified_by?: number;

  @property({
    type: 'date',
  })
  dispense_verified_at?: string;

  @property({
    type: 'date',
  })
  shipping_label_printing_at?: string;

  @property({
    type: 'number',
  })
  packed_by?: number;

  @property({
    type: 'date',
  })
  packed_at?: string;

  @property({
    type: 'date',
  })
  on_hold_at?: string;

  @property({
    type: 'string',
  })
  hold_reason?: string;

  @property({
    type: 'string',
  })
  hold_reason_detail?: string;

  @property({
    type: 'date',
  })
  revoked_at?: string;

  @property({
    type: 'string',
  })
  reprocess_reason?: string;

  @property({
    type: 'string',
  })
  reprocess_reason_detail?: string;

  @property({
    type: 'number',
  })
  dispensed_by?: number;

  @property({
    type: 'string',
  })
  revoke_reason_detail?: string;

  @property({
    type: 'number',
  })
  latest_unit_label_print_group_id?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PharmacyFill>) {
    super(data);
  }
}

export interface PharmacyFillRelations {
  // describe navigational properties here
}

export type PharmacyFillWithRelations = PharmacyFill & PharmacyFillRelations;
