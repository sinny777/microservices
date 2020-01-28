import { BaseModel } from '../../_base/crud';

export class Role extends BaseModel {
    id: string;
    name: string;
    isCoreRole: boolean = false;
    permissions: string[];

    clear(): void {
        this.id = undefined;
        this.name = '';
        this.isCoreRole = false;
        this.permissions = [];
	}
}
