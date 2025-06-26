export default function layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <div>navigation</div>
      <div>{children}</div>
    </div>
  );
}
