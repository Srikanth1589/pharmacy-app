import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {juggler} from '@loopback/repository';
const config = require('./pharmacy-data.datasource.config.json');

@lifeCycleObserver('datasource')
export class PharmacyDataDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'PharmacyData';

  constructor(
    @inject('datasources.config.PharmacyData', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
