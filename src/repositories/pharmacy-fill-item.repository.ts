import { DefaultCrudRepository } from '@loopback/repository';
import { PharmacyFillItem, PharmacyFillItemRelations } from '../models';
import { PharmacyDataDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class PharmacyFillItemRepository extends DefaultCrudRepository<
  PharmacyFillItem,
  typeof PharmacyFillItem.prototype.id,
  PharmacyFillItemRelations
  > {
  constructor(
    @inject('datasources.PharmacyData') dataSource: PharmacyDataDataSource,
  ) {
    super(PharmacyFillItem, dataSource);
  }
}
