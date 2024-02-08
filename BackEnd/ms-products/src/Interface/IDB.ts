import Product from "../Models/Product";


interface IDB {
  createProduct(product: Product): Promise<boolean>;
  deleteProduct(product_id: number): Promise<boolean>;
  getProduct(product_id: number): Promise<Product>;
  getProducts(admin_id: number): Promise<Product[]>;
  //
  getAllAvailableProductsInStock(admin_id:number): Promise<Product[]>;
  updateProduct(product:Product): Promise<boolean>;

  searchProductFromDB(nameProduct: string): Promise<Product[]> ;
  getSuggestion(category: string): Promise<Product[]>;
  getProductsParDiscount(discountPrice: number): Promise<Product[]> 
}

export default IDB;
