
export class Audit {
	 ownerId: string;
	 createdBy: string;
	 updatedBy: string;
	 created: Date;
	 modified: Date;

	clear(): void {
			this.ownerId = '';
			this.createdBy = '';
			this.updatedBy = '';
			this.created = new Date();
			this.modified = new Date();
	}
}

export abstract class BaseModel {

	audit: Audit;

}
