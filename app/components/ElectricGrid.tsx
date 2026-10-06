export default function ElectricGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-navy/20 via-dark to-dark" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0869ca 1px, transparent 1px),
            linear-gradient(to bottom, #0869ca 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0869ca 2px, transparent 2px),
            linear-gradient(to bottom, #0869ca 2px, transparent 2px)
          `,
          backgroundSize: '300px 300px',
        }}
      />
    </div>
  );
}
