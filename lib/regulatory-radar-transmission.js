import {exact,claim} from './regulatory-radar-model.js';
export const LAYERS=['policy','requiredBehavior','spendingSector','bottleneck','scarceCapability','priceVolumeShare','revenue','margins','fcfRoic','rentDuration'];
export const SECOND_ORDER_QUESTIONS=['obviousBeneficiary','supplier','scarceCapacity','certificationOwner','ipOwner','physicalBottleneck','mandatorySpendingRecipient','pricingPower','competitorCompliance','alternativeRentRecipient'];
export function validateTransmission(map,sources){exact(map,['path','secondOrder']);exact(map.path,LAYERS);exact(map.secondOrder,SECOND_ORDER_QUESTIONS);[...Object.values(map.path),...Object.values(map.secondOrder)].forEach(c=>claim(c,sources));}
export function secondOrderFlag(event){return event.fields.secondOrderBeneficiaries==='UNKNOWN'||event.transmission.path.bottleneck==='UNKNOWN'?'UNKNOWN':{type:'SECOND_ORDER_BENEFICIARY_FLAG',scope:'RESEARCH_ONLY',claim:event.fields.secondOrderBeneficiaries};}
