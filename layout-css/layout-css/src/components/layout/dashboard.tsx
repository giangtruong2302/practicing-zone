import "./dashboard.css";
type Props = {
  children: React.ReactNode;
};
const Dashboard = ({ children }: Props) => {
  return (
    <div className="grid-container">
      <header>header</header>
      <nav>nav</nav>
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  );
};

export default Dashboard;
