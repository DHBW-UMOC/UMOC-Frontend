export class ActiveItem {
  item_name: string;
  active_until: Date;

  constructor(item_name: string, active_until: Date) {
    this.item_name = item_name;
    this.active_until = active_until;
  }
}