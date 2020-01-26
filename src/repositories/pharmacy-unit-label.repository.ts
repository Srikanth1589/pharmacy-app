import { DefaultCrudRepository } from '@loopback/repository';
import { PharmacyUnitLabel, PharmacyUnitLabelRelations } from '../models';
import { PharmacyDataDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class PharmacyUnitLabelRepository extends DefaultCrudRepository<
  PharmacyUnitLabel,
  typeof PharmacyUnitLabel.prototype.id,
  PharmacyUnitLabelRelations
  > {
  constructor(
    @inject('datasources.PharmacyData') dataSource: PharmacyDataDataSource,
  ) {
    super(PharmacyUnitLabel, dataSource);
  }
}
