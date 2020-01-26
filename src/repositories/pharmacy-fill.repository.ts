import { DefaultCrudRepository, HasOneRepositoryFactory, repository } from '@loopback/repository';
import { PharmacyFill, PharmacyFillRelations, PharmacyFillItem } from '../models';
import { PharmacyDataDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { PharmacyFillItemRepository } from '.';

export class PharmacyFillRepository extends DefaultCrudRepository<
  PharmacyFill,
  typeof PharmacyFill.prototype.id,
  PharmacyFillRelations
  > {
  public readonly pharmacyFillItem: HasOneRepositoryFactory<
    PharmacyFillItem,
    typeof PharmacyFill.prototype.id
  >;
  constructor(
    @inject('datasources.PharmacyData') dataSource: PharmacyDataDataSource,
    @repository.getter('PharmacyFillItemRepository')
    protected pharmacyFillItemRepositoryGetter: Getter<
      PharmacyFillItemRepository
    >,
  ) {
    super(PharmacyFill, dataSource);
    this.pharmacyFillItem = this.createHasOneRepositoryFactoryFor(
      'PharmacyFill',
      pharmacyFillItemRepositoryGetter,
    );
  }

  findByFillId(fillId: number) {
    return this.pharmacyFillItem(fillId).get();
  }
}
