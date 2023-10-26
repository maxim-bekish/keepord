import search from "./../../img/svg/search.svg";
import st from "./Home.module.scss";
import BookmarksTitle from "../../components/bookmarksTitle/BookmarksTitle";
import ThingsData from "./../../components/ThingsData/ThingsData";
// import ListData from "./../../components/ListData/ListData";
// import { useDispatch, useSelector } from "react-redux";
// import { singInAuth } from "./../../store/sliceAuth";
// import Context from "./../../utilities/Context/Context";
import { useContext, useEffect, useState } from "react";
import { usersURL } from "./../../constants/api";
// import getTokenData from "./../../fun/getTokenData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigation = useNavigate();

  // const dispatch = useDispatch();
  //   function logout (){
  //  localStorage.removeItem("token");
  //  localStorage.removeItem("tokenRefresh");

  // dispatch(singInAuth(false));

  //  }
  // const status = useSelector((s) => s.sliceAuth.singIn);
  // console.log(status);

  // const xxx = useContext(Context);

  //  const [mainSelect, setMainSelect] = useState('');
  //   const selectApi = async (url) => {
  //     const res = await getTokenData(url);
  //     setMainSelect(res);
  //   };
  //   useEffect(() => {
  //     selectApi(usersURL);
  //   }, []);
  // console.log(mainSelect);

  // const [mainSelect, setMainSelect] = useState("");
  const [coins, setCoins] = useState();
  const [loading, setLoading] = useState(true);

  async function xxx() {
    try {
      const { data } = await axios.get(usersURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setCoins(data);
    } catch (error) {
      navigation("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    xxx();
  }, []);

  if (loading) {
    return <h2>Loadinggggg</h2>;
  }
  // if (error) {
  //   return <h2>Errorrrrrrrrrr</h2>;
  // }
  // if (!coins) {
  //   return <h2>No dataaaaaa</h2>;
  // }

  //  axios.get(usersURL, {
  //      headers: {
  //        "Content-Type": "application/json",
  //        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  //      },
  //    })
  //  .then((res) => setMainSelect(res.data));

  // useEffect(() => {}, []);

  // console.log(mainSelect);

  return (
    <>
      <header className={`${st.header}`}>
        <button className={`${st.buttonAdd} ${st.button}`}>
          <a className={st.textA} href="/creatingCard">
            + Добавить вещь
          </a>
        </button>
        <h2 className={st.h2Name}>{coins.email}</h2>
        <div className={st.search}>
          <input placeholder="Поиск" className={st.inputSearch} type="text" />
          <button className={st.buttonSearch}>
            <img src={search} alt="searchSVG" />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("tokenRefresh");
              window.location.replace("/login");
              // dispatch(singInAuth(false));
            }}
            className={`${st.buttonExit} ${st.button}`}
          >
            {/* <a className={st.textA}></a> */}
            Выход
          </button>
        </div>
      </header>
      <main className={st.container}>
        <BookmarksTitle />

        <ThingsData />

        {/* <ListData /> */}
      </main>
    </>
  );
}
