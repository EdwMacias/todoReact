interface CardProps {
  title: string;
  value: string;
}

export default function Card({ title, value }: CardProps) {
  return (
    <div className="card bg-base-200 shadow-lg p-6 rounded-xl">
      <h2 className="text-lg font-bold text-primary">{title}</h2>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
}