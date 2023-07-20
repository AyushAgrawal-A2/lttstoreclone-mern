type ProductPriceProps = {
  price: string;
};

export default function ProductPrice({ price }: ProductPriceProps) {
  return <div className="mb-4 text-2xl font-semibold uppercase">{price}</div>;
}
