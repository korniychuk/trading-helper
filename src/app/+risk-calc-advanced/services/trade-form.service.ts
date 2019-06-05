import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TradeFormValidatorsService } from './trade-form-validators.service';
import { ETradeType, TypeFee } from '../models';

@Injectable()
export class TradeFormService {
  public form: FormGroup;

  constructor(
    private pizzaValidatorsService: TradeFormValidatorsService,
    private fb: FormBuilder
  ) {
    const commonPanelConfig = this.fb.group({
      tradeType: [
        ETradeType.Long, [Validators.required],
      ],
      deposit: ['1000', [Validators.required, Validators.min(0.1)]],
      risk: ['1', [Validators.required, Validators.min(0), Validators.max(100)]],
      leverageAvailable: [true],
      feeEnabled: [true],
      marketMakerFee: ['0.2', [Validators.required, Validators.min(0), Validators.max(100)]],
      marketTakerFee: ['0.2', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
    const entryPriceConfig = this.fb.group({
      activeOrder: [true],
      price: ['100', [Validators.required]],
      percent: ['25', [Validators.required]],
      percentRange: ['20'],
      typeOfFee: [TypeFee.marketMaker, [Validators.required]],
    });
    const stopLossConfig = this.fb.group({
      activeOrder: [true],
      price: ['100', [Validators.required]],
      percent: ['5', [Validators.required]],
      percentRange: ['25'],
      typeOfFee: [TypeFee.marketTaker, [Validators.required]],
    });
    const takeProfitConfig = this.fb.group({
      activeOrder: [true],
      price: ['100', [Validators.required]],
      percent: ['25', [Validators.required]],
      percentRange: ['25'],
      typeOfFee: [TypeFee.marketTaker, [Validators.required]],
    });
    const config: any = {
      commonPanel: commonPanelConfig,
      entryPrice: entryPriceConfig,
      stopLoss: stopLossConfig,
      takeProfit: takeProfitConfig,
    };
    this.form = this.fb.group(config as any);
  }

  get isValid(): boolean {
    return true;
  }
}