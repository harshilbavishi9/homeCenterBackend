export enum ModelStatus {
	Deactivate,
	Active,
}

export enum ModelVerifiedStatus {
	Waiting,
	Active,
}

export enum ModelDataCount {
	length,
	defaultpage,
	PAGE = 10,
}
/* 
	0 - not selected
	1 - home
	2 - offie
*/
export enum LandMarkStatus {
	Select,
	Home,
	Office,
}

export enum OrderStatus {
	Pending = "Pending",
	Processing = "Processing",
	Shipped = "Shipped",
	Delivered = "Delivered",
}

export enum PaymentStatus {
	Pending = "Pending",
	CashOndelivery = "CashOndelivery",
	Online = "Online",
}
