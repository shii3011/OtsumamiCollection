export type RakutenResponse = {
  Items: {
    Item: {
      itemName: string;
      itemUrl: string;
      itemPrice: number;
      shopName: string;
      mediumImageUrls: {
        imageUrl: string;
      }[];
    };
  }[];
};
