import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PharmacyUnitLabel extends Entity {
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
  label_print_group_id: number;

  @property({
    type: 'number',
    required: true,
  })
  fill_item_id: number;

  @property({
    type: 'string',
  })
  label_data?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PharmacyUnitLabel>) {
    super(data);
  }
}

export interface PharmacyUnitLabelRelations {
  // describe navigational properties here
}

export type PharmacyUnitLabelWithRelations = PharmacyUnitLabel & PharmacyUnitLabelRelations;
