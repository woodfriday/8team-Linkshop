import useDevice from "../../hooks/useDevice";

function HomePage() {
  const { mode } = useDevice;
  return (
    <div>
      <h1>HomePage {mode}</h1>
    </div>
  );
}

export default HomePage;
