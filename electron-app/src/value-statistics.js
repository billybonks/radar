let arquero = require('arquero');

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

function pivotAndSummarise(dataset) {
  const keys = Object.keys(dataset[0]);
  const summary = Object.fromEntries(
    keys.map((key) => [key, { hasNulls: false, type: null }])
  );
  const pivotedDataSet = Object.fromEntries(keys.map((key) => [key, []]));

  dataset.map((entry) => {
    keys.forEach((key) => {
      const value = entry[key];
      pivotedDataSet[key].push(value);
      if (value !== null) {
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

function summarise(dataset) {
  const { all, op } = arquero;
  let { pivotedDataSet, summary } = pivotAndSummarise(dataset);
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
  return summary;
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

module.exports = summarise;
