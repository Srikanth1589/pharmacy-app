import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PharmacyUnitLabelPrintGroup extends Entity {
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
    type: 'date',
    required: true,
    default: 'now',
  })
  created_at: string;

  @property({
    type: 'string',
    required: true,
    default: 'uuid',
  })
  batch_id: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PharmacyUnitLabelPrintGroup>) {
    super(data);
  }
}

export interface PharmacyUnitLabelPrintGroupRelations {
  // describe navigational properties here
}

export type PharmacyUnitLabelPrintGroupWithRelations = PharmacyUnitLabelPrintGroup & PharmacyUnitLabelPrintGroupRelations;
