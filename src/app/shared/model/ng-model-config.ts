import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { forwardRef } from '@angular/core';

export function ngModelProvider(type: any): any {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}

export function ngModelValidationProvider(type: any): any {
  return {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}
