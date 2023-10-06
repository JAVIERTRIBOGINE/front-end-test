import { ControlValueAccessor } from '@angular/forms';

export abstract class AbstractNgModel<T> implements ControlValueAccessor {
  public model!: T;

  modelChange: any = () => {};

  modelTouch: any = () => {};

  writeValue(obj: any): void {
    this.model = obj;
  }

  registerOnChange(fn: any): void {
    this.modelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.modelTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void;
}
