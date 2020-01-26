import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PharmacyFillItem extends Entity {
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
  fill_id: number;

  @property({
    type: 'number',
    required: true,
  })
  order_item_id: number;

  @property({
    type: 'number',
    required: true,
  })
  prescribed_item_id: number;

  @property({
    type: 'number',
  })
  item_id?: number;

  @property({
    type: 'string',
    required: true,
    default: 'new',
  })
  state: string;

  @property({
    type: 'number',
  })
  item_reviewed_by?: number;

  @property({
    type: 'date',
  })
  item_reviewed_at?: string;

  @property({
    type: 'string',
  })
  item_review_state?: string;

  @property({
    type: 'string',
  })
  item_review_rejection_reason?: string;

  @property({
    type: 'string',
  })
  item_review_rejection_reason_detail?: string;

  @property({
    type: 'date',
  })
  clinical_verification_at?: string;

  @property({
    type: 'string',
  })
  dispense_verification_method?: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  revoked_at?: string;

  @property({
    type: 'number',
  })
  prescription_id?: number;

  @property({
    type: 'string',
  })
  dispense_drug_ndc?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PharmacyFillItem>) {
    super(data);
  }
}

export interface PharmacyFillItemRelations {
  // describe navigational properties here
}

export type PharmacyFillItemWithRelations = PharmacyFillItem & PharmacyFillItemRelations;
