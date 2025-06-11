export class Item {
  item_name: string;
  price: string;
  amount: number = 0;
  icon: string;

  constructor(item_name: string, price: number, amount?: number) {
    this.item_name = item_name;
    this.price = `${price} Pkt.`;
    console.log("aminna: ", amount);
    this.amount = (amount) ? amount : 0;
    this.icon = this.correspondingEmoji(item_name);
  }

  correspondingEmoji(item_name: string) {
    const emojiMap: Record<string, string> = {
      'alt_background': '🪿',
      'show_ads': '📺',
      'timeout': '🤐',
      'default': '📦'
    };
    if (emojiMap[item_name]) {
      return emojiMap[item_name];
    }
    return emojiMap['default'];
  }
}