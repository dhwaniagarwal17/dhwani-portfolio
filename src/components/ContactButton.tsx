interface ContactButtonProps {
  label?: string;
}

export default function ContactButton({ label = "Contact Me" }: ContactButtonProps) {
  return (
    <a
      href="#contact"
      className="rounded-full text-white font-medium uppercase tracking-widest text-[0.63rem] md:text-[0.75rem] px-6 py-2 md:py-2.5 inline-block outline outline-2 outline-white outline-offset-[-3px]"
      style={{
        background:
          "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
      }}
    >
      {label}
    </a>
  );
}
