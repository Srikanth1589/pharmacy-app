/* eslint-disable @typescript-eslint/camelcase */
import { bind, /* inject, */ BindingScope } from '@loopback/core';
import { PharmacyUnitLabel, PharmacyFill } from '../models';
import { PharmacyUnitLabelRepository, PharmacyFillRepository } from '../repositories';
import { PharmacyFulfillmentVerificationService } from '../services';
import { repository } from '@loopback/repository';
/**
 * Interface for recommendation service
 */
export type UnitLabel = {
  unit_labels: PharmacyUnitLabel[];
  fill: PharmacyFill;
  user_id: number;
}

@bind({ scope: BindingScope.TRANSIENT })
export class PharmacyUnitLabelService {
  constructor(
    @repository(PharmacyUnitLabelRepository) public pharmacyUnitLabelRepository: PharmacyUnitLabelRepository,
    @repository(PharmacyFillRepository) public pharmacyFillRepository: PharmacyFillRepository,
  ) { }

  /*
   * Add service methods here
   */
  public async createUnitLabel(pharmacyFill: PharmacyFill, params: UnitLabel): Promise<boolean> {
    const providedLabelIds = params.unit_labels.map((label) => Number(label.id));
    const fillId = params.fill.id;
    // TODO: Trying to figure out how to declare ENUM
    const expectedState = 'unit_label_printing';

    const fillIsInExpectedState = await PharmacyFulfillmentVerificationService.verifyFillState(fillId, expectedState);
    const unitLabelsVerified = await PharmacyFulfillmentVerificationService.verifyUnitLabels(fillId, providedLabelIds);

    const isVerified = fillIsInExpectedState && unitLabelsVerified;
    await this.pharmacyFillRepository.update(pharmacyFill,
      { state: 'unit_label_printed', dispensed_by: params.user_id, id: fillId });

    return isVerified;
  }
}
