import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BASELINE, intuMetrics, positionMetrics } from '../data.js';

test('known INTU concentration and hard-max capacity are calculated from the locked reference',()=>{
  const m=intuMetrics();
  assert.equal(m.value,1904290);
  assert.equal(m.weight,47.60725);
  assert.equal(m.maxValue,480000);
  assert.equal(m.excess,1424290);
  assert.equal(m.addCapacity,0);
  assert.equal(m.status,'red');
});
test('cost is an alternative estimate, never a baseline mutation',()=>{
  const before=JSON.stringify(BASELINE);
  const m=intuMetrics('cost');
  assert.ok(Math.abs(m.value-1893227.999)<0.00001);
  assert.ok(Math.abs(m.weight-47.330699975)<0.000001);
  assert.equal(m.addCapacity,0);
  assert.equal(JSON.stringify(BASELINE),before);
  assert.throws(()=>{BASELINE.INTU.lock=1;},TypeError);
  assert.throws(()=>{BASELINE.INTU.iv[0]=1;},TypeError);
});
test('unknown prices and holdings do not become zero exposure or available capacity',()=>{
  const known={shares:5300,price:359.30,total:4000000,target:[6,8],hardMax:12};
  for(const field of ['shares','price','total','hardMax']){
    assert.equal(positionMetrics({...known,[field]:null}),null);
    assert.equal(positionMetrics({...known,[field]:NaN}),null);
  }
  assert.equal(positionMetrics({...known,total:0}),null);
  assert.equal(positionMetrics({...known,price:0}),null);
});
test('concentration thresholds distinguish target, hard maximum, and breach',()=>{
  const base={shares:1,total:100,target:[6,8],hardMax:12};
  assert.equal(positionMetrics({...base,price:8}).status,'green');
  assert.equal(positionMetrics({...base,price:9}).status,'orange');
  assert.equal(positionMetrics({...base,price:12}).addCapacity,0);
  assert.equal(positionMetrics({...base,price:13}).status,'red');
  assert.equal(positionMetrics({...base,price:8}).addCapacity,4);
});
