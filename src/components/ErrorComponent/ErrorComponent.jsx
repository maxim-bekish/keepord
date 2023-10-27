import { useNavigate } from "react-router-dom";
export default function ErrorComponent(error) {
  const navigate = useNavigate();
  
  // console.log(error.prop);
  // if (error.prop.response.status === 401) {

  // } else {
  //   return <h2>Error: {error.response.status}</h2>;
  // }

  return (
    <>
      <h2>Произошла ошибка: {error.props.message} </h2>
      <button onClick={() => navigate("/login", { replace: true })}>
        Bернуься на страницу входа
      </button>
      <button onClick={() => console.log(12e3)}>Обновить</button>
    </>
  );
}
