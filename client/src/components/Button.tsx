interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      className="bg-gradient uppercase py-5 px-14 rounded-lg text-white text-xl font-semibold hover:animate-grow hover:shadow-[inset_0_0_0_2px_var(--foreground-primary-rgb)]"
      onClick={onClick}>
      {text}
    </button>
  );
}
