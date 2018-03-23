export class TaskModel {
    public pId : number;
	public pName: string;
	public pStart : Date;
    public pEnd : Date;
    public pStyle: string;
    public pLink: string;
	public pMile : number;
	public pRes : string;
	public pComp : number;
	public pGroup : number;
	public pParent: number;
	public pOpen: number;
    public pDepend : number;
    public pCaption: string;
    public pNotes: string;
    public pGantt: any;
}