interface IStock {
  updateStockProduct(product_id: number): Promise<boolean>;
  updateStockProductAdmin(product_id: number,quantity: number): Promise<boolean>;
}

export default IStock;
