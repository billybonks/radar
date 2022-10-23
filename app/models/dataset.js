import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import { set, get } from '@ember/object';
import * as arquero from 'arquero';

const TYPES = {
  temporal: 'temporal',
  quantitative: 'quantitative',
  nominal: 'nominal',
};

function isTemporal(value) {
  return Date.parse(value) === 'NaN';
}

function isQuantitative(value) {
  return isNumeric(value);
}

function isNumeric(str) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export default class DatasetModel extends Model {
  @tracked results;
  @tracked columns;

  @attr('string') type;
  @attr('string') query;
  @attr('string') error;
  @attr('string') name;
  @belongsTo('dataset') input;
  @belongsTo('datasource') datasource;
  @belongsTo('cache') cache;

  async refresh() {
    try {
      if (this.type === 'jinja') {
        let input = get(this, 'input.content'); // eslint-disable-line ember/no-get
        await input.refresh();
        let props = { input: input.results };
        let query = await window.desktopAPI.renderJinja(this.query, props);
        await this.executeSql(query);
      } else {
        return await this.executeSql(this.query);
      }
    } catch (e) {
      set(this, 'cache', null);
      set(this, 'error', e.toString());
    }
  }

  async executeSql(query) {
    let results = await window.desktopAPI.datasource.query(
      this.datasource.get('id'),
      query
    );
    this.columns = Object.keys(results[0]);
    this.summarise(results);
    let properties = {
      results,
      columns: this.columns,
    };
    let cache = this.store.createRecord('cache', properties);
    await cache.save();
    console.log(cache.id);
    set(this, 'cache', cache);
    set(this, 'error', null);
    await this.save();
    this.results = results;
  }

  summarise(dataset) {
    const { all, op } = arquero;
    let { pivotedDataSet, summary } = this.pivotAndSummarise(dataset);
    let queryableTable = arquero.table(pivotedDataSet);
    let quantitativeColumns = Object.entries(summary)
      .map(([col, attrs]) => (attrs.type === TYPES.quantitative ? col : null))
      .filter(Boolean);
    let nominalColumns = Object.entries(summary)
      .map(([col, attrs]) => (attrs.type === TYPES.nominal ? col : null))
      .filter(Boolean);
    let basicStats = queryableTable
      .fold(all(), { as: ['col', 'val'] })
      .groupby('col')
      .rollup({
        nulls: (d) => op.invalid(d.val), // functional form of op.min('sun')
        distinct: (d) => op.distinct(d.val),
      })
      .objects();
    basicStats.forEach((entry) => {
      const { col, ...theRest } = entry;
      summary[col] = { ...summary[col], ...theRest };
    });
    let quantitativeStats = queryableTable
      .select(quantitativeColumns)
      .fold(all(), { as: ['col', 'val'] })
      .groupby('col')
      .rollup({
        min: (d) => op.min(d.val), // functional form of op.min('sun')
        max: (d) => op.max(d.val),
        avg: (d) => op.average(d.val),
        med: (d) => op.median(d.val),
      })
      .objects();
    [
      ...nominalColumns.map((col) => {
        return [col, queryableTable.select(col).groupby(col).count().objects()];
      }),
      ...quantitativeStats.map(({ col, ...properties }) => [col, properties]),
    ].forEach(([col, attributes]) => {
      summary[col] = { ...summary[col], graphable: { ...attributes } };
    });
    debugger;

    // // select count(*), source from table;
    // let nominalStats = queryableTable
    //   .select(nominalColumns)
    //   .fold(all(), { as: ['col', 'val'] })
    //   .groupby('col')
    //   .rollup({
    //     min: (d) => op.min(d.val), // functional form of op.min('sun')
    //     max: (d) => op.max(d.val),
    //     avg: (d) => op.average(d.val),
    //     med: (d) => op.median(d.val),
    //   })
    //   .objects();
    // debugger;
  }

  pivotAndSummarise(dataset) {
    const keys = Object.keys(dataset[0]);
    const summary = Object.fromEntries(
      keys.map((key) => [key, { hasNulls: false, type: null }])
    );
    const pivotedDataSet = Object.fromEntries(keys.map((key) => [key, []]));

    dataset.map((entry) => {
      keys.forEach((key) => {
        const value = entry[key];
        pivotedDataSet[key].push(value);
        if (value === null) {
          if (summary[key].hasNulls === false) {
            summary[key].hasNulls = true;
          }
        } else {
          if (summary[key].type === null) {
            if (isTemporal(value)) {
              summary[key].type = TYPES.temporal;
            } else if (isQuantitative(value)) {
              summary[key].type = TYPES.quantitative;
            } else {
              summary[key].type = TYPES.nominal;
            }
          } else if (summary[key].type === TYPES.temporal) {
            if (!isTemporal(value)) {
              summary[key].type = TYPES.nominal;
            }
          } else if (summary[key].type === TYPES.quantitative) {
            if (!isQuantitative(value)) {
              summary[key].type = TYPES.nominal;
            }
          }
        }
      });
    });
    return {
      pivotedDataSet,
      summary,
    };
  }
}
