type ProductTitleProps = {
  title: string;
};

export default function ProductTitle({ title }: ProductTitleProps) {
  return (
    <div className="text-center md:text-start text-4xl break-words font-bold tracking-[.0165em] leading-[3rem] uppercase">
      {title}
    </div>
  );
}
