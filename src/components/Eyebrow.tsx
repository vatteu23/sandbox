import Typography from "./Typography";


const Eyebrow = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
                variant="h5"
                fontWeight="semibold"
                className="mb-6 text-purple-200 tracking-widest uppercase"
                fontFamily="mono"
              >
                {children}
              </Typography>
  );
};

export default Eyebrow;