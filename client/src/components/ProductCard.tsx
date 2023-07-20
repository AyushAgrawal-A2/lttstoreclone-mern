type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  console.log(product);
  return <div>{product.title}</div>;
}
