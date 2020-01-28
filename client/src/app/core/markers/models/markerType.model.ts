import { BaseModel, Audit, Rule } from '../../_base/crud';

export class MarkerType extends BaseModel {
  id: string | undefined;
  orgId: string | undefined;
  title: string | undefined;
  defaultIcon: any;
  normalIcon: any;
  warningIcon: any;
  dangerIcon: any;
  rules: Rule[];
  audit: Audit;
}
