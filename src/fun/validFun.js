// import { useNavigate } from "react-router-dom";

const useValidFun = (error, isLoading) => {
  // const navigate = useNavigate();

  if (isLoading) {
    return <h2>Loadinggggg</h2>;
  }

  if (error) {
    if (error.response.status === 401) {
      return (
        <>
          <h2>Произошла ошибка с Авторизацией вернуться на страничку входа</h2>
          {/* <button onClick={() => navigate("/login", { replace: true })}> */}
            Bернуься
          {/* </button> */}
        </>
      );
    } else {
      return <h2>Error: {error.response.status}</h2>;
    }
  }
};

export default useValidFun;