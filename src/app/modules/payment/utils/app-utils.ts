import {SimpleChange} from '@angular/core';

export const isNewChange = (prop: SimpleChange) => {
  return prop.currentValue !== undefined && prop.currentValue !== prop.previousValue;
};
