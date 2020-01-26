import {DefaultCrudRepository} from '@loopback/repository';
import {PharmacyUnitLabelPrintGroup, PharmacyUnitLabelPrintGroupRelations} from '../models';
import {PharmacyDataDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PharmacyUnitLabelPrintGroupRepository extends DefaultCrudRepository<
  PharmacyUnitLabelPrintGroup,
  typeof PharmacyUnitLabelPrintGroup.prototype.id,
  PharmacyUnitLabelPrintGroupRelations
> {
  constructor(
    @inject('datasources.PharmacyData') dataSource: PharmacyDataDataSource,
  ) {
    super(PharmacyUnitLabelPrintGroup, dataSource);
  }
}
