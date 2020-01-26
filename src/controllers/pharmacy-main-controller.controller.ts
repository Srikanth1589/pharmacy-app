import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { PharmacyUnitLabel, PharmacyFill } from '../models';
import { PharmacyUnitLabelRepository } from '../repositories';
import { PharmacyUnitLabelService, UnitLabel } from '../services/pharmacy-unit-label.service';
import { inject } from '@loopback/core';

export class PharmacyMainControllerController {
  constructor(
    @repository(PharmacyUnitLabelRepository)
    public pharmacyUnitLabelRepository: PharmacyUnitLabelRepository,
    @inject('services.PharmacyUnitLabelService')
    public pharmacyUnitLabelService: PharmacyUnitLabelService,
  ) { }

  @post('/pharmacy-unit-labels', {
    responses: {
      '200': {
        description: 'PharmacyUnitLabel model instance',
        content: { 'application/json': { schema: getModelSchemaRef(PharmacyUnitLabel) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PharmacyUnitLabel, {
            title: 'NewPharmacyUnitLabel',
            exclude: ['id'],
          }),
        },
      },
    })
    pharmacyUnitLabel: PharmacyUnitLabel,
    pharmacyFill: PharmacyFill,
    unitLabel: UnitLabel,
  ): Promise<PharmacyUnitLabel> {
    await this.pharmacyUnitLabelService.createUnitLabel(pharmacyFill, unitLabel);
    return this.pharmacyUnitLabelRepository.create(pharmacyUnitLabel);
  }

  @get('/pharmacy-unit-labels/count', {
    responses: {
      '200': {
        description: 'PharmacyUnitLabel model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PharmacyUnitLabel)) where?: Where<PharmacyUnitLabel>,
  ): Promise<Count> {
    return this.pharmacyUnitLabelRepository.count(where);
  }

  @get('/pharmacy-unit-labels', {
    responses: {
      '200': {
        description: 'Array of PharmacyUnitLabel model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PharmacyUnitLabel, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PharmacyUnitLabel)) filter?: Filter<PharmacyUnitLabel>,
  ): Promise<PharmacyUnitLabel[]> {
    return this.pharmacyUnitLabelRepository.find(filter);
  }

  @patch('/pharmacy-unit-labels', {
    responses: {
      '200': {
        description: 'PharmacyUnitLabel PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PharmacyUnitLabel, { partial: true }),
        },
      },
    })
    pharmacyUnitLabel: PharmacyUnitLabel,
    @param.query.object('where', getWhereSchemaFor(PharmacyUnitLabel)) where?: Where<PharmacyUnitLabel>,
  ): Promise<Count> {
    return this.pharmacyUnitLabelRepository.updateAll(pharmacyUnitLabel, where);
  }

  @get('/pharmacy-unit-labels/{id}', {
    responses: {
      '200': {
        description: 'PharmacyUnitLabel model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PharmacyUnitLabel, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(PharmacyUnitLabel)) filter?: Filter<PharmacyUnitLabel>
  ): Promise<PharmacyUnitLabel> {
    return this.pharmacyUnitLabelRepository.findById(id, filter);
  }

  @patch('/pharmacy-unit-labels/{id}', {
    responses: {
      '204': {
        description: 'PharmacyUnitLabel PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PharmacyUnitLabel, { partial: true }),
        },
      },
    })
    pharmacyUnitLabel: PharmacyUnitLabel,
  ): Promise<void> {
    await this.pharmacyUnitLabelRepository.updateById(id, pharmacyUnitLabel);
  }

  @put('/pharmacy-unit-labels/{id}', {
    responses: {
      '204': {
        description: 'PharmacyUnitLabel PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pharmacyUnitLabel: PharmacyUnitLabel,
  ): Promise<void> {
    await this.pharmacyUnitLabelRepository.replaceById(id, pharmacyUnitLabel);
  }

  @del('/pharmacy-unit-labels/{id}', {
    responses: {
      '204': {
        description: 'PharmacyUnitLabel DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pharmacyUnitLabelRepository.deleteById(id);
  }
}
