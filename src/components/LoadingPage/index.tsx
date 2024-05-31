import { Spinner } from "react-activity";

export const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        left: 0,
      }}
    >
      <Spinner color="var(--primary-color)" size={40} />
    </div>
  );
};
