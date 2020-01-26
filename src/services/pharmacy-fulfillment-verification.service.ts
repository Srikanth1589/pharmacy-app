import { bind, /* inject, */ BindingScope } from '@loopback/core';
import _ from 'lodash';
import Bluebird from 'bluebird';
import { repository } from '@loopback/repository';
import {
  PharmacyFillRepository,
  PharmacyUnitLabelPrintGroupRepository,
  PharmacyFillItemRepository,
  PharmacyUnitLabelRepository
} from '../repositories';

@bind({ scope: BindingScope.TRANSIENT })
export class PharmacyFulfillmentVerificationService {
  constructor(
    @repository(PharmacyFillRepository) public pharmacyFillRepository: PharmacyFillRepository,
    @repository(PharmacyFillItemRepository) public pharmacyFillItemRepository: PharmacyFillItemRepository,
    @repository(PharmacyUnitLabelRepository) public pharmacyUnitLabelRepository: PharmacyUnitLabelRepository,
    @repository(PharmacyUnitLabelPrintGroupRepository) public pharmacyUnitLabelPrintGroupRepository: PharmacyUnitLabelPrintGroupRepository,
  ) { }

  /*
   * Add service methods here
   */
  public async verifyFillState(fillId: string, expectedState: string): Promise<boolean> {
    const fill = await this.pharmacyFillRepository.findById(parseInt(fillId));

    // verify fill state
    const fillIsInExpectedState = fill.attributes.state === expectedState;
    if (!fillIsInExpectedState) {
      throw Error('Fill is not in Expected State');
    }

    return fillIsInExpectedState;
  }

  // verifies that the provided label_ids match the expectedLabelIds
  public async verifyUnitLabels(fillId: number, providedLabelIds: number[]): Promise<boolean> {
    // check for label_ids
    const isMissingLabelIds = providedLabelIds === null || providedLabelIds === undefined;
    if (isMissingLabelIds) {
      throw Error('providedLabelIds cannot be empty');
    }

    // this will get the latest group for the fill
    const unitLabelPrintGroup = await this.pharmacyUnitLabelPrintGroupRepository.findById(
      fillId,
    );

    const { fillItem, expectedLabels, providedLabels } = await Bluebird.props({
      fillItem: this.pharmacyFillRepository.findByFillId(
        fillId,
      ),
      expectedLabels: this.pharmacyUnitLabelRepository.findById(unitLabelPrintGroup.id),
      providedLabels: this.pharmacyUnitLabelRepository.findById(providedLabelIds),
    });

    // verify that all the labels for the fill's group are present
    const expectedLabelIds = expectedLabels.map((label: { id: number; }) => label.id);
    const expectedLabelsSorted = expectedLabelIds.map((id: number) => id).sort();
    const providedLabelsSorted = providedLabelIds.map((id: number) => id).sort();
    const labelIdsAreAllPresent = _.isEqual(expectedLabelsSorted, providedLabelsSorted);
    if (!labelIdsAreAllPresent) {
      throw Error('Provided unit_labels did not match the expected unit-labels for the fill');
    }

    // sanity check - verify that all the fill's items have at least one label
    const FillItemIds = fillItem.map((fillItemTemp: { id: number; }) => fillItemTemp.id);
    const labelFillItemIds = _.uniq(providedLabels.map((label: { relationships: { fillItem: { data: { id: number; }; }; }; }) => label.relationships.fillItem.data.id));
    const allFillItemHaveAtleastOneLabel = _.isEqual(FillItemIds.sort(), labelFillItemIds.sort());
    if (!allFillItemHaveAtleastOneLabel) {
      throw Error('At least one fillItem is missing a unit_label');
    }

    return !isMissingLabelIds && labelIdsAreAllPresent && allFillItemHaveAtleastOneLabel;
  }
}
